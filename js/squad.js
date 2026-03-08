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
    el.innerHTML = `<div style="padding:60px 40px;max-width:580px;margin:0 auto;text-align:center">
      <div style="font-size:52px;margin-bottom:20px">👥</div>
      <div style="font-family:'Orbitron',monospace;font-size:18px;color:#00e5ff;letter-spacing:3px;margin-bottom:14px">SQUAD SESSIONS</div>
      <div style="color:#5a7080;font-size:12px;line-height:2;margin-bottom:28px">
        Sign in to create a squad session.<br>
        Share a link — your whole team's builds appear here, side by side in real time.<br>
        See every teammate's faction progress, owned upgrades, and planned builds at a glance.
      </div>
      <button class="btn bb" onclick="openAuthModal('login')" style="margin-right:10px">SIGN IN</button>
      <button class="btn bg" onclick="openAuthModal('signup')">CREATE ACCOUNT</button>
    </div>`;
    return;
  }

  if (!sessionCode) {
    el.innerHTML = `<div style="padding:60px 40px;max-width:580px;margin:0 auto;text-align:center">
      <div style="font-size:52px;margin-bottom:20px">👥</div>
      <div style="font-family:'Orbitron',monospace;font-size:18px;color:#00e5ff;letter-spacing:3px;margin-bottom:14px">SQUAD SESSIONS</div>
      <div style="color:#5a7080;font-size:12px;line-height:2;margin-bottom:28px">
        Signed in as <span style="color:#00e5ff;font-weight:700">${authUser.username}</span>.<br>
        Create a session and share the link with your squad.<br>
        Everyone who joins has their build synced here — compare upgrades side by side.
      </div>
      <button class="btn bg" onclick="squadCreate()" style="margin-right:10px;font-size:12px;padding:9px 20px">+ CREATE SESSION</button>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:20px;max-width:340px;margin-left:auto;margin-right:auto">
        <input id="sq-page-join" class="sinput" placeholder="Enter 6-char session code" maxlength="6"
          style="text-align:center;letter-spacing:4px;text-transform:uppercase;margin-bottom:0"
          oninput="this.value=this.value.toUpperCase()">
        <button class="btn bb" onclick="squadJoin(document.getElementById('sq-page-join').value)" style="white-space:nowrap">JOIN →</button>
      </div>
    </div>`;
    return;
  }

  const players = Object.values(squadPlayers);
  const myName  = authUser.username || authUser.email;

  el.innerHTML = `
    <div style="padding:13px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;flex-wrap:wrap;position:sticky;top:0;background:#070d12;z-index:10">
      <div style="font-family:'Orbitron',monospace;font-size:14px;color:#00e5ff;letter-spacing:3px">👥 SQUAD</div>
      <div style="font-family:'Orbitron',monospace;font-size:14px;color:#ffd600;letter-spacing:4px">${sessionCode}</div>
      <div style="display:flex;align-items:center;gap:5px">
        <div style="width:7px;height:7px;border-radius:50%;background:#39ff14;box-shadow:0 0 6px #39ff14"></div>
        <span style="font-size:11px;color:#39ff14">LIVE</span>
        <span style="font-size:11px;color:#4a6070;margin-left:4px">${players.length} player${players.length!==1?"s":""}</span>
      </div>
      <button id="sq-copy-btn" onclick="copyInviteLink()" class="btn bb" style="margin-left:auto">📋 INVITE LINK</button>
      <button onclick="squadLeave()" class="btn br">LEAVE SESSION</button>
    </div>

    <div style="display:flex;border-bottom:1px solid #1a2530;overflow-x:auto;background:rgba(0,0,0,.2)">
      <button onclick="squadViewTab=null;renderSquadPage()"
        style="padding:12px 20px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:1px;
               color:${squadViewTab===null?'#fff':'#4a6070'};border-bottom:2px solid ${squadViewTab===null?'#ffd600':'transparent'};white-space:nowrap;transition:all .2s">
        ⊞ OVERVIEW
      </button>
      <button onclick="squadViewTab='compare';renderSquadPage()"
        style="padding:12px 20px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:1px;
               color:${squadViewTab==='compare'?'#fff':'#4a6070'};border-bottom:2px solid ${squadViewTab==='compare'?'#39ff14':'transparent'};white-space:nowrap;transition:all .2s">
        ⇄ SIDE BY SIDE
      </button>
      ${players.map(p=>{
        const isMe   = p.player_name===myName;
        const ago    = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
        const live   = ago < 8;
        const active = squadViewTab===p.player_name;
        return `<button onclick="squadViewTab='${p.player_name}';renderSquadPage()"
          style="padding:12px 20px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:12px;
                 display:flex;align-items:center;gap:7px;color:${active?'#fff':'#4a6070'};
                 border-bottom:2px solid ${active?'#00e5ff':'transparent'};white-space:nowrap;transition:all .2s;letter-spacing:1px">
          <div style="width:7px;height:7px;border-radius:50%;background:${isMe?'#00e5ff':live?'#39ff14':'#4a6070'};flex-shrink:0"></div>
          ${p.player_name}${isMe?" <span style='font-size:9px;color:#00e5ff;border:1px solid #00e5ff;padding:0 4px;margin-left:3px'>YOU</span>":""}
        </button>`;
      }).join("")}
    </div>

    <div style="overflow-y:auto">
      ${squadViewTab===null ? _renderOverview(players,myName) :
        squadViewTab==='compare' ? _renderSideBySide(players,myName) :
        _renderPlayerDetail(squadViewTab,myName)}
    </div>`;
}

function _renderOverview(players, myName) {
  if (!players.length) return `<div style="color:#4a6070;text-align:center;padding:60px;font-size:13px">
    Waiting for players to join…<br>
    <span style="font-size:11px;margin-top:10px;display:block">Share the invite link to bring your squad in</span>
  </div>`;

  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px;padding:18px 20px">
    ${players.map(p=>_playerMiniCard(p, p.player_name===myName)).join("")}
  </div>`;
}

function _renderSideBySide(players, myName) {
  if (players.length < 2) return `<div style="color:#4a6070;text-align:center;padding:60px;font-size:12px">
    Need at least 2 players in session to compare builds side by side.
  </div>`;

  // Show all players' faction progress side by side
  const factionKeys = Object.keys(FC);

  return `
    <div style="padding:16px 20px">
      <div style="font-size:11px;color:#4a6070;margin-bottom:14px;letter-spacing:1px">
        COMPARING ${players.length} BUILDS · Faction completion bars shown side by side
      </div>

      <!-- Player summary row -->
      <div style="display:grid;grid-template-columns:130px repeat(${players.length}, 1fr);gap:0;margin-bottom:16px;border:1px solid #1a2530">
        <div style="padding:11px 13px;background:#0a1218;border-right:1px solid #1a2530;font-size:10px;color:#4a6070;display:flex;align-items:center">PLAYER</div>
        ${players.map(p=>{
          const isMe = p.player_name===myName;
          const fd   = p.faction_data||{};
          const pLV  = fd.LV||{};
          const owned = UG.filter(u=>(pLV[u.id]||0)>0);
          const totalC = owned.reduce((s,u)=>{let c=0;for(let i=0;i<pLV[u.id];i++)c+=u.levels[i].credits;return s+c;},0);
          const ago    = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
          const live   = ago < 8;
          return `<div style="padding:11px 13px;background:${isMe?'rgba(0,229,255,.04)':'#0d1318'};border-right:1px solid #1a2530;border-left:${isMe?'2px solid #00e5ff':'none'}">
            <div style="font-family:'Orbitron',monospace;font-size:11px;color:${isMe?'#00e5ff':'#c8d8e8'};margin-bottom:5px;display:flex;align-items:center;gap:6px">
              <div style="width:6px;height:6px;border-radius:50%;background:${live?'#39ff14':'#4a6070'};flex-shrink:0"></div>
              ${p.player_name}
            </div>
            <div style="font-size:11px;color:#ffd600">₵${totalC.toLocaleString()}</div>
            <div style="font-size:10px;color:#39ff14">${owned.length} upgrades</div>
          </div>`;
        }).join("")}
      </div>

      <!-- Faction comparison rows -->
      ${factionKeys.map(f=>{
        const fc = FC[f];
        const tot = UG.filter(u=>u.f===f).reduce((s,u)=>s+u.levels.length,0);
        if (!tot) return "";

        // Check if any player has this faction
        const anyHas = players.some(p=>{
          const pLV = (p.faction_data||{}).LV||{};
          return UG.filter(u=>u.f===f).some(u=>(pLV[u.id]||0)>0);
        });

        return `<div style="border:1px solid #1a2530;margin-bottom:8px">
          <div style="display:grid;grid-template-columns:130px repeat(${players.length}, 1fr);gap:0">
            <div style="padding:10px 13px;background:#0a1218;border-right:1px solid #1a2530;border-left:3px solid ${fc.color};display:flex;align-items:center">
              <div style="font-family:'Orbitron',monospace;font-size:10px;color:${fc.color};letter-spacing:1px">${f}</div>
            </div>
            ${players.map((p,pi)=>{
              const fd   = p.faction_data||{};
              const pLV  = fd.LV||{};
              const pPL  = fd.PL||{};
              const fa   = UG.filter(u=>u.f===f&&(pLV[u.id]||0)>0);
              const fp   = UG.filter(u=>u.f===f&&(pPL[u.id]||0)>0&&!(pLV[u.id]||0));
              const lvs  = fa.reduce((s,u)=>s+(pLV[u.id]||0),0);
              const pct  = Math.round(lvs/tot*100);
              const isMe = p.player_name===myName;
              return `<div style="padding:10px 13px;border-right:1px solid #1a2530;background:${isMe?'rgba(0,229,255,.02)':'transparent'}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
                  <div style="flex:1;height:5px;background:#1a2530;border-radius:3px">
                    <div style="height:100%;width:${pct}%;background:${fc.color};border-radius:3px;transition:width .4s"></div>
                  </div>
                  <div style="font-size:10px;color:${pct>0?fc.color:'#2a3a48'};width:32px;text-align:right;font-weight:700">${pct}%</div>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:3px">
                  ${fa.map(u=>`<span style="font-size:9px;padding:1px 6px;border:1px solid ${fc.color}22;color:${fc.color};background:${fc.color}11">${u.name}</span>`).join("")}
                  ${fp.map(u=>`<span style="font-size:9px;padding:1px 6px;border:1px solid #bf5af222;color:#bf5af2;background:#bf5af211">${u.name} ◈</span>`).join("")}
                  ${!fa.length&&!fp.length?`<span style="font-size:9px;color:#2a3a48">—</span>`:""}
                </div>
              </div>`;
            }).join("")}
          </div>
        </div>`;
      }).join("")}
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
    const tot = UG.filter(u=>u.f===f).reduce((s,u)=>s+u.levels.length,0);
    const lvs = fa.reduce((s,u)=>s+(pLV[u.id]||0),0);
    const pct = Math.round(lvs/tot*100);
    return `<div style="display:flex;align-items:center;gap:7px;margin-bottom:4px">
      <div style="font-size:9px;color:${FC[f].color};width:68px;flex-shrink:0;font-family:'Orbitron',monospace;overflow:hidden;white-space:nowrap">${f.substring(0,8)}</div>
      <div style="flex:1;height:4px;background:#1a2530;border-radius:2px">
        <div style="height:100%;width:${pct}%;background:${FC[f].color};border-radius:2px"></div>
      </div>
      <div style="font-size:9px;color:#4a6070;width:28px;text-align:right">${pct}%</div>
    </div>`;
  }).filter(Boolean).join("");

  return `<div onclick="squadViewTab='${p.player_name}';renderSquadPage()"
    style="background:#0d1318;border:1px solid ${isMe?'#00e5ff':'#1a2530'};border-top:3px solid ${isMe?'#00e5ff':'#2a3a48'};padding:16px;cursor:pointer;transition:all .2s"
    onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 16px rgba(0,0,0,.5)'"
    onmouseleave="this.style.transform='';this.style.boxShadow=''">
    <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px">
      <div style="width:8px;height:8px;border-radius:50%;background:${live?'#39ff14':'#4a6070'};flex-shrink:0;box-shadow:${live?'0 0 6px #39ff14':'none'}"></div>
      <div style="font-family:'Orbitron',monospace;font-size:12px;color:${isMe?'#00e5ff':'#c8d8e8'};flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.player_name}</div>
      ${isMe?'<span style="font-size:9px;padding:1px 6px;border:1px solid #00e5ff;color:#00e5ff">YOU</span>':''}
    </div>
    <div style="display:flex;gap:14px;margin-bottom:11px;font-size:11px">
      <span style="color:#ffd600">₵${totalC.toLocaleString()}</span>
      <span style="color:#39ff14">${owned.length} owned</span>
      ${planned.length?`<span style="color:#bf5af2">${planned.length} planned</span>`:""}
      <span style="color:#4a6070;margin-left:auto">${ago<60?ago+"s":Math.floor(ago/60)+"m"} ago</span>
    </div>
    ${fBars}
    <div style="margin-top:11px;font-size:10px;color:#4a6070;letter-spacing:1px;text-align:center;border-top:1px solid #1a2530;padding-top:8px">CLICK FOR FULL BUILD →</div>
  </div>`;
}

function _renderPlayerDetail(playerName, myName) {
  const p = squadPlayers[playerName];
  if (!p) return `<div style="color:#4a6070;padding:40px;text-align:center">Player not found</div>`;
  const fd   = p.faction_data || {};
  const pLV  = fd.LV || {};
  const pPL  = fd.PL || {};
  const owned   = UG.filter(u=>(pLV[u.id]||0)>0);
  const planned = UG.filter(u=>(pPL[u.id]||0)>0&&!(pLV[u.id]||0));
  const totalC  = owned.reduce((s,u)=>{ let c=0; for(let i=0;i<pLV[u.id];i++) c+=u.levels[i].credits; return s+c; },0);
  const isMe    = playerName===myName;
  const ago     = Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
  const live    = ago < 8;

  return `
    <div style="padding:18px 20px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid #1a2530">
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:10px;height:10px;border-radius:50%;background:${live?'#39ff14':'#4a6070'};box-shadow:${live?'0 0 6px #39ff14':'none'}"></div>
          <div style="font-family:'Orbitron',monospace;font-size:18px;color:${isMe?'#00e5ff':'#c8d8e8'}">${playerName}</div>
          ${isMe?'<span style="font-size:9px;padding:2px 7px;border:1px solid #00e5ff;color:#00e5ff">YOU</span>':''}
        </div>
        <div style="display:flex;gap:18px;margin-left:auto;flex-wrap:wrap">
          <div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#ffd600">₵${totalC.toLocaleString()}</div><div style="font-size:10px;color:#4a6070">INVESTED</div></div>
          <div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#39ff14">${owned.length}</div><div style="font-size:10px;color:#4a6070">OWNED</div></div>
          ${planned.length?`<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#bf5af2">${planned.length}</div><div style="font-size:10px;color:#4a6070">PLANNED</div></div>`:''}
          <div style="text-align:center"><div style="font-size:12px;color:#4a6070">${ago<60?ago+"s":Math.floor(ago/60)+"m"} ago</div><div style="font-size:10px;color:#4a6070">UPDATED</div></div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:10px">
        ${Object.keys(FC).map(f=>{
          const fa = owned.filter(u=>u.f===f);
          const fp = planned.filter(u=>u.f===f);
          if (!fa.length&&!fp.length) return "";
          const fc  = FC[f];
          const tot = UG.filter(u=>u.f===f).reduce((s,u)=>s+u.levels.length,0);
          const lvs = fa.reduce((s,u)=>s+(pLV[u.id]||0),0);
          const pct = Math.round(lvs/tot*100);
          return `<div style="background:#0d1318;border:1px solid #1a2530;border-left:3px solid ${fc.color};padding:13px 15px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <div style="font-family:'Orbitron',monospace;font-size:12px;color:${fc.color};letter-spacing:2px">${f}</div>
              <div style="flex:1;height:4px;background:#1a2530;border-radius:2px">
                <div style="height:100%;width:${pct}%;background:${fc.color};border-radius:2px"></div>
              </div>
              <div style="font-size:10px;color:#4a6070;font-weight:700">${pct}%</div>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:5px">
              ${fa.map(u=>`<span style="font-size:10px;padding:3px 9px;border:1px solid ${fc.color};color:${fc.color};background:${fc.color}11">${u.name}${pLV[u.id]>1?` Lv${pLV[u.id]}`:""}</span>`).join("")}
              ${fp.map(u=>`<span style="font-size:10px;padding:3px 9px;border:1px solid #bf5af2;color:#bf5af2;background:#bf5af211">${u.name}${pPL[u.id]>1?` Lv${pPL[u.id]}`:""} ◈</span>`).join("")}
            </div>
          </div>`;
        }).join("")}
      </div>
      ${!owned.length&&!planned.length?`<div style="color:#4a6070;font-size:12px;padding:30px;text-align:center">No upgrades selected yet</div>`:""}
    </div>`;
}


// ══════════════════════════════════════════
// SEND BUILD TO SQUAD (called from tree ctrl)
// ══════════════════════════════════════════
function sendBuildToSquad() {
  if (!sessionCode) {
    // If not in session, prompt to go to squad tab
    showMain('squad');
    return;
  }
  _squadPushData();
  const btn = document.getElementById("btn-squad-send");
  if (btn) { const o = btn.textContent; btn.textContent = "✓ SENT!"; setTimeout(()=>btn.textContent=o, 2000); }
}

// maybeSync (called by old refresh path in core.js)
function maybeSync() {
  if (authUser && sessionCode) _squadPushData();
}

// ══════════════════════════════════════════
// REFRESH OVERRIDE — push to profile + squad
// ══════════════════════════════════════════
const _baseRefresh = window.refresh;
window.refresh = function() {
  renderCurrent();
  updateHdr();
  if (authUser)    pushProfile();
  if (sessionCode) _squadPushData();
};
