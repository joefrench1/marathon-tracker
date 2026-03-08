// ══════════════════════════════════════════
// AUTH & SQUAD  (Supabase-backed)
// ══════════════════════════════════════════

// ── Supabase config ──────────────────────
const SB_URL = "https://ppzulorxyiwkzhfeubhr.supabase.co";
// Replace with your key from Supabase → Project Settings → API
// Use EITHER:
//   • The "anon" JWT key (starts with eyJ...) from the Legacy API Keys tab
//   • OR the "publishable" key (starts with sb_publishable_...) from the API Keys tab
// Both work — the publishable key is newer and recommended.
const SB_KEY = "PASTE_YOUR_ANON_OR_PUBLISHABLE_KEY_HERE";

let authUser   = null;   // { id, username }
let authToken  = null;   // Supabase JWT

// ── Low-level fetch helper ────────────────
// Works with both JWT anon key (eyJ...) and publishable key (sb_publishable_...)
const _isJwt = SB_KEY.startsWith("eyJ");
async function sbFetch(path, opts = {}, useAuth = true) {
  try {
    const bearer = useAuth && authToken ? authToken : (_isJwt ? SB_KEY : null);
    const headers = {
      "Content-Type": "application/json",
      "apikey": SB_KEY,
      ...(bearer ? { "Authorization": "Bearer " + bearer } : {}),
      ...(opts.extraHeaders || {})
    };
    const res = await fetch(SB_URL + path, {
      method: opts.method || "GET",
      headers,
      body: opts.body
    });
    if (res.status === 204) return {};
    return await res.json();
  } catch(e) {
    console.warn("sbFetch error:", e);
    return null;
  }
}

// ══════════════════════════════════════════
// USERNAME-ONLY AUTH
// No email required. Username + password stored in Supabase profiles table.
// Password is hashed client-side using SHA-256 before storing — never stored plain.
// ══════════════════════════════════════════

async function _sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

async function authSignUp(username, password) {
  if (!username || username.length < 3) {
    setAuthMsg("Username must be at least 3 characters.", "error"); return;
  }
  if (!password || password.length < 6) {
    setAuthMsg("Password must be at least 6 characters.", "error"); return;
  }
  setAuthMsg("Creating account…", "info");

  // Check username not taken
  const existing = await sbFetch(`/rest/v1/profiles?username=eq.${encodeURIComponent(username)}&select=id`, {}, false);
  if (existing?.length > 0) {
    setAuthMsg("That username is already taken.", "error"); return;
  }

  const pwHash = await _sha256(password + username + "marathon_salt");
  const id     = crypto.randomUUID();
  const res    = await sbFetch("/rest/v1/profiles", {
    method: "POST",
    extraHeaders: { "Prefer": "return=representation" },
    body: JSON.stringify({
      id, username, pw_hash: pwHash,
      faction_data: { LV: {}, PL: {} },
      updated_at: new Date().toISOString()
    })
  }, false);

  if (!res?.[0]?.id) {
    setAuthMsg("Sign-up failed. Check your Supabase key is set in auth.js.", "error");
    return;
  }

  // Use username as the "token" (session key)
  authToken = id;
  authUser  = { id, username };
  _onAuthOK();
  setAuthMsg("Account created — welcome, " + username + "!", "success");
  setTimeout(closeAuthModal, 1000);
}

async function authSignIn(username, password) {
  if (!username || !password) { setAuthMsg("Enter username and password.", "error"); return; }
  setAuthMsg("Signing in…", "info");

  const pwHash = await _sha256(password + username + "marathon_salt");
  const rows   = await sbFetch(`/rest/v1/profiles?username=eq.${encodeURIComponent(username)}&select=*`, {}, false);

  if (!rows?.[0]) { setAuthMsg("Username not found.", "error"); return; }
  if (rows[0].pw_hash !== pwHash) { setAuthMsg("Incorrect password.", "error"); return; }

  const row = rows[0];
  authToken = row.id;
  authUser  = { id: row.id, username };

  // Restore build
  const fd = row.faction_data || {};
  if (fd.LV) Object.assign(LV, fd.LV);
  if (fd.PL) Object.assign(PL, fd.PL);
  refresh();

  _onAuthOK();
  setAuthMsg("Welcome back, " + username + "!", "success");
  setTimeout(closeAuthModal, 900);
}

async function authSignOut() {
  authUser = authToken = null;
  if (sqPollTimer) clearInterval(sqPollTimer);
  sessionCode = null; squadPlayers = {};
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

async function tryRestoreSession() {
  try {
    const token = sessionStorage.getItem("mara_token");
    const user  = JSON.parse(sessionStorage.getItem("mara_user") || "null");
    if (!token || !user) return;
    authToken = token; authUser = user;
    // Verify still valid + load latest build
    const rows = await sbFetch(`/rest/v1/profiles?id=eq.${user.id}&select=*`);
    if (rows?.[0]) {
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
  } catch(e) {}
}

// ── Profile save (debounced 1.2s) ─────────────
let _pushTimer = null;
async function pushProfile() {
  if (!authUser || !authToken) return;
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(async () => {
    await sbFetch(`/rest/v1/profiles?id=eq.${authUser.id}`, {
      method: "PATCH",
      extraHeaders: { "Prefer": "return=minimal" },
      body: JSON.stringify({ faction_data: { LV, PL }, updated_at: new Date().toISOString() })
    });
  }, 1200);
}
