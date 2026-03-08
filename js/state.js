// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let LV={};   // owned levels (left-click, faction colour)
let PL={};   // planned levels (right-click, purple)
UG.forEach(u=>{LV[u.id]=0; PL[u.id]=0;});
let curF="CyberAcme",curTab="tree",showHi=false,showRec=false;
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