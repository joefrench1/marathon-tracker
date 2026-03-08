// ══════════════════════════════════════════
// GUNS & ITEMS PAGE
// ══════════════════════════════════════════
const RARITY_COL={Standard:"#8aa0b0",Enhanced:"#39ff14",Deluxe:"#4a9eff",Superior:"#bf5af2",Prestige:"#ffd600"};
const AMMO_COL={"Light Rounds":"#c8d8e8","Heavy Rounds":"#ffd600","MIPS Rounds":"#4a9eff","Volt Battery":"#39ff14","Volt Cells":"#ff6d00","Shells":"#ff4444"};

const WEAPONS_DATA=[
  // ── ASSAULT RIFLES ──
  {id:"overrun",name:"Overrun AR",type:"Assault Rifle",tier:"S",ammo:"Light Rounds",
   dmg:28,rof:680,mag:30,range:65,handling:72,reload:2.1,
   desc:"The most common weapon on Tau Ceti. High fire rate, decent handling, poor damage. Reliable starter gun — easy to mod into something respectable.",
   find:["All maps — containers, enemy drops, Armory"],
   mods:["Chip","Magazine","Grip","Barrel"],
   bestMods:["Extended Feather Mag","Combat Grip","Precision Barrel"],
   bestFor:["Rook","Recon","Triage"],tip:"Best all-rounder. With a Magazine Mod this becomes a top-tier sustained DPS weapon.",emoji:"🔫"},
  {id:"m77",name:"M77 Assault Rifle",type:"Assault Rifle",tier:"S",ammo:"Light Rounds",
   dmg:38,rof:580,mag:25,range:72,handling:68,reload:2.3,
   desc:"Strong damage output, solid range, predictable recoil. One of the best all-rounders in the game. Fits Chip+Grip+Magazine making it very moddable.",
   find:["Perimeter — UESC outpost crates","Priority Target events","Armory (Rank 5+)"],
   mods:["Chip","Magazine","Grip"],
   bestMods:["Combat Grip","Extended Feather Mag","Motionsense Chip"],
   bestFor:["Destroyer","Recon","Vandal"],tip:"Meta pick. The 3-slot mod setup lets you tune this gun precisely to your playstyle.",emoji:"🔫"},
  {id:"impact",name:"Impact HAR",type:"Assault Rifle",tier:"A",ammo:"Heavy Rounds",
   dmg:48,rof:480,mag:20,range:68,handling:58,reload:2.6,
   desc:"Heavy assault rifle with reinforced frame. Higher damage per bullet than M77 but slower. Good for methodical players who land shots.",
   find:["Dire Marsh — military zones","Superior+ containers"],
   mods:["Chip","Barrel","Magazine"],
   bestMods:["Precision Barrel","Hollow-Case Rounds","Motionsense Chip"],
   bestFor:["Destroyer","Assassin"],tip:"Pairs well with a close-range shotgun secondary. Lets you play mid-range dominant.",emoji:"🔫"},
  {id:"v75",name:"V75 Scar AR",type:"Assault Rifle",tier:"B",ammo:"Volt Battery",
   dmg:35,rof:600,mag:28,range:60,handling:66,reload:2.4,
   desc:"Volt-actuated AR with tracking projectiles. Sustained fire overheats and lowers fire rate — burst fire to maintain optimal RPM. Breaks shields, triggers Triage EMP.",
   find:["All maps — volt weapon caches","Traxus faction rewards"],
   mods:["Chip","Magazine","Grip"],
   bestMods:["Extended Feather Mag","Tapered Heatsink Chip"],
   bestFor:["Triage (EMP synergy)","Vandal"],tip:"Volt drain rule: reload only when empty or you lose remaining charge.",emoji:"⚡"},
  // ── SMGs ──
  {id:"brrt",name:"BRRT SMG",type:"SMG",tier:"S",ammo:"Light Rounds",
   dmg:22,rof:860,mag:20,range:38,handling:82,reload:1.7,
   desc:"Fastest sustained fire rate of any SMG. Devastating in CQC, melts shields fast. 20-round mag feels small at 860 RPM — Magazine Mod is near-mandatory.",
   find:["All maps — common drop","Armory (Rank 1)"],
   mods:["Chip","Magazine","Grip"],
   bestMods:["Extended Feather Mag","Combat Grip","Keen Scout Chip"],
   bestFor:["Vandal","Assassin","Thief"],tip:"With a Mag Mod this jumps to S+ tier. Essential flanking weapon.",emoji:"🔫"},
  {id:"bully",name:"Bully SMG",type:"SMG",tier:"A",ammo:"Heavy Rounds",
   dmg:34,rof:580,mag:18,range:42,handling:74,reload:1.9,
   desc:"Slower fire rate than BRRT but hits much harder per bullet. Rewards good tracking and aim. Great early game pick for aggressive players.",
   find:["Perimeter — patrol crates","Boss drops"],
   mods:["Chip","Magazine","Barrel"],
   bestMods:["Hollow-Case Rounds","Precision Barrel"],
   bestFor:["Destroyer","Vandal"],tip:"Heavy Rounds ammo can be a supply problem — always watch your reserves.",emoji:"🔫"},
  {id:"v22",name:"V22 Volt Thrower",type:"SMG",tier:"B",ammo:"Volt Battery",
   dmg:26,rof:720,mag:24,range:35,handling:84,reload:1.6,
   desc:"Auto-lock smart targeting system makes this easy to use. Overheat mechanic slows fire rate if you hold the trigger too long — burst fire.",
   find:["Volt caches","MIDA faction armory"],
   mods:["Chip","Grip"],
   bestMods:["Combat Grip","Torch Bug Chip"],
   bestFor:["Vandal","Recon"],tip:"Legendary Chip Mod embeds slow projectiles that detonate simultaneously for burst damage.",emoji:"⚡"},
  // ── SHOTGUNS ──
  {id:"wstr",name:"WSTR Combat Shotgun",type:"Shotgun",tier:"S",ammo:"Shells",
   dmg:172,rof:90,mag:6,range:18,handling:65,reload:3.2,
   pellets:10,spread:8,
   desc:"Point-blank dominance. Nothing beats burst output inside 4 meters. Double-barrel design — point blank this has 172.5 firepower with 10 pellets. Falls off sharply at range.",
   find:["All maps — shotgun crates","Lockdown events"],
   mods:["Chip","Magazine","Barrel"],
   bestMods:["Choke Barrel (range+spread)","Extended Feather Mag","Keen Scout Chip"],
   bestFor:["Destroyer","Assassin","Vandal"],tip:"The meta combo: shotgun close + AR/PR mid-long. Classic loadout that dominates.",emoji:"💥"},
  {id:"misriah",name:"Misriah 2442",type:"Shotgun",tier:"A",ammo:"Shells",
   dmg:140,rof:120,mag:5,range:22,handling:68,reload:2.9,
   pellets:8,spread:12,
   desc:"Pump-action. Faster follow-up shots than WSTR and slightly more forgiving at distance. Good choice if you struggle with WSTR's tight effective range.",
   find:["Perimeter","Priority Target rewards"],
   mods:["Chip","Barrel","Magazine"],
   bestMods:["Precision Barrel","Choke Barrel"],
   bestFor:["Destroyer","Rook"],tip:"With a Choke mod this is dangerous at surprisingly long ranges for a shotgun.",emoji:"💥"},
  {id:"v85",name:"V85 Circuit Breaker",type:"Shotgun",tier:"A",ammo:"Volt Battery",
   dmg:185,rof:75,mag:4,range:15,handling:58,reload:3.8,
   pellets:12,spread:6,
   desc:"Highest firepower stat in the shotgun category. Requires charge management — full charge delivers devastating burst. Tight spread makes it lethal at short range.",
   find:["Superior+ containers","Cryo Archive"],
   mods:["Chip","Barrel"],
   bestMods:["Tapered Heatsink","Choke Barrel"],
   bestFor:["Destroyer","Vandal"],tip:"Volt drain rule: never reload on a partial battery. Master the charge timing.",emoji:"⚡"},
  // ── PRECISION RIFLES ──
  {id:"hardline",name:"Hardline PR",type:"Precision Rifle",tier:"S",ammo:"MIPS Rounds",
   dmg:85,rof:200,mag:12,range:88,handling:62,reload:2.4,
   desc:"Semi-auto precision powerhouse. Excellent damage per shot at mid-to-long range. Works in nearly every loadout as a reliable secondary.",
   find:["All maps — precision rifle caches","Armory (Rank 3+)"],
   mods:["Chip","Magazine","Optic"],
   bestMods:["Midsight Optic","Extended Feather Mag","Motionsense Chip"],
   bestFor:["Recon","Triage","Destroyer"],tip:"The most universally strong weapon in the game. If in doubt, run Hardline PR.",emoji:"🎯"},
  {id:"copperhead",name:"Copperhead RF",type:"Precision Rifle",tier:"A",ammo:"Light Rounds",
   dmg:65,rof:280,mag:15,range:78,handling:70,reload:2.1,
   desc:"Lighter precision rifle using common Light Rounds. Better ammo economy than Hardline. Good for players who want a PR without MIPS dependency.",
   find:["Dire Marsh","Armory refreshes"],
   mods:["Chip","Magazine","Optic"],
   bestMods:["Midsight Optic Deluxe","Keen Scout Chip"],
   bestFor:["Recon","Thief"],tip:"Light Rounds ammo is everywhere — great for long runs where ammo conservation matters.",emoji:"🎯"},
  {id:"br33",name:"BR33 Volley Rifle",type:"Precision Rifle",tier:"A",ammo:"MIPS Rounds",
   dmg:72,rof:240,mag:10,range:82,handling:65,reload:2.3,
   desc:"Burst-fire precision rifle. Fire 3 rounds per trigger pull. Higher DPS ceiling than Hardline if all bursts land, but punishing if you miss.",
   find:["Priority events","Superior containers"],
   mods:["Chip","Optic","Barrel"],
   bestMods:["Precision Barrel","Midsight Optic"],
   bestFor:["Recon","Assassin"],tip:"Burst fire means accuracy is paramount. Great at medium range where you can control engagements.",emoji:"🎯"},
  // ── SNIPER RIFLES ──
  {id:"longshot",name:"Longshot",type:"Sniper Rifle",tier:"A",ammo:"MIPS Rounds",
   dmg:150,rof:80,mag:5,range:98,handling:45,reload:3.1,
   desc:"Semi-auto sniper rifle. Follow-up shot potential makes it more forgiving than bolt-action options. Strong across all long-range scenarios.",
   find:["High-ground zones","MIDA rewards"],
   mods:["Chip","Optic","Magazine"],
   bestMods:["Midsight Optic Deluxe","Extended Feather Mag"],
   bestFor:["Recon","Assassin"],tip:"Pairs with Recon's Echo Pulse perfectly — reveal with pulse, pick off from long range.",emoji:"🔭"},
  {id:"outland",name:"Outland",type:"Sniper Rifle",tier:"A",ammo:"MIPS Rounds",
   dmg:210,rof:40,mag:3,range:100,handling:38,reload:3.8,
   desc:"Bolt-action precision. Highest damage per shot in the sniper category. Cannot afford to miss — slow rechamber punishes every mistake. Will be the bane of ranked lobbies.",
   find:["Cryo Archive","Prestige supply crates"],
   mods:["Chip","Optic"],
   bestMods:["Midsight Optic Deluxe","Flash Draw Chip"],
   bestFor:["Recon"],tip:"Bring this only when you're confident in your aim. Missing means you die.",emoji:"🔭"},
  {id:"v99",name:"V99 Channel Rifle",type:"Sniper Rifle",tier:"A",ammo:"Volt Cells",
   dmg:180,rof:55,mag:4,range:96,handling:42,reload:3.5,
   desc:"Charge-based volt sniper with the highest precision multiplier in the class. Adds a 3rd charge level: fully charged delivers piercing, ricocheting rounds with massive damage.",
   find:["Volt caches — rare","Cryo Archive"],
   mods:["Chip","Optic","Barrel"],
   bestMods:["Extended Charge Chip","Midsight Optic Deluxe"],
   bestFor:["Recon"],tip:"Third charge level allows round piercing and ricochet — devastating in corridors.",emoji:"⚡"},
  // ── LMGs ──
  {id:"retaliator",name:"Retaliator LMG",type:"LMG",tier:"A",ammo:"Heavy Rounds",
   dmg:42,rof:620,mag:60,range:55,handling:40,reload:4.2,
   desc:"High capacity suppression weapon. Excellent for area denial and sustained fire. Poor mobility and reload make it a commitment.",
   find:["Military zones","Lockdown events"],
   mods:["Chip","Magazine","Shield"],
   bestMods:["Extended Feather Mag","Combat Grip","Motionsense Chip"],
   bestFor:["Destroyer"],tip:"Shield mod slot unique to LMGs — adds a deployable shield effect for short periods.",emoji:"🔫"},
  {id:"conquest",name:"Conquest LMG",type:"LMG",tier:"B",ammo:"Light Rounds",
   dmg:30,rof:700,mag:75,range:50,handling:38,reload:4.8,
   desc:"Lightest LMG in the category. High ammo capacity, common ammo type, but damage is too low to justify the bulk. Typically discarded for specialised weapons.",
   find:["Common containers"],
   mods:["Chip","Magazine","Shield"],
   bestMods:["Extended Feather Mag","Shield Mod"],
   bestFor:["Destroyer (crowd control)"],tip:"Best used for AI clearing, not PvP. Its ammo economy is the only real advantage.",emoji:"🔫"},
  // ── RAILGUNS ──
  {id:"ares",name:"Ares RG",type:"Railgun",tier:"S",ammo:"Volt Cells",
   dmg:280,rof:25,mag:2,range:100,handling:35,reload:5.0,
   desc:"Magnetically accelerated projectiles. Extreme damage, zero damage falloff at range. Limited ammo, strict timing, and Volt Cell scarcity are the costs. Worth it.",
   find:["Cryo Archive","Prestige supply events"],
   mods:["Chip","Barrel"],
   bestMods:["Extended Charge Chip","Precision Barrel"],
   bestFor:["Recon","Destroyer"],tip:"Volt Cells are rare — never waste a shot. Pre-charge while moving between positions.",emoji:"⚡"},
  // ── PISTOLS ──
  {id:"magnum",name:"Magnum MC",type:"Pistol",tier:"A",ammo:"Heavy Rounds",
   dmg:75,rof:160,mag:8,range:45,handling:80,reload:1.4,
   desc:"Hand cannon energy. Hits hard, especially headshots. Best range of any pistol. Meta doesn't favour sidearms vs dual primaries, but fun and viable for skilled players.",
   find:["Armory (Rank 1)","All containers"],
   mods:["Chip","Barrel"],
   bestMods:["Precision Barrel","Flash Draw Chip"],
   bestFor:["Any as backup"],tip:"Dual primary (AR+Shotgun or AR+PR) almost always outperforms pistol secondary — use only if you prefer the feel.",emoji:"🔫"},
  {id:"ce_tactical",name:"CE Tactical Sidearm",type:"Pistol",tier:"C",ammo:"Light Rounds",
   dmg:32,rof:240,mag:12,range:35,handling:88,reload:1.2,
   desc:"Beginner pistol. Fast, forgiving, accurate for its class — but damage is far too low to threaten geared players. Rook's starting weapon. Prestige tier has legendary invisibility-on-kill Chip.",
   find:["Starter loadout","All containers (Common)"],
   mods:["Chip","Magazine"],
   bestMods:["Prestige Chip (invisibility on kill + reload)"],
   bestFor:["Rook (early game)"],tip:"The Prestige Chip Mod (invisibility on reload after kill) is genuinely game-changing for Rook.",emoji:"🔫"},
];

const ITEMS_DATA=[
  // HEALING
  {id:"patch_dep",name:"Depleted Patch Kit",cat:"Healing",col:"#8aa0b0",effect:"Restores a small amount of health. Cannot be exfiltrated — use immediately, never vault.",find:"Everywhere",tip:"Pop on sight, never hoard. They disappear on extract.",emoji:"💊"},
  {id:"patch_std",name:"Patch Kit",cat:"Healing",col:"#39ff14",effect:"Moderate health restore. Reliable mid-fight recovery.",find:"Medical Cabinets, Armory",tip:"Stack 3 before every raid. Triage Shareware.exe applies this to drone targets.",emoji:"💊"},
  {id:"patch_adv",name:"Advanced Patch Kit",cat:"Healing",col:"#4a9eff",effect:"Large health restore. Top-tier healing item for high-stakes runs.",find:"Superior containers, Armory (Rank 8+)",tip:"Save for after hard fights. With Triage Shareware, this heals the whole squad.",emoji:"💊"},
  {id:"pangea",name:"Pangea Kit",cat:"Healing",col:"#ffd600",effect:"Fully restores both health AND shields. Removes all hazardous status effects. Best single item in the game.",find:"Rare — Cryo Archive, boss drops",tip:"Use after a multi-fight where you have both health and shield damage. Prestige loot.",emoji:"💊"},
  {id:"shield_dep",name:"Depleted Shield Charge",cat:"Shields",col:"#8aa0b0",effect:"Minor shield restore. Cannot be exfiltrated.",find:"Everywhere",tip:"Same rule as Depleted Patch Kit — pop and drop.",emoji:"🛡️"},
  {id:"shield_std",name:"Shield Charge",cat:"Shields",col:"#39ff14",effect:"Restores shield energy to full. Takes 2 seconds to register — stay covered.",find:"Medical Cabinets, Armory",tip:"Standard loadout item. Stack 3 per run.",emoji:"🛡️"},
  {id:"shield_adv",name:"Large Shield Charge",cat:"Shields",col:"#4a9eff",effect:"Restores shields fully + grants temporary Overshield. Aggressive re-engage tool.",find:"Armory (Rank 10+), Superior containers",tip:"Use this before a push, not after you're already low.",emoji:"🛡️"},
  {id:"self_revive",name:"Self Revive",cat:"Utility",col:"#bf5af2",effect:"Revive yourself when downed. Game-changing for solo play and squad situations where teammates are occupied.",find:"Superior/Prestige containers",tip:"The single most valuable utility item in the game for solo runs.",emoji:"💉"},
  {id:"mechanics_kit",name:"Mechanic's Kit",cat:"Cleanse",col:"#ff6d00",effect:"Clears Frost, Overheat, Toxin, and Immobilize effects. Temporarily boosts Hardware stat.",find:"Situational drops in-raid",tip:"Keep one for high-hazard areas. Situational — don't pre-load unless going to hazard zones.",emoji:"🔧"},
  {id:"mechanic_adv",name:"Advanced Mechanic's Kit",cat:"Cleanse",col:"#ffd600",effect:"Same as Mechanic's Kit but Hardware stat boost lasts significantly longer.",find:"Superior containers",tip:"Worth pre-loading for Cryo Archive or high-tier raids where debuffs are frequent.",emoji:"🔧"},
  {id:"energy_amp",name:"Energy Amp",cat:"Boost",col:"#39ff14",effect:"Temporarily improves ability recharge rate. Use immediately on find — no reason to hold it.",find:"Dropped in-raid",tip:"Consume on the spot. Triage gets enormous value from this via Shareware.exe.",emoji:"⚡"},
  {id:"cardio_kick",name:"Cardio Kick",cat:"Boost",col:"#00e5ff",effect:"Increases Heat Capacity and Agility temporarily. Extends Vandal and Destroyer movement windows significantly.",find:"Dropped in-raid",tip:"Consume immediately. With Triage Shareware, this buffs your whole squad's movement.",emoji:"⚡"},
  {id:"os_debug",name:"OS Debug",cat:"Cleanse",col:"#4a9eff",effect:"Clears Hack status effects and software-based debuffs.",find:"Tech containers, UESC facility drops",tip:"Situational. Only pre-load if you expect MIDA-type enemies or electronic hazard areas.",emoji:"💻"},
];

let gunsSubPage="weapons";
let selectedWeapon=null;
let favouriteLoadouts=JSON.parse(localStorage.getItem("mara_fav_guns")||"[]");

function saveGunFavourites(){
  try{localStorage.setItem("mara_fav_guns",JSON.stringify(favouriteLoadouts));}catch(e){}
}

function renderGuns(){
  const el=document.getElementById("gv");
  if(gunsSubPage==="weapons") renderWeapons(el);
  else renderItemsPage(el);
}

function renderWeapons(el){
  const types=[...new Set(WEAPONS_DATA.map(w=>w.type))];
  let filterType=window._gunFilter||"All";
  let filterTier=window._gunTier||"All";
  let search=(window._gunSearch||"").toLowerCase();

  let filtered=WEAPONS_DATA.filter(w=>{
    if(filterType!=="All"&&w.type!==filterType)return false;
    if(filterTier!=="All"&&w.tier!==filterTier)return false;
    if(search&&!w.name.toLowerCase().includes(search)&&!w.type.toLowerCase().includes(search))return false;
    return true;
  });

  el.innerHTML=`
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:10px;flex-wrap:wrap;position:sticky;top:0;background:#070d12;z-index:10">
      <div style="font-family:'Orbitron',monospace;font-size:13px;color:#00e5ff;letter-spacing:3px">🔫 GUNS & ITEMS</div>
      <button onclick="gunsSubPage='weapons';renderGuns()" style="padding:4px 12px;border:1px solid #ffd600;color:#ffd600;background:transparent;cursor:pointer;font-family:inherit;font-size:9px">WEAPONS</button>
      <button onclick="gunsSubPage='items';renderGuns()" style="padding:4px 12px;border:1px solid #1a2530;color:#4a6070;background:transparent;cursor:pointer;font-family:inherit;font-size:9px">ITEMS</button>
      <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <input id="gun-search" placeholder="Search…" value="${window._gunSearch||""}" oninput="window._gunSearch=this.value;renderGuns()" style="background:#0d1318;border:1px solid #1a2530;color:#c8d8e8;padding:4px 8px;font-family:inherit;font-size:9px;width:120px">
        <select onchange="window._gunFilter=this.value;renderGuns()" style="background:#0d1318;border:1px solid #1a2530;color:#c8d8e8;padding:4px 8px;font-family:inherit;font-size:9px">
          <option value="All" ${filterType==="All"?"selected":""}>All Types</option>
          ${types.map(t=>`<option value="${t}" ${filterType===t?"selected":""}>${t}</option>`).join("")}
        </select>
        <select onchange="window._gunTier=this.value;renderGuns()" style="background:#0d1318;border:1px solid #1a2530;color:#c8d8e8;padding:4px 8px;font-family:inherit;font-size:9px">
          ${["All","S","A","B","C"].map(t=>`<option value="${t}" ${filterTier===t?"selected":""}>${t==="All"?"All Tiers":t+"-Tier"}</option>`).join("")}
        </select>
      </div>
    </div>
    <div style="padding:16px 20px">
      ${selectedWeapon?renderWeaponDetail():`
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px">
          ${filtered.map(w=>renderWeaponCard(w)).join("")}
        </div>
        ${favouriteLoadouts.length?`
          <div style="margin-top:20px">
            <div style="font-family:'Orbitron',monospace;font-size:10px;color:#ffd600;letter-spacing:2px;margin-bottom:10px">★ SAVED LOADOUTS</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px">
              ${favouriteLoadouts.map((f,i)=>renderSavedLoadout(f,i)).join("")}
            </div>
          </div>`:""}
      `}
    </div>`;
}

function renderWeaponCard(w){
  const tc={S:"#39ff14",A:"#ffd600",B:"#ff6d00",C:"#ff4444"}[w.tier]||"#4a6070";
  const ac=AMMO_COL[w.ammo]||"#4a6070";
  return`<div style="background:#0d1318;border:1px solid #1a2530;border-top:3px solid ${tc};cursor:pointer;transition:all .2s;padding:12px 14px" onclick="selectedWeapon='${w.id}';renderGuns()"
    onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 16px rgba(0,0,0,.5)'"
    onmouseleave="this.style.transform='';this.style.boxShadow=''">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <span style="font-size:20px">${w.emoji}</span>
      <div style="flex:1">
        <div style="font-family:'Orbitron',monospace;font-size:10px;color:#c8d8e8;letter-spacing:1px">${w.name}</div>
        <div style="font-size:8px;color:#4a6070;margin-top:1px">${w.type}</div>
      </div>
      <span style="font-size:8px;padding:2px 6px;border:1px solid ${tc};color:${tc}">${w.tier}</span>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap">
      <span style="font-size:7px;padding:1px 5px;border:1px solid ${ac};color:${ac}">${w.ammo}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px">
      ${renderStatBar("DMG",w.dmg,250,"#ff4444")}
      ${renderStatBar("ROF",w.rof,900,"#39ff14")}
      ${renderStatBar("MAG",w.mag,75,"#4a9eff")}
      ${renderStatBar("RANGE",w.range,100,"#ffd600")}
      ${renderStatBar("HANDLING",w.handling,100,"#bf5af2")}
      ${renderStatBar("RELOAD",100-(w.reload/5*100),100,"#ff6d00")}
    </div>
    <div style="font-size:8.5px;color:#4a6070;margin-top:8px;line-height:1.5;border-top:1px solid #1a2530;padding-top:6px">${w.desc.substring(0,90)}…</div>
  </div>`;
}

function renderStatBar(label,val,max,col){
  const pct=Math.min(100,Math.round(val/max*100));
  return`<div>
    <div style="font-size:7px;color:#4a6070;margin-bottom:2px">${label}</div>
    <div style="height:3px;background:#1a2530;border-radius:1px">
      <div style="height:100%;width:${pct}%;background:${col};border-radius:1px"></div>
    </div>
  </div>`;
}

function renderWeaponDetail(){
  const w=WEAPONS_DATA.find(x=>x.id===selectedWeapon);if(!w)return"";
  const tc={S:"#39ff14",A:"#ffd600",B:"#ff6d00",C:"#ff4444"}[w.tier]||"#4a6070";
  const ac=AMMO_COL[w.ammo]||"#4a6070";
  const isFav=favouriteLoadouts.some(f=>f.weaponId===w.id);
  return`
    <div style="cursor:pointer;font-size:9px;color:#4a6070;margin-bottom:14px;letter-spacing:1px" onclick="selectedWeapon=null;renderGuns()">← BACK TO ALL WEAPONS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${w.emoji}</span>
          <div>
            <div style="font-family:'Orbitron',monospace;font-size:16px;color:#c8d8e8;letter-spacing:2px">${w.name}</div>
            <div style="font-size:9px;color:#4a6070;margin-top:2px">${w.type}</div>
            <div style="display:flex;gap:6px;margin-top:5px">
              <span style="font-size:8px;padding:2px 6px;border:1px solid ${tc};color:${tc}">${w.tier}-TIER</span>
              <span style="font-size:8px;padding:2px 6px;border:1px solid ${ac};color:${ac}">${w.ammo}</span>
            </div>
          </div>
        </div>
        <div style="font-size:9.5px;color:#8aa0b0;line-height:1.7;margin-bottom:12px;padding:10px;background:#0d1318;border:1px solid #1a2530;border-left:3px solid ${tc}">${w.desc}</div>
        <div style="background:#0d1318;border:1px solid #1a2530;padding:12px;margin-bottom:10px">
          <div style="font-family:'Orbitron',monospace;font-size:9px;color:#ffd600;margin-bottom:10px">📊 BASE STATS</div>
          ${[["Damage",w.dmg,250,"#ff4444"],["Fire Rate (RPM)",w.rof,900,"#39ff14"],["Magazine",w.mag,75,"#4a9eff"],["Range",w.range,100,"#ffd600"],["Handling",w.handling,100,"#bf5af2"],["Reload Speed",(100-(w.reload/5*100)).toFixed(0),100,"#ff6d00"]].map(([l,v,m,c])=>`
            <div style="margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;font-size:8.5px;margin-bottom:3px">
                <span style="color:#4a6070">${l}</span><span style="color:${c}">${l==="Reload Speed"?w.reload+"s":v}</span>
              </div>
              <div style="height:4px;background:#1a2530;border-radius:2px">
                <div style="height:100%;width:${Math.min(100,Math.round(Number(v)/m*100))}%;background:${c};border-radius:2px"></div>
              </div>
            </div>`).join("")}
          ${w.pellets?`<div style="display:flex;gap:14px;font-size:8.5px;color:#4a6070;margin-top:4px">
            <span>Pellets: <span style="color:#c8d8e8">${w.pellets}</span></span>
            <span>Spread: <span style="color:#c8d8e8">${w.spread}°</span></span>
          </div>`:""}
        </div>
        <div style="background:#0d1318;border:1px solid #1a2530;padding:12px;margin-bottom:10px">
          <div style="font-family:'Orbitron',monospace;font-size:9px;color:#00e5ff;margin-bottom:8px">📍 WHERE TO FIND</div>
          ${w.find.map(f=>`<div style="font-size:9px;color:#8aa0b0;margin-bottom:4px;padding-left:8px;border-left:2px solid #1a2530">• ${f}</div>`).join("")}
        </div>
      </div>
      <div>
        <div style="background:#0d1318;border:1px solid #1a2530;padding:12px;margin-bottom:10px">
          <div style="font-family:'Orbitron',monospace;font-size:9px;color:#bf5af2;margin-bottom:8px">🔩 MOD SLOTS</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
            ${w.mods.map(m=>`<span style="font-size:8px;padding:3px 8px;border:1px solid #bf5af2;color:#bf5af2">${m}</span>`).join("")}
          </div>
          <div style="font-family:'Orbitron',monospace;font-size:8px;color:#39ff14;margin-bottom:6px">★ BEST MODS</div>
          ${w.bestMods.map(m=>`<div style="font-size:9px;color:#8aa0b0;margin-bottom:4px;padding:4px 8px;border-left:2px solid #39ff14">◈ ${m}</div>`).join("")}
        </div>
        <div style="background:#0d1318;border:1px solid #1a2530;padding:12px;margin-bottom:10px">
          <div style="font-family:'Orbitron',monospace;font-size:9px;color:#ff6d00;margin-bottom:8px">🏃 BEST FOR</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px">
            ${w.bestFor.map(r=>`<span style="font-size:8px;padding:3px 8px;border:1px solid #ff6d00;color:#ff6d00">${r}</span>`).join("")}
          </div>
        </div>
        <div style="background:#0d1318;border:1px solid #1a2530;padding:12px;margin-bottom:10px;border-left:3px solid #ffd600">
          <div style="font-family:'Orbitron',monospace;font-size:9px;color:#ffd600;margin-bottom:6px">💡 PRO TIP</div>
          <div style="font-size:9.5px;color:#8aa0b0;line-height:1.6">${w.tip}</div>
        </div>
        <div style="background:#0d1318;border:1px solid #1a2530;padding:12px;margin-bottom:10px">
          <div style="font-family:'Orbitron',monospace;font-size:9px;color:#4a9eff;margin-bottom:8px">RARITY EFFECTS</div>
          ${["Standard","Enhanced","Deluxe","Superior","Prestige"].map((r,i)=>{
            const rc=RARITY_COL[r];
            const bonuses=["Base stats, basic Chip","Better Chip, 1 pre-slotted mod","Improved Chip perks, 2 mods","Powerful Chip ability, 3 mods","Unique legendary Chip — game-changing perk"][i];
            return`<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:5px">
              <span style="font-size:7px;padding:1px 5px;border:1px solid ${rc};color:${rc};flex-shrink:0;margin-top:1px">${r.toUpperCase()}</span>
              <span style="font-size:8.5px;color:#8aa0b0">${bonuses}</span>
            </div>`;
          }).join("")}
        </div>
        <button onclick="saveLoadout('${w.id}')" style="width:100%;padding:8px;border:1px solid ${isFav?"#ff006e":"#ffd600"};color:${isFav?"#ff006e":"#ffd600"};background:transparent;cursor:pointer;font-family:inherit;font-size:9px;letter-spacing:1px;transition:all .2s">
          ${isFav?"✕ REMOVE FROM FAVOURITES":"★ SAVE TO FAVOURITES"}
        </button>
      </div>
    </div>`;
}

function renderSavedLoadout(f,i){
  const w=WEAPONS_DATA.find(x=>x.id===f.weaponId);
  if(!w)return"";
  const tc={S:"#39ff14",A:"#ffd600",B:"#ff6d00",C:"#ff4444"}[w.tier]||"#4a6070";
  return`<div style="background:#0d1318;border:1px solid #1a2530;border-left:3px solid #ffd600;padding:10px 12px;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">${w.emoji}</span>
    <div style="flex:1">
      <div style="font-size:9px;color:${tc}">${w.name}</div>
      <div style="font-size:8px;color:#4a6070">${w.type} · ${w.tier}-Tier</div>
    </div>
    <button onclick="selectedWeapon='${w.id}';renderGuns()" style="font-size:8px;padding:3px 8px;border:1px solid #1a2530;color:#c8d8e8;background:transparent;cursor:pointer;font-family:inherit">VIEW</button>
    <button onclick="favouriteLoadouts.splice(${i},1);saveGunFavourites();renderGuns()" style="font-size:8px;padding:3px 8px;border:1px solid #ff006e;color:#ff006e;background:transparent;cursor:pointer;font-family:inherit">✕</button>
  </div>`;
}

function saveLoadout(weaponId){
  const exists=favouriteLoadouts.findIndex(f=>f.weaponId===weaponId);
  if(exists>=0) favouriteLoadouts.splice(exists,1);
  else favouriteLoadouts.push({weaponId,saved:new Date().toISOString()});
  saveGunFavourites();
  renderGuns();
}

function renderItemsPage(el){
  const cats=[...new Set(ITEMS_DATA.map(i=>i.cat))];
  el.innerHTML=`
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:10px;position:sticky;top:0;background:#070d12;z-index:10">
      <div style="font-family:'Orbitron',monospace;font-size:13px;color:#00e5ff;letter-spacing:3px">💊 ITEMS & CONSUMABLES</div>
      <button onclick="gunsSubPage='weapons';renderGuns()" style="padding:4px 12px;border:1px solid #1a2530;color:#4a6070;background:transparent;cursor:pointer;font-family:inherit;font-size:9px;margin-left:auto">WEAPONS</button>
      <button onclick="gunsSubPage='items';renderGuns()" style="padding:4px 12px;border:1px solid #ffd600;color:#ffd600;background:transparent;cursor:pointer;font-family:inherit;font-size:9px">ITEMS</button>
    </div>
    <div style="padding:16px 20px">
      ${cats.map(cat=>`
        <div style="margin-bottom:20px">
          <div style="font-family:'Orbitron',monospace;font-size:10px;color:#4a6070;letter-spacing:2px;margin-bottom:10px;border-bottom:1px solid #1a2530;padding-bottom:6px">${cat.toUpperCase()}</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px">
            ${ITEMS_DATA.filter(i=>i.cat===cat).map(item=>`
              <div style="background:#0d1318;border:1px solid #1a2530;border-left:3px solid ${item.col};padding:10px 12px;cursor:default;position:relative"
                onmouseenter="showItemTT(event,'${item.id}')" onmouseleave="hideTT()" onmousemove="moveTT(event)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
                  <span style="font-size:18px">${item.emoji}</span>
                  <div>
                    <div style="font-size:9.5px;color:${item.col};font-weight:700">${item.name}</div>
                    <div style="font-size:7.5px;color:#4a6070">${item.cat}</div>
                  </div>
                </div>
                <div style="font-size:9px;color:#8aa0b0;line-height:1.5">${item.effect}</div>
                <div style="font-size:8px;color:#4a6070;margin-top:5px;border-top:1px solid #1a2530;padding-top:4px">📍 ${item.find}</div>
              </div>`).join("")}
          </div>
        </div>`).join("")}
    </div>`;
}

function showItemTT(e,id){
  const item=ITEMS_DATA.find(x=>x.id===id);if(!item)return;
  const tt=document.getElementById("tt");
  tt.innerHTML=`<div style="font-size:9px;color:${item.col};font-family:'Orbitron',monospace;margin-bottom:6px">${item.emoji} ${item.name}</div>
    <div style="font-size:9px;color:#c8d8e8;margin-bottom:6px">${item.effect}</div>
    <div style="font-size:8px;color:#39ff14;padding:4px 6px;border-left:2px solid #39ff14;margin-bottom:4px">💡 ${item.tip}</div>
    <div style="font-size:8px;color:#4a6070">📍 ${item.find}</div>`;
  tt.style.display="block";moveTT(e);
}
const SB_URL="https://ppzulorxyiwkzhfeubhr.supabase.co";
const SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwenVsb3J4eWl3a3poZmV1YmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjA1MzA2MjQwMH0.placeholder";
// NOTE: Replace SB_KEY above with your actual anon/public JWT key from Supabase → Settings → API → anon public key

let sessionCode=null, playerName=null, sqPollTimer=null, squadPlayers={};
let widgetOpen=true;

function sbHeaders(){
  return{"apikey":SB_KEY,"Authorization":"Bearer "+SB_KEY,"Content-Type":"application/json","Prefer":"return=minimal"};
}

async function sbReq(path,opts={}){
  try{
    const res=await fetch(SB_URL+path,{headers:sbHeaders(),...opts});
    if(res.status===204||res.status===200){
      try{return await res.json();}catch{return null;}
    }
    const txt=await res.text();
    console.error("Supabase error",res.status,txt);
    return null;
  }catch(e){
    console.error("Network error:",e);
    return null;
  }
}

function initSquad(){
  const params=new URLSearchParams(window.location.search);
  const code=params.get("session");
  if(code){
    document.getElementById("sq-code-input").value=code.toUpperCase();
    showJoinUI();
  }
}

function toggleSquadWidget(){
  widgetOpen=!widgetOpen;
  document.getElementById("squad-widget-body").style.display=widgetOpen?"block":"none";
  document.getElementById("sq-chevron").textContent=widgetOpen?"▲":"▼";
}

function showJoinUI(){document.getElementById("sq-join-ui").style.display="block";}

function genCode(){
  return Array.from({length:6},()=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random()*32)]).join("");
}

async function createSession(){
  const name=(document.getElementById("sq-name-input").value||"").trim().toUpperCase();
  if(!name){showSquadMsg("Enter your name first","#ff006e");return;}
  playerName=name; sessionCode=genCode();
  setSquadStatus("connecting");
  showSquadMsg("Creating session…","#ffd600");
  const res=await sbReq("/rest/v1/sessions",{
    method:"POST",
    headers:{...sbHeaders(),"Prefer":"return=representation"},
    body:JSON.stringify({session_code:sessionCode,player_name:playerName,faction_data:{LV,PL},updated_at:new Date().toISOString()})
  });
  if(res===null&&!sessionCode){showSquadMsg("Connection failed — check console","#ff006e");setSquadStatus("offline");return;}
  startSession();
}

async function joinSession(){
  const name=(document.getElementById("sq-name-input").value||"").trim().toUpperCase();
  const code=(document.getElementById("sq-code-input").value||"").trim().toUpperCase();
  if(!name){showSquadMsg("Enter your name first","#ff006e");return;}
  if(!code){showSquadMsg("Enter a session code","#ff006e");return;}
  playerName=name; sessionCode=code;
  setSquadStatus("connecting");
  showSquadMsg("Joining session…","#ffd600");
  // Upsert our row
  await sbReq("/rest/v1/sessions?session_code=eq."+code+"&player_name=eq."+name,{
    method:"DELETE"
  });
  await sbReq("/rest/v1/sessions",{
    method:"POST",
    headers:{...sbHeaders(),"Prefer":"return=representation"},
    body:JSON.stringify({session_code:code,player_name:name,faction_data:{LV,PL},updated_at:new Date().toISOString()})
  });
  startSession();
}

function startSession(){
  showSessionUI();
  startPolling();
}

function startPolling(){
  loadSquadData();
  if(sqPollTimer)clearInterval(sqPollTimer);
  sqPollTimer=setInterval(loadSquadData,3000);
}

async function loadSquadData(){
  if(!sessionCode)return;
  const rows=await sbReq(`/rest/v1/sessions?session_code=eq.${sessionCode}&select=player_name,faction_data,updated_at&order=updated_at`);
  if(!Array.isArray(rows))return;
  squadPlayers={};
  rows.forEach(r=>{squadPlayers[r.player_name]=r;});
  updateSquadWidget();
  if(curTab==="squad")renderSquadPage();
}

async function pushMyData(){
  if(!sessionCode||!playerName)return;
  await sbReq(`/rest/v1/sessions?session_code=eq.${sessionCode}&player_name=eq.${playerName}`,{
    method:"PATCH",
    body:JSON.stringify({faction_data:{LV,PL},updated_at:new Date().toISOString()})
  });
}

function maybeSync(){if(sessionCode&&playerName)pushMyData();}

function showSessionUI(){
  document.getElementById("sq-connect-ui").style.display="none";
  document.getElementById("sq-session-ui").style.display="block";
  document.getElementById("sq-code-display").textContent=sessionCode;
  document.getElementById("sq-session-label").textContent=sessionCode;
  setSquadStatus("online");
}

function showSquadMsg(msg,col="#4a6070"){
  const el=document.getElementById("sq-session-label");
  if(el){el.textContent=msg;el.style.color=col;}
}

function updateSquadWidget(){
  const list=document.getElementById("sq-players-list");
  if(!list)return;
  const players=Object.values(squadPlayers);
  list.innerHTML=players.map(p=>{
    const isMe=p.player_name===playerName;
    const ago=Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
    const live=ago<8;
    return`<div class="sq-player">
      <div class="sq-dot" style="background:${isMe?"#00e5ff":live?"#39ff14":"#4a6070"}"></div>
      <span style="font-size:9px;color:${isMe?"#00e5ff":"#c8d8e8"}">${p.player_name}</span>
      ${isMe?'<span class="sq-you">YOU</span>':live?'<div class="sq-live"></div>':'<span style="font-size:7px;color:#4a6070;margin-left:auto">'+ago+'s</span>'}
    </div>`;
  }).join("")||'<div style="color:#4a6070;font-size:9px">Waiting for players…</div>';
  setSquadStatus("online");
}

function setSquadStatus(s){
  const el=document.getElementById("sq-status");
  if(el)el.className="sq-status "+s;
}

function copySessionLink(){
  const url=window.location.origin+window.location.pathname+"?session="+sessionCode;
  navigator.clipboard.writeText(url).then(()=>{
    const btn=event.target;const orig=btn.textContent;
    btn.textContent="✓ COPIED!";setTimeout(()=>btn.textContent=orig,2000);
  }).catch(()=>{
    prompt("Copy this link:",url);
  });
}

function leaveSession(){
  if(sqPollTimer)clearInterval(sqPollTimer);
  sqPollTimer=null;sessionCode=null;playerName=null;squadPlayers={};
  document.getElementById("sq-connect-ui").style.display="block";
  document.getElementById("sq-session-ui").style.display="none";
  document.getElementById("sq-session-label").textContent="NOT CONNECTED";
  document.getElementById("sq-session-label").style.color="";
  setSquadStatus("offline");
  if(curTab==="squad")renderSquadPage();
}

// "Send to Squad" button from upgrade tree
function sendBuildToSquad(){
  if(!sessionCode||!playerName){
    alert("Join a squad session first using the widget in the bottom-right corner.");return;
  }
  pushMyData();
  const btn=document.getElementById("btn-squad-send");
  if(btn){const o=btn.textContent;btn.textContent="✓ SENT!";setTimeout(()=>btn.textContent=o,2000);}
}

function renderSquadPage(){
  const el=document.getElementById("sqv");
  if(!sessionCode){
    el.innerHTML=`<div style="padding:30px;max-width:560px">
      <div class="sqv-hdr">👥 SQUAD SESSION</div>
      <div style="color:#4a6070;font-size:10px;margin:10px 0 20px;line-height:1.8">
        Use the <strong style="color:#00e5ff">squad widget</strong> (bottom-right corner) to create or join a session.<br>
        Share the invite link with your squad — anyone who opens it joins automatically.<br>
        Once connected, everyone's builds appear here as live tabs.
      </div>
      <div style="background:#0d1318;border:1px solid #1a2530;padding:16px;border-left:3px solid #ffd600">
        <div style="font-size:9px;color:#ffd600;margin-bottom:8px;letter-spacing:1px">⚠ FIRST TIME SETUP</div>
        <div style="font-size:9px;color:#8aa0b0;line-height:1.8">
          Your Supabase anon key needs to be set in the HTML file.<br>
          1. Go to supabase.com → your project → Settings → API<br>
          2. Copy the <strong style="color:#00e5ff">anon / public</strong> key (starts with eyJ…)<br>
          3. Open this HTML file in a text editor, find <code style="color:#39ff14">const SB_KEY=</code> and replace the value<br>
          4. Save and reopen the file
        </div>
      </div>
    </div>`;return;
  }
  const players=Object.values(squadPlayers);
  el.innerHTML=`<div style="padding:20px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
      <div class="sqv-hdr" style="margin:0">👥 SQUAD — ${sessionCode}</div>
      <div class="sq-status online" style="width:8px;height:8px;border-radius:50%"></div>
      <span style="font-size:9px;color:#39ff14">LIVE</span>
    </div>
    <div style="font-size:9px;color:#4a6070;margin-bottom:14px">${players.length} player${players.length!==1?"s":""} · refreshes every 3s</div>
    <div class="player-tabs" id="squad-tabs">
      ${players.map(p=>`<button class="player-tab${p.player_name===playerName?" you":""}" onclick="viewPlayerBuild('${p.player_name}')">${p.player_name}</button>`).join("")}
    </div>
    <div id="squad-build-view" style="color:#4a6070;font-size:10px;padding:10px 0">← Click a player tab to view their build</div>
  </div>`;
}

function viewPlayerBuild(name){
  const p=squadPlayers[name];if(!p)return;
  const fd=p.faction_data||{};const pLV=fd.LV||{};const pPL=fd.PL||{};
  // highlight active tab
  document.querySelectorAll(".player-tab").forEach(b=>b.style.borderColor=b.textContent.replace(" (YOU)","")===name?"#00e5ff":"");
  const el=document.getElementById("squad-build-view");
  const actives=UG.filter(u=>(pLV[u.id]||0)>0);
  const planned=UG.filter(u=>(pPL[u.id]||0)>0&&!(pLV[u.id]||0));
  const totalCreds=actives.reduce((s,u)=>{let c=0;for(let i=0;i<pLV[u.id];i++)c+=u.levels[i].credits;return s+c;},0);
  const ago=Math.round((Date.now()-new Date(p.updated_at).getTime())/1000);
  el.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">
      <span style="font-family:'Orbitron',monospace;font-size:12px;color:#00e5ff">${name}${name===playerName?" (YOU)":""}</span>
      <span style="font-size:9px;color:#ffd600">₵${totalCreds.toLocaleString()} spent</span>
      <span style="font-size:9px;color:#39ff14">${actives.length} owned</span>
      ${planned.length?`<span style="font-size:9px;color:#bf5af2">${planned.length} planned</span>`:""}
      <span style="font-size:8px;color:#4a6070;margin-left:auto">Updated ${ago}s ago</span>
    </div>
    ${Object.keys(FC).map(f=>{
      const fa=actives.filter(u=>u.f===f);const fp=planned.filter(u=>u.f===f);
      if(!fa.length&&!fp.length)return"";
      const fc=FC[f];
      return`<div style="margin-bottom:8px;padding:10px 12px;background:#0d1318;border:1px solid #1a2530;border-left:3px solid ${fc.color}">
        <div style="font-family:'Orbitron',monospace;font-size:9px;color:${fc.color};margin-bottom:6px">${f}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${fa.map(u=>`<span style="font-size:8px;padding:2px 7px;border:1px solid ${fc.color};color:${fc.color};background:${fc.color}11">${u.name} Lv${pLV[u.id]}</span>`).join("")}
          ${fp.map(u=>`<span style="font-size:8px;padding:2px 7px;border:1px solid #bf5af2;color:#bf5af2;background:#bf5af211">${u.name} Lv${pPL[u.id]} ◈</span>`).join("")}
        </div>
      </div>`;
    }).join("")}
    ${!actives.length&&!planned.length?`<div style="color:#4a6070;font-size:10px;padding:8px 0">No upgrades selected yet</div>`:""}`;
}