// ══════════════════════════════════════════
// PROGRESS TAB — Salvage + Build + Contracts
// ══════════════════════════════════════════

let progressTab = "salvage"; // "salvage" | "build" | "contracts"

function renderProgressTab() {
  const el = document.getElementById("view-progress");
  if (!el) return;

  const salv        = getSalvMap();
  const salvPlan    = getSalvMapPlanned();
  const actives     = getActives();
  const planned     = getPlanned();
  const salvCount   = salv.length + salvPlan.length;
  const buildCount  = actives.length + planned.length;

  // Load contracts count from localStorage for badge
  let contracts = [];
  try { contracts = JSON.parse(localStorage.getItem("mara_contracts")||"[]"); } catch(e){}
  const doneContracts = contracts.filter(c=>c.done).length;

  el.innerHTML = `
    <div class="prog-tabs" id="progress-tab-bar">
      <button class="prog-tab ${progressTab==="salvage"?"on":""}" onclick="switchProgressTab('salvage')">
        ◈ MATERIALS ${salvCount?"<span style='color:var(--orange);margin-left:4px'>"+salvCount+"</span>":""}
      </button>
      <button class="prog-tab ${progressTab==="build"?"on":""}" onclick="switchProgressTab('build')">
        📋 BUILD ${buildCount?"<span style='color:var(--cyan);margin-left:4px'>"+(actives.length+planned.length)+"</span>":""}
      </button>
      <button class="prog-tab ${progressTab==="contracts"?"on":""}" onclick="switchProgressTab('contracts')">
        📋 CONTRACTS ${doneContracts?"<span style='color:var(--green);margin-left:4px'>"+doneContracts+"/"+contracts.length+"</span>":""}
      </button>
    </div>
    <div class="prog-inner" id="progress-content"></div>`;

  renderProgressContent();
}

function switchProgressTab(t) {
  progressTab = t;
  document.querySelectorAll(".prog-tab").forEach(b=>{
    const match = b.textContent.trim().startsWith(t==="salvage"?"◈":t==="build"?"📋 BUILD":"📋 CONTRACT");
    b.classList.toggle("on", b.onclick?.toString().includes(`'${t}'`));
  });
  // Re-render just the content portion
  document.querySelectorAll(".prog-tab").forEach(b=>{
    b.classList.remove("on");
    if(b.getAttribute("onclick")?.includes(`'${t}'`)) b.classList.add("on");
  });
  renderProgressContent();
}

function renderProgressContent() {
  const el = document.getElementById("progress-content");
  if (!el) return;

  if (progressTab === "salvage") {
    renderSalvInProgress(el);
  } else if (progressTab === "build") {
    renderBuildInProgress(el);
  } else {
    renderContractsInProgress(el);
  }
}

function renderSalvInProgress(el) {
  const salv     = getSalvMap();
  const salvPlan = getSalvMapPlanned();
  if (!salv.length && !salvPlan.length) {
    el.innerHTML = `<div class="sv-empty">// UNLOCK OR PLAN UPGRADES IN THE TREE FIRST //<br><br>
      <span style="font-size:.8rem;color:var(--text-dead)">Left-click = owned · Right-click = planned</span><br>
      <button class="btn bc" style="margin-top:16px;font-size:.8rem" onclick="showMain('tree')">GO TO UPGRADE TREE →</button></div>`;
    return;
  }

  const makeCards = (items, isPlan) => items.map(([item, qty]) => {
    const loc = SL[item];
    const rc  = loc ? RC[loc.rarity] : "#4a6070";
    const esc = item.replace(/'/g, "\\'");
    return `<div class="sv-card" style="border-left:3px solid ${isPlan?"var(--purple)":rc}"
      onmouseenter="showSalvTT('${esc}',event)" onmouseleave="hideTT()" onmousemove="moveTT(event)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
        <span class="sv-name" style="color:${isPlan?"var(--purple)":rc}">◈ ${item}</span>
        <span style="font-size:.9rem;font-weight:700;color:${isPlan?"var(--purple)":"var(--text)"}">×${qty}</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:.72rem">
        ${isPlan?`<span style="color:var(--purple);border:1px solid var(--purple);padding:1px 6px">PLANNED</span>`:""}
        ${loc?`<span style="border:1px solid ${rc};color:${rc};padding:1px 6px">${loc.rarity}</span>
               <span style="color:var(--blue)">📍 ${loc.map}</span>
               <span style="color:var(--text-dim)">${loc.pois.join(" · ")}</span>`
             :`<span style="color:var(--orange)">⚠ Location unconfirmed</span>`}
      </div>
    </div>`;
  }).join("");

  let html = "";
  if (salv.length) {
    html += `<div class="sv-hdr">◈ OWNED MATERIALS <span style="color:var(--orange);font-size:.8rem;margin-left:8px">${salv.length} types</span></div>`;
    html += `<div class="sv-grid">${makeCards(salv, false)}</div>`;
  }
  if (salvPlan.length) {
    html += `<div class="sv-hdr" style="margin-top:${salv.length?24:0}px">◈ PLANNED MATERIALS <span style="color:var(--purple);font-size:.8rem;margin-left:8px">${salvPlan.length} types</span></div>`;
    html += `<div class="sv-grid">${makeCards(salvPlan, true)}</div>`;
  }
  el.innerHTML = html;
}

function renderBuildInProgress(el) {
  const actives = getActives();
  const planned = getPlanned();
  if (!actives.length && !planned.length) {
    el.innerHTML = `<div class="bv-empty">No upgrades selected yet.<br><br>
      <button class="btn bc" style="margin-top:16px;font-size:.8rem" onclick="showMain('tree')">GO TO UPGRADE TREE →</button></div>`;
    return;
  }

  // Recommended order for planned
  const orderedPlan = [...planned].sort((a,b)=>{
    const ai = REC.indexOf(a.id), bi = REC.indexOf(b.id);
    return (ai<0?999:ai)-(bi<0?999:bi);
  });

  const makeRow = (u, i, isPlan) => {
    const fc   = FC[u.faction];
    const lvl  = isPlan ? PL[u.id] : LV[u.id];
    const cost = u.levels.slice(0,lvl).reduce((s,l)=>s+l.credits,0);
    return `<div class="bv-row" style="${isPlan?"opacity:.9":""}">
      <span class="bv-num">${i+1}</span>
      <span class="bv-name">${u.name}${lvl>1?`<span style="color:var(--text-dead);font-size:.72rem"> Lv${lvl}</span>`:""}</span>
      <span class="bv-f" style="border-color:${fc.color};color:${fc.color}">${u.faction.slice(0,5).toUpperCase()}</span>
      <span class="bv-c">₵${cost.toLocaleString()}</span>
      ${isPlan?`<span style="color:var(--purple);font-size:.7rem;padding:1px 6px;border:1px solid var(--purple)">PLAN</span>`:""}
    </div>`;
  };

  let html = "";
  if (actives.length) {
    const totalOwned = actives.reduce((s,u)=>{let c=0;for(let i=0;i<LV[u.id];i++)c+=u.levels[i].credits;return s+c;},0);
    html += `<div class="bv-hdr">OWNED UPGRADES <span style="color:var(--yellow);font-size:.82rem">₵${totalOwned.toLocaleString()} total</span></div>`;
    html += actives.map((u,i)=>makeRow(u,i,false)).join("");
  }
  if (orderedPlan.length) {
    const totalPlan = getTotalCredsPlanned();
    html += `<div class="bv-hdr" style="margin-top:${actives.length?24:0}px">PLANNED UPGRADES <span style="color:var(--purple);font-size:.82rem">₵${totalPlan.toLocaleString()} additional</span></div>`;
    html += orderedPlan.map((u,i)=>makeRow(u,i,true)).join("");
  }
  el.innerHTML = html;
}

function renderContractsInProgress(el) {
  // Delegate to the contracts module's render but inject into this container
  let contracts = [];
  try { contracts = JSON.parse(localStorage.getItem("mara_contracts")||"[]"); } catch(e){}

  if (!contracts.length) {
    el.innerHTML = `<div class="bv-empty">No contracts tracked yet.<br><br>
      <span style="font-size:.8rem;color:var(--text-dead)">Add contracts to track faction rep progress.</span></div>`;
    return;
  }

  const byFaction = {};
  contracts.forEach(c=>{ (byFaction[c.faction]||(byFaction[c.faction]=[])).push(c); });

  let html = "";
  for (const [f, cs] of Object.entries(byFaction)) {
    const col   = FC[f]?.color || "#888";
    const done  = cs.filter(c=>c.done).length;
    html += `<div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-family:'Orbitron',monospace;font-size:.8rem;color:${col}">
        ${f} <span style="color:var(--text-dead);font-size:.7rem;font-family:inherit">${done}/${cs.length}</span>
      </div>`;
    html += cs.map(c=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid ${c.done?"var(--green)":"var(--border)"};margin-bottom:5px;font-size:.84rem;cursor:pointer;transition:border-color .15s"
        onclick="toggleContract('${c.id}')">
        <span style="color:${c.done?"var(--green)":"var(--border2)"};font-size:1rem">${c.done?"✓":"○"}</span>
        <span style="flex:1;${c.done?"text-decoration:line-through;color:var(--text-dim)":""}">${c.name}</span>
        <span style="font-size:.72rem;color:var(--text-dead)">${c.rep||""}</span>
      </div>`).join("");
    html += `</div>`;
  }
  el.innerHTML = html;
}
