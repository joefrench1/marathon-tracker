const AMMO_DATA = {
  "Light Rounds":   {color:"#c8d8e8", perStack:60, stackSize:"60 rounds",source:"Common — all containers"},
  "Heavy Rounds":   {color:"#ffd600", perStack:30, stackSize:"30 rounds",source:"Munitions Crates, Arms Locker"},
  "MIPS Rounds":    {color:"#4a9eff", perStack:20, stackSize:"20 rounds",source:"Precision Rifle caches, Armory"},
  "Volt Battery":   {color:"#39ff14", perStack:40, stackSize:"40 cells",source:"Volt weapon caches, Traxus faction"},
  "Volt Cells":     {color:"#ff6d00", perStack:10, stackSize:"10 cells",source:"Rare — Superior containers only"},
  "Shells":         {color:"#ff4444", perStack:16, stackSize:"16 shells",source:"Arms Locker, Lockdown events"},
};

const RUN_DURATION_OPTS = [
  {label:"Short (10 min)",factor:0.8},
  {label:"Standard (20 min)",factor:1},
  {label:"Long (35 min)",factor:1.8},
  {label:"Full Loot (50 min+)",factor:2.5},
];

let ammoWeapon1 = "", ammoWeapon2 = "", ammoDuration = 1, ammoStyle = "balanced";

function renderAmmo(){
  const el = document.getElementById("ammov");
  const WD = WEAPONS_DATA||[];
  
  el.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;position:sticky;top:0;background:#070d12;z-index:10">
      <div class="page-hdr">🔹 AMMO CALCULATOR</div>
      <div class="page-sub" style="margin:4px 0 0">Select your weapons and run length — get your optimal ammo stack count</div>
    </div>
    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div>
        <div class="card" style="margin-bottom:12px">
          <div class="card-hdr" style="color:#ffd600">⚙️ LOADOUT</div>
          <div style="margin-bottom:10px">
            <div style="font-size:15px;color:#4a6070;margin-bottom:4px">PRIMARY WEAPON</div>
            <select onchange="ammoWeapon1=this.value;renderAmmo()" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:16px">
              <option value="">-- Select Primary --</option>
              ${WD.map(w=>`<option value="${w.id}" ${ammoWeapon1===w.id?"selected":""}>${w.name} (${w.ammo})</option>`).join("")}
            </select>
          </div>
          <div style="margin-bottom:10px">
            <div style="font-size:15px;color:#4a6070;margin-bottom:4px">SECONDARY WEAPON</div>
            <select onchange="ammoWeapon2=this.value;renderAmmo()" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:16px">
              <option value="">-- Select Secondary --</option>
              ${WD.map(w=>`<option value="${w.id}" ${ammoWeapon2===w.id?"selected":""}>${w.name} (${w.ammo})</option>`).join("")}
            </select>
          </div>
          <div style="margin-bottom:10px">
            <div style="font-size:15px;color:#4a6070;margin-bottom:4px">RUN DURATION</div>
            <select onchange="ammoDuration=parseInt(this.value);renderAmmo()" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:16px">
              ${RUN_DURATION_OPTS.map((d,i)=>`<option value="${i}" ${ammoDuration===i?"selected":""}>${d.label}</option>`).join("")}
            </select>
          </div>
          <div>
            <div style="font-size:15px;color:#4a6070;margin-bottom:4px">PLAYSTYLE</div>
            <div style="display:flex;gap:6px">
              ${[["balanced","Balanced"],["aggressive","Aggressive"],["stealth","Stealth/Loot"]].map(([v,l])=>`
                <button onclick="ammoStyle='${v}';renderAmmo()" style="flex:1;padding:5px;border:1px solid ${ammoStyle===v?"#00e5ff":"#1a2530"};color:${ammoStyle===v?"#00e5ff":"#4a6070"};background:transparent;cursor:pointer;font-family:inherit;font-size:8.5px;transition:all .2s">${l}</button>`).join("")}
            </div>
          </div>
        </div>
        ${renderAmmoResults()}
      </div>
      <div>
        <div class="card" style="margin-bottom:10px">
          <div class="card-hdr" style="color:#00e5ff">📦 AMMO TYPES GUIDE</div>
          ${Object.entries(AMMO_DATA).map(([name,d])=>`
            <div style="margin-bottom:8px;padding:6px 8px;border-left:2px solid ${d.color}">
              <div style="display:flex;justify-content:space-between;margin-bottom:2px">
                <span style="font-size:9.5px;color:${d.color}">${name}</span>
                <span style="font-size:15px;color:#4a6070">${d.stackSize}/stack</span>
              </div>
              <div style="font-size:8.5px;color:#4a6070">${d.source}</div>
            </div>`).join("")}
        </div>
        <div class="card" style="border-left:3px solid #ffd600">
          <div class="card-hdr" style="color:#ffd600">💡 AMMO TIPS</div>
          <div style="font-size:16px;color:#8aa0b0;line-height:1.8">
            • Never carry more than 3 stacks of any ammo type — space is loot<br>
            • MIPS Rounds are rare — pick up every stack you find<br>
            • Volt Cells (not Battery) are extremely rare — hoard them<br>
            • Shells have great firepower per stack — bring 2 minimum<br>
            • Aggressive play = double the ammo estimate<br>
            • You'll find ammo in-raid — start lighter for looting runs
          </div>
        </div>
      </div>
    </div>`;
}

function renderAmmoResults(){
  const WD = WEAPONS_DATA||[];
  const w1 = WD.find(w=>w.id===ammoWeapon1);
  const w2 = WD.find(w=>w.id===ammoWeapon2);
  if(!w1&&!w2) return `<div class="card" style="color:#4a6070;font-size:16px;text-align:center;padding:20px">Select weapons above to calculate ammo</div>`;
  
  const factor = RUN_DURATION_OPTS[ammoDuration].factor;
  const styleMult = {balanced:1, aggressive:1.8, stealth:0.6}[ammoStyle]||1;
  
  const results = {};
  [w1,w2].filter(Boolean).forEach(w=>{
    const base = Math.ceil(w.mag * (w.rof/60) * 4 * factor * styleMult / (AMMO_DATA[w.ammo]?.perStack||30));
    results[w.ammo] = (results[w.ammo]||0) + base;
  });
  
  return `<div class="card" style="border-color:#39ff14;border-left:3px solid #39ff14">
    <div class="card-hdr" style="color:#39ff14">📊 RECOMMENDED LOADOUT</div>
    ${Object.entries(results).map(([ammo,stacks])=>{
      const ad = AMMO_DATA[ammo];
      const capped = Math.min(stacks, 4);
      return`<div class="ammo-result">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <span style="color:${ad?.color||"#c8d8e8"};font-size:16px;font-weight:700">${ammo}</span>
          <span style="font-size:20px;font-weight:700;color:${ad?.color||"#c8d8e8"};font-family:'Orbitron',monospace">${capped}x</span>
        </div>
        <div style="font-size:8.5px;color:#4a6070">≈ ${capped*(ad?.perStack||30)} rounds · ${ad?.stackSize||""}/stack</div>
        ${stacks>4?`<div style="font-size:15px;color:#ff6d00;margin-top:3px">⚠ Calc suggests ${stacks} stacks — capped at 4 for space</div>`:""}
      </div>`;
    }).join("")}
    <div style="font-size:16px;color:#4a6070;margin-top:8px;padding-top:8px;border-top:1px solid #1a2530">
      Based on: ${RUN_DURATION_OPTS[ammoDuration].label} · ${ammoStyle} playstyle
    </div>
  </div>`;
}
