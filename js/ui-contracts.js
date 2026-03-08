// ══════════════════════════════════════════
// CONTRACT TRACKER
// ══════════════════════════════════════════
const CONTRACTS_DATA = {
  CyberAcme: [
    {id:"ca_c1",name:"Looting Expert",desc:"Open 30 containers in a single session",rank:1,reward:"₵2,000 + Scavenger.exe progress"},
    {id:"ca_c2",name:"Data Extraction",desc:"Collect 5 data cards and extract successfully",rank:3,reward:"₵3,500"},
    {id:"ca_c3",name:"Vault Expansion",desc:"Fill 50% of your vault this week",rank:5,reward:"₵5,000 + Expansion credit"},
    {id:"ca_c4",name:"Arms Dealer",desc:"Deliver 3 Enhanced weapons to the Armory",rank:8,reward:"₵8,000 + Enhanced Backpack"},
    {id:"ca_c5",name:"Master Scavenger",desc:"Loot 5 containers without being detected",rank:12,reward:"₵12,000 + Loot_Siphon upgrade credit"},
  ],
  NuCaloric: [
    {id:"nc_c1",name:"First Aid",desc:"Use 5 Patch Kits in the field",rank:1,reward:"₵1,500 + Restore progress"},
    {id:"nc_c2",name:"Shield Protocol",desc:"Block 500 damage with shields in a single run",rank:3,reward:"₵2,500 + Shield Charge x3"},
    {id:"nc_c3",name:"Combat Medic",desc:"Revive a teammate 3 times",rank:5,reward:"₵4,000"},
    {id:"nc_c4",name:"Hazard Control",desc:"Survive 3 hazard zones without dying",rank:8,reward:"₵6,000 + Mechanic's Kit x2"},
    {id:"nc_c5",name:"Full Recovery",desc:"Use a Panacea Kit and extract successfully",rank:15,reward:"₵15,000 + Panacea Kit upgrade"},
  ],
  Traxus: [
    {id:"tr_c1",name:"Arms Cache",desc:"Deliver 3 weapons to the Traxus Armory",rank:2,reward:"₵2,000 + Weapon Mods progress"},
    {id:"tr_c2",name:"Sniper's Eye",desc:"Get 5 kills with precision rifles",rank:5,reward:"₵4,500"},
    {id:"tr_c3",name:"Vault Keeper",desc:"Expand your vault by 20 rows this season",rank:8,reward:"₵7,000 + Expansion credit"},
    {id:"tr_c4",name:"Tracker",desc:"Ping 10 enemies in a single run",rank:10,reward:"₵5,000 + Tracker.exe upgrade"},
    {id:"tr_c5",name:"Heat Management",desc:"Complete 3 runs without overheating",rank:14,reward:"₵10,000 + Heat_Sink.exe credit"},
  ],
  MIDA: [
    {id:"mi_c1",name:"Speed Runner",desc:"Extract within 10 minutes of deploying",rank:2,reward:"₵2,000 + Agility boost"},
    {id:"mi_c2",name:"Mobility Expert",desc:"Use movement abilities 50 times in a session",rank:4,reward:"₵3,500"},
    {id:"mi_c3",name:"Mod Collector",desc:"Equip 5 different weapon mods",rank:6,reward:"₵6,000 + Enhanced Chip"},
    {id:"mi_c4",name:"Jump Master",desc:"Reach 10 elevated positions using abilities",rank:10,reward:"₵8,000"},
  ],
  Arachne: [
    {id:"ar_c1",name:"Knife's Edge",desc:"Get 3 melee kills in one run",rank:4,reward:"₵2,500 + Knife Fight V2 progress"},
    {id:"ar_c2",name:"High Value",desc:"Extract with 5,000+ credits in one run",rank:5,reward:"₵3,000 + Credit cap bonus"},
    {id:"ar_c3",name:"Intel Broker",desc:"Collect 3 data cards in one run",rank:8,reward:"₵5,000 + Informant progress"},
    {id:"ar_c4",name:"Close Quarters",desc:"Win 5 melee engagements",rank:12,reward:"₵10,000 + Hard_Strike.exe credit"},
  ],
  SekGen: [
    {id:"sg_c1",name:"Ability Mastery",desc:"Use your tactical ability 10 times in a session",rank:1,reward:"₵1,000 + TAC_AMP progress"},
    {id:"sg_c2",name:"Survivor",desc:"Complete 5 runs without going DBNO",rank:3,reward:"₵3,500"},
    {id:"sg_c3",name:"Quick Response",desc:"Use Head_Start.exe perk in 3 consecutive runs",rank:6,reward:"₵5,000 + Energy Amp x2"},
    {id:"sg_c4",name:"Last Stand",desc:"Revive from DBNO 3 times",rank:10,reward:"₵7,500 + SCAB_FACTORY credit"},
  ]
};

let completedContracts = JSON.parse(localStorage.getItem("mara_contracts")||"{}");
let contractFilter = "All";

function saveContracts(){try{localStorage.setItem("mara_contracts",JSON.stringify(completedContracts));}catch(e){}}

function renderContracts(){
  const el = document.getElementById("contractsv");
  const factions = Object.keys(CONTRACTS_DATA);
  const allContracts = factions.flatMap(f=>CONTRACTS_DATA[f].map(c=>({...c,faction:f})));
  const totalDone = allContracts.filter(c=>completedContracts[c.id]).length;
  const totalAll = allContracts.length;
  
  el.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;position:sticky;top:0;background:#070d12;z-index:10;flex-wrap:wrap">
      <div class="page-hdr" style="margin:0">📋 CONTRACT TRACKER</div>
      <div style="font-size:10px;color:#4a6070">${totalDone}/${totalAll} completed</div>
      <div style="flex:1;background:#1a2530;height:4px;border-radius:2px;margin:0 10px">
        <div style="width:${Math.round(totalDone/totalAll*100)}%;height:100%;background:linear-gradient(90deg,#00e5ff,#39ff14);border-radius:2px"></div>
      </div>
      <button onclick="if(confirm('Reset all contracts?')){completedContracts={};saveContracts();renderContracts();}" style="padding:4px 10px;border:1px solid #ff006e;color:#ff006e;background:transparent;cursor:pointer;font-family:inherit;font-size:9px">↺ RESET</button>
    </div>
    <div style="padding:16px 20px">
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
        ${["All",...factions].map(f=>{
          const fc = FC[f]||{color:"#4a6070"};
          return`<button onclick="contractFilter='${f}';renderContracts()" style="padding:4px 12px;border:1px solid ${contractFilter===f?(f==="All"?"#00e5ff":fc.color):"#1a2530"};color:${contractFilter===f?(f==="All"?"#00e5ff":fc.color):"#4a6070"};background:transparent;cursor:pointer;font-family:inherit;font-size:9px;letter-spacing:1px;transition:all .2s">${f}</button>`;
        }).join("")}
      </div>
      ${factions.filter(f=>contractFilter==="All"||contractFilter===f).map(faction=>{
        const fc = FC[faction]||{color:"#4a6070"};
        const cs = CONTRACTS_DATA[faction];
        const done = cs.filter(c=>completedContracts[c.id]).length;
        return`<div style="margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid ${fc.color}44">
            <div style="font-family:'Orbitron',monospace;font-size:10px;color:${fc.color};letter-spacing:2px">${faction}</div>
            <div style="font-size:8.5px;color:#4a6070">${done}/${cs.length}</div>
          </div>
          ${cs.map(c=>{
            const done = completedContracts[c.id];
            return`<div class="contract-row${done?" done":""}" onclick="completedContracts['${c.id}']=!completedContracts['${c.id}'];if(!completedContracts['${c.id}'])delete completedContracts['${c.id}'];saveContracts();renderContracts()">
              <div class="contract-check">${done?"✓":""}</div>
              <div style="flex:1">
                <div style="font-size:9.5px;color:${done?"#4a6070":"#c8d8e8"};margin-bottom:2px">${c.name}</div>
                <div style="font-size:8.5px;color:#4a6070;margin-bottom:2px">${c.desc}</div>
                <div style="font-size:8px;color:${fc.color}">Reward: ${c.reward}</div>
              </div>
              <div style="font-size:8px;padding:1px 5px;border:1px solid ${fc.color}44;color:#4a6070">R${c.rank}+</div>
            </div>`;
          }).join("")}
        </div>`;
      }).join("")}
    </div>`;
}