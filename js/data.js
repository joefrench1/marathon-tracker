// ══════════════════════════════════════════
// FACTIONS
// ══════════════════════════════════════════
const FC={
  CyberAcme:{color:"#00e5ff",bg:"rgba(0,229,255,.09)",dim:"rgba(0,229,255,.3)",handler:"ONI"},
  NuCaloric: {color:"#ff4d7a",bg:"rgba(255,77,122,.09)",dim:"rgba(255,77,122,.3)",handler:"Gaius"},
  Traxus:    {color:"#ffd600",bg:"rgba(255,214,0,.09)",dim:"rgba(255,214,0,.3)",handler:"Vulcan"},
  MIDA:      {color:"#bf5af2",bg:"rgba(191,90,242,.09)",dim:"rgba(191,90,242,.3)",handler:"Gantry"},
  Arachne:   {color:"#ff6d00",bg:"rgba(255,109,0,.09)",dim:"rgba(255,109,0,.3)",handler:"Charter"},
  SekGen:    {color:"#39ff14",bg:"rgba(57,255,20,.09)",dim:"rgba(57,255,20,.3)",handler:"Nona"},
};


// ══════════════════════════════════════════
// SALVAGE LOCATIONS (verified - Dexerto/Shacknews)
// ══════════════════════════════════════════
const RC={standard:"#8aad6a",enhanced:"#4a9eff",superior:"#bf5af2"};
const SL={
  "Unstable Diode":       {rarity:"standard", map:"Any",  pois:["Arms Locker","Tool Cart"],         note:"Common containers everywhere"},
  "Unstable Gunmetal":    {rarity:"standard", map:"Perimeter", pois:["Station","Hauler"],           note:"Arms Locker, Munitions Crate"},
  "Unstable Biomass":     {rarity:"standard", map:"Both maps",pois:["Quarantine","Bio-Research","Station"], note:"Medical Cabinet, Bioprinter"},
  "Unstable Gel":         {rarity:"standard", map:"Dire Marsh",pois:["Complex","Field Maintenance"],note:"Munitions Crate"},
  "Unstable Lead":        {rarity:"standard", map:"Perimeter",pois:["Station","South Relay"],       note:"Arms Locker, Munitions Crate"},
  "Volatile Wire":        {rarity:"standard", map:"Perimeter",pois:["Hauler","South Relay"],        note:"Munitions Crate"},
  "Volatile Explosive":   {rarity:"standard", map:"Dire Marsh",pois:["Complex","Field Maint."],     note:"Munitions Crate"},
  "Sparkleaf":            {rarity:"enhanced", map:"Both maps",pois:["Overflow","Greenhouse"],       note:"Ground spawns, standard containers"},
  "Reclaimed Biostripping":{rarity:"enhanced",map:"Dire Marsh",pois:["Algae Ponds","Bio-Research"], note:"Bioprinter, Deluxe Locked Rooms"},
  "Dermachem Pack":       {rarity:"enhanced", map:"Dire Marsh",pois:["Quarantine","Field Maint."],  note:"Medical Cabinet"},
  "Tarax Seed":           {rarity:"enhanced", map:"Dire Marsh",pois:["AI Uplink","Greenhouse"],     note:"Grassy ground spawns, Deluxe Rooms"},
  "Refined Wire":         {rarity:"enhanced", map:"Any",  pois:["Deluxe Locked Rooms"],             note:"Deluxe key required"},
  "Refined Explosive":    {rarity:"enhanced", map:"Any",  pois:["Deluxe Locked Rooms"],             note:"Deluxe key required"},
  "Drone Resin":          {rarity:"enhanced", map:"Any",  pois:["Drone intercept events"],          note:"Kill and loot drones"},
  "Fractal Circuit":      {rarity:"enhanced", map:"Any",  pois:["Core Storage","Arms Locker"],      note:"Standard containers"},
  "Sterilized Biostripping":{rarity:"superior",map:"Any", pois:["UESC Incursion","Superior Rooms"], note:"Superior Locked Rooms only"},
  "Neurochem Pack":       {rarity:"superior", map:"Any",  pois:["UESC Incursion","Superior Rooms"], note:"Superior Locked Rooms only"},
  "Biolens Seed":         {rarity:"superior", map:"Any",  pois:["UESC Incursion","Superior Rooms"], note:"UESC Incursion events"},
  "Neural Insulation":    {rarity:"superior", map:"Any",  pois:["UESC Incursion"],                  note:"Superior+ Locked Rooms, Incursion"},
  "Hazard Capsule":       {rarity:"superior", map:"Any",  pois:["UESC Incursion","HVT Supply Drop"],note:"Incursion or HVT drops"},
  "Shell ID":             {rarity:"superior", map:"Any",  pois:["HVT Supply Drop"],                 note:"High-Value Target contracts only"},
  "Amygdala Drive":       {rarity:"superior", map:"Any",  pois:["UESC Incursion"],                  note:"Superior+ Locked Rooms"},
  "Volatile Lens":        {rarity:"standard", map:"Dire Marsh",pois:["Quarantine","Bio-Research"],  note:"Bioprinter"},
  "Refined Lens":         {rarity:"enhanced", map:"Any",  pois:["Deluxe Locked Rooms","Bioprinter"],note:"Deluxe key or Bioprinter"},
};

// ══════════════════════════════════════════
// UPGRADE DATA
// Each upgrade: id, name, f=faction, t=type, col, row, deps
// levels: array of {eff, credits, salvage:[{i,q}], rank}
// hi = in reddit build guide, v=verified (false=costs unconfirmed)
// Layout columns/rows match in-game tree from screenshot
// ══════════════════════════════════════════
const UG=[
// ── CYBERACME  (6 cols × 3 rows matching screenshot)
// Row 0: Expansion | Carrier | Scavenger | Enhanced Wpn | Firm Stance | Heat Sink
// Row 1: (empty)  | Carrier+ | Loot Siphon | Soundproof  | (empty)    | Quick Vent
// Row 2: (empty)  | (empty)  | Loose Change | Locksmith  | Fixative   | Active Cool / Slider
{id:"ca_exp",  name:"Expansion",         f:"CyberAcme",t:"inv", col:0,row:0,deps:[],           hi:false,
 desc:"Gain additional rows of vault capacity for the season.",
 levels:[
  {eff:"Vault Size +8 Rows", credits:2500, salvage:[{i:"Unstable Diode",q:12}], rank:3},
  {eff:"Vault Size +8 Rows", credits:4000, salvage:[{i:"Unstable Diode",q:22},{i:"Unstable Gunmetal",q:12}], rank:7},
  {eff:"Vault Size +6 Rows", credits:5000, salvage:[{i:"Unstable Diode",q:27},{i:"Unstable Gunmetal",q:15}], rank:12},
  {eff:"Vault Size +4 Rows", credits:7000, salvage:[{i:"Unstable Diode",q:30},{i:"Unstable Gunmetal",q:18}], rank:18},
  {eff:"Vault Size +4 Rows", credits:10000,salvage:[{i:"Unstable Diode",q:50},{i:"Unstable Gunmetal",q:30}], rank:28},
]},
{id:"ca_inf",  name:"Informant.exe",      f:"CyberAcme",t:"fun", col:1,row:0,deps:[],           hi:false,
 desc:"Data Card Credit Value +50% (additive). More value from data cards.",
 levels:[
  {eff:"Data Card Value +50%", credits:2000, salvage:[], rank:2},
  {eff:"Data Card Value +50%", credits:2000, salvage:[], rank:15},
]},
{id:"ca_cred", name:"Credit Limit",       f:"CyberAcme",t:"inv", col:2,row:0,deps:[],           hi:true,
 desc:"Increases your maximum credit wallet capacity significantly.",
 levels:[
  {eff:"Credit Cap +20K",    credits:2500,  salvage:[], rank:4},
  {eff:"Credit Cap +50K",    credits:4000,  salvage:[], rank:8},
  {eff:"Credit Cap +200K",   credits:7000,  salvage:[], rank:12},
  {eff:"Credit Cap +700K",   credits:10000, salvage:[], rank:18},
  {eff:"Credit Cap +9,000K", credits:50000, salvage:[], rank:25},
]},
{id:"ca_ewep", name:"Enhanced Weaponry",  f:"CyberAcme",t:"arm", col:3,row:0,deps:[],           hi:false,
 desc:"Unlock Enhanced Overrun AR, V11 Punch, CE Tactical Sidearm.",
 levels:[
  {eff:"Enhanced Weapons Available", credits:2500, salvage:[], rank:4},
]},
{id:"ca_dwep", name:"Deluxe Weaponry",    f:"CyberAcme",t:"arm", col:4,row:0,deps:["ca_ewep"],  hi:false,
 desc:"Unlock Deluxe Overrun AR, V11 Punch, CE Tactical Sidearm.",
 levels:[
  {eff:"Deluxe Weapons Available", credits:4000, salvage:[], rank:14},
]},
{id:"ca_sink", name:"Heat_Sink.exe",      f:"CyberAcme",t:"stat",col:5,row:0,deps:[],           hi:true,
 desc:"Heat Capacity — how much sprinting/sliding before overheating.",
 levels:[
  {eff:"Heat Capacity +20", credits:2500, salvage:[{i:"Unstable Biomass",q:12}], rank:1},
  {eff:"Heat Capacity +20", credits:3500, salvage:[{i:"Unstable Biomass",q:24},{i:"Unstable Lead",q:12}], rank:12},
  {eff:"Heat Capacity +20", credits:5000, salvage:[{i:"Unstable Biomass",q:30},{i:"Unstable Lead",q:20}], rank:26},
]},
{id:"ca_carr", name:"Carrier",            f:"CyberAcme",t:"fun", col:0,row:1,deps:[],           hi:true,
 desc:"Unlock Enhanced Backpacks for purchase in the Armory.",
 levels:[
  {eff:"Enhanced Backpacks Unlocked", credits:1500, salvage:[], rank:5},
]},
{id:"ca_carr2",name:"Carrier+",           f:"CyberAcme",t:"fun", col:1,row:1,deps:["ca_carr"],  hi:false,
 desc:"Unlock Deluxe Backpacks for purchase in the Armory.",
 levels:[
  {eff:"Deluxe Backpacks Unlocked", credits:4000, salvage:[], rank:15},
]},
{id:"ca_qvent",name:"Quick_Vent.exe",     f:"CyberAcme",t:"stat",col:5,row:1,deps:["ca_sink"],  hi:false,
 desc:"Heat Recovery Speed — heat bar refills faster after movement.",
 levels:[
  {eff:"Heat Recovery -20%", credits:2500, salvage:[{i:"Unstable Gel",q:8}], rank:4},
  {eff:"Heat Recovery -20%", credits:4000, salvage:[{i:"Unstable Gel",q:16}], rank:19},
]},
{id:"ca_scav", name:"Scavenger.exe",      f:"CyberAcme",t:"stat",col:0,row:2,deps:[],           hi:false,
 desc:"Loot Speed — how quickly items are revealed from containers.",
 levels:[
  {eff:"Loot Speed +20", credits:1000, salvage:[], rank:1},
  {eff:"Loot Speed +20", credits:2500, salvage:[], rank:4},
  {eff:"Loot Speed +20", credits:4000, salvage:[], rank:16},
]},
{id:"ca_lsip", name:"Loot_Siphon.exe",   f:"CyberAcme",t:"stat",col:1,row:2,deps:["ca_scav"],  hi:false,
 desc:"Bonus tactical energy when opening an unlooted container.",
 levels:[
  {eff:"Tac. Energy on Loot +5%", credits:1500, salvage:[], rank:7},
  {eff:"Tac. Energy on Loot +5%", credits:4000, salvage:[], rank:17},
]},
{id:"ca_sfx",  name:"Soundproof.exe",     f:"CyberAcme",t:"fun", col:2,row:2,deps:[],           hi:false,
 desc:"Makes less noise while looting containers.",
 levels:[
  {eff:"Reduced Looting Noise", credits:5000, salvage:[], rank:20},
]},
{id:"ca_acool",name:"Active_Cool.exe",    f:"CyberAcme",t:"stat",col:5,row:2,deps:["ca_qvent"], hi:false,
 desc:"Heat Recovery Rate — cools heat more actively.",
 levels:[
  {eff:"Heat Recovery Rate +15%", credits:3500, salvage:[{i:"Unstable Gel",q:24}], rank:13},
  {eff:"Heat Recovery Rate +15%", credits:5000, salvage:[{i:"Unstable Gel",q:30}], rank:23},
]},
{id:"ca_firm", name:"Firm Stance",        f:"CyberAcme",t:"stat",col:0,row:3,deps:[],           hi:true,
 desc:"Reduces fall damage taken — great for aggressive movement.",
 levels:[
  {eff:"Fall Resistance -20", credits:1500, salvage:[], rank:1},
  {eff:"Fall Resistance -20", credits:4000, salvage:[], rank:11},
  {eff:"Fall Resistance -20", credits:5000, salvage:[], rank:26},
]},
{id:"ca_loose",name:"Loose Change",       f:"CyberAcme",t:"fun", col:1,row:3,deps:[],           hi:false,
 desc:"Opening a container rewards you with 25 credits.",
 levels:[
  {eff:"+25 Credits per Container", credits:5000, salvage:[], rank:30},
]},
{id:"ca_lock", name:"Locksmith",          f:"CyberAcme",t:"arm", col:2,row:3,deps:[],           hi:false,
 desc:"Unlock Lockbox Key Templates for crafting in the Armory.",
 levels:[
  {eff:"Lockbox Keys Unlocked", credits:2500, salvage:[], rank:4},
  {eff:"Deluxe Key Templates",  credits:4000, salvage:[], rank:16},
  {eff:"Superior Key Templates",credits:7000, salvage:[], rank:28},
]},
{id:"ca_fix",  name:"Fixative.exe",       f:"CyberAcme",t:"fun", col:3,row:3,deps:[],           hi:false,
 desc:"Increased chance to find Matter Fixatives in containers.",
 levels:[
  {eff:"Matter Fixative Chance Up", credits:3500, salvage:[], rank:25},
]},
{id:"ca_slide",name:"Slider.exe",         f:"CyberAcme",t:"fun", col:4,row:3,deps:[],           hi:false,
 desc:"Your sprint slide generates significantly less heat.",
 levels:[
  {eff:"Slide Heat -50%", credits:7000, salvage:[], rank:35},
]},

// ── NUCALORIC
{id:"nc_saf",name:"Safeguard",f:"NuCaloric",t:"arm",col:0,row:0,deps:[],hi:true,
 desc:"Unlocks daily free Shield Charges in the Armory — essential early upgrade.",
 levels:[
  {eff:"Free Daily Shield Charges", credits:750, salvage:[{i:"Unstable Biomass",q:16}], rank:1},
]},
{id:"nc_ashi",name:"Advanced Shields",f:"NuCaloric",t:"arm",col:0,row:1,deps:["nc_saf"],hi:false,
 desc:"Unlocks Advanced Shield Charges for purchase.",
 levels:[
  {eff:"Advanced Shield Charges Available", credits:1500, salvage:[{i:"Reclaimed Biostripping",q:10},{i:"Unstable Biomass",q:10}], rank:6},
]},
{id:"nc_saf2",name:"Safeguard+",f:"NuCaloric",t:"arm",col:0,row:2,deps:["nc_ashi"],hi:true,
 desc:"Unlocks daily free Advanced Shield Charges in the Armory.",
 levels:[
  {eff:"Free Daily Advanced Shield Charges", credits:2000, salvage:[{i:"Sterilized Biostripping",q:6},{i:"Sparkleaf",q:16}], rank:11},
]},
{id:"nc_shist",name:"Shield Stock",f:"NuCaloric",t:"arm",col:1,row:0,deps:[],hi:false,
 desc:"Increases Advanced Shield Charge stock in the Armory.",
 levels:[
  {eff:"Advanced Shield Stock +5", credits:1500, salvage:[{i:"Reclaimed Biostripping",q:15},{i:"Sparkleaf",q:8}], rank:12},
]},
{id:"nc_shic",name:"Shield Comm",f:"NuCaloric",t:"arm",col:1,row:1,deps:["nc_shist"],hi:false,
 desc:"NuCaloric contracts award Shield Charges as bonus rewards.",
 levels:[
  {eff:"Shield Charges as Contract Bonus", credits:2000, salvage:[{i:"Sterilized Biostripping",q:12},{i:"Tarax Seed",q:6}], rank:15},
]},
{id:"nc_shie",name:"Shielded",f:"NuCaloric",t:"arm",col:2,row:0,deps:[],hi:true,
 desc:"Unlocks Enhanced Shield Implants for purchase in the Armory.",
 levels:[
  {eff:"Enhanced Shield Implants Available", credits:1500, salvage:[{i:"Reclaimed Biostripping",q:12},{i:"Unstable Biomass",q:13}], rank:5},
]},
{id:"nc_arm",name:"Armored",f:"NuCaloric",t:"arm",col:2,row:1,deps:["nc_shie"],hi:false,
 desc:"Unlocks Deluxe Shield Implants for purchase in the Armory.",
 levels:[
  {eff:"Deluxe Shield Implants Available", credits:3500, salvage:[{i:"Biolens Seed",q:5},{i:"Neural Insulation",q:3}], rank:20},
]},
{id:"nc_rest",name:"Restore",f:"NuCaloric",t:"arm",col:3,row:0,deps:[],hi:true,
 desc:"Unlocks daily free Patch Kits in the Armory.",
 levels:[
  {eff:"Free Daily Patch Kits", credits:1500, salvage:[{i:"Unstable Biomass",q:23}], rank:3},
]},
{id:"nc_apatch",name:"Advanced Patch",f:"NuCaloric",t:"arm",col:3,row:1,deps:["nc_rest"],hi:false,
 desc:"Unlocks Advanced Patch Kits for purchase.",
 levels:[
  {eff:"Advanced Patch Kits Available", credits:1500, salvage:[{i:"Dermachem Pack",q:10},{i:"Unstable Biomass",q:13}], rank:8},
]},
{id:"nc_rest2",name:"Restore+",f:"NuCaloric",t:"arm",col:3,row:2,deps:["nc_apatch"],hi:false,
 desc:"Unlocks daily free Advanced Patch Kits in the Armory.",
 levels:[
  {eff:"Free Daily Advanced Patch Kits", credits:2000, salvage:[{i:"Neurochem Pack",q:5},{i:"Sparkleaf",q:16}], rank:10},
]},
{id:"nc_regen",name:"Regen",f:"NuCaloric",t:"arm",col:4,row:0,deps:[],hi:false,
 desc:"Unlocks progressively stronger Regen consumables for purchase.",
 levels:[
  {eff:"Regen V2 Available", credits:750,  salvage:[{i:"Unstable Biomass",q:10}], rank:3},
  {eff:"Regen V3 Available", credits:1500, salvage:[{i:"Reclaimed Biostripping",q:28},{i:"Sparkleaf",q:14}], rank:10},
  {eff:"Regen V4 Available", credits:3500, salvage:[{i:"Biolens Seed",q:7},{i:"Neural Insulation",q:3}], rank:21},
]},
{id:"nc_null",name:"Null_Hazard.exe",f:"NuCaloric",t:"stat",col:5,row:0,deps:[],hi:false,
 desc:"Hazard Tolerance — max protection against UESC data corruption.",
 levels:[
  {eff:"Hazard Tolerance +15", credits:750, salvage:[{i:"Unstable Biomass",q:19}], rank:4},
]},
{id:"nc_rein",name:"Reinforce.exe",f:"NuCaloric",t:"stat",col:5,row:1,deps:[],hi:false,
 desc:"Hardware — reduces Toxin, Overheat, Immobilize status durations.",
 levels:[
  {eff:"Hardware +10", credits:1500, salvage:[{i:"Reclaimed Biostripping",q:8},{i:"Unstable Biomass",q:9}], rank:6},
  {eff:"Hardware +10", credits:2000, salvage:[{i:"Sterilized Biostripping",q:7},{i:"Sparkleaf",q:25}], rank:16},
  {eff:"Hardware +10", credits:5000, salvage:[{i:"Hazard Capsule",q:2}], rank:26},
]},
{id:"nc_unfaz",name:"Unfazed.exe",f:"NuCaloric",t:"stat",col:5,row:2,deps:[],hi:false,
 desc:"Firewall — reduces duration of EMP and Hack status effects.",
 levels:[
  {eff:"Firewall +10", credits:1500, salvage:[{i:"Dermachem Pack",q:7},{i:"Unstable Biomass",q:7}], rank:7},
  {eff:"Firewall +10", credits:2000, salvage:[{i:"Neurochem Pack",q:8},{i:"Tarax Seed",q:5}], rank:18},
  {eff:"Firewall +10", credits:5000, salvage:[{i:"Hazard Capsule",q:2},{i:"Tarax Seed",q:9}], rank:27},
]},
{id:"nc_pana",name:"Panacea Kit",f:"NuCaloric",t:"arm",col:4,row:1,deps:[],hi:false,
 desc:"Unlocks Panacea Kits — all-in-one powerful healing consumables.",
 levels:[
  {eff:"Panacea Kits Available", credits:5000, salvage:[{i:"Hazard Capsule",q:2},{i:"Neural Insulation",q:7}], rank:25},
]},

// ── TRAXUS
{id:"tr_exp",name:"Expansion",f:"Traxus",t:"inv",col:0,row:0,deps:[],hi:false,
 desc:"Gain additional rows of vault capacity for the season.",
 levels:[
  {eff:"Vault Size +8 Rows", credits:2500, salvage:[{i:"Volatile Wire",q:12}], rank:3},
  {eff:"Vault Size +8 Rows", credits:4000, salvage:[{i:"Volatile Wire",q:22},{i:"Volatile Explosive",q:12}], rank:7},
  {eff:"Vault Size +6 Rows", credits:5000, salvage:[{i:"Refined Wire",q:15},{i:"Refined Explosive",q:8}], rank:12},
  {eff:"Vault Size +4 Rows", credits:7000, salvage:[{i:"Refined Wire",q:20},{i:"Refined Explosive",q:12}], rank:18},
]},
{id:"tr_std",name:"Standtall",f:"Traxus",t:"arm",col:1,row:0,deps:[],hi:false,
 desc:"Unlock Enhanced then Deluxe Leg Implants for purchase.",
 levels:[
  {eff:"Enhanced Leg Implants Available", credits:2500, salvage:[{i:"Volatile Wire",q:8}], rank:4},
  {eff:"Deluxe Leg Implants Available",   credits:4000, salvage:[{i:"Refined Wire",q:8}], rank:14},
]},
{id:"tr_shi",name:"Shielded",f:"Traxus",t:"arm",col:2,row:0,deps:[],hi:false,
 desc:"Unlock Enhanced Shield Implants for purchase.",
 levels:[
  {eff:"Enhanced Shield Implants Available", credits:2500, salvage:[{i:"Volatile Explosive",q:8}], rank:4},
]},
{id:"tr_snp",name:"MIPS Sniper",f:"Traxus",t:"arm",col:3,row:0,deps:[],hi:true,
 desc:"Unlock the Longshot Sniper Rifle for purchase. ★ Strong pick.",
 levels:[
  {eff:"Longshot Sniper Rifle Available", credits:2500, salvage:[{i:"Refined Wire",q:10},{i:"Refined Explosive",q:6}], rank:9},
]},
{id:"tr_mods",name:"Weapon Mods",f:"Traxus",t:"arm",col:4,row:0,deps:[],hi:true,
 desc:"Unlock Enhanced and Deluxe weapon chip mods for purchase.",
 levels:[
  {eff:"Enhanced Mods Available", credits:2500, salvage:[{i:"Volatile Wire",q:10}], rank:2},
  {eff:"Deluxe Mods Available",   credits:4000, salvage:[{i:"Refined Wire",q:12}], rank:5},
  {eff:"Superior Mods Available", credits:6000, salvage:[{i:"Refined Wire",q:18}], rank:11},
]},
{id:"tr_tac",name:"Tactical_AMP.exe",f:"Traxus",t:"stat",col:5,row:0,deps:[],hi:false,
 desc:"Tactical Ability Recharge — reduces cooldown on tactical abilities.",
 levels:[
  {eff:"Tac. Recharge +10%", credits:2500, salvage:[{i:"Volatile Explosive",q:12}], rank:5},
  {eff:"Tac. Recharge +10%", credits:4000, salvage:[{i:"Refined Explosive",q:10}], rank:15},
  {eff:"Tac. Recharge +10%", credits:6000, salvage:[{i:"Refined Explosive",q:15}], rank:25},
]},
{id:"tr_hsink",name:"Heat_Sink.exe",f:"Traxus",t:"stat",col:0,row:1,deps:[],hi:false,
 desc:"Increases Heat Capacity.",
 levels:[
  {eff:"Heat Capacity +15", credits:2500, salvage:[{i:"Volatile Wire",q:10}], rank:3},
  {eff:"Heat Capacity +15", credits:4000, salvage:[{i:"Refined Wire",q:10}], rank:13},
]},
{id:"tr_cut",name:"Cutthroat.exe",f:"Traxus",t:"stat",col:1,row:1,deps:[],hi:false,
 desc:"Finisher Siphon — shield charge returned after a finisher kill.",
 levels:[
  {eff:"Finisher Siphon +10", credits:1500, salvage:[{i:"Volatile Explosive",q:8}], rank:2},
  {eff:"Finisher Siphon +10", credits:3000, salvage:[{i:"Refined Explosive",q:8}], rank:12},
]},
{id:"tr_unfaz",name:"Unfazed.exe",f:"Traxus",t:"stat",col:2,row:1,deps:[],hi:false,
 desc:"Firewall — reduces EMP and Hack status effect duration.",
 levels:[
  {eff:"Firewall +10", credits:2500, salvage:[{i:"Volatile Wire",q:8}], rank:5},
  {eff:"Firewall +10", credits:4000, salvage:[{i:"Refined Wire",q:8}], rank:18},
]},
{id:"tr_trk",name:"Tracker.exe",f:"Traxus",t:"stat",col:3,row:1,deps:[],hi:false,
 desc:"Ping Duration — pings on hostile targets last longer.",
 levels:[
  {eff:"Ping Duration +1s", credits:2000, salvage:[{i:"Volatile Wire",q:12}], rank:1},
  {eff:"Ping Duration +1s", credits:3500, salvage:[{i:"Refined Wire",q:8}], rank:14},
]},
{id:"tr_lock",name:"Lockbox Locator",f:"Traxus",t:"fun",col:4,row:1,deps:[],hi:false,
 desc:"Picking up a locked container key pings nearby locked containers.",
 levels:[
  {eff:"Key Pickup Pings Lock Boxes", credits:4000, salvage:[{i:"Drone Resin",q:6}], rank:18},
]},
{id:"tr_tad",name:"TAD_Boost.exe",f:"Traxus",t:"stat",col:5,row:1,deps:[],hi:false,
 desc:"TAD Ping Area — expands the radius of TAD ability pings.",
 levels:[
  {eff:"TAD Ping Area +2m", credits:3000, salvage:[{i:"Refined Explosive",q:8}], rank:12},
  {eff:"TAD Ping Area +2m", credits:5000, salvage:[{i:"Refined Explosive",q:12}], rank:22},
]},

// ── MIDA (costs mostly unverified, flagged with v:false)
{id:"mi_flex",name:"Flex_Matrix.exe",f:"MIDA",t:"stat",col:0,row:0,deps:[],hi:true,v:false,
 desc:"Agility — increases movement speed and jump height significantly. ★ Priority.",
 levels:[
  {eff:"Agility +20", credits:2500, salvage:[], rank:3},
]},
{id:"mi_spr",name:"Sprinter",f:"MIDA",t:"arm",col:1,row:0,deps:[],hi:true,v:false,
 desc:"Unlocks Bionic Leg Upgrades V2 Implant for purchase.",
 levels:[
  {eff:"Bionic Leg V2 Available", credits:2000, salvage:[], rank:2},
]},
{id:"mi_equip",name:"Equipment",f:"MIDA",t:"arm",col:2,row:0,deps:[],hi:false,v:false,
 desc:"Unlocks MIDA Equipment including Ammo Crates and utility throwables.",
 levels:[
  {eff:"MIDA Equipment (Tier 1) Available", credits:1500, salvage:[], rank:1},
  {eff:"MIDA Equipment (Tier 2) Available", credits:3000, salvage:[], rank:8},
]},
{id:"mi_firm",name:"Firm_Stance.exe",f:"MIDA",t:"stat",col:3,row:0,deps:[],hi:true,v:false,
 desc:"Fall Resistance — reduces fall damage. Note: requires high rank.",
 levels:[
  {eff:"Fall Resistance +20", credits:2500, salvage:[], rank:11},
  {eff:"Fall Resistance +20", credits:4000, salvage:[], rank:20},
]},
{id:"mi_smg",name:"SMG Mods+",f:"MIDA",t:"arm",col:0,row:1,deps:[],hi:true,v:false,
 desc:"Unlocks rotating Enhanced SMG mods — mag mod gives +6 bullets for 300 credits.",
 levels:[
  {eff:"Enhanced SMG Mods Available", credits:2000, salvage:[], rank:6},
]},
{id:"mi_ar",name:"AR Mods",f:"MIDA",t:"arm",col:1,row:1,deps:[],hi:true,v:false,
 desc:"Unlocks a rotating Enhanced AR mod in the Armory.",
 levels:[
  {eff:"Enhanced AR Mods Available", credits:2000, salvage:[], rank:2},
]},
{id:"mi_chips",name:"Enhanced Chips",f:"MIDA",t:"arm",col:2,row:1,deps:[],hi:true,v:false,
 desc:"Unlocks Enhanced weapon chip mods incl. Last Resort (bonus dmg when unshielded).",
 levels:[
  {eff:"Enhanced Chip Mods Available", credits:2500, salvage:[], rank:5},
]},

// ── ARACHNE (costs partially unverified)
{id:"ar_kni",name:"Knife Fight",f:"Arachne",t:"arm",col:0,row:0,deps:[],hi:true,v:false,
 desc:"Unlocks Knife Fight V2 Implant — upgrades your melee/knife effectiveness.",
 levels:[
  {eff:"Knife Fight V2 Available", credits:2000, salvage:[], rank:4},
]},
{id:"ar_str",name:"Hard_Strike.exe",f:"Arachne",t:"stat",col:0,row:1,deps:["ar_kni"],hi:true,v:false,
 desc:"Melee Damage — increases knife and melee damage. ★ melee = op",
 levels:[
  {eff:"Melee Damage +20", credits:2500, salvage:[], rank:5},
  {eff:"Melee Damage +15", credits:4000, salvage:[], rank:15},
]},
{id:"ar_shot",name:"MIPS Shotgun",f:"Arachne",t:"arm",col:1,row:0,deps:[],hi:true,v:false,
 desc:"Unlocks WSTR Combat Shotgun for purchase. ★ shotgun = op",
 levels:[
  {eff:"WSTR Combat Shotgun Available", credits:2500, salvage:[], rank:7},
]},
{id:"ar_reb",name:"Reboot.exe",f:"Arachne",t:"stat",col:1,row:1,deps:[],hi:true,v:false,
 desc:"Revive Speed — revive teammates significantly faster.",
 levels:[
  {eff:"Revive Speed +20", credits:2500, salvage:[], rank:7},
]},
{id:"ar_cred",name:"Credit Limit",f:"Arachne",t:"inv",col:2,row:0,deps:[],hi:true,
 desc:"Increases your maximum credit wallet capacity.",
 levels:[
  {eff:"Credit Cap +5,000",  credits:1000, salvage:[], rank:1},
  {eff:"Credit Cap +10,000", credits:2000, salvage:[], rank:1},
  {eff:"Credit Cap +15,000", credits:3000, salvage:[], rank:1},
]},
{id:"ar_inf",name:"Informant",f:"Arachne",t:"fun",col:3,row:0,deps:[],hi:true,
 desc:"Data Card Credit Value — earn more credits from data cards found in the field.",
 levels:[
  {eff:"Data Card Value +50%", credits:1500, salvage:[], rank:2},
  {eff:"Data Card Value +50%", credits:2500, salvage:[], rank:15},
]},
{id:"ar_exp",name:"Expansion",f:"Arachne",t:"inv",col:4,row:0,deps:[],hi:false,
 desc:"Gain additional rows of vault capacity.",
 levels:[
  {eff:"Vault Size +2 Rows", credits:2500, salvage:[], rank:3},
  {eff:"Vault Size +4 Rows", credits:4000, salvage:[], rank:7},
  {eff:"Vault Size +6 Rows", credits:5000, salvage:[], rank:10},
]},

// ── SEKGEN
{id:"sg_eamp",name:"Energy Amp",f:"SekGen",t:"arm",col:0,row:0,deps:[],hi:false,
 desc:"Unlocks Energy Amps — boost prime and tactical ability recharge rates.",
 levels:[
  {eff:"Energy Amps Available", credits:750, salvage:[{i:"Unstable Diode",q:10}], rank:1},
]},
{id:"sg_amped",name:"Amped",f:"SekGen",t:"arm",col:0,row:1,deps:["sg_eamp"],hi:false,
 desc:"Unlocks daily free Energy Amps in the Armory.",
 levels:[
  {eff:"Free Daily Energy Amps", credits:1500, salvage:[{i:"Fractal Circuit",q:23},{i:"Unstable Diode",q:9}], rank:10},
]},
{id:"sg_tac",name:"TAC_AMP.exe",f:"SekGen",t:"stat",col:1,row:0,deps:[],hi:true,v:false,
 desc:"Tactical Recovery — significantly reduces tactical/trait ability cooldowns.",
 levels:[
  {eff:"Tactical Recovery +30", credits:1750, salvage:[], rank:2},
]},
{id:"sg_hds",name:"Head_Start.exe",f:"SekGen",t:"fun",col:1,row:1,deps:["sg_tac"],hi:true,v:false,
 desc:"Fills your tactical ability charge at the start of every run.",
 levels:[
  {eff:"Tactical Charge Prefilled on Run Start", credits:2500, salvage:[], rank:4},
]},
{id:"sg_scab",name:"SCAB_FACTORY.EXE",f:"SekGen",t:"stat",col:2,row:0,deps:[],hi:false,
 desc:"DBNO Time — take longer to bleed out when downed. Huge for solo play.",
 levels:[
  {eff:"DBNO Time +30s", credits:2000, salvage:[{i:"Amygdala Drive",q:7},{i:"Fractal Circuit",q:20}], rank:13},
  {eff:"DBNO Time +30s", credits:3500, salvage:[{i:"Amygdala Drive",q:12},{i:"Fractal Circuit",q:30}], rank:23},
]},
{id:"sg_class",name:"Class Cores",f:"SekGen",t:"arm",col:3,row:0,deps:[],hi:false,
 desc:"Unlocks enhanced Shell-specific Cores for purchase in the Armory.",
 levels:[
  {eff:"Enhanced Shell Cores Available", credits:1500, salvage:[{i:"Fractal Circuit",q:12}], rank:3},
  {eff:"Deluxe Shell Cores Available",   credits:3000, salvage:[{i:"Fractal Circuit",q:20},{i:"Amygdala Drive",q:5}], rank:12},
]},
];


// ══════════════════════════════════════════
// RECOMMENDED PATH
// ══════════════════════════════════════════
const REC=["nc_saf","ar_cred","ar_inf","ca_cred","ca_sink","nc_shie","nc_rest",
           "nc_saf2","ar_kni","ar_str","ar_shot","mi_flex","sg_tac","sg_hds","ar_reb","tr_snp","ca_firm"];