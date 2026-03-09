// LOADOUT PLANNER
// ══════════════════════════════════════════
let savedLoadouts = JSON.parse(localStorage.getItem("mara_loadouts")||"[]");
let currentLoadout = {
  name:"", runner:"Destroyer",
  primary:{name:"",tier:"",notes:""},
  secondary:{name:"",tier:"",notes:""},
  items:[],
  cores:[],
  notes:""
};
let editingLoadout = null;

function saveLoadouts(){try{localStorage.setItem("mara_loadouts",JSON.stringify(savedLoadouts));}catch(e){}}

function renderLoadout(){
  const el = document.getElementById("loadoutv");
  const WL = WEAPONS_DATA||[];
  
  el.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;position:sticky;top:0;background:#070d12;z-index:10;flex-wrap:wrap">
      <div class="page-hdr" style="margin:0">🎒 LOADOUT PLANNER</div>
      <button onclick="editingLoadout={name:'',runner:'Destroyer',primary:{name:'',tier:'S',notes:''},secondary:{name:'',tier:'A',notes:''},items:[],cores:[],notes:''};renderLoadout()" style="margin-left:auto;padding:5px 14px;border:1px solid #39ff14;color:#39ff14;background:transparent;cursor:pointer;font-family:inherit;font-size:16px">+ NEW LOADOUT</button>
    </div>
    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 360px;gap:16px">
      <div>
        ${editingLoadout!==null ? renderLoadoutEditor() : `
          ${savedLoadouts.length===0?`<div style="text-align:center;padding:40px;color:#4a6070;font-size:15px;letter-spacing:2px">NO LOADOUTS SAVED<br><span style="font-size:16px;margin-top:8px;display:block">Click + NEW LOADOUT to build your first pre-raid loadout</span></div>`:""}
          ${savedLoadouts.map((l,i)=>renderLoadoutCard(l,i)).join("")}
        `}
      </div>
      <div>
        <div class="card" style="margin-bottom:10px">
          <div class="card-hdr" style="color:#00e5ff">💡 HOW TO USE</div>
          <div style="font-size:16px;color:#8aa0b0;line-height:1.8">
            Build and save pre-raid loadout plans.<br>
            Each loadout stores:<br>
            • Primary + secondary weapons<br>
            • Items to bring (healing, shields etc)<br>
            • Cores/implants to slot<br>
            • Personal notes and strategy
          </div>
        </div>
        <div class="card">
          <div class="card-hdr" style="color:#ffd600">⚡ QUICK WEAPON PICKS</div>
          ${(WEAPONS_DATA||[]).filter(w=>w.tier==="S").slice(0,5).map(w=>`
            <div style="display:flex;align-items:center;gap:8px;padding:4px 6px;border-left:2px solid #39ff14;margin-bottom:4px;cursor:pointer"
              onclick="if(editingLoadout){editingLoadout.primary={name:'${w.name}',tier:'S',notes:'${w.type}'};renderLoadout()}">
              <span>${w.emoji}</span>
              <div style="flex:1;font-size:16px;color:#c8d8e8">${w.name}</div>
              <span style="font-size:15px;padding:1px 4px;border:1px solid #39ff14;color:#39ff14">S</span>
            </div>`).join("")}
        </div>
      </div>
    </div>`;
}

function renderLoadoutEditor(){
  const l = editingLoadout;
  const tierCol={S:"#39ff14",A:"#ffd600",B:"#ff6d00",C:"#ff4444"};
  return `<div class="card" style="border-color:#00e5ff;border-left:3px solid #00e5ff">
    <div class="card-hdr" style="color:#00e5ff">${l.id!==undefined?"EDIT":"NEW"} LOADOUT</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div>
        <div style="font-size:15px;color:#4a6070;margin-bottom:4px">LOADOUT NAME</div>
        <input value="${l.name}" oninput="editingLoadout.name=this.value" placeholder="e.g. Full Send Destroyer" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px 8px;font-family:inherit;font-size:16px">
      </div>
      <div>
        <div style="font-size:15px;color:#4a6070;margin-bottom:4px">RUNNER</div>
        <select onchange="editingLoadout.runner=this.value" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:16px">
          ${["Destroyer","Vandal","Triage","Recon","Assassin","Thief","Rook"].map(r=>`<option ${l.runner===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div class="card" style="border-color:#ffd600">
        <div class="card-hdr" style="color:#ffd600">🔫 PRIMARY</div>
        <input value="${l.primary.name}" oninput="editingLoadout.primary.name=this.value" placeholder="Weapon name" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:4px 7px;font-family:inherit;font-size:16px;margin-bottom:6px">
        <select onchange="editingLoadout.primary.tier=this.value" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:4px;font-family:inherit;font-size:16px;margin-bottom:6px">
          ${["S","A","B","C"].map(t=>`<option value="${t}" ${l.primary.tier===t?"selected":""}>${t}-Tier</option>`).join("")}
        </select>
        <input value="${l.primary.notes}" oninput="editingLoadout.primary.notes=this.value" placeholder="Mods, rarity notes..." style="width:100%;background:#070d12;border:1px solid #1a2530;color:#4a6070;padding:4px 7px;font-family:inherit;font-size:16px">
      </div>
      <div class="card" style="border-color:#4a9eff">
        <div class="card-hdr" style="color:#4a9eff">🔫 SECONDARY</div>
        <input value="${l.secondary.name}" oninput="editingLoadout.secondary.name=this.value" placeholder="Weapon name" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:4px 7px;font-family:inherit;font-size:16px;margin-bottom:6px">
        <select onchange="editingLoadout.secondary.tier=this.value" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:4px;font-family:inherit;font-size:16px;margin-bottom:6px">
          ${["S","A","B","C"].map(t=>`<option value="${t}" ${l.secondary.tier===t?"selected":""}>${t}-Tier</option>`).join("")}
        </select>
        <input value="${l.secondary.notes}" oninput="editingLoadout.secondary.notes=this.value" placeholder="Mods, rarity notes..." style="width:100%;background:#070d12;border:1px solid #1a2530;color:#4a6070;padding:4px 7px;font-family:inherit;font-size:16px">
      </div>
    </div>
    <div style="margin-bottom:10px">
      <div style="font-size:15px;color:#4a6070;margin-bottom:4px">ITEMS TO BRING (comma separated)</div>
      <input value="${(l.items||[]).join(", ")}" oninput="editingLoadout.items=this.value.split(',').map(s=>s.trim()).filter(Boolean)" placeholder="Patch Kit x3, Shield Charge x2, Self Revive..." style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px 8px;font-family:inherit;font-size:16px">
    </div>
    <div style="margin-bottom:10px">
      <div style="font-size:15px;color:#4a6070;margin-bottom:4px">CORES/IMPLANTS</div>
      <input value="${(l.cores||[]).join(", ")}" oninput="editingLoadout.cores=this.value.split(',').map(s=>s.trim()).filter(Boolean)" placeholder="Combat Core Mk II, Shield Implant Enhanced..." style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px 8px;font-family:inherit;font-size:16px">
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:15px;color:#4a6070;margin-bottom:4px">STRATEGY NOTES</div>
      <input value="${l.notes||""}" oninput="editingLoadout.notes=this.value" placeholder="Playstyle notes, rotation plan, what to prioritise..." style="width:100%;background:#070d12;border:1px solid #1a2530;color:#8aa0b0;padding:5px 8px;font-family:inherit;font-size:16px">
    </div>
    <div style="display:flex;gap:8px">
      <button onclick="saveCurrentLoadout()" style="padding:7px 18px;border:1px solid #39ff14;color:#39ff14;background:transparent;cursor:pointer;font-family:inherit;font-size:16px">💾 SAVE</button>
      <button onclick="editingLoadout=null;renderLoadout()" style="padding:7px 14px;border:1px solid #1a2530;color:#4a6070;background:transparent;cursor:pointer;font-family:inherit;font-size:16px">CANCEL</button>
    </div>
  </div>`;
}

function renderLoadoutCard(l, i){
  const rc = RUNNERS?RUNNERS.find(r=>r.name.toLowerCase()===l.runner.toLowerCase()):null;
  const rc2 = rc?rc.color:"#4a6070";
  return`<div class="card" style="margin-bottom:10px;border-left:3px solid ${rc2}">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <div style="font-family:'Orbitron',monospace;font-size:15px;color:#c8d8e8;flex:1">${l.name||"Unnamed Loadout"}</div>
      <span style="font-size:15px;padding:2px 6px;border:1px solid ${rc2};color:${rc2}">${l.runner}</span>
      <button onclick="editingLoadout=JSON.parse(JSON.stringify(savedLoadouts[${i}]));editingLoadout.id=${i};renderLoadout()" style="font-size:15px;padding:2px 8px;border:1px solid #4a9eff;color:#4a9eff;background:transparent;cursor:pointer;font-family:inherit">EDIT</button>
      <button onclick="savedLoadouts.splice(${i},1);saveLoadouts();renderLoadout()" style="font-size:15px;padding:2px 6px;border:1px solid #ff006e;color:#ff006e;background:transparent;cursor:pointer;font-family:inherit">✕</button>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      ${l.primary.name?`<span style="font-size:16px;padding:3px 8px;border:1px solid #ffd600;color:#ffd600">🔫 ${l.primary.name} (${l.primary.tier})</span>`:""}
      ${l.secondary.name?`<span style="font-size:16px;padding:3px 8px;border:1px solid #4a9eff;color:#4a9eff">🔫 ${l.secondary.name} (${l.secondary.tier})</span>`:""}
    </div>
    ${l.items&&l.items.length?`<div style="font-size:8.5px;color:#4a6070;margin-bottom:4px">Items: ${l.items.map(it=>`<span style="color:#c8d8e8">${it}</span>`).join(", ")}</div>`:""}
    ${l.cores&&l.cores.length?`<div style="font-size:8.5px;color:#4a6070;margin-bottom:4px">Cores: ${l.cores.map(c=>`<span style="color:#bf5af2">${c}</span>`).join(", ")}</div>`:""}
    ${l.notes?`<div style="font-size:8.5px;color:#4a6070;font-style:italic;border-top:1px solid #1a2530;padding-top:5px;margin-top:5px">"${l.notes}"</div>`:""}
  </div>`;
}

function saveCurrentLoadout(){
  if(!editingLoadout)return;
  if(editingLoadout.id!==undefined){
    savedLoadouts[editingLoadout.id] = {...editingLoadout};
    delete savedLoadouts[editingLoadout.id].id;
  } else {
    savedLoadouts.push({...editingLoadout});
  }
  saveLoadouts();
  editingLoadout = null;
  renderLoadout();
}

// ══════════════════════════════════════════
// CONTRACT TRACKER
// ══════════════════════════════════════════
