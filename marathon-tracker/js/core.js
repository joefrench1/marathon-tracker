
// ══════════════════════════════════════════
// RECOMMENDED PATH
// ══════════════════════════════════════════
const REC=["nc_saf","ar_cred","ar_inf","ca_cred","ca_sink","nc_shie","nc_rest",
           "nc_saf2","ar_kni","ar_str","ar_shot","mi_flex","sg_tac","sg_hds","ar_reb","tr_snp","ca_firm"];

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let LV={};   // owned levels (left-click, faction colour)
let PL={};   // planned levels (right-click, purple)
UG.forEach(u=>{LV[u.id]=0; PL[u.id]=0;});
let curF="CyberAcme",curTab="tree";
const NW=210,NH=138,GX=30,GY=18;

const canUnlock=u=>!u.deps||u.deps.every(d=>LV[d]>0||PL[d]>0);
const isOn=id=>LV[id]>0;
const isPlan=id=>PL[id]>0&&LV[id]===0;
const getActives=()=>UG.filter(u=>LV[u.id]>0);
const getPlanned=()=>UG.filter(u=>PL[u.id]>0&&LV[u.id]===0);
const getMaxLv=u=>u.levels.length;

// Salvage for owned only
function getSalvMap(){
  const m={};
  getActives().forEach(u=>{
    for(let i=0;i<LV[u.id];i++)
      u.levels[i].salvage.forEach(s=>{m[s.i]=(m[s.i]||0)+s.q;});
  });
  return Object.entries(m).sort((a,b)=>b[1]-a[1]);
}
// Salvage for planned only
function getSalvMapPlanned(){
  const m={};
  getPlanned().forEach(u=>{
    for(let i=0;i<PL[u.id];i++)
      u.levels[i].salvage.forEach(s=>{m[s.i]=(m[s.i]||0)+s.q;});
  });
  return Object.entries(m).sort((a,b)=>b[1]-a[1]);
}

function hideTT(){document.getElementById("tt").style.display="none";}

function cycleNode(id,planned=false){
  hideTT();
  const u=UG.find(x=>x.id===id);
  const max=getMaxLv(u);
  if(planned){ LV[id]=0; PL[id]=(PL[id]+1)%(max+1); }
  else { PL[id]=0; LV[id]=(LV[id]+1)%(max+1); }
  refresh();
}
function setLv(id,lv,planned=false){
  hideTT();
  if(planned){ LV[id]=0; PL[id]=lv; }
  else { PL[id]=0; LV[id]=lv; }
  refresh();
}
function resetAll(){
  hideTT();
  UG.forEach(u=>{LV[u.id]=0; PL[u.id]=0;});
  refresh();
}
function refresh(){renderCurrent();updateHdr();maybeSync();}

function getTotalCreds(){
  return getActives().reduce((s,u)=>{let c=0;for(let i=0;i<LV[u.id];i++)c+=u.levels[i].credits;return s+c;},0);
}
function getTotalCredsPlanned(){
  return getPlanned().reduce((s,u)=>{let c=0;for(let i=0;i<PL[u.id];i++)c+=u.levels[i].credits;return s+c;},0);
}

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
// TABS — grouped nav
// ══════════════════════════════════════════
const ALL_VIEWS = ["home","tree","progress","runners","guns","map","tools","squad",
                   "salvage","build","runs","loadout","contracts","ammo"];

function showMain(t){
  curTab = t;
  // Update nav tab highlights
  document.querySelectorAll(".nav-tab").forEach(b=>{
    b.classList.toggle("on", b.dataset.tab === t);
  });
  // Show/hide views
  ALL_VIEWS.forEach(id=>{
    const el = document.getElementById("view-"+id);
    if(el) el.classList.toggle("on", id===t);
  });
  renderCurrent();
}
function renderCurrent(){
  if(curTab==="home")      renderDashboard();
  else if(curTab==="tree") renderTree();
  else if(curTab==="progress") renderProgressTab();
  else if(curTab==="runners")  renderRunners();
  else if(curTab==="guns")     renderGuns();
  else if(curTab==="map")      renderMap();
  else if(curTab==="tools")    renderToolsHub();
  else if(curTab==="squad")    renderSquadPage();
  // Legacy single-tab renders (still called if navigated to directly)
  else if(curTab==="salvage")   renderSalv();
  else if(curTab==="build")     renderBuild();
  else if(curTab==="runs")      renderRuns();
  else if(curTab==="loadout")   renderLoadout();
  else if(curTab==="contracts") renderContracts();
  else if(curTab==="ammo")      renderAmmo();
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
// TREE
// ══════════════════════════════════════════
function renderTree(){
  hideTT();
  buildFbar();
  const fc=FC[curF];
  const fi=document.getElementById("fi");
  fi.style.cssText=`background:${fc.bg};border-bottom-color:${fc.dim};padding:5px 14px;border-bottom:1px solid;display:flex;align-items:center;gap:10px;font-size:16px`;
  fi.innerHTML=`<span class="fi-name" style="color:${fc.color}">${curF}</span>
    <span style="color:#4a6070">Handler: ${fc.handler}</span>
    `;

  let nodes=UG.filter(u=>u.f===curF);
  const maxC=nodes.reduce((m,u)=>Math.max(m,u.col),0);
  const maxR=nodes.reduce((m,u)=>Math.max(m,u.row),0);
  const cW=(maxC+1)*(NW+GX)+GX, cH=(maxR+1)*(NH+GY)+GY+8;
  const canvas=document.getElementById("tcanvas");
  canvas.style.cssText=`position:relative;width:${cW}px;height:${cH}px`;
  const svg=document.getElementById("tsvg");
  svg.setAttribute("width",cW);svg.setAttribute("height",cH);

  // SVG edges
  let paths="";
  nodes.forEach(u=>{
    (u.deps||[]).forEach(dep=>{
      const from=nodes.find(x=>x.id===dep);
      if(!from)return;
      const x1=from.col*(NW+GX)+NW, y1=from.row*(NH+GY)+NH/2;
      const x2=u.col*(NW+GX), y2=u.row*(NH+GY)+NH/2;
      const mx=(x1+x2)/2;
      const active=isOn(dep)&&isOn(u.id);
      paths+=`<path d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" fill="none"
        stroke="${active?fc.color:"#1a2530"}" stroke-width="${active?2:1}"
        stroke-dasharray="${active?"none":"4 3"}"/>`;
    });
  });
  svg.innerHTML=paths;
  canvas.querySelectorAll(".node").forEach(n=>n.remove());

  nodes.forEach(u=>{
    const x=u.col*(NW+GX), y=u.row*(NH+GY);
    const lv=LV[u.id], plv=PL[u.id], maxLv=getMaxLv(u);
    const on=lv>0, planned=plv>0&&lv===0;
    const isNext=u.id===nextRec;
    const locked=!canUnlock(u)&&!on&&!planned;
    const PLAN_COL="#bf5af2";
    const hiActive=false;
    const bc=on?fc.color:planned?PLAN_COL:isNext?"#39ff14":hiActive?"#ffd600":"#1a2530";
    const bg=on?fc.bg:planned?"rgba(191,90,242,.1)":isNext?"rgba(57,255,20,.06)":hiActive?"rgba(255,214,0,.04)":"#0d1318";
    const unverified=u.v===false;
    const activeLv=on?lv:planned?plv:0;
    const nextCostObj=u.levels[activeLv]||null;
    const typeClass={stat:"b-stat",arm:"b-arm",fun:"b-fun",inv:"b-inv"}[u.t]||"b-stat";
    const typeLabel={stat:"STAT",arm:"ARMORY",fun:"FUNCTION",inv:"INVENTORY"}[u.t]||"STAT";
    const currEff=activeLv>0?u.levels[activeLv-1].eff:"";
    const depNames=locked?(u.deps||[]).map(d=>{const du=UG.find(x=>x.id===d);return du?du.name:"?";}):[];

    // Pip bars — left pip = owned, right-click to plan
    const pipHtml=u.levels.map((_,i)=>{
      const ownedFill=i<lv?fc.color:"transparent";
      const planFill=i<plv&&lv===0?PLAN_COL:"transparent";
      const fillCol=ownedFill!=="transparent"?ownedFill:planFill;
      return`<div class="pip" title="L-click own Lv${i+1} / R-click plan Lv${i+1}"
        onclick="event.stopPropagation();${locked?'':` setLv('${u.id}',${lv===i+1?0:i+1},false)`}"
        oncontextmenu="event.preventDefault();event.stopPropagation();${locked?'':` setLv('${u.id}',${plv===i+1&&lv===0?0:i+1},true)`}">
        <div class="pip-fill" style="background:${fillCol}"></div>
      </div>`;
    }).join("");

    const div=document.createElement("div");
    div.className="node"+(on?" unlocked":planned?" planned":"")+(locked?" locked-out":" clickable");
    div.style.cssText=`left:${x}px;top:${y}px;width:${NW}px;height:${NH}px;
      --ng:${on?fc.color+"44":planned?PLAN_COL+"44":"transparent"};
      border-color:${bc};background:${bg};border-top-color:${bc}`;
    div.dataset.id=u.id;

    if(!locked){
      div.onclick=e=>{if(!e.target.classList.contains("pip"))cycleNode(u.id,false);};
      div.oncontextmenu=e=>{e.preventDefault();if(!e.target.classList.contains("pip"))cycleNode(u.id,true);};
    }

    div.innerHTML=`
      <div class="node-inner">
        <div class="n-title">
          ${hiActive?'<span style="color:#ffd600;font-size:16px">★ </span>':""}
          ${isNext?'<span style="color:#39ff14;font-size:16px">⚡ </span>':""}
          ${u.name}
        </div>
        <div class="n-badges">
          <span class="bdg ${typeClass}">${typeLabel}</span>
          <span class="bdg b-rnk">R${u.levels[0].rank}+</span>
          ${on?`<span class="bdg" style="border-color:${fc.color};color:${fc.color}">OWN LV${lv}/${maxLv}</span>`:""}
          ${planned?`<span class="bdg" style="border-color:${PLAN_COL};color:${PLAN_COL}">PLAN LV${plv}/${maxLv}</span>`:""}
          ${unverified?'<span class="bdg b-unv">⚠</span>':""}
        </div>
        ${locked
          ?`<div class="n-desc" style="color:#ff006e55;font-size:15px">🔒 Requires: ${depNames.join(", ")}</div>`
          :activeLv>0
            ?`<div class="n-eff" style="color:${on?fc.color:PLAN_COL};font-size:16px">${currEff}</div>`
            :`<div class="n-desc">${u.desc.substring(0,65)}${u.desc.length>65?"…":""}</div>`}
        <div class="n-pips">${pipHtml}</div>
        ${!locked?(nextCostObj
          ?`<div class="n-cost">→ ₵${nextCostObj.credits.toLocaleString()}${nextCostObj.salvage.length?" + "+nextCostObj.salvage.map(s=>`${s.i.split(" ").slice(0,2).join(" ")}×${s.q}`).join(", "):""}
</div>`
          :`<div style="font-size:15px;color:#39ff14;margin-top:4px">✓ MAX</div>`):""}
      </div>
      ${on?`<div class="n-check" style="color:${fc.color}">✓</div>`:""}
      ${planned?`<div class="n-check" style="color:${PLAN_COL}">◈</div>`:""}
      ${locked?`<div class="n-lock">🔒</div>`:""}`;

    div.addEventListener("mouseenter",e=>{
      if(locked){
        const depNames=(u.deps||[]).map(d=>{const du=UG.find(x=>x.id===d);return du?`<span style="color:#ffd600">${du.name}</span>`:"?";});
        const tt=document.getElementById("tt");
        tt.innerHTML=`<div style="font-family:'Orbitron',monospace;font-size:16px;color:#ff006e;margin-bottom:7px">🔒 LOCKED</div>
          <div style="font-size:16px;color:#8aa0b0;margin-bottom:5px">Unlock the following first:</div>
          ${depNames.map(n=>`<div style="font-size:16px;padding:3px 6px;border-left:2px solid #ffd600;margin-bottom:3px">${n}</div>`).join("")}`;
        tt.style.display="block";
        moveTT(e);
      } else {
        showTT(u,e);
      }
    });
    div.addEventListener("mouseleave",hideTT);
    div.addEventListener("mousemove",moveTT);
    canvas.appendChild(div);
  });
}

// ══════════════════════════════════════════
// TOOLTIP
// ══════════════════════════════════════════
function showTT(u,e){
  const fc=FC[u.f], lv=LV[u.id];
  const rows=u.levels.map((l,i)=>{
    const done=i<lv, cur=i===lv-1;
    return`<div class="tt-lvl${cur?" cur":""}">
      <div class="tt-lvl-hd">
        <span class="tt-lvl-n" style="${done?`color:${fc.color}`:""}">Level ${i+1}${done?" ✓":""}</span>
        <span class="tt-lvl-c">₵${l.credits.toLocaleString()}</span>
      </div>
      <div class="tt-lvl-e" style="color:${done?fc.color:"#39ff1466"}">${l.eff}</div>
      ${l.salvage.map(s=>`<div class="tt-lvl-s">◈ ${s.i} ×${s.q}</div>`).join("")}
      <div class="tt-rank">Rank ${l.rank}+ required</div>
    </div>`;
  }).join("");

  const firstSalv=u.levels[0].salvage[0];
  const loc=firstSalv?SL[firstSalv.i]:null;
  const locHtml=loc?`<div class="tt-loc">
    <div style="color:${RC[loc.rarity]||"#8aa0b0"};margin-bottom:2px">▲ ${loc.rarity.toUpperCase()}</div>
    <div>📍 ${loc.map}</div>
    <div>POIs: ${loc.pois.join(", ")}</div>
    <div style="margin-top:2px;font-style:italic">${loc.note}</div>
  </div>`:"";

  const tt=document.getElementById("tt");
  tt.innerHTML=`<div class="tt-name" style="color:${fc.color}">${u.name} <span style="font-size:15px;color:#4a6070">— ${u.f}</span></div>
    <div style="font-size:15px;color:#6a8090;margin-bottom:6px">${u.desc}</div>
    ${rows}${locHtml}`;
  tt.style.display="block";
  moveTT(e);
}
function moveTT(e){
  const tt=document.getElementById("tt");
  const w=tt.offsetWidth||240, h=tt.offsetHeight||160;
  tt.style.left=Math.min(e.clientX+14,window.innerWidth-w-10)+"px";
  tt.style.top=Math.min(e.clientY+14,window.innerHeight-h-10)+"px";
}

function showCredHdrTT(e){
  const tt=document.getElementById("tt");
  const ownedCred=getTotalCreds();
  const plannedCred=getTotalCredsPlanned();
  const actives=getActives();
  const planned=getPlanned();

  const ownedRows=actives.length
    ? actives.map(u=>{
        const fc=FC[u.f];
        let c=0;for(let i=0;i<LV[u.id];i++)c+=u.levels[i].credits;
        return`<div style="display:flex;justify-content:space-between;padding:2px 5px;border-left:2px solid ${fc.color};margin-bottom:2px;font-size:8.5px">
          <span style="color:${fc.color}">${u.name}</span>
          <span style="color:#ffd600;margin-left:10px">₵${c.toLocaleString()}</span>
        </div>`;
      }).join("")
    : `<div style="color:#4a6070;font-size:8.5px;padding:3px 5px">No owned upgrades yet</div>`;

  const planRows=planned.length
    ? planned.map(u=>{
        let c=0;for(let i=0;i<PL[u.id];i++)c+=u.levels[i].credits;
        return`<div style="display:flex;justify-content:space-between;padding:2px 5px;border-left:2px solid #bf5af2;margin-bottom:2px;font-size:8.5px">
          <span style="color:#bf5af2">${u.name}</span>
          <span style="color:#bf5af2;margin-left:10px">₵${c.toLocaleString()}</span>
        </div>`;
      }).join("")
    : `<div style="color:#4a6070;font-size:8.5px;padding:3px 5px">No planned upgrades yet</div>`;

  tt.innerHTML=`
    <div style="font-family:'Orbitron',monospace;font-size:16px;color:#ffd600;margin-bottom:8px">₵ CREDIT BREAKDOWN</div>
    <div style="font-size:15px;color:#39ff14;letter-spacing:1px;margin-bottom:4px">✓ OWNED</div>
    ${ownedRows}
    <div style="display:flex;justify-content:space-between;padding:3px 5px;margin:4px 0 8px;border-top:1px solid #1a2530;font-size:16px">
      <span style="color:#4a6070">Owned total</span>
      <span style="color:#ffd600;font-weight:700">₵${ownedCred.toLocaleString()}</span>
    </div>
    <div style="font-size:15px;color:#bf5af2;letter-spacing:1px;margin-bottom:4px">◈ PLANNED (R-CLICK)</div>
    ${planRows}
    <div style="display:flex;justify-content:space-between;padding:3px 5px;margin-top:4px;border-top:1px solid #1a2530;font-size:16px">
      <span style="color:#4a6070">Planned total</span>
      <span style="color:#bf5af2;font-weight:700">₵${plannedCred.toLocaleString()}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:4px 5px;margin-top:4px;border-top:1px solid #bf5af2;font-size:16px">
      <span style="color:#c8d8e8">Combined total</span>
      <span style="color:#fff;font-weight:700">₵${(ownedCred+plannedCred).toLocaleString()}</span>
    </div>`;
  tt.style.display="block";
  moveTT(e);
}

function showSalvHdrTT(e){
  const salv=getSalvMap();
  const tt=document.getElementById("tt");
  if(!salv.length){
    tt.innerHTML=`<div style="color:#4a6070;font-size:16px;font-family:'Share Tech Mono',monospace">No salvage needed yet.<br>Unlock upgrades in the tree first.</div>`;
  } else {
    const rows=salv.map(([item,qty])=>{
      const loc=SL[item];
      const rc=loc?RC[loc.rarity]:"#4a6070";
      return`<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 5px;margin-bottom:2px;border-left:2px solid ${rc}">
        <span style="color:#c8d8e8;font-size:16px">◈ ${item}</span>
        <span style="color:#ffd600;font-weight:700;font-size:16px;margin-left:10px">×${qty}</span>
      </div>`;
    }).join("");
    tt.innerHTML=`<div style="font-family:'Orbitron',monospace;font-size:16px;color:#ff6d00;margin-bottom:8px">◈ ALL SALVAGE NEEDED</div>
      <div style="font-size:15px;color:#4a6070;margin-bottom:6px;letter-spacing:1px">Hover salvage card in planner for locations</div>
      ${rows}
      <div style="margin-top:8px;padding-top:6px;border-top:1px solid #1a2530;font-size:15px;color:#4a6070">
        Total credits: <span style="color:#ffd600">₵${getTotalCreds().toLocaleString()}</span>
      </div>`;
  }
  tt.style.display="block";
  moveTT(e);
}

function showSalvTT(item,e){
  const loc=SL[item];
  const rc=loc?RC[loc.rarity]:"#4a6070";

  // Find which upgrades/levels need this item (owned + planned)
  const needs=[];
  getActives().forEach(u=>{
    for(let i=0;i<LV[u.id];i++){
      const s=u.levels[i].salvage.find(s=>s.i===item);
      if(s) needs.push({u,level:i+1,qty:s.q,type:"owned"});
    }
  });
  getPlanned().forEach(u=>{
    for(let i=0;i<PL[u.id];i++){
      const s=u.levels[i].salvage.find(s=>s.i===item);
      if(s) needs.push({u,level:i+1,qty:s.q,type:"planned"});
    }
  });
  const needRows=needs.map(n=>{
    const fc=FC[n.u.f];
    const col=n.type==="planned"?"#bf5af2":fc.color;
    const label=n.type==="planned"?"◈ PLAN":"✓ OWN";
    return`<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 5px;margin-bottom:2px;border-left:2px solid ${col};font-size:8.5px">
      <span style="color:${col}">${n.u.name}</span>
      <span style="color:#4a6070;margin:0 5px;font-size:7.5px">${label} Lv${n.level}</span>
      <span style="color:#ffd600;font-weight:700">×${n.qty}</span>
    </div>`;
  }).join("");

  const locHtml=loc?`
    <div style="margin-top:7px;padding-top:6px;border-top:1px solid #1a2530">
      <div style="color:${rc};font-size:15px;margin-bottom:3px;font-weight:700">▲ ${loc.rarity.toUpperCase()} RARITY</div>
      <div style="font-size:8.5px;color:#c8d8e8;margin-bottom:2px">📍 ${loc.map}</div>
      <div style="font-size:15px;color:#8aa0b0;margin-bottom:2px">POIs: ${loc.pois.join(", ")}</div>
      <div style="font-size:15px;color:#6a8090;font-style:italic">${loc.note}</div>
      ${loc.rarity==="superior"?`<div style="margin-top:4px;font-size:7.5px;color:#bf5af2;padding:2px 5px;background:rgba(191,90,242,.08);border-left:2px solid #bf5af2">⚠ UESC Incursion events & Superior Locked Rooms only</div>`:""}
    </div>`:"<div style='margin-top:5px;font-size:15px;color:#ff6d00'>⚠ Location data unconfirmed</div>";

  const totalQty=needs.reduce((s,n)=>s+n.qty,0);
  const tt=document.getElementById("tt");
  tt.innerHTML=`
    <div style="font-family:'Orbitron',monospace;font-size:16px;color:${rc};margin-bottom:6px">◈ ${item}</div>
    <div style="font-size:15px;color:#4a6070;margin-bottom:5px">Total needed: <span style="color:#ffd600;font-weight:700">×${totalQty}</span></div>
    <div style="font-size:15px;color:#4a6070;margin-bottom:4px;letter-spacing:1px">REQUIRED BY:</div>
    ${needRows}
    ${locHtml}`;
  tt.style.display="block";
  moveTT(e);
}

// ══════════════════════════════════════════
