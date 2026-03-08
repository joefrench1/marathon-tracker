// RUNNER BUILDS DATA
// ══════════════════════════════════════════
const RUNNERS=[
{id:"destroyer",name:"DESTROYER",icon:"🛡️",color:"#ff4444",tier:"A",
 role:"Tank / Frontline",playstyle:"Aggressive frontline fighter. Push first, absorb pressure, enable your squad with barricades and missile suppression.",
 solo:"B — struggles without teammates to enable",squad:"A — essential frontline anchor",
 prime:"Search & Destroy — shoulder-mounted homing missiles that lock and chase targets",
 tactical:"Riot Barricade — deployable energy shield, blocks incoming fire for you and teammates",
 traits:["Thruster — burst forward dash for closing gaps or escaping","Tactical Sprint — extended sprint that builds less heat"],
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
              <div style="font-family:'Orbitron',monospace;font-size:12px;color:${r.color};letter-spacing:2px">${r.name}</div>
              <div style="font-size:9px;color:#4a6070;margin-top:2px">${r.role}</div>
            </div>
            <span class="runner-tier" style="border-color:${tierCol[r.tier]||"#4a6070"};color:${tierCol[r.tier]||"#4a6070"}">${r.tier}-TIER</span>
          </div>
          <div class="runner-card-body">
            <div style="font-size:9px;color:#8aa0b0;line-height:1.6;margin-bottom:8px">${r.playstyle}</div>
            <div style="display:flex;gap:8px;font-size:8px">
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
    return`<div style="display:flex;justify-content:space-between;align-items:center;padding:2px 5px;border-left:2px solid ${rc};margin-bottom:3px;font-size:9px">
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
          <div style="font-size:10px;color:#4a6070;margin-top:2px">${r.role}</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-size:9px;color:#4a6070">SOLO / SQUAD</div>
          <div style="font-size:11px;font-weight:700">${r.solo.split(" — ")[0]} / ${r.squad.split(" — ")[0]}</div>
        </div>
      </div>
      <div style="font-size:10px;color:#8aa0b0;line-height:1.7;margin-bottom:16px;border-left:3px solid ${r.color};padding-left:12px">${r.playstyle}</div>

      <div class="rd-grid">
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:${r.color}">⚡ ABILITIES</div>
          <div style="margin-bottom:8px"><div style="font-size:8px;color:#ffd600;letter-spacing:1px;margin-bottom:3px">PRIME</div><div style="font-size:9px;color:#c8d8e8">${r.prime}</div></div>
          <div style="margin-bottom:8px"><div style="font-size:8px;color:#4a9eff;letter-spacing:1px;margin-bottom:3px">TACTICAL</div><div style="font-size:9px;color:#c8d8e8">${r.tactical}</div></div>
          <div><div style="font-size:8px;color:#39ff14;letter-spacing:1px;margin-bottom:3px">TRAITS</div>
            ${r.traits.map(t=>`<div style="font-size:9px;color:#c8d8e8;margin-bottom:2px">• ${t}</div>`).join("")}
          </div>
        </div>
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:#ffd600">🔫 RECOMMENDED WEAPONS</div>
          ${r.weapons.map(w=>{
            const wc={S:"#39ff14",A:"#ffd600",B:"#ff6d00"}[w.tier]||"#4a6070";
            return`<div style="margin-bottom:8px;padding:5px 8px;border-left:2px solid ${wc}">
              <div style="font-size:9px;color:#fff;font-weight:700">${w.name} <span style="font-size:7px;padding:1px 4px;border:1px solid ${wc};color:${wc}">${w.tier}</span></div>
              <div style="font-size:8px;color:#4a6070;margin-top:2px">${w.role}</div>
            </div>`;
          }).join("")}
        </div>
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:#bf5af2">💎 CORES</div>
          ${r.cores.map(c=>`<div style="font-size:9px;color:#c8d8e8;margin-bottom:6px;padding:4px 8px;border-left:2px solid #bf5af2">• ${c}</div>`).join("")}
          <div style="margin-top:10px"><div style="font-size:8px;color:#4a6070;letter-spacing:1px;margin-bottom:4px">BEST SYNERGY</div>
            <div style="font-size:9px;color:#8aa0b0">${r.synergy}</div>
          </div>
        </div>
        <div class="rd-box">
          <div class="rd-box-hdr" style="color:#ff6d00">📦 BUILD COSTS</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #1a2530">
            <span style="color:#4a6070;font-size:9px">Total Credits</span>
            <span style="color:#ffd600;font-weight:700">₵${totalCreds.toLocaleString()}</span>
          </div>
          ${salvRows||`<div style="color:#4a6070;font-size:9px">No salvage needed</div>`}
        </div>
      </div>

      <div class="rd-box" style="margin-bottom:14px">
        <div class="rd-box-hdr" style="color:#39ff14">💡 TIPS</div>
        ${r.tips.map(t=>`<div style="font-size:9px;color:#8aa0b0;margin-bottom:6px;padding-left:10px;border-left:2px solid #1a2530">• ${t}</div>`).join("")}
      </div>

      <div class="rd-box" style="margin-bottom:14px">
        <div class="rd-box-hdr" style="color:#00e5ff">⬆ PRIORITY UPGRADES FOR THIS BUILD</div>
        <div style="margin-bottom:8px;font-size:9px;color:#4a6070">${r.upgrades.reason}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${load.map(({id,lv})=>{
            const u=UG.find(x=>x.id===id);
            if(!u)return"";
            const fc=FC[u.f];
            return`<span style="font-size:8px;padding:3px 8px;border:1px solid ${fc.color};color:${fc.color};background:${fc.color}11">${u.name} Lv${lv}</span>`;
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
