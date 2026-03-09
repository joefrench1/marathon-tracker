// RUNNER BUILDS DATA
// ══════════════════════════════════════════
// abilityVideos: YouTube video IDs + start times for each ability tooltip
// Set videoId to null to show "no clip" state. Update with real clip IDs as footage becomes available.
const RUNNERS=[
{id:"destroyer",name:"DESTROYER",icon:"🛡️",color:"#ff4444",tier:"A",
 role:"Tank / Frontline",playstyle:"Aggressive frontline fighter. Push first, absorb pressure, enable your squad with barricades and missile suppression.",
 solo:"B — struggles without teammates to enable",squad:"A — essential frontline anchor",
 prime:"Search & Destroy — shoulder-mounted homing missiles that lock and chase targets",
 tactical:"Riot Barricade — deployable energy shield, blocks incoming fire for you and teammates",
 traits:["Thruster — burst forward dash for closing gaps or escaping","Tactical Sprint — extended sprint that builds less heat"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"Homing missiles auto-lock onto enemy runners and track through repositions."},
   tactical: {videoId:null, start:0, note:"Place the Barricade at a doorway or corner so your squad can safely advance behind cover."},
   traits:   [{videoId:null, start:0, note:"Costs heat — best chained with Tactical Sprint before or after for burst movement."},{videoId:null, start:0, note:"Generates less heat per metre than a standard sprint, letting you sustain movement longer."}]
 },
 tips:["Deploy Riot Barricade before pushing a corner so teammates can safely follow","Use Search & Destroy on runners who break cover — missiles track through repositions","Pair with Triage behind you for sustained frontline pressure","Thruster + Tactical Sprint lets you close gaps faster than enemies expect"],
 weapons:[{name:"WSTR Combat Shotgun",role:"Primary — close range delete",tier:"S"},{name:"Bully SMG",role:"Primary alt — mid range pressure",tier:"A"},{name:"Hardline PR",role:"Secondary — punish exposed targets",tier:"A"}],
 upgrades:{priority:["nc_saf","nc_rest","ca_sink","ca_firm","ca_cred"],reason:"Shields and heat management are critical — Destroyer burns heat fast with movement abilities"},
 cores:["Thruster Mk II (Enhanced) — extends Thruster range","Barricade Boost (Deluxe) — faster Riot Barricade recharge"],
 synergy:"Triage (sustains your pushes) + Recon (feeds you intel on when to move)"
},
{id:"vandal",name:"VANDAL",icon:"⚡",color:"#ffd600",tier:"A",
 role:"Mobility / Flanker",playstyle:"High-speed disruptor. Double jump, enhanced slide, and a Disrupt Cannon to break formations. Punish slow enemies and create chaos.",
 solo:"B — high skill ceiling, mobility can isolate you",squad:"A — flanking and distraction specialist",
 prime:"Amplify — increased movement speed, weapon handling, reduced heat from movement abilities",
 tactical:"Disrupt Cannon — energy blast that pushes enemies out of cover and deals damage. Can also self-boost for movement",
 traits:["Microjets — double jump (generates heat)","Power Slide — faster, longer slide (generates heat)"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"Activate before chaining Microjets and Power Slide — heat costs are drastically reduced during Amplify."},
   tactical: {videoId:null, start:0, note:"Aim at the ground beneath an enemy to fling them upward, breaking their positioning."},
   traits:   [{videoId:null, start:0, note:"Each jump costs heat. With Heat_Sink.exe you can chain multiple jumps before overheating."},{videoId:null, start:0, note:"Extends the slide distance significantly. Combine with Microjets at the end for maximum speed burst."}]
 },
 tips:["Heat management is everything — overheating mid-fight is a death sentence","Use Amplify to chain Microjets + Power Slide bursts to disorient enemies","Disrupt Cannon is excellent for knocking runners off objectives or into bad positions","Pair with Heat_Sink.exe and Quick_Vent.exe upgrades to extend your movement window"],
 weapons:[{name:"BRRT SMG",role:"Primary — fast TTK for flanks",tier:"S"},{name:"WSTR Combat Shotgun",role:"Primary alt — ambush closer",tier:"S"},{name:"Overrun AR",role:"Secondary — versatile fallback",tier:"S"}],
 upgrades:{priority:["ca_sink","ca_qvent","ca_acool","ca_slide","ca_firm"],reason:"Vandal uses heat constantly — maximising heat capacity and recovery is the core build priority"},
 cores:["Amplify Extension (Enhanced) — longer Amplify duration","Microjets Mk II (Deluxe) — reduced heat per jump"],
 synergy:"Destroyer (anchors while you flank) + Thief (loot in the chaos you create)"
},
{id:"triage",name:"TRIAGE",icon:"💊",color:"#39ff14",tier:"S",
 role:"Support / Medic",playstyle:"Squad lifeline. Med-Drone for persistent healing, Shareware to share consumables, Reboot+ to revive from range. Irreplaceable in squads.",
 solo:"C — abilities mostly wasted without teammates",squad:"S — the strongest squad shell in the game",
 prime:"Reboot+ (Capacitive Gauntlets) — fully revive downed teammates from range, or EMP enemies to break shields",
 tactical:"Med-Drone — deployable healing drone that attaches to a teammate, providing constant health and shield regen",
 traits:["Battery Overcharge — EMPs enemies when you break their shields","Shareware.exe — any consumable you use is also applied to teammates with Med-Drone attached"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"Can revive teammates who have already been fully eliminated (thirsted). Crucial PvP swing tool. Also doubles as a shield-breaker EMP on enemies."},
   tactical: {videoId:null, start:0, note:"Drone persists until destroyed or replaced. Attaching it before using consumables is critical for Shareware to work."},
   traits:   [{videoId:null, start:0, note:"The EMP disrupts enemy movement abilities and shield regeneration for a short window — great for locking down a Vandal mid-flank."},{videoId:null, start:0, note:"Allows Triage to multiply consumable value. A single Med Kit effectively heals two players simultaneously."}]
 },
 tips:["Always attach Med-Drone before using consumables — Shareware only works if drone is already on target","Reboot+ can revive thirsted teammates (already fully killed) — this is game-changing in PvP","Battery Overcharge EMPs complements Destroyer's push windows perfectly","Stay mid-range behind Destroyer, not in the frontline"],
 weapons:[{name:"Hardline PR",role:"Primary — safe mid-range poke",tier:"A"},{name:"BR33 Volley Rifle",role:"Primary alt — versatile burst",tier:"S"},{name:"Overrun AR",role:"Secondary — reliable fallback",tier:"S"}],
 upgrades:{priority:["nc_saf","nc_saf2","nc_shie","nc_rest","nc_rest2","nc_regen"],reason:"Full NuCaloric investment maximises survivability so you stay alive to support your squad"},
 cores:["No Good Deed (Superior) — burst healing when Med-Drone attaches to ally","Samaritan (Prestige) — sharing consumable reduces Med-Drone cooldown"],
 synergy:"Destroyer (sustain his pushes from behind) + Recon (know when to reposition safely)"
},
{id:"recon",name:"RECON",icon:"👁️",color:"#4a9eff",tier:"S",
 role:"Intel / Support",playstyle:"Information is your weapon. Echo Pulse reveals all nearby enemies. Your squad always knows what's coming before shots are fired.",
 solo:"A — self-sufficient with great awareness",squad:"S — intel wins fights before they start",
 prime:"Echo Pulse — sends sonar pulses that reveal all nearby player locations through walls",
 tactical:"Tracker Mine — deployable sensor mine that pings and tracks enemies who walk near it",
 traits:["Ghost Ping — your pings stay on enemies briefly after they leave line of sight","Threat Assessment — highlights nearby enemies with low health"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"Pulses pass through all geometry. Best used before entering a building or pushing a choke — reveals exact enemy positions for several seconds."},
   tactical: {videoId:null, start:0, note:"Place at doorways, staircases, and extraction points. Enemies cannot disarm mines before triggering them."},
   traits:   [{videoId:null, start:0, note:"Extends the tracking window when enemies step out of line of sight — great for flankers who try to hide after being pinged."},{videoId:null, start:0, note:"Low-health highlights appear through walls at close range. Makes cleanup kills significantly easier after a fight."}]
 },
 tips:["Echo Pulse before every push — never walk into a room blind","Tracker Mines at choke points give persistent map awareness","Ghost Ping + Echo Pulse combination makes you essentially omniscient in a zone","Pair with Assassin who can convert your intel into guaranteed first strikes"],
 weapons:[{name:"BR33 Volley Rifle",role:"Primary — mid-range dominant",tier:"S"},{name:"Hardline PR",role:"Primary alt — longer range control",tier:"A"},{name:"Longshot",role:"Secondary — punish exposed runners",tier:"A"}],
 upgrades:{priority:["ca_inf","ca_cred","mi_flex","sg_tac","ca_firm"],reason:"Credit accumulation and agility upgrades — Recon wins by information, not brute force"},
 cores:["Echo Amplifier (Enhanced) — larger Echo Pulse radius","Deep Scan (Deluxe) — reveals enemy health bars on pulse"],
 synergy:"Destroyer (clean covered entries) + Assassin (turn intel into precision ambushes)"
},
{id:"assassin",name:"ASSASSIN",icon:"🌑",color:"#bf5af2",tier:"A",
 role:"Stealth / Flanker",playstyle:"Strike before the fight starts. Active Camo for invisible repositioning, Smoke Screen for escapes. Punishes isolated targets ruthlessly.",
 solo:"A — excellent self-sufficient stealth loop",squad:"A — flanking disrupts enemy focus from teammates",
 prime:"Smoke Screen — throws smoke grenades to block sightlines and enable repositioning",
 tactical:"Active Camo — full invisibility, cancelled by any action. Perfect for repositioning or initiating",
 traits:["Shadow Dive — dive creates a field of smoke","Shroud — become invisible while inside your own smoke"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"Smoke persists for several seconds. Can be thrown around corners. Combine with Shroud to turn any smoke cloud into an invisibility zone."},
   tactical: {videoId:null, start:0, note:"Any action — shooting, melee, ability use — immediately cancels camo. Use it to reposition silently, then break camo with a guaranteed first shot."},
   traits:   [{videoId:null, start:0, note:"Triggering a dive in the open creates an instant smoke cloud. Useful for breaking line of sight in areas where you can't throw a grenade."},{videoId:null, start:0, note:"Synergises with Smoke Screen. Throw smoke, walk into it, go invisible. Enemies cannot see you even if they spray into the cloud."}]
 },
 tips:["Smoke first, reposition under Active Camo, take a guaranteed shot, vanish — this is the core loop","Never spray and pray — Assassin collapses if you fight on their terms instead of yours","Smoke + Shroud means you can become invisible mid-fight when inside your own smoke","In squads, your flank forces enemies to split attention — critical timing with Destroyer pushes"],
 weapons:[{name:"WSTR Combat Shotgun",role:"Primary — backstab delete",tier:"S"},{name:"BRRT SMG",role:"Primary alt — extended engagements",tier:"S"},{name:"Longshot",role:"Secondary — picked off from smoke edge",tier:"A"}],
 upgrades:{priority:["ar_kni","ar_str","ar_shot","ca_firm","ca_cred"],reason:"Arachne upgrades for combat capability, Firm Stance for movement — Assassin dies in 2 shots if caught"},
 cores:["Extended Camo (Enhanced) — longer Active Camo duration","Smoke Amplifier (Deluxe) — larger, denser smoke field"],
 synergy:"Recon (convert intel into guaranteed kills) + Triage (revive you when flank fails)"
},
{id:"thief",name:"THIEF",icon:"💰",color:"#ff6d00",tier:"B",
 role:"Looter / Scout",playstyle:"The extraction specialist. Butterfly drone marks enemies and steals their loot. Grapple for rapid movement between containers. Profit over combat.",
 solo:"A — best solo extraction shell in the game",squad:"B — less impactful in direct combat",
 prime:"Pickpocket Drone — pilotable flying drone that attacks UESC drones and players, causing them to drop loot",
 tactical:"Grapple — dart launcher for grappling to surfaces or enemies. Fastest mobility tool in the game",
 traits:["Enhanced Loot Visor — better container highlighting, see rare items through walls","Quick Fingers — faster container looting speed"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"You pilot the drone in first-person while your body stands still. Target UESC cargo drones for free high-tier loot with zero combat risk."},
   tactical: {videoId:null, start:0, note:"Can grapple to walls, ceilings, elevated platforms, or directly to enemies. Used offensively, it closes the gap faster than any sprint."},
   traits:   [{videoId:null, start:0, note:"Highlights containers by rarity through walls up to ~40m. Lets you prioritise high-value crates without opening every box."},{videoId:null, start:0, note:"Looting speed reduction is significant — allows looting in contested areas other runners cannot safely access."}]
 },
 tips:["Pickpocket Drone on UESC cargo drones is free high-tier loot with no combat risk","Grapple is the best escape tool in the game — always have a grapple exit planned","Use Enhanced Loot Visor to prioritise which containers are worth the risk","Best combined with CyberAcme Scavenger/Loot Siphon upgrades for maximum efficiency"],
 weapons:[{name:"Overrun AR",role:"Primary — safe and reliable",tier:"S"},{name:"Bully SMG",role:"Primary alt — if forced into close fights",tier:"A"},{name:"Hardline PR",role:"Secondary — pick off threats before looting",tier:"A"}],
 upgrades:{priority:["ca_scav","ca_lsip","ca_exp","ca_cred","ca_lock"],reason:"CyberAcme loot upgrades synergise directly with Thief's kit — maximise loot efficiency"},
 cores:["Drone Mk II (Enhanced) — faster Pickpocket Drone","Extended Grapple (Deluxe) — longer grapple range"],
 synergy:"Vandal (creates chaos while you loot safely) + Assassin (keeps enemy vision suppressed)"
},
{id:"rook",name:"ROOK",icon:"♜",color:"#c8d8e8",tier:"B",
 role:"Scavenger / Free Loadout",playstyle:"Solo scavenger mode only. No vault gear, basic loadout — but nothing to lose. Best for learning maps, recovery runs after a wipe, or low-risk loot grinding.",
 solo:"B — unique risk-free loop, but gear disadvantaged",squad:"— (solo only)",
 prime:"Signal Mask — brief invisibility to other players. Useful for escaping hostile runners",
 tactical:"Scanner — highlights nearby containers and items through walls",
 traits:["Salvage Expert — faster looting from all container types","Supply Run — bonus loot quality from first container opened per run"],
 abilityVideos:{
   prime:    {videoId:null, start:0, note:"Short duration but enough to break line of sight and disengage. Not a combat tool — treat it as a pure escape button."},
   tactical: {videoId:null, start:0, note:"Reveals container locations through walls in a radius around Rook. Use on entering a new area to quickly identify looting priorities before moving."},
   traits:   [{videoId:null, start:0, note:"Applies to all container types including UESC crates. Stacks with Quick Fingers (Thief trait) if running a mixed strategy."},{videoId:null, start:0, note:"Always open the first container in a new area — you'll get better loot, setting the tone for the run's profitability."}]
 },
 tips:["Never fight geared runners — you will lose. Loot, evade, extract","Focus on containers in low-traffic areas while other squads fight each other","CyberAcme faction upgrades dramatically improve your starting gear and extraction potential","Carrier+ capstone gives you a Deluxe Backpack from run start — transformative for Rook"],
 weapons:[{name:"Overrun AR",role:"Starting weapon — make it work",tier:"S"},{name:"Bully SMG",role:"First upgrade priority if found",tier:"A"},{name:"Any found shotgun",role:"Close range insurance",tier:"varies"}],
 upgrades:{priority:["ca_carr","ca_carr2","ca_scav","ca_lsip","ca_exp"],reason:"Carrier line is essential — better backpack means more loot per run. CyberAcme loot upgrades double your per-run haul"},
 cores:["Supply Cache (Enhanced) — bonus starting ammo","Rook's Luck (Deluxe) — increased first-container loot quality"],
 synergy:"Solo only — but benefits enormously from high CyberAcme faction rank"
}
];

// Upgrades to auto-select per runner (maps to upgrade IDs + level)
const RUNNER_UPGRADE_LOADS={
  destroyer:[{id:"nc_saf",lv:1},{id:"nc_shie",lv:1},{id:"nc_rest",lv:1},{id:"ca_sink",lv:3},{id:"ca_firm",lv:3},{id:"ca_cred",lv:2},{id:"ca_qvent",lv:1}],
  vandal:   [{id:"ca_sink",lv:3},{id:"ca_qvent",lv:2},{id:"ca_acool",lv:2},{id:"ca_slide",lv:1},{id:"ca_firm",lv:2},{id:"ca_carr",lv:1}],
  triage:   [{id:"nc_saf",lv:1},{id:"nc_saf2",lv:1},{id:"nc_shie",lv:1},{id:"nc_rest",lv:1},{id:"nc_rest2",lv:1},{id:"nc_regen",lv:2},{id:"nc_rein",lv:2}],
  recon:    [{id:"ca_inf",lv:2},{id:"ca_cred",lv:2},{id:"ca_firm",lv:1},{id:"nc_saf",lv:1},{id:"nc_rest",lv:1}],
  assassin: [{id:"ar_kni",lv:1},{id:"ar_str",lv:1},{id:"ar_shot",lv:1},{id:"ca_firm",lv:2},{id:"ca_cred",lv:2},{id:"nc_saf",lv:1}],
  thief:    [{id:"ca_scav",lv:3},{id:"ca_lsip",lv:2},{id:"ca_exp",lv:2},{id:"ca_cred",lv:2},{id:"ca_lock",lv:1},{id:"ca_carr",lv:1}],
  rook:     [{id:"ca_carr",lv:1},{id:"ca_carr2",lv:1},{id:"ca_scav",lv:3},{id:"ca_lsip",lv:2},{id:"ca_exp",lv:3}]
};

// ══════════════════════════════════════════
// ABILITY TOOLTIP
// ══════════════════════════════════════════
// Called from inline handlers: pass runnerId + abilityKey so we avoid
// embedding JSON (with double-quotes) inside HTML attribute strings.
function showAbilityTT(runnerId, abilityKey, traitIdx, e) {
  const abt = document.getElementById("abt");
  if (!abt) return;

  const r = RUNNERS.find(x => x.id === runnerId);
  if (!r) return;

  let label, videoData, type;
  if (abilityKey === "prime") {
    label     = r.prime;
    videoData = r.abilityVideos?.prime || null;
    type      = "PRIME";
  } else if (abilityKey === "tactical") {
    label     = r.tactical;
    videoData = r.abilityVideos?.tactical || null;
    type      = "TACTICAL";
  } else if (abilityKey === "trait") {
    label     = r.traits[traitIdx] || "";
    videoData = r.abilityVideos?.traits?.[traitIdx] || null;
    type      = "TRAIT";
  }
  if (!label) return;

  const dash = label.indexOf(" — ");
  const name = dash !== -1 ? label.slice(0, dash) : label;
  const desc = dash !== -1 ? label.slice(dash + 3) : "";

  const typeColors = { PRIME:"#ffd600", TACTICAL:"#4a9eff", TRAIT:"#39ff14" };
  const typeColor  = typeColors[type] || r.color;

  const noteHtml = videoData?.note
    ? `<div style="font-size:.78rem;color:#8aa0b0;margin-top:6px;padding-top:6px;border-top:1px solid #1a2530;line-height:1.5">${videoData.note}</div>`
    : "";

  let videoHtml = "";
  if (videoData?.videoId) {
    const vid = videoData.videoId;
    const t   = videoData.start || 0;
    const src = `https://www.youtube-nocookie.com/embed/${vid}?start=${t}&autoplay=1&mute=1&controls=0&loop=1&playlist=${vid}&modestbranding=1`;
    videoHtml = `<div class="abt-video"><iframe src="${src}" allow="autoplay" allowfullscreen loading="lazy"></iframe></div>`;
  } else {
    videoHtml = `<div class="abt-no-video"><span>▶</span>Clip not yet available</div>`;
  }

  abt.style.borderColor = typeColor + "66";
  abt.innerHTML = `
    <div class="abt-hdr" style="border-bottom-color:${typeColor}33">
      <div class="abt-type" style="color:${typeColor}">${type}</div>
      <div class="abt-name">${name}</div>
    </div>
    <div class="abt-desc">${desc}${noteHtml}</div>
    ${videoHtml}`;
  abt.style.display = "block";
  moveAbilityTT(e);
}

function moveAbilityTT(e) {
  const abt = document.getElementById("abt");
  if (!abt) return;
  const w = abt.offsetWidth  || 340;
  const h = abt.offsetHeight || 200;
  abt.style.left = Math.min(e.clientX + 16, window.innerWidth  - w - 10) + "px";
  abt.style.top  = Math.min(e.clientY + 16, window.innerHeight - h - 10) + "px";
}

function hideAbilityTT() {
  const abt = document.getElementById("abt");
  if (abt) abt.style.display = "none";
}

let activeRunner=null;

function renderRunners(){
  const el=document.getElementById("rv");
  if(activeRunner){renderRunnerDetail(el);return;}
  const tierCol={S:"#39ff14",A:"#ffd600",B:"#ff6d00"};
  el.innerHTML=`
    <div class="rv-hdr">🏃 RUNNER BUILDS</div>
    <div class="rv-sub">Select a shell to see recommended builds, upgrades, weapons and cores. Click "LOAD BUILD" to auto-select upgrades in the tree.</div>
    <div class="runner-grid">
      ${RUNNERS.map(r=>`
        <div class="runner-card" style="border-top-color:${r.color}" onclick="selectRunner('${r.id}')">
          <div class="runner-card-hdr">
            <div class="runner-icon" style="background:${r.color}22;border:1px solid ${r.color}44">${r.icon}</div>
            <div>
              <div style="font-family:'Orbitron',monospace;font-size:15px;color:${r.color};letter-spacing:2px">${r.name}</div>
              <div style="font-size:16px;color:#4a6070;margin-top:2px">${r.role}</div>
            </div>
            <span class="runner-tier" style="border-color:${tierCol[r.tier]||"#4a6070"};color:${tierCol[r.tier]||"#4a6070"}">${r.tier}-TIER</span>
          </div>
          <div class="runner-card-body">
            <div style="font-size:16px;color:#8aa0b0;line-height:1.6;margin-bottom:8px">${r.playstyle}</div>
            <div style="display:flex;gap:8px;font-size:15px">
              <span style="color:#4a6070">SOLO: <span style="color:${tierCol[r.solo[0]]||"#c8d8e8"}">${r.solo.split(" — ")[0]}</span></span>
              <span style="color:#4a6070">SQUAD: <span style="color:${tierCol[r.squad[0]]||"#c8d8e8"}">${r.squad.split(" — ")[0]}</span></span>
            </div>
          </div>
        </div>`).join("")}
    </div>`;
}

function selectRunner(id){activeRunner=id;renderRunners();}

function renderRunnerDetail(el){
  const r=RUNNERS.find(x=>x.id===activeRunner);
  if(!r)return;
  const load=RUNNER_UPGRADE_LOADS[r.id]||[];
  // Calculate costs for this build
  let totalCreds=0;const salvNeeds={};
  load.forEach(({id,lv})=>{
    const u=UG.find(x=>x.id===id);
    if(!u)return;
    for(let i=0;i<Math.min(lv,u.levels.length);i++){
      totalCreds+=u.levels[i].credits;
      u.levels[i].salvage.forEach(s=>{salvNeeds[s.i]=(salvNeeds[s.i]||0)+s.q;});
    }
  });
  const salvRows=Object.entries(salvNeeds).sort((a,b)=>b[1]-a[1]).map(([item,qty])=>{
    const loc=SL[item];const rc=loc?RC[loc.rarity]:"#4a6070";
    return`<div style="display:flex;justify-content:space-between;align-items:center;padding:2px 5px;border-left:2px solid ${rc};margin-bottom:3px;font-size:16px">
      <span style="color:#c8d8e8">◈ ${item}</span><span style="color:#ffd600;font-weight:700">×${qty}</span>
    </div>`;
  }).join("");

  el.innerHTML=`
    <div style="padding:20px">
      <div class="rd-back" onclick="activeRunner=null;renderRunners()">← BACK TO ALL RUNNERS</div>
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
        <div style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;background:${r.color}22;border:2px solid ${r.color}66">${r.icon}</div>
        <div>
          <div style="font-family:'Orbitron',monospace;font-size:18px;color:${r.color};letter-spacing:3px">${r.name}</div>
          <div style="font-size:16px;color:#4a6070;margin-top:2px">${r.role}</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-size:16px;color:#4a6070">SOLO / SQUAD</div>
          <div style="font-size:15px;font-weight:700">${r.solo.split(" — ")[0]} / ${r.squad.split(" — ")[0]}</div>
        </div>
      </div>
      <div style="font-size:16px;color:#8aa0b0;line-height:1.7;margin-bottom:16px;border-left:3px solid ${r.color};padding-left:12px">${r.playstyle}</div>

      <div class="rd-grid">
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:${r.color}">⚡ ABILITIES <span style="font-size:12px;color:#4a6070;font-family:'Share Tech Mono',monospace;letter-spacing:0"> — hover for details</span></div>
          <div style="margin-bottom:8px;cursor:help;padding:5px 7px;border:1px solid transparent;border-radius:2px;transition:border-color .15s"
               onmouseenter="this.style.borderColor='#ffd60044';showAbilityTT('${r.id}','prime',0,event)"
               onmouseleave="this.style.borderColor='transparent';hideAbilityTT()" onmousemove="moveAbilityTT(event)">
            <div style="font-size:15px;color:#ffd600;letter-spacing:1px;margin-bottom:3px">PRIME ⓘ</div>
            <div style="font-size:16px;color:#c8d8e8">${r.prime}</div>
          </div>
          <div style="margin-bottom:8px;cursor:help;padding:5px 7px;border:1px solid transparent;border-radius:2px;transition:border-color .15s"
               onmouseenter="this.style.borderColor='#4a9eff44';showAbilityTT('${r.id}','tactical',0,event)"
               onmouseleave="this.style.borderColor='transparent';hideAbilityTT()" onmousemove="moveAbilityTT(event)">
            <div style="font-size:15px;color:#4a9eff;letter-spacing:1px;margin-bottom:3px">TACTICAL ⓘ</div>
            <div style="font-size:16px;color:#c8d8e8">${r.tactical}</div>
          </div>
          <div>
            <div style="font-size:15px;color:#39ff14;letter-spacing:1px;margin-bottom:3px">TRAITS ⓘ</div>
            ${r.traits.map((t,i)=>`
              <div style="font-size:16px;color:#c8d8e8;margin-bottom:4px;cursor:help;padding:4px 7px;border:1px solid transparent;border-radius:2px;transition:border-color .15s"
                   onmouseenter="this.style.borderColor='#39ff1444';showAbilityTT('${r.id}','trait',${i},event)"
                   onmouseleave="this.style.borderColor='transparent';hideAbilityTT()" onmousemove="moveAbilityTT(event)">• ${t}</div>`).join("")}
          </div>
        </div>
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:#ffd600">🔫 RECOMMENDED WEAPONS</div>
          ${r.weapons.map(w=>{
            const wc={S:"#39ff14",A:"#ffd600",B:"#ff6d00"}[w.tier]||"#4a6070";
            return`<div style="margin-bottom:8px;padding:5px 8px;border-left:2px solid ${wc}">
              <div style="font-size:16px;color:#fff;font-weight:700">${w.name} <span style="font-size:15px;padding:1px 4px;border:1px solid ${wc};color:${wc}">${w.tier}</span></div>
              <div style="font-size:15px;color:#4a6070;margin-top:2px">${w.role}</div>
            </div>`;
          }).join("")}
        </div>
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:#bf5af2">💎 CORES</div>
          ${r.cores.map(c=>`<div style="font-size:16px;color:#c8d8e8;margin-bottom:6px;padding:4px 8px;border-left:2px solid #bf5af2">• ${c}</div>`).join("")}
          <div style="margin-top:10px"><div style="font-size:15px;color:#4a6070;letter-spacing:1px;margin-bottom:4px">BEST SYNERGY</div>
            <div style="font-size:16px;color:#8aa0b0">${r.synergy}</div>
          </div>
        </div>
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:#ff6d00">📦 BUILD COSTS</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #1a2530">
            <span style="color:#4a6070;font-size:16px">Total Credits</span>
            <span style="color:#ffd600;font-weight:700">₵${totalCreds.toLocaleString()}</span>
          </div>
          ${salvRows||`<div style="color:#4a6070;font-size:16px">No salvage needed</div>`}
        </div>
      </div>

      <div class="rd-box" style="margin-bottom:14px">
        <div class="rd-box-hdr" style="color:#39ff14">💡 TIPS</div>
        ${r.tips.map(t=>`<div style="font-size:16px;color:#8aa0b0;margin-bottom:6px;padding-left:10px;border-left:2px solid #1a2530">• ${t}</div>`).join("")}
      </div>

      <div class="rd-box" style="margin-bottom:14px">
        <div class="rd-box-hdr" style="color:#00e5ff">⬆ PRIORITY UPGRADES FOR THIS BUILD</div>
        <div style="margin-bottom:8px;font-size:16px;color:#4a6070">${r.upgrades.reason}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${load.map(({id,lv})=>{
            const u=UG.find(x=>x.id===id);
            if(!u)return"";
            const fc=FC[u.f];
            return`<span style="font-size:15px;padding:3px 8px;border:1px solid ${fc.color};color:${fc.color};background:${fc.color}11">${u.name} Lv${lv}</span>`;
          }).join("")}
        </div>
      </div>

      <button class="rd-load-btn" onclick="loadRunnerBuild('${r.id}')">
        ⬆ LOAD THIS BUILD INTO UPGRADE TREE
      </button>
    </div>`;
}

function loadRunnerBuild(id){
  const load=RUNNER_UPGRADE_LOADS[id]||[];
  UG.forEach(u=>{LV[u.id]=0;PL[u.id]=0;});
  load.forEach(({id:uid,lv})=>{
    if(LV[uid]!==undefined) LV[uid]=lv;
  });
  refresh();
  activeRunner=null;
  showMain("tree");
}

// ══════════════════════════════════════════
