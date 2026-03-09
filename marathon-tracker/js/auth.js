// ══════════════════════════════════════════
// AUTH & SQUAD  (Supabase-backed)
// ══════════════════════════════════════════

const SB_URL = "https://ppzulorxyiwkzhfeubhr.supabase.co";
const SB_KEY = "sb_publishable_nL6282I7TKx6zcqa73j2-g_0CatgzXM";

let authUser  = null;   // { id, username }
let authToken = null;   // profile id used as session token

// ── Low-level fetch ───────────────────────
async function sbFetch(path, opts = {}) {
  const headers = {
    "Content-Type": "application/json",
    "apikey": SB_KEY,
    "Authorization": "Bearer " + SB_KEY,
    ...(opts.extraHeaders || {})
  };
  const res = await fetch(SB_URL + path, {
    method: opts.method || "GET",
    headers,
    body: opts.body
  });
  if (res.status === 204 || res.status === 201) {
    try { return await res.json(); } catch(e) { return {}; }
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);
  return data;
}

// ── SHA-256 hash ──────────────────────────
async function _sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

// ══════════════════════════════════════════
// SIGN UP
// ══════════════════════════════════════════
async function authSignUp(username, password) {
  if (!username || username.length < 3) {
    setAuthMsg("Username must be at least 3 characters.", "error"); return;
  }
  if (!password || password.length < 6) {
    setAuthMsg("Password must be at least 6 characters.", "error"); return;
  }
  setAuthMsg("Creating account…", "info");

  try {
    // Check username not taken
    const existing = await sbFetch(`/rest/v1/profiles?username=eq.${encodeURIComponent(username)}&select=id`);
    if (Array.isArray(existing) && existing.length > 0) {
      setAuthMsg("That username is already taken.", "error"); return;
    }

    const pwHash = await _sha256(password + username + "marathon_salt");
    const id     = crypto.randomUUID();

    await sbFetch("/rest/v1/profiles", {
      method: "POST",
      extraHeaders: { "Prefer": "return=minimal" },
      body: JSON.stringify({
        id, username, pw_hash: pwHash,
        faction_data: { LV: {}, PL: {} },
        updated_at: new Date().toISOString()
      })
    });

    authToken = id;
    authUser  = { id, username };
    _onAuthOK();
    setAuthMsg("Welcome, " + username + "!", "success");
    setTimeout(closeAuthModal, 900);

  } catch(e) {
    console.error("Sign-up error:", e);
    setAuthMsg("Sign-up failed: " + (e.message || "unknown error"), "error");
  }
}

// ══════════════════════════════════════════
// SIGN IN
// ══════════════════════════════════════════
async function authSignIn(username, password) {
  if (!username || !password) { setAuthMsg("Enter username and password.", "error"); return; }
  setAuthMsg("Signing in…", "info");

  try {
    const rows = await sbFetch(`/rest/v1/profiles?username=eq.${encodeURIComponent(username)}&select=*`);

    if (!Array.isArray(rows) || rows.length === 0) {
      setAuthMsg("Username not found.", "error"); return;
    }

    const pwHash = await _sha256(password + username + "marathon_salt");
    if (rows[0].pw_hash !== pwHash) {
      setAuthMsg("Incorrect password.", "error"); return;
    }

    const row = rows[0];
    authToken = row.id;
    authUser  = { id: row.id, username };

    const fd = row.faction_data || {};
    if (fd.LV) Object.assign(LV, fd.LV);
    if (fd.PL) Object.assign(PL, fd.PL);
    refresh();

    _onAuthOK();
    setAuthMsg("Welcome back, " + username + "!", "success");
    setTimeout(closeAuthModal, 900);

  } catch(e) {
    console.error("Sign-in error:", e);
    setAuthMsg("Sign-in failed: " + (e.message || "unknown error"), "error");
  }
}

// ══════════════════════════════════════════
// SIGN OUT
// ══════════════════════════════════════════
async function authSignOut() {
  authUser = authToken = null;
  try { if (sqPollTimer) clearInterval(sqPollTimer); } catch(e){}
  try { sessionCode = null; } catch(e){}
  try { squadPlayers = {}; } catch(e){}
  try { sessionStorage.clear(); } catch(e){}
  renderAuthWidget();
  updateSquadPill();
  updateHdr();
}

function _onAuthOK() {
  try {
    sessionStorage.setItem("mara_token", authToken);
    sessionStorage.setItem("mara_user",  JSON.stringify(authUser));
  } catch(e){}
  renderAuthWidget();
  updateSquadPill();
  updateHdr();
  pushProfile();
}

// ══════════════════════════════════════════
// RESTORE SESSION
// ══════════════════════════════════════════
async function tryRestoreSession() {
  try {
    const token = sessionStorage.getItem("mara_token");
    const user  = JSON.parse(sessionStorage.getItem("mara_user") || "null");
    if (!token || !user) return;
    authToken = token; authUser = user;

    const rows = await sbFetch(`/rest/v1/profiles?id=eq.${user.id}&select=*`);
    if (Array.isArray(rows) && rows[0]) {
      authUser.username = rows[0].username;
      const fd = rows[0].faction_data || {};
      if (fd.LV) Object.assign(LV, fd.LV);
      if (fd.PL) Object.assign(PL, fd.PL);
      refresh();
      renderAuthWidget();
      updateSquadPill();
      updateHdr();
      const code = new URLSearchParams(window.location.search).get("session");
      if (code) squadJoin(code);
    } else {
      authUser = authToken = null;
      sessionStorage.clear();
    }
  } catch(e) {
    authUser = authToken = null;
    try { sessionStorage.clear(); } catch(_){}
  }
}

// ══════════════════════════════════════════
// PROFILE SAVE (debounced)
// ══════════════════════════════════════════
let _pushTimer = null;
async function pushProfile() {
  if (!authUser || !authToken) return;
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(async () => {
    try {
      await sbFetch(`/rest/v1/profiles?id=eq.${authUser.id}`, {
        method: "PATCH",
        extraHeaders: { "Prefer": "return=minimal" },
        body: JSON.stringify({ faction_data: { LV, PL }, updated_at: new Date().toISOString() })
      });
    } catch(e) { console.warn("pushProfile failed:", e); }
  }, 1200);
}
