// ══════════════════════════════════════════
// DASHBOARD — Home tab
// ══════════════════════════════════════════

let dashRunner = null; // currently selected runner on dashboard

function renderDashboard() {
  const el = document.getElementById("view-home");
  if (!el) return;

  const totalLvs    = getActives().reduce((s,u)=>s+LV[u.id],0);
  const maxLvs      = UG.reduce((s,u)=>s+u.levels.length,0);
  const pct         = maxLvs ? Math.round(totalLvs/maxLvs*100) : 0;
  const plannedCost = getTotalCredsPlanned();
  const ownedCost   = getTotalCreds();

  // Faction progress
  const factions = Object.keys(FC);
  const factionRows = factions.map(f=>{
    const fu = UG.filter(u=>u.faction===f);
    const max = fu.reduce((s,u)=>s+u.levels.length,0);
    const own = fu.reduce((s,u)=>s+LV[u.id],0);
    const p   = max ? Math.round(own/max*100) : 0;
    const col = FC[f].color;
    return `<div class="faction-progress-row">
      <span class="fp-name" style="color:${col}">${f.replace("CyberAcme","CYBER").replace("NuCaloric","NUCAL").replace("Arachne","ARACH").replace("SekGen","SEKGEN")}</span>
      <div class="fp-bar"><div class="fp-fill" style="width:${p}%;background:${col}"></div></div>
      <span class="fp-pct">${p}%</span>
    </div>`;
  }).join("");

  // Next recommended upgrades (not yet owned, dependency met)
  const nextUps = REC
    .map(id=>UG.find(u=>u.id===id))
    .filter(u=>u && LV[u.id]===0 && canUnlock(u))
    .slice(0,5);
  const nextHtml = nextUps.length
    ? nextUps.map((u,i)=>{
        const cost = u.levels[0]?.credits||0;
        const fc   = FC[u.faction];
        return `<div class="next-up-item" onclick="showMain('tree');setTimeout(()=>setF('${u.faction}'),80)" title="Go to ${u.faction} tree">
          <span class="next-up-num">${i+1}</span>
          <span class="next-up-name">${u.name}</span>
          <span class="bv-f" style="border-color:${fc.color};color:${fc.color}">${u.faction.slice(0,5).toUpperCase()}</span>
          <span class="next-up-cost">₵${cost.toLocaleString()}</span>
        </div>`;
      }).join("")
    : `<div style="color:var(--text-dead);padding:20px 0;text-align:center;font-size:.82rem">All recommended upgrades unlocked ✓</div>`;

  // Runner selector
  const runnerHtml = (dashRunner ? RUNNERS : RUNNERS).map(r=>{
    const active = dashRunner===r.id;
    const tierCol = {S:"#39ff14",A:"#00e5ff",B:"#ffd600",C:"#ff6d00"}[r.tier]||"#fff";
    return `<button class="runner-btn ${active?"active":""}" onclick="selectDashRunner('${r.id}')"
      style="${active?`border-color:${r.color};background:rgba(0,0,0,.3);`:""}">
      <span class="r-icon">${r.icon}</span>
      <span class="r-name" style="${active?`color:${r.color}`:""}">${r.name}</span>
      <span class="r-tier" style="color:${tierCol}">${r.tier}-TIER</span>
    </button>`;
  }).join("");

  // Runner detail card
  let runnerDetail = "";
  if (dashRunner) {
    const r = RUNNERS.find(x=>x.id===dashRunner);
    if (r) {
      const tierCol = {S:"#39ff14",A:"#00e5ff",B:"#ffd600",C:"#ff6d00"}[r.tier]||"#fff";
      runnerDetail = `
      <div class="dash-card" style="border-top:3px solid ${r.color};margin-top:16px">
        <div class="dash-card-title" style="color:${r.color}">${r.icon} ${r.name} — ${r.role}</div>
        <div style="font-size:.82rem;color:var(--text-dim);line-height:1.7;margin-bottom:14px">${r.playstyle}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;font-size:.78rem">
          <div style="padding:8px;background:var(--bg2);border:1px solid var(--border)">
            <div style="color:var(--text-dead);font-size:.65rem;letter-spacing:1px;margin-bottom:3px">SOLO</div>
            <div>${r.solo}</div>
          </div>
          <div style="padding:8px;background:var(--bg2);border:1px solid var(--border)">
            <div style="color:var(--text-dead);font-size:.65rem;letter-spacing:1px;margin-bottom:3px">SQUAD</div>
            <div>${r.squad}</div>
          </div>
        </div>
        <div style="font-size:.78rem;color:var(--text-dim);margin-bottom:12px">
          <span style="color:var(--text-dead);letter-spacing:1px;font-size:.65rem">PRIME ABILITY</span><br>
          ${r.prime}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn bc" onclick="loadRunnerBuild('${r.id}');showMain('tree')" style="font-size:.75rem">LOAD BUILD INTO TREE →</button>
          <button class="btn" style="border-color:var(--border2);color:var(--text-dim);font-size:.75rem" onclick="showMain('runners')">FULL DETAILS</button>
        </div>
      </div>`;
    }
  }

  el.innerHTML = `<div class="dash-wrap">
    <div class="dash-greeting">MARATHON // TRACKER</div>
    <div class="dash-sub">Track upgrades, plan your build, coordinate with your squad.</div>

    <div class="dash-grid">
      <!-- Your Progress -->
      <div class="dash-card">
        <div class="dash-card-title">Your Progress</div>
        <div class="dash-stat-row">
          <span class="dash-stat-big" style="color:var(--green)">${totalLvs}</span>
          <span class="dash-stat-unit">/ ${maxLvs} levels unlocked</span>
        </div>
        <div style="height:5px;background:var(--border);border-radius:3px;margin:10px 0 14px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--cyan),var(--green));border-radius:3px;transition:width .5s"></div>
        </div>
        ${factionRows}
        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn bc" style="font-size:.75rem" onclick="showMain('tree')">UPGRADE TREE →</button>
          <button class="btn" style="border-color:var(--border2);color:var(--text-dim);font-size:.75rem" onclick="showMain('progress')">PROGRESS DETAIL</button>
        </div>
      </div>

      <!-- Next Recommended -->
      <div class="dash-card">
        <div class="dash-card-title">⚡ Next Recommended Upgrades</div>
        ${nextHtml}
        <div style="margin-top:10px">
          <button class="btn" style="border-color:var(--border2);color:var(--text-dim);font-size:.75rem;width:100%" onclick="showMain('tree');setTimeout(()=>{renderTree();},80)">
            SHOW ALL ON TREE
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="dash-card">
        <div class="dash-card-title">Credits & Materials</div>
        <div class="dash-stat-row" style="margin-bottom:4px">
          <span class="dash-stat-big" style="color:var(--yellow)">₵${ownedCost.toLocaleString()}</span>
          <span class="dash-stat-unit">spent</span>
        </div>
        <div style="font-size:.78rem;color:var(--text-dim);margin-bottom:16px">
          ₵${plannedCost.toLocaleString()} planned additional
        </div>
        <div style="font-size:.78rem;color:var(--text-dead);letter-spacing:1px;margin-bottom:8px">MATERIALS NEEDED</div>
        ${(()=>{
          const plan = getSalvMapPlanned();
          if(!plan.length) return `<div style="color:var(--text-dead);font-size:.8rem">Plan upgrades in the tree to see materials needed.</div>`;
          return plan.slice(0,6).map(([item,qty])=>{
            const loc=SL[item];
            const rc=loc?RC[loc.rarity]:"#4a6070";
            return `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:.8rem">
              <span style="color:${rc}">◈ ${item}</span>
              <span style="color:var(--purple)">×${qty}</span>
            </div>`;
          }).join("")
          + (plan.length>6?`<div style="font-size:.72rem;color:var(--text-dead);margin-top:6px">+${plan.length-6} more — <span style="cursor:pointer;color:var(--cyan)" onclick="showMain('progress')">see full list</span></div>`:"");
        })()}
        <div style="margin-top:14px">
          <button class="btn" style="border-color:var(--border2);color:var(--text-dim);font-size:.75rem;width:100%" onclick="showMain('progress')">FULL MATERIALS LIST →</button>
        </div>
      </div>
    </div>

    <!-- Runner picker -->
    <div class="dash-card" style="margin-bottom:16px">
      <div class="dash-card-title">Choose Your Runner</div>
      <div class="runner-pick">${runnerHtml}</div>
      ${runnerDetail}
    </div>

    <!-- Quick nav row -->
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      ${[
        {tab:"runners",label:"🏃 Runner Builds",col:"var(--cyan)"},
        {tab:"guns",label:"🔫 Guns & Items",col:"var(--yellow)"},
        {tab:"map",label:"🗺️ Map",col:"var(--green)"},
        {tab:"tools",label:"📊 Run Tracker",col:"var(--orange)"},
        {tab:"squad",label:"👥 Squad",col:"var(--purple)"},
      ].map(x=>`<button class="btn" style="border-color:var(--border2);color:var(--text-dim);font-size:.8rem;flex:1;min-width:120px" onclick="showMain('${x.tab}')"><span style="color:${x.col}">${x.label}</span></button>`).join("")}
    </div>
  </div>`;
}

function selectDashRunner(id) {
  dashRunner = dashRunner === id ? null : id;
  renderDashboard();
}
