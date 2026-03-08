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
function renderAuthWidget() {
  const el = document.getElementById("auth-widget");
  if (!el) return;
  if (!authUser) {
    el.innerHTML = `
      <button class="btn by" onclick="openAuthModal('login')" style="font-size:9px;padding:5px 12px">SIGN IN</button>
      <button class="btn bg" onclick="openAuthModal('signup')" style="font-size:9px;padding:5px 12px">CREATE ACCOUNT</button>`;
  } else {
    el.innerHTML = `
      <div style="text-align:right;line-height:1.5">
        <div style="font-family:'Orbitron',monospace;font-size:10px;color:#00e5ff">${authUser.username || authUser.email}</div>
        <div style="font-size:8px;color:#39ff14">● BUILD AUTO-SAVING</div>
      </div>
      <button class="btn br" onclick="authSignOut()" style="font-size:9px;padding:4px 10px">SIGN OUT</button>`;
  }
}

function openAuthModal(mode) {
  document.getElementById("auth-modal").style.display = "flex";
  renderAuthModalBody(mode);
}
function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
}

function renderAuthModalBody(mode) {
  const el = document.getElementById("auth-modal-body");
  if (mode === "login") {
    el.innerHTML = `
      <div style="font-family:'Orbitron',monospace;font-size:13px;color:#00e5ff;letter-spacing:3px;margin-bottom:14px">SIGN IN</div>
      <div id="auth-msg" style="display:none;padding:7px 10px;font-size:9.5px;margin-bottom:10px;border-left:3px solid"></div>
      <div style="font-size:9px;color:#4a6070;margin-bottom:14px;line-height:1.7">Sign in to sync your build across devices and join squad sessions.</div>
      <input id="a-email" class="sinput" placeholder="Email address"   type="email"    autocomplete="email">
      <input id="a-pw"    class="sinput" placeholder="Password"         type="password" autocomplete="current-password">
      <div style="display:flex;gap:8px;margin-top:14px">
        <button class="btn" style="border-color:#4a6070;color:#4a6070;font-size:9px;flex:1" onclick="renderAuthModalBody('signup')">Create account</button>
        <button class="btn bb" style="flex:1;font-size:9px" onclick="authSignIn(document.getElementById('a-email').value,document.getElementById('a-pw').value)">SIGN IN →</button>
      </div>`;
  } else {
    el.innerHTML = `
      <div style="font-family:'Orbitron',monospace;font-size:13px;color:#00e5ff;letter-spacing:3px;margin-bottom:14px">CREATE ACCOUNT</div>
      <div id="auth-msg" style="display:none;padding:7px 10px;font-size:9.5px;margin-bottom:10px;border-left:3px solid"></div>
      <div style="font-size:9px;color:#4a6070;margin-bottom:14px;line-height:1.7">Your build auto-saves to your profile. Rejoin any squad and your build syncs instantly.</div>
      <input id="a-uname" class="sinput" placeholder="Username (shown to squad)" maxlength="20" autocomplete="username">
      <input id="a-email" class="sinput" placeholder="Email address"   type="email"    autocomplete="email">
      <input id="a-pw"    class="sinput" placeholder="Password (min 8 chars)" type="password" autocomplete="new-password">
      <div style="display:flex;gap:8px;margin-top:14px">
        <button class="btn" style="border-color:#4a6070;color:#4a6070;font-size:9px;flex:1" onclick="renderAuthModalBody('login')">Sign in instead</button>
        <button class="btn bg" style="flex:1;font-size:9px" onclick="_doSignUp()">CREATE →</button>
      </div>`;
  }
}

function setAuthMsg(msg, type) {
  const el = document.getElementById("auth-msg");
  if (!el) return;
  const col = type==="error"?"#ff006e":type==="success"?"#39ff14":"#ffd600";
  el.style.cssText = `display:block;padding:7px 10px;font-size:9.5px;margin-bottom:10px;border-left:3px solid ${col};color:${col};background:${col}11`;
  el.textContent = msg;
}

function _doSignUp() {
  const uname = document.getElementById("a-uname")?.value?.trim();
  const email = document.getElementById("a-email")?.value?.trim();
  const pw    = document.getElementById("a-pw")?.value;
  if (!uname||!email||!pw) { setAuthMsg("Fill in all fields.", "error"); return; }
  if (pw.length < 8)        { setAuthMsg("Password must be at least 8 characters.", "error"); return; }
  authSignUp(email, pw, uname);
}

// ══════════════════════════════════════════
// SQUAD SESSIONS
// ══════════════════════════════════════════
function _genCode() {
  const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({length:6},()=>chars[Math.floor(Math.random()*32)]).join("");
}

async function squadCreate() {
  if (!authUser) { openAuthModal("login"); return; }
  sessionCode = _genCode();
  await _squadUpsertRow();
  _startPolling();
  updateSquadWidget();
  if (curTab==="squad") renderSquadPage();
}

async function squadJoin(code) {
  if (!authUser) { openAuthModal("login"); return; }
  sessionCode = code.toUpperCase().trim();
  if (!sessionCode) return;
  await _squadUpsertRow();
  _startPolling();
  updateSquadWidget();
  if (curTab==="squad") renderSquadPage();
}

async function _squadUpsertRow() {
  const name = authUser.username || authUser.email;
  // delete then insert for clean upsert
  await sbFetch(`/rest/v1/squad_sessions?session_code=eq.${sessionCode}&player_name=eq.${encodeURIComponent(name)}`,
    { method:"DELETE" });
  await sbFetch("/rest/v1/squad_sessions", {
    method: "POST",
    extraHeaders: { "Prefer": "return=minimal" },
    body: JSON.stringify({
      session_code: sessionCode,
      player_name: name,
      faction_data: { LV, PL },
      updated_at: new Date().toISOString()
    })
  });
}

async function squadLeave() {
  if (sessionCode && authUser) {
    const name = authUser.username || authUser.email;
    await sbFetch(`/rest/v1/squad_sessions?session_code=eq.${sessionCode}&player_name=eq.${encodeURIComponent(name)}`,
      { method:"DELETE" });
  }
  if (sqPollTimer) clearInterval(sqPollTimer);
  sqPollTimer = null;
  sessionCode = null; squadPlayers = {}; squadViewTab = null;
  updateSquadWidget();
  if (curTab==="squad") renderSquadPage();
}

async function _squadPushData() {
  if (!sessionCode || !authUser) return;
  const name = authUser.username || authUser.email;
  await sbFetch(`/rest/v1/squad_sessions?session_code=eq.${sessionCode}&player_name=eq.${encodeURIComponent(name)}`, {
    method: "PATCH",
    extraHeaders: { "Prefer": "return=minimal" },
    body: JSON.stringify({ faction_data:{ LV, PL }, updated_at: new Date().toISOString() })
  });
}

function _startPolling() {
  _loadSquad();
  if (sqPollTimer) clearInterval(sqPollTimer);
  sqPollTimer = setInterval(_loadSquad, 3000);
}

async function _loadSquad() {
  if (!sessionCode) return;
  const rows = await sbFetch(`/rest/v1/squad_sessions?session_code=eq.${sessionCode}&select=player_name,faction_data,updated_at&order=updated_at`);
  if (!Array.isArray(rows)) return;
  squadPlayers = {};
  rows.forEach(r => { squadPlayers[r.player_name] = r; });
  updateSquadWidget();
  if (curTab==="squad") renderSquadPage();
}

function copyInviteLink() {
  if (!sessionCode) return;
  const url = `${location.origin}${location.pathname}?session=${sessionCode}`;
  navigator.clipboard.writeText(url).catch(()=>{});
  const btn = document.getElementById("sq-copy-btn");
  if (btn) { const old=btn.textContent; btn.textContent="✓ COPIED!"; setTimeout(()=>btn.textContent=old, 2000); }
}

// ══════════════════════════════════════════
// SQUAD WIDGET (fixed bottom-right)
// ══════════════════════════════════════════
function updateSquadWidget() {
  const el = document.getElementById("squad-widget");
  if (!el) return;
  const players = Object.values(squadPlayers);
  const myName  = authUser?.username || authUser?.email;

  el.innerHTML = `
    <div onclick="toggleSquadWidget()" style="padding:9px 13px;display:flex;align-items:center;gap:8px;cursor:pointer;border-bottom:1px solid #1a2530;user-select:none">
      <div style="width:7px;height:7px;border-radius:50%;background:${sessionCode?'#39ff14':'#4a6070'};flex-shrink:0;${sessionCode?'box-shadow:0 0 5px #39ff14':''}"></div>
      <span style="font-family:'Orbitron',monospace;font-size:9px;color:#c8d8e8;letter-spacing:1px">SQUAD</span>
      ${sessionCode ? `<span style="font-family:'Orbitron',monospace;font-size:9px;color:#00e5ff;letter-spacing:2px">${sessionCode}</span>` : ''}
      ${players.length ? `<span style="font-size:8px;padding:1px 5px;background:#1a2530;color:#4a6070;margin-left:auto">${players.length}</span>` : `<span style="margin-left:auto"></span>`}
      <span id="sq-chevron" style="color:#4a6070;font-size:9px">${widgetOpen?"▲":"▼"}</span>
    </div>
    <div id="squad-widget-body" style="padding:10px 12px;font-size:9px;display:${widgetOpen?'block':'none'}">
      ${!authUser ? `
        <div style="color:#4a6070;font-size:9px;margin-bottom:10px;line-height:1.6">Sign in to create or join a squad and share builds live.</div>
        <button class="sq-btn" style="border-color:#39ff14;color:#39ff14" onclick="openAuthModal('login')">SIGN IN TO USE SQUAD</button>
      ` : !sessionCode ? `
        <div style="color:#4a6070;font-size:9px;margin-bottom:10px;line-height:1.6">Create or join a session to see your team's builds side-by-side.</div>
        <button class="sq-btn" style="border-color:#39ff14;color:#39ff14" onclick="squadCreate()">+ CREATE SESSION</button>
        <div style="display:flex;gap:5px;margin-top:7px">
          <input id="sq-join-input" class="sq-input" placeholder="6-char code" maxlength="6" style="flex:1;text-transform:uppercase" oninput="this.value=this.value.toUpperCase()">
          <button class="sq-btn" onclick="squadJoin(document.getElementById('sq-join-input').value)" style="width:auto;padding:0 10px;flex-shrink:0">JOIN</button>
        </div>
      ` : `
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
          <span style="font-family:'Orbitron',monospace;font-size:12px;color:#00e5ff;letter-spacing:3px">${sessionCode}</span>
          <button id="sq-copy-btn" class="sq-btn" onclick="copyInviteLink()" style="width:auto;padding:2px 8px;font-size:8px;margin:0">📋 COPY LINK</button>
        </div>
        <div>
          ${players.map(p=>{
            const isMe = p.player_name===myName;
            const ago  = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
            const live = ago < 8;
            return `<div class="sq-player">
              <div style="width:7px;height:7px;border-radius:50%;flex-shrink:0;background:${isMe?'#00e5ff':live?'#39ff14':'#4a6070'}"></div>
              <span style="font-size:9px;color:${isMe?'#00e5ff':'#c8d8e8'}">${p.player_name}</span>
              ${isMe?'<span style="font-size:7px;padding:1px 4px;border:1px solid #00e5ff;color:#00e5ff;margin-left:auto">YOU</span>'
                    :`<span style="font-size:7px;color:#4a6070;margin-left:auto">${live?"live":ago+"s ago"}</span>`}
            </div>`;
          }).join("")}
        </div>
        <button class="sq-btn" onclick="showMain('squad')" style="margin-top:8px;border-color:#00e5ff;color:#00e5ff">VIEW SQUAD BUILDS →</button>
        <button class="sq-btn" onclick="squadLeave()" style="border-color:#ff006e;color:#ff006e">LEAVE SESSION</button>
      `}
    </div>`;
}

function toggleSquadWidget() {
  widgetOpen = !widgetOpen;
  const body    = document.getElementById("squad-widget-body");
  const chevron = document.getElementById("sq-chevron");
  if (body)    body.style.display = widgetOpen ? "block" : "none";
  if (chevron) chevron.textContent = widgetOpen ? "▲" : "▼";
}

// ══════════════════════════════════════════
// SQUAD PAGE — side-by-side builds
// ══════════════════════════════════════════
function renderSquadPage() {
  const el = document.getElementById("sqv");
  if (!el) return;

  if (!authUser) {
    el.innerHTML = `<div style="padding:48px 40px;max-width:560px;margin:0 auto;text-align:center">
      <div style="font-size:48px;margin-bottom:16px">👥</div>
      <div style="font-family:'Orbitron',monospace;font-size:16px;color:#00e5ff;letter-spacing:3px;margin-bottom:12px">SQUAD SESSIONS</div>
      <div style="color:#4a6070;font-size:10px;line-height:1.9;margin-bottom:24px">
        Sign in to create a squad session.<br>
        Share a link — your whole team's builds appear here, updating live every 3 seconds.<br>
        Click any teammate to see their full faction build alongside yours.
      </div>
      <button class="btn bb" onclick="openAuthModal('login')" style="margin-right:10px">SIGN IN</button>
      <button class="btn bg" onclick="openAuthModal('signup')">CREATE ACCOUNT</button>
    </div>`;
    return;
  }

  if (!sessionCode) {
    el.innerHTML = `<div style="padding:48px 40px;max-width:560px;margin:0 auto;text-align:center">
      <div style="font-size:48px;margin-bottom:16px">👥</div>
      <div style="font-family:'Orbitron',monospace;font-size:16px;color:#00e5ff;letter-spacing:3px;margin-bottom:12px">SQUAD SESSIONS</div>
      <div style="color:#4a6070;font-size:10px;line-height:1.9;margin-bottom:24px">
        Signed in as <span style="color:#00e5ff">${authUser.username}</span>.<br>
        Create a session and share the link — everyone's builds appear here live.
      </div>
      <button class="btn bg" onclick="squadCreate()" style="margin-right:10px">+ CREATE SESSION</button>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:16px">
        <input id="sq-page-join" class="sinput" placeholder="6-char session code" maxlength="6" style="width:180px;text-align:center;letter-spacing:3px;text-transform:uppercase" oninput="this.value=this.value.toUpperCase()">
        <button class="btn bb" onclick="squadJoin(document.getElementById('sq-page-join').value)">JOIN →</button>
      </div>
    </div>`;
    return;
  }

  const players = Object.values(squadPlayers);
  const myName  = authUser.username || authUser.email;

  el.innerHTML = `
    <div style="padding:13px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;flex-wrap:wrap;position:sticky;top:0;background:#070d12;z-index:10">
      <div style="font-family:'Orbitron',monospace;font-size:14px;color:#00e5ff;letter-spacing:3px">👥 SQUAD</div>
      <div style="font-family:'Orbitron',monospace;font-size:14px;color:#ffd600;letter-spacing:3px">${sessionCode}</div>
      <div style="width:8px;height:8px;border-radius:50%;background:#39ff14;box-shadow:0 0 5px #39ff14"></div>
      <span style="font-size:9px;color:#39ff14">LIVE</span>
      <span style="font-size:9px;color:#4a6070">${players.length} player${players.length!==1?"s":""} · updates every 3s</span>
      <button id="sq-copy-btn" onclick="copyInviteLink()" class="btn bb" style="font-size:9px;padding:4px 10px;margin-left:auto">📋 COPY INVITE LINK</button>
      <button onclick="squadLeave()" class="btn br" style="font-size:9px;padding:4px 10px">LEAVE</button>
    </div>

    <!-- Player tab bar -->
    <div style="display:flex;border-bottom:1px solid #1a2530;overflow-x:auto;background:rgba(0,0,0,.2);flex-shrink:0">
      <button onclick="squadViewTab=null;renderSquadPage()" style="padding:11px 18px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:10px;color:${squadViewTab===null?'#fff':'#4a6070'};border-bottom:2px solid ${squadViewTab===null?'#ffd600':'transparent'};white-space:nowrap;transition:all .2s;letter-spacing:1px">OVERVIEW</button>
      ${players.map(p=>{
        const isMe   = p.player_name===myName;
        const ago    = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
        const live   = ago < 8;
        const active = squadViewTab===p.player_name;
        return `<button onclick="squadViewTab='${p.player_name}';renderSquadPage()" style="padding:11px 18px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:10px;display:flex;align-items:center;gap:6px;color:${active?'#fff':'#4a6070'};border-bottom:2px solid ${active?'#00e5ff':'transparent'};white-space:nowrap;transition:all .2s;letter-spacing:1px">
          <div style="width:6px;height:6px;border-radius:50%;background:${isMe?'#00e5ff':live?'#39ff14':'#4a6070'}"></div>
          ${p.player_name}${isMe?" <span style='font-size:7px;color:#00e5ff'>(YOU)</span>":""}
        </button>`;
      }).join("")}
    </div>

    <div style="padding:16px 20px;overflow-y:auto">
      ${squadViewTab===null ? _renderOverview(players,myName) : _renderPlayerDetail(squadViewTab,myName)}
    </div>`;
}

function _renderOverview(players, myName) {
  if (!players.length) return `<div style="color:#4a6070;text-align:center;padding:48px;font-size:11px">
    Waiting for players to join…<br><span style="font-size:9px;margin-top:8px;display:block">Share the invite link from the header above</span>
  </div>`;

  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">
    ${players.map(p=>_playerMiniCard(p, p.player_name===myName)).join("")}
  </div>`;
}

function _playerMiniCard(p, isMe) {
  const fd   = p.faction_data || {};
  const pLV  = fd.LV || {};
  const pPL  = fd.PL || {};
  const owned   = UG.filter(u=>(pLV[u.id]||0)>0);
  const planned = UG.filter(u=>(pPL[u.id]||0)>0&&!(pLV[u.id]||0));
  const totalC  = owned.reduce((s,u)=>{ let c=0; for(let i=0;i<pLV[u.id];i++) c+=u.levels[i].credits; return s+c; },0);
  const ago     = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
  const live    = ago < 8;

  const fBars = Object.keys(FC).map(f=>{
    const fa = owned.filter(u=>u.f===f);
    if (!fa.length) return "";
    const tot    = UG.filter(u=>u.f===f).reduce((s,u)=>s+u.levels.length,0);
    const lvs    = fa.reduce((s,u)=>s+(pLV[u.id]||0),0);
    const pct    = Math.round(lvs/tot*100);
    return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
      <div style="font-size:7.5px;color:${FC[f].color};width:64px;flex-shrink:0;font-family:'Orbitron',monospace;overflow:hidden;white-space:nowrap">${f.substring(0,7)}</div>
      <div style="flex:1;height:4px;background:#1a2530;border-radius:2px">
        <div style="height:100%;width:${pct}%;background:${FC[f].color};border-radius:2px"></div>
      </div>
      <div style="font-size:7px;color:#4a6070;width:26px;text-align:right">${pct}%</div>
    </div>`;
  }).filter(Boolean).join("");

  return `<div onclick="squadViewTab='${p.player_name}';renderSquadPage()"
    style="background:#0d1318;border:1px solid ${isMe?'#00e5ff':'#1a2530'};border-top:3px solid ${isMe?'#00e5ff':'#2a3a48'};padding:14px;cursor:pointer;transition:all .2s"
    onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 16px rgba(0,0,0,.5)'"
    onmouseleave="this.style.transform='';this.style.boxShadow=''">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <div style="font-family:'Orbitron',monospace;font-size:11px;color:${isMe?'#00e5ff':'#c8d8e8'};flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.player_name}</div>
      ${isMe?'<span style="font-size:7px;padding:1px 5px;border:1px solid #00e5ff;color:#00e5ff">YOU</span>':''}
      <div style="width:7px;height:7px;border-radius:50%;background:${live?'#39ff14':'#4a6070'};flex-shrink:0"></div>
    </div>
    <div style="display:flex;gap:14px;margin-bottom:10px;font-size:9.5px">
      <span style="color:#ffd600">₵${totalC.toLocaleString()}</span>
      <span style="color:#39ff14">${owned.length} owned</span>
      ${planned.length?`<span style="color:#bf5af2">${planned.length} planned</span>`:""}
      <span style="color:#4a6070;margin-left:auto">${ago<60?ago+"s":Math.floor(ago/60)+"m"}</span>
    </div>
    ${fBars}
    <div style="margin-top:10px;font-size:8px;color:#4a6070;letter-spacing:1px;text-align:center">CLICK FOR FULL BUILD →</div>
  </div>`;
}

function _renderPlayerDetail(playerName, myName) {
  const p = squadPlayers[playerName];
  if (!p) return `<div style="color:#4a6070">Player not found</div>`;
  const fd   = p.faction_data || {};
  const pLV  = fd.LV || {};
  const pPL  = fd.PL || {};
  const owned   = UG.filter(u=>(pLV[u.id]||0)>0);
  const planned = UG.filter(u=>(pPL[u.id]||0)>0&&!(pLV[u.id]||0));
  const totalC  = owned.reduce((s,u)=>{ let c=0; for(let i=0;i<pLV[u.id];i++) c+=u.levels[i].credits; return s+c; },0);
  const isMe    = playerName===myName;
  const ago     = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div style="font-family:'Orbitron',monospace;font-size:16px;color:${isMe?'#00e5ff':'#c8d8e8'}">${playerName}${isMe?" <span style='font-size:10px;color:#00e5ff'>(YOU)</span>":""}</div>
      <span style="font-size:11px;color:#ffd600">₵${totalC.toLocaleString()}</span>
      <span style="font-size:11px;color:#39ff14">${owned.length} owned</span>
      ${planned.length?`<span style="font-size:11px;color:#bf5af2">${planned.length} planned</span>`:""}
      <span style="font-size:9px;color:#4a6070;margin-left:auto">Updated ${ago}s ago</span>
    </div>

    ${Object.keys(FC).map(f=>{
      const fa = owned.filter(u=>u.f===f);
      const fp = planned.filter(u=>u.f===f);
      if (!fa.length&&!fp.length) return "";
      const fc  = FC[f];
      const tot = UG.filter(u=>u.f===f).reduce((s,u)=>s+u.levels.length,0);
      const lvs = fa.reduce((s,u)=>s+(pLV[u.id]||0),0);
      const pct = Math.round(lvs/tot*100);
      return `<div style="background:#0d1318;border:1px solid #1a2530;border-left:3px solid ${fc.color};padding:12px 14px;margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="font-family:'Orbitron',monospace;font-size:11px;color:${fc.color};letter-spacing:2px">${f}</div>
          <div style="flex:1;height:3px;background:#1a2530;border-radius:2px">
            <div style="height:100%;width:${pct}%;background:${fc.color};border-radius:2px"></div>
          </div>
          <div style="font-size:9px;color:#4a6070">${pct}%</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">
          ${fa.map(u=>`<span style="font-size:9.5px;padding:3px 9px;border:1px solid ${fc.color};color:${fc.color};background:${fc.color}11">${u.name}${pLV[u.id]>1?` Lv${pLV[u.id]}`:""}</span>`).join("")}
          ${fp.map(u=>`<span style="font-size:9.5px;padding:3px 9px;border:1px solid #bf5af2;color:#bf5af2;background:#bf5af211">${u.name}${pPL[u.id]>1?` Lv${pPL[u.id]}`:""} ◈</span>`).join("")}
        </div>
      </div>`;
    }).join("")}
    ${!owned.length&&!planned.length?`<div style="color:#4a6070;font-size:11px;padding:20px 0">No upgrades selected yet</div>`:""}`;
}

// ══════════════════════════════════════════
// REFRESH OVERRIDE — push to profile + squad
// ══════════════════════════════════════════
// Wrap the existing refresh so every build change auto-saves
const _baseRefresh = window.refresh;
window.refresh = function() {
  renderCurrent();
  updateHdr();
  if (authUser)    pushProfile();
  if (sessionCode) _squadPushData();
};
