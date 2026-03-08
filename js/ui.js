// SALVAGE
// ══════════════════════════════════════════
function renderSalv(){
  const salv=getSalvMap();
  const salvPlan=getSalvMapPlanned();
  const el=document.getElementById("sv-c");
  if(!salv.length && !salvPlan.length){
    el.innerHTML='<div class="sv-empty">// UNLOCK OR PLAN UPGRADES IN THE TREE FIRST //<br><br><span style="font-size:16px;color:#4a6070">Left-click = owned &nbsp;·&nbsp; Right-click = planned (purple)</span></div>';return;
  }
  const supCnt=salv.filter(([n])=>SL[n]?.rarity==="superior").length;

  const makeCards=(items,isPlan)=>items.map(([item,qty])=>{
    const loc=SL[item];
    const rc=loc?RC[loc.rarity]:"#4a6070";
    const esc=item.replace(/'/g,"\\'");
    return`<div class="svc" style="border-left:3px solid ${isPlan?"#bf5af2":rc};cursor:help${isPlan?";opacity:.85":""}"
      onmouseenter="showSalvTT('${esc}',event)" onmouseleave="hideTT()" onmousemove="moveTT(event)">
      <div class="svc-top">
        <span class="svc-n">${isPlan?'<span style="color:#bf5af2">◈ </span>':'◈ '}${item}</span>
        <span class="svc-q" style="${isPlan?"color:#bf5af2":""}">×${qty}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">
        ${isPlan?`<span class="svc-r" style="border-color:#bf5af2;color:#bf5af2">PLANNED</span>`:""}
        ${loc?`<span class="svc-r" style="border-color:${rc};color:${rc}">${loc.rarity}</span>
               <span style="color:#4a9eff;font-size:16px">📍 ${loc.map}</span>`
             :`<span style="color:#ff6d00;font-size:15px">⚠ Location unconfirmed</span>`}
      </div>
      ${loc?`<div style="color:#8aa0b0;font-size:16px">POIs: ${loc.pois.join(" · ")}</div>
             <div style="color:#6a8090;font-size:15px;margin-top:2px;font-style:italic">${loc.note}</div>
             ${loc.rarity==="superior"?'<div style="margin-top:5px;font-size:15px;color:#bf5af2;padding:2px 5px;background:rgba(191,90,242,.08);border-left:2px solid #bf5af2">⚠ Superior — UESC Incursion & Superior Locked Rooms only</div>':""}`:""}
    </div>`;
  }).join("");

  const ownedSection=salv.length?`
    <div style="font-family:'Orbitron',monospace;font-size:16px;color:#ff6d00;letter-spacing:2px;margin-bottom:8px">✓ OWNED UPGRADES SALVAGE</div>
    <div class="sv-grid">${makeCards(salv,false)}</div>`:"";

  const plannedSection=salvPlan.length?`
    <div style="font-family:'Orbitron',monospace;font-size:16px;color:#bf5af2;letter-spacing:2px;margin:${salv.length?"14px":0} 0 8px">◈ PLANNED UPGRADES SALVAGE</div>
    <div class="sv-grid">${makeCards(salvPlan,true)}</div>`:"";

  el.innerHTML=`<div style="margin-bottom:12px;font-size:16px;color:#4a6070">
    ${getActives().length} owned · ${getPlanned().length} planned &nbsp;|&nbsp;
    <span style="color:#ff6d00">${salv.length} owned salvage types</span> &nbsp;·&nbsp;
    <span style="color:#bf5af2">${salvPlan.length} planned salvage types</span>
  </div>
  ${ownedSection}${plannedSection}
  <div class="sv-tots">
    <div class="sv-tot-hdr">TOTAL COSTS</div>
    <div class="sv-row"><span style="color:#4a6070;flex:1">Owned Credits</span><span style="font-weight:700;color:#ffd600">₵${getTotalCreds().toLocaleString()}</span></div>
    ${salvPlan.length?`<div class="sv-row"><span style="color:#4a6070;flex:1">Planned Credits</span><span style="font-weight:700;color:#bf5af2">₵${getTotalCredsPlanned().toLocaleString()}</span></div>`:""}
    <div class="sv-row"><span style="color:#4a6070;flex:1">Superior Materials (owned) ⚠</span><span style="font-weight:700;color:#bf5af2">${supCnt}</span></div>
    <div class="sv-tips">
      💡 Hover any salvage card to see which upgrades need it and full location info.<br>
      💡 In-game: hover upgrade → <strong>TRACK SALVAGE</strong> to pin items to your in-run HUD map.<br>
      💡 Superior (purple border) only from UESC Incursion events & Superior Locked Rooms.<br>
      💡 Shell ID only from High-Value Target Supply Drops — prioritise HVT contracts.
    </div>
  </div>`;

}

// ══════════════════════════════════════════
// BUILD
// ══════════════════════════════════════════
function renderBuild(){
  const active=getActives();
  const el=document.getElementById("bv-c");
  if(!active.length){
    el.innerHTML='<div class="bv-empty">// SELECT UPGRADES IN THE TREE FIRST //</div>';return;
  }
  const cards=active.map(u=>{
    const fc=FC[u.f], lv=LV[u.id];
    let cc=0;const sm={};
    for(let i=0;i<lv;i++){
      cc+=u.levels[i].credits;
      u.levels[i].salvage.forEach(s=>{sm[s.i]=(sm[s.i]||0)+s.q;});
    }
    return`<div class="bvc" style="border-left:3px solid ${fc.color}">
      <div style="font-family:'Orbitron',monospace;font-size:8.5px;color:${fc.color};margin-bottom:2px">${u.name}</div>
      <div style="font-size:15px;color:${fc.color}55;margin-bottom:3px">${u.f}</div>
      <div style="font-size:15px;color:#4a6070;margin-bottom:3px">Level ${lv}/${getMaxLv(u)} · Rank ${u.levels[0].rank}+</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;font-size:15px">
        <span style="color:#ffd600">₵${cc.toLocaleString()}</span>
        ${Object.entries(sm).map(([i,q])=>`<span style="color:#ff6d00">◈${i.split(" ")[0]} ×${q}</span>`).join("")}
      </div>
      <div style="font-size:15px;font-weight:700;color:${fc.color};margin-top:3px">${u.levels[lv-1].eff}</div>
    </div>`;
  }).join("");

  const steps=REC.map((id,i)=>{
    const u=UG.find(x=>x.id===id);if(!u)return"";
    const fc=FC[u.f],done=isOn(id);
    return`<span class="rs${done?" done":""}" style="${done?`--sc:${fc.color};--sb:${fc.bg}`:""}">
      <span style="color:#4a6070;margin-right:2px">${i+1}.</span>${u.name}${done?" ✓":""}
    </span>${i<REC.length-1?'<span style="color:#2a3a48">›</span>':""}`;
  }).join("");

  const fbRows=Object.keys(FC).map(f=>{
    const fa=active.filter(u=>u.f===f);if(!fa.length)return"";
    const fc=FC[f];
    const fc_c=fa.reduce((s,u)=>{let c=0;for(let i=0;i<LV[u.id];i++)c+=u.levels[i].credits;return s+c;},0);
    const lvSum=fa.reduce((s,u)=>s+LV[u.id],0);
    return`<div class="fbr" style="border-left:2px solid ${fc.color}">
      <span style="color:${fc.color};min-width:80px">${f}</span>
      <span style="color:#8aa0b0">${fa.length} upgrades · ${lvSum} levels</span>
      <span style="color:#ffd600;margin-left:auto">₵${fc_c.toLocaleString()}</span>
    </div>`;
  }).join("");

  el.innerHTML=`<div class="bv-grid">${cards}</div>
  <div class="rec-box">
    <div class="rec-hdr">⚡ RECOMMENDED UNLOCK ORDER (community build guide)</div>
    <div class="rec-steps">${steps}</div>
  </div>
  <div class="fb-box">
    <div class="fb-hdr">FACTION CREDIT BREAKDOWN</div>
    ${fbRows}
  </div>`;
}

// ══════════════════════════════════════════
// SAVE / LOAD / EXPORT
// ══════════════════════════════════════════
function getBuilds(){try{return JSON.parse(localStorage.getItem("mg_builds")||"{}");}catch{return{};}}
function putBuilds(o){localStorage.setItem("mg_builds",JSON.stringify(o));}

function openModal(mode){
  const bg=document.getElementById("modal-bg");
  bg.classList.add("on");
  document.getElementById("mtitle").textContent=mode==="save"?"💾 SAVE BUILD":"📂 MANAGE BUILDS";
  const body=document.getElementById("mbody");
  if(mode==="save"){
    body.innerHTML=`<div style="font-size:16px;color:#4a6070;margin-bottom:8px">
      Name your current build to save it. You can load it again later.</div>
      <input class="sinput" id="bname" placeholder="e.g. Early Game, Melee Build..." maxlength="40">
      <div class="mbtns">
        <button class="btn br" onclick="closeModal()">CANCEL</button>
        <button class="btn bg" onclick="doSave()">SAVE</button>
      </div>`;
    setTimeout(()=>document.getElementById("bname")?.focus(),50);
  } else {
    renderBuildsModal(body);
  }
}
function renderBuildsModal(body){
  const builds=getBuilds(), keys=Object.keys(builds);
  if(!keys.length){
    body.innerHTML=`<div style="color:#4a6070;text-align:center;padding:20px;font-size:16px">No saved builds yet.</div>
      <div class="mbtns"><button class="btn br" onclick="closeModal()">CLOSE</button></div>`;
    return;
  }
  const rows=keys.map(k=>`<div class="brow">
    <span class="brow-n">${k}</span>
    <span class="brow-d">${builds[k].date||""}</span>
    <div class="brow-acts">
      <button class="btn bg" style="font-size:15px;padding:3px 8px" onclick="doLoad('${k}')">LOAD</button>
      <button class="btn by" style="font-size:15px;padding:3px 8px" onclick="doExportNamed('${k}')">⬇</button>
      <button class="btn br" style="font-size:15px;padding:3px 8px" onclick="doDelete('${k}')">✕</button>
    </div>
  </div>`).join("");
  body.innerHTML=`${rows}<div class="mbtns"><button class="btn br" onclick="closeModal()">CLOSE</button></div>`;
}
function doSave(){
  const name=document.getElementById("bname")?.value?.trim();
  if(!name){alert("Please enter a name.");return;}
  const b=getBuilds();
  b[name]={levels:{...LV},date:new Date().toLocaleDateString()};
  putBuilds(b);
  closeModal();
  alert(`✓ Build "${name}" saved!`);
}
function doLoad(name){
  const b=getBuilds();
  if(!b[name])return;
  Object.assign(LV,b[name].levels);
  closeModal();refresh();
}
function doDelete(name){
  if(!confirm(`Delete "${name}"?`))return;
  const b=getBuilds();delete b[name];putBuilds(b);
  renderBuildsModal(document.getElementById("mbody"));
}
function doExport(name){
  const lbl=name||`Build_${new Date().toLocaleDateString().replace(/\//g,"-")}`;
  const active=getActives(), salv=getSalvMap();
  const lines=[
    `MARATHON UPGRADE BUILD — ${lbl}`,
    `Generated: ${new Date().toLocaleString()}`,
    "=".repeat(52),"",
    `Total Credits:   ₵${getTotalCreds().toLocaleString()}`,
    `Nodes Unlocked:  ${active.length}`,
    `Total Levels:    ${active.reduce((s,u)=>s+LV[u.id],0)}`,
    `Salvage Types:   ${salv.length}`,
    "",
    "── SELECTED UPGRADES ──────────────────────────",
  ];
  Object.keys(FC).forEach(f=>{
    const fa=active.filter(u=>u.f===f);
    if(!fa.length)return;
    lines.push(`\n[${f.toUpperCase()}]`);
    fa.forEach(u=>{
      const lv=LV[u.id];
      lines.push(`  ${u.name.padEnd(24)} Lv ${lv}/${getMaxLv(u)}  ${u.levels[lv-1].eff}`);
    });
  });
  lines.push("","── SALVAGE SHOPPING LIST ───────────────────────");
  salv.forEach(([item,qty])=>{
    const loc=SL[item];
    const linfo=loc?` [${loc.rarity.toUpperCase()}] ${loc.map} — ${loc.pois.join("/")}  (${loc.note})`:" [LOCATION UNCONFIRMED]";
    lines.push(`  ◈ ${item.padEnd(26)} ×${String(qty).padStart(3)}${linfo}`);
  });
  const blob=new Blob([lines.join("\n")],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=`marathon-build-${lbl.replace(/\s+/g,"-").replace(/[^a-z0-9-]/gi,"")}.txt`;
  a.click();
}
function doExportNamed(name){
  const b=getBuilds();if(!b[name])return;
  const save={...LV};Object.assign(LV,b[name].levels);
  doExport(name);
  Object.assign(LV,save);
}
function bgClick(e){if(e.target===document.getElementById("modal-bg"))closeModal();}
function closeModal(){document.getElementById("modal-bg").classList.remove("on");}

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
    tt.innerHTML=`<div style="color:#bf5af2;font-size:16px;font-family:'Share Tech Mono',monospace">No planned upgrades yet.<br>Right-click any node to plan it.</div>`;
  } else {
    const rows=salv.map(([item,qty])=>{
      const loc=SL[item];
      const rc=loc?RC[loc.rarity]:"#4a6070";
      return`<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 5px;margin-bottom:2px;border-left:2px solid ${rc}">
        <span style="color:#c8d8e8;font-size:16px">◈ ${item}</span>
        <span style="color:#bf5af2;font-weight:700;font-size:16px;margin-left:10px">×${qty}</span>
      </div>`;
    }).join("");
    tt.innerHTML=`<div style="font-family:'Orbitron',monospace;font-size:16px;color:#bf5af2;margin-bottom:8px">◈ PLANNED SALVAGE</div>
      <div style="font-size:15px;color:#4a6070;margin-bottom:6px">Right-click upgrades to plan them</div>
      ${rows}
      <div style="margin-top:8px;padding-top:6px;border-top:1px solid #1a2530;font-size:15px;color:#4a6070">
        Planned credits: <span style="color:#bf5af2">₵${getTotalCredsPlanned().toLocaleString()}</span>
      </div>`;
  }
  tt.style.display="block";
  moveTT(e);
}

// ══════════════════════════════════════════
