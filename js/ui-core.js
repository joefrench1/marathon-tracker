// ══════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════
function updateHdr(){
  const totalLvs=getActives().reduce((s,u)=>s+LV[u.id],0);
  document.getElementById("h-lvs").textContent=totalLvs;
  // Credits header shows planned (right-click) costs only; owned shown on hover
  document.getElementById("h-cred").textContent="₵"+getTotalCredsPlanned().toLocaleString();
  document.getElementById("h-salv").textContent=getSalvMap().length;
  document.getElementById("h-plan").textContent=getSalvMapPlanned().length;
  const maxLvs=UG.reduce((s,u)=>s+u.levels.length,0);
  document.getElementById("prog-f").style.width=Math.min(100,totalLvs/maxLvs*100)+"%";
}


// ══════════════════════════════════════════
// TABS
// ══════════════════════════════════════════
function showMain(t){
  curTab=t;
  const tabs=["tree","salvage","build","runners","guns","map","runs","loadout","contracts","ammo","squad"];
  document.querySelectorAll(".mtab").forEach((b,i)=>b.classList.toggle("on",tabs[i]===t));
  ["view-tree","view-salvage","view-build","view-runners","view-guns","view-map","view-runs","view-loadout","view-contracts","view-ammo","view-squad"].forEach((id,i)=>
    document.getElementById(id).classList.toggle("on",tabs[i]===t));
  renderCurrent();
}
function renderCurrent(){
  if(curTab==="tree") renderTree();
  else if(curTab==="salvage") renderSalv();
  else if(curTab==="build") renderBuild();
  else if(curTab==="runners") renderRunners();
  else if(curTab==="guns") renderGuns();
  else if(curTab==="map") renderMap();
  else if(curTab==="runs") renderRuns();
  else if(curTab==="loadout") renderLoadout();
  else if(curTab==="contracts") renderContracts();
  else if(curTab==="ammo") renderAmmo();
  else if(curTab==="squad") renderSquadPage();
}
function toggleHi(){
  showHi=!showHi;
  document.getElementById("btn-hi").classList.toggle("ony",showHi);
  renderTree();
}
function toggleRec(){
  showRec=!showRec;
  document.getElementById("btn-rec").classList.toggle("ong",showRec);
  renderTree();
}


// ══════════════════════════════════════════
// FACTION BAR
// ══════════════════════════════════════════
function buildFbar(){
  document.getElementById("fbar").innerHTML=Object.keys(FC).map(f=>{
    const fc=FC[f];
    const nodes=UG.filter(u=>u.f===f);
    const tot=nodes.reduce((s,u)=>s+u.levels.length,0);
    const act=nodes.reduce((s,u)=>s+LV[u.id],0);
    const on=f===curF;
    return`<button class="fbtn${on?" on":""}"
      style="${on?`border-color:${fc.color};color:${fc.color};background:${fc.bg}`:""}"
      onclick="setF('${f}')">
      <span class="fdot" style="${on?`background:${fc.color}`:""}"></span>
      ${f.toUpperCase()}
      <span class="fcnt" style="${on?`background:${fc.color};color:#000`:""}">
        ${act}/${tot}
      </span></button>`;
  }).join("");
}
function setF(f){curF=f;buildFbar();renderTree();}


// ══════════════════════════════════════════
// ZOOM / FIT
// ══════════════════════════════════════════
let currentScale=1;
function fitTree(){
  const scroll=document.getElementById("tscroll");
  const canvas=document.getElementById("tcanvas");
  const sw=scroll.clientWidth-40, sh=scroll.clientHeight-40;
  const cw=canvas.scrollWidth/currentScale, ch=canvas.scrollHeight/currentScale;
  const scale=Math.min(sw/cw, sh/ch, 1);
  currentScale=scale;
  canvas.style.transform=`scale(${scale})`;
  canvas.style.width=(cw*scale)+"px";
  canvas.style.height=(ch*scale)+"px";
  document.getElementById("btn-100").textContent=Math.round(scale*100)+"%";
}
function resetZoom(){
  currentScale=1;
  const canvas=document.getElementById("tcanvas");
  canvas.style.transform="scale(1)";
  canvas.style.width="";
  canvas.style.height="";
  document.getElementById("btn-100").textContent="100%";
}

function showPlanHdrTT(e){
  const salv=getSalvMapPlanned();
  const tt=document.getElementById("tt");
  if(!salv.length){
    tt.innerHTML=`<div style="color:#bf5af2;font-size:9px;font-family:'Share Tech Mono',monospace">No planned upgrades yet.<br>Right-click any node to plan it.</div>`;
  } else {
    const rows=salv.map(([item,qty])=>{
      const loc=SL[item];
      const rc=loc?RC[loc.rarity]:"#4a6070";
      return`<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 5px;margin-bottom:2px;border-left:2px solid ${rc}">
        <span style="color:#c8d8e8;font-size:9px">◈ ${item}</span>
        <span style="color:#bf5af2;font-weight:700;font-size:10px;margin-left:10px">×${qty}</span>
      </div>`;
    }).join("");
    tt.innerHTML=`<div style="font-family:'Orbitron',monospace;font-size:10px;color:#bf5af2;margin-bottom:8px">◈ PLANNED SALVAGE</div>
      <div style="font-size:8px;color:#4a6070;margin-bottom:6px">Right-click upgrades to plan them</div>
      ${rows}
      <div style="margin-top:8px;padding-top:6px;border-top:1px solid #1a2530;font-size:8px;color:#4a6070">
        Planned credits: <span style="color:#bf5af2">₵${getTotalCredsPlanned().toLocaleString()}</span>
      </div>`;
  }
  tt.style.display="block";
  moveTT(e);
}