// ══════════════════════════════════════════
// AUTH & SQUAD  (Supabase-backed)
// ══════════════════════════════════════════

// ── Supabase config ──────────────────────
const SB_URL = "https://ppzulorxyiwkzhfeubhr.supabase.co";
// IMPORTANT: replace with your real anon JWT from Supabase → Settings → API
// It looks like eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
const SB_KEY = "PASTE_YOUR_ANON_JWT_HERE";

// ── Auth state ───────────────────────────
let authUser   = null;   // { id, email, username }
let authToken  = null;   // Supabase JWT

// ── Squad state ──────────────────────────
let sessionCode   = null;
let squadPlayers  = {};  // { playerName → row }
let sqPollTimer   = null;
let widgetOpen    = true;
let squadViewTab  = null; // null=overview, else playerName

// ══════════════════════════════════════════
// LOW-LEVEL SUPABASE
// ══════════════════════════════════════════
async function sbFetch(path, opts = {}, useAuth = true) {
  const headers = {
    "apikey": SB_KEY,
    "Content-Type": "application/json",
    "Authorization": "Bearer " + (useAuth && authToken ? authToken : SB_KEY),
    ...(opts.extraHeaders || {})
  };
  delete opts.extraHeaders;
  try {
    const res = await fetch(SB_URL + path, { ...opts, headers });
    if (res.status === 204) return null;
    const json = await res.json();
    if (res.ok) return json;
    console.error("sbFetch", res.status, json);
    return null;
  } catch(e) {
    console.error("sbFetch network error", e);
    return null;
  }
}

// ══════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════
async function authSignUp(email, password, username) {
  setAuthMsg("Creating account…", "info");
  const res = await sbFetch("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }, false);
  if (!res?.access_token) {
    setAuthMsg(res?.error_description || "Sign-up failed. Try a different email.", "error");
    return;
  }
  authToken = res.access_token;
  authUser  = { id: res.user.id, email, username };
  // create profile row
  await sbFetch("/rest/v1/profiles", {
    method: "POST",
    extraHeaders: { "Prefer": "return=minimal" },
    body: JSON.stringify({
      id: res.user.id, email, username,
      faction_data: { LV, PL },
      updated_at: new Date().toISOString()
    })
  });
  _onAuthOK();
  setAuthMsg("Account created — welcome!", "success");
  setTimeout(closeAuthModal, 900);
}

async function authSignIn(email, password) {
  setAuthMsg("Signing in…", "info");
  const res = await sbFetch("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }, false);
  if (!res?.access_token) {
    setAuthMsg("Wrong email or password.", "error");
    return;
  }
  authToken = res.access_token;
  authUser  = { id: res.user.id, email };
  // load profile + restore build
  const rows = await sbFetch(`/rest/v1/profiles?id=eq.${res.user.id}&select=*`);
  if (rows?.[0]) {
    authUser.username = rows[0].username;
    const fd = rows[0].faction_data || {};
    if (fd.LV) Object.assign(LV, fd.LV);
    if (fd.PL) Object.assign(PL, fd.PL);
    refresh();
  }
  _onAuthOK();
  setAuthMsg("Welcome back!", "success");
  setTimeout(closeAuthModal, 900);
}

async function authSignOut() {
  await sbFetch("/auth/v1/logout", { method: "POST" });
  authUser = authToken = null;
  if (sqPollTimer) clearInterval(sqPollTimer);
  sessionCode = null; squadPlayers = {};
  try { sessionStorage.clear(); } catch(e){}
  renderAuthWidget();
  updateSquadWidget();
  updateHdr();
}

function _onAuthOK() {
  try {
    sessionStorage.setItem("mara_token", authToken);
    sessionStorage.setItem("mara_user",  JSON.stringify(authUser));
  } catch(e){}
  renderAuthWidget();
  updateSquadWidget();
  updateHdr();
  pushProfile();
}

async function tryRestoreSession() {
  try {
    const token = sessionStorage.getItem("mara_token");
    const user  = JSON.parse(sessionStorage.getItem("mara_user") || "null");
    if (!token || !user) return;
    authToken = token; authUser = user;
    const rows = await sbFetch(`/rest/v1/profiles?id=eq.${user.id}&select=*`);
    if (rows?.[0]) {
      authUser.username = rows[0].username;
      const fd = rows[0].faction_data || {};
      if (fd.LV) Object.assign(LV, fd.LV);
      if (fd.PL) Object.assign(PL, fd.PL);
      refresh();
      renderAuthWidget();
      updateSquadWidget();
      updateHdr();
      // auto-join from URL
      const code = new URLSearchParams(window.location.search).get("session");
      if (code) squadJoin(code);
    } else {
      authUser = authToken = null;
      sessionStorage.clear();
    }
  } catch(e) {}
}

// ── Profile save (debounced) ─────────────
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

// ══════════════════════════════════════════
// AUTH UI
// ══════════════════════════════════════════
