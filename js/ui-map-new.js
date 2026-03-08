// ══════════════════════════════════════════
// MAP PAGE (revamped)
// ══════════════════════════════════════════

const MAPS = {
  perimeter: {
    name:"PERIMETER", sub:"Urban Industrial Zone", color:"#4a9eff", danger:4,
    desc:"Dense city infrastructure. Most contested map — players funnel into Station from multiple directions. Best source of Volatile Wire and Unstable Gunmetal.",
    vw:800, vh:560,
    zones:[
      {id:"station",     label:"STATION",      x:290,y:190,w:220,h:180, color:"#4a9eff", danger:5, tier:"Superior",      tcolor:"#bf5af2",
       desc:"The most contested zone in the game. Three entry points make it a kill-box. Superior containers and the Deluxe Key Room are the prize.",
       loot:["Superior Containers ×4","Arms Locker ×3","Deluxe Key Room","Armory Refresh"],
       tip:"Approach from the south alley — least-watched entry. Clear first floor before the key room."},
      {id:"hauler",      label:"HAULER",        x:490,y:20,w:110,h:155, color:"#ff4444", danger:3, tier:"Enhanced",      tcolor:"#4a9eff",
       desc:"Vehicle depot with shipping containers. Primary Volatile Wire source. Extraction is nearby, making this hotly contested late-game.",
       loot:["Munitions Crate ×3","Standard Containers ×4","Volatile Wire spawns"],
       tip:"Clear the upper walkway first — players camp the Munitions Crates from elevation."},
      {id:"south_relay", label:"SOUTH RELAY",   x:20,y:380,w:125,h:115, color:"#ff6d00", danger:2, tier:"Enhanced",      tcolor:"#4a9eff",
       desc:"Comms relay station. Moderate Unstable Lead and Volatile Wire. Low player traffic makes this a safe farming route.",
       loot:["Arms Locker ×2","Munitions Crate ×2","Standard Containers"],
       tip:"Pair with Hauler for a full Volatile Wire + Unstable Lead haul with minimal PvP."},
      {id:"overflow",    label:"OVERFLOW",      x:600,y:370,w:175,h:145, color:"#39ff14", danger:1, tier:"Standard",      tcolor:"#8aad6a",
       desc:"Storage overflow. Dense Sparkleaf ground spawns — excellent Enhanced salvage with almost zero risk. Worth a loop every run.",
       loot:["Sparkleaf Ground ×6+","Standard Containers","Unstable Gel"],
       tip:"Sprint through in under 90 seconds picking up Sparkleaf. No need to fight here."},
      {id:"arms_locker", label:"ARMS LOCKER",   x:155,y:20,w:115,h:90,  color:"#bf5af2", danger:2, tier:"Enhanced",      tcolor:"#4a9eff",
       desc:"Dedicated weapons cache. Consistent Fractal Circuit and Unstable Diode. Enhanced weapon mods can appear here.",
       loot:["Arms Locker ×4","Fractal Circuit spawns","Unstable Diode","Enhanced Mods (chance)"],
       tip:"Fast loot — in and out in 60 seconds. Don't over-commit; Station is 30 seconds away."},
      {id:"extract_a",   label:"EXTRACT ⬡",    x:640,y:230,w:130,h:80,  color:"#ffd600", danger:5, tier:"Extraction",    tcolor:"#ffd600",
       desc:"Primary extraction. Heavily contested in the final 5 minutes. Players rotate from Station specifically to deny extractions.",
       loot:["Extraction Point"],
       tip:"Smoke the approach from Station. Never stand in the open beacon circle."},
    ],
    pins:[
      {x:318,y:185,icon:"🔒",label:"Deluxe Key Room",   tip:"Inside Station. Needs Deluxe key. Superior container.",     hot:true },
      {x:548,y: 95,icon:"📦",label:"Munitions Crate",    tip:"3 crates on Hauler upper level. Volatile Wire guaranteed."        },
      {x:665,y:430,icon:"🌿",label:"Sparkleaf Field",    tip:"Overflow — 6+ ground spawns, almost zero risk."                   },
      {x:705,y:255,icon:"🚀",label:"Extract Alpha",      tip:"Most contested extract. Approach from south.",              hot:true },
      {x: 90,y:435,icon:"⚡",label:"Volatile Wire",      tip:"South Relay Munitions Crates."                                    },
    ]
  },
  dire_marsh: {
    name:"DIRE MARSH", sub:"Overgrown Wetlands", color:"#39ff14", danger:3,
    desc:"Sprawling wetland. Bio-Research has the highest loot ceiling in the game. Long sightlines punish looting runs — bring a mid-range weapon. Superior salvage locked behind UESC patrols.",
    vw:800, vh:560,
    zones:[
      {id:"bio_research",   label:"BIO-RESEARCH",  x:55,y:55,w:210,h:170, color:"#39ff14", danger:4, tier:"Superior",   tcolor:"#bf5af2",
       desc:"Highest single loot density in the game. Two Bioprinters guarantee Reclaimed Biostripping. Superior Key Room inside. UESC Researcher patrol makes this dangerous.",
       loot:["Bioprinter ×2","Medical Cabinet ×3","Superior Key Room","Reclaimed Biostripping"],
       tip:"Clear the UESC Researchers first — they alert nearby patrols. Then methodically loot Bioprinters before the key room."},
      {id:"quarantine",     label:"QUARANTINE",    x:530,y:40,w:190,h:145, color:"#bf5af2", danger:5, tier:"Superior",   tcolor:"#bf5af2",
       desc:"Highest danger, highest reward. Sterilized Biostripping and Volatile Lens only found here reliably. Multiple UESC Heavy units patrol.",
       loot:["Medical Cabinet ×2","Volatile Lens","Unstable Biomass ×10+","Superior Containers","UESC Heavy ×3"],
       tip:"Enter from south maintenance hatch — bypasses the main patrol route. Bring a Mechanic's Kit."},
      {id:"algae_ponds",    label:"ALGAE PONDS",   x:25,y:345,w:155,h:125, color:"#4a9eff", danger:2, tier:"Enhanced",  tcolor:"#4a9eff",
       desc:"Open wetland area. Bioprinter in eastern dock gives Reclaimed Biostripping. Sparkleaf ground spawns across pond banks. Long sightlines.",
       loot:["Bioprinter ×1","Sparkleaf Ground ×4","Tarax Seed ×2"],
       tip:"Hug the treeline when crossing. The pond itself is a kill-zone with no cover."},
      {id:"greenhouse",     label:"GREENHOUSE",    x:295,y:25,w:105,h:200, color:"#39ff14", danger:1, tier:"Enhanced",  tcolor:"#4a9eff",
       desc:"Massive overgrown greenhouse. Dense Sparkleaf and Tarax Seed ground spawns. Almost zero PvP traffic.",
       loot:["Sparkleaf Ground ×8+","Tarax Seed ×4","Standard Containers"],
       tip:"Fastest Enhanced salvage per minute on the map. Sprint through in 90 seconds."},
      {id:"field_maint",    label:"FIELD MAINT.",  x:575,y:330,w:170,h:135, color:"#ff6d00", danger:2, tier:"Enhanced", tcolor:"#4a9eff",
       desc:"Field maintenance depot. Dermachem Packs in Medical Cabinets. Unstable Gel in Munitions Crates. Good mid-map stop.",
       loot:["Medical Cabinet ×2","Munitions Crate ×2","Dermachem Pack","Unstable Gel ×8"],
       tip:"Efficient mid-map loot stop. 2 minutes max before pushing to AI Uplink."},
      {id:"ai_uplink",      label:"AI UPLINK",     x:645,y:475,w:135,h:75, color:"#ffd600", danger:3, tier:"Event",     tcolor:"#ffd600",
       desc:"Data core station. Triggering the AI Uplink event by collecting data fragments awards a Superior supply drop.",
       loot:["AI Core Event → Superior Drop","Tarax Seed ×3","Fractal Circuit ×2"],
       tip:"Trigger the event immediately on arrival — 2-minute broadcast delay before the drop lands."},
      {id:"extract_b",      label:"EXTRACT ⬡",    x:685,y:245,w:100,h:70, color:"#ffd600", danger:4, tier:"Extraction", tcolor:"#ffd600",
       desc:"Extraction point flanked by Quarantine. Players exiting Quarantine will contest this. The north approach has no cover.",
       loot:["Extraction Point"],
       tip:"Approach from Field Maintenance, not Quarantine. South approach is safer."},
    ],
    pins:[
      {x:158,y:138,icon:"🧬",label:"Bioprinter",         tip:"Bio-Research — Reclaimed Biostripping. Priority loot.", hot:true},
      {x:602,y:112,icon:"☠️",label:"UESC Heavy Zone",    tip:"Quarantine has 3 Heavy patrols. Come prepared.",      hot:true},
      {x:344,y:120,icon:"🌱",label:"Sparkleaf Cluster",  tip:"Greenhouse — 8+ ground spawns, no risk."                     },
      {x: 88,y:400,icon:"💧",label:"Algae Ponds Bio",    tip:"Eastern dock. Reclaimed Biostripping."                       },
      {x:700,y:500,icon:"💡",label:"AI Core Event",      tip:"Trigger for Superior reward drop."                           },
    ]
  }
};

let activeMap  = "perimeter";
let pinZone    = null;  // currently pinned zone id

function renderMap() {
  const el  = document.getElementById("mapv");
  const map = MAPS[activeMap];

  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.height = "calc(100vh - 110px)";
  el.style.overflow = "hidden";

  el.innerHTML = `
    <!-- Top bar -->
    <div style="padding:12px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;flex-wrap:wrap;flex-shrink:0;background:#070d12;position:relative;z-index:5">
      <div style="font-family:'Orbitron',monospace;font-size:14px;color:#00e5ff;letter-spacing:3px">🗺 MAPS</div>
      <div style="display:flex;gap:0;border:1px solid #1a2530">
        ${Object.entries(MAPS).map(([id,m])=>`
          <button onclick="activeMap='${id}';pinZone=null;renderMap()" style="padding:6px 18px;border:none;border-right:1px solid #1a2530;background:${activeMap===id?m.color+'22':'transparent'};color:${activeMap===id?m.color:'#4a6070'};cursor:pointer;font-family:inherit;font-size:10px;letter-spacing:1px;transition:all .2s;white-space:nowrap">${m.name}</button>`
        ).join("")}
      </div>
      <div style="font-size:9px;color:#4a6070;margin-left:auto">${map.sub}</div>
      <div style="display:flex;align-items:center;gap:4px">
        ${Array.from({length:5},(_,i)=>`<div style="width:8px;height:8px;border-radius:2px;background:${i<map.danger?'#ff4444':'#1a2530'}"></div>`).join("")}
        <span style="font-size:9px;color:#4a6070;margin-left:4px">Danger ${map.danger}/5</span>
      </div>
    </div>

    <!-- Main split: map + sidebar -->
    <div style="display:flex;flex:1;overflow:hidden;min-height:0">

      <!-- SVG MAP -->
      <div style="flex:1;position:relative;overflow:hidden;background:#06090e">
        <svg viewBox="0 0 ${map.vw} ${map.vh}" style="width:100%;height:100%;display:block" id="map-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${map.color}08" stroke-width="1"/>
            </pattern>
            <filter id="glow-f">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- Background grid -->
          <rect width="${map.vw}" height="${map.vh}" fill="#07101a"/>
          <rect width="${map.vw}" height="${map.vh}" fill="url(#mapgrid)"/>

          <!-- Ambient glow blobs -->
          ${map.zones.filter(z=>z.danger>=4).map(z=>`
            <ellipse cx="${z.x+z.w/2}" cy="${z.y+z.h/2}" rx="${z.w*.8}" ry="${z.h*.7}" fill="${z.color}06"/>
          `).join("")}

          <!-- ZONES -->
          ${map.zones.map(z=>{
            const sel = pinZone===z.id;
            return `
              <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="6"
                fill="${z.color}${sel?'22':'0d'}" stroke="${z.color}" stroke-width="${sel?2.5:1}"
                style="cursor:pointer;transition:all .25s" filter="${sel?'url(#glow-f)':''}"
                onclick="pinZone=pinZone==='${z.id}'?null:'${z.id}';renderMap()"
                onmouseenter="showMapZoneTT(event,'${activeMap}','${z.id}')"
                onmouseleave="hideTT()" onmousemove="moveTT(event)"/>
              <!-- Zone label -->
              <text x="${z.x+z.w/2}" y="${z.y+16}" text-anchor="middle"
                font-family="Orbitron,monospace" font-size="10" font-weight="700"
                fill="${z.color}" opacity="${sel?1:.85}" style="pointer-events:none;letter-spacing:.5px">${z.label}</text>
              <text x="${z.x+z.w/2}" y="${z.y+30}" text-anchor="middle"
                font-family="monospace" font-size="8.5"
                fill="${z.tcolor}" opacity=".75" style="pointer-events:none">${z.tier}</text>
              ${z.danger>=4?`<text x="${z.x+z.w-10}" y="${z.y+14}" font-size="11" fill="#ff4444" opacity=".9" style="pointer-events:none">⚠</text>`:''}
            `;
          }).join("")}

          <!-- LOOT PINS -->
          ${map.pins.map(p=>`
            <circle cx="${p.x}" cy="${p.y}" r="${p.hot?11:9}"
              fill="${p.hot?'#ff4444':'#ffd600'}18" stroke="${p.hot?'#ff4444':'#ffd600'}" stroke-width="1.5"
              style="cursor:pointer;transition:all .2s"
              onmouseenter="showMapPinTT(event,'${encodeURIComponent(p.label)}','${encodeURIComponent(p.tip)}',${!!p.hot})"
              onmouseleave="hideTT()" onmousemove="moveTT(event)"/>
            <text x="${p.x}" y="${p.y+5}" text-anchor="middle" font-size="${p.hot?13:11}" style="pointer-events:none">${p.icon}</text>
          `).join("")}

          <!-- Compass -->
          <text x="${map.vw-18}" y="22" text-anchor="middle" font-family="Orbitron,monospace" font-size="10" fill="${map.color}" opacity=".4">N</text>
          <text x="${map.vw-18}" y="12" text-anchor="middle" font-size="8" fill="${map.color}" opacity=".3">↑</text>
          <text x="${map.vw-10}" y="${map.vh-8}" font-family="Orbitron,monospace" font-size="9" fill="${map.color}" opacity=".12" text-anchor="end">MARATHON // UPGRADE TRACKER</text>
        </svg>
      </div>

      <!-- SIDEBAR -->
      <div style="width:320px;flex-shrink:0;border-left:1px solid #1a2530;display:flex;flex-direction:column;overflow:hidden;background:#070d12">

        <!-- Map description -->
        <div style="padding:14px 16px;border-bottom:1px solid #1a2530;flex-shrink:0">
          <div style="font-size:9.5px;color:#8aa0b0;line-height:1.7">${map.desc}</div>
        </div>

        <!-- Zone detail OR zone list -->
        <div style="flex:1;overflow-y:auto">
          ${pinZone ? _renderZoneDetail(map) : _renderZoneList(map)}
        </div>

        <!-- Legend -->
        <div style="padding:10px 14px;border-top:1px solid #1a2530;flex-shrink:0;background:#060c10">
          <div style="font-size:8px;color:#4a6070;letter-spacing:1px;margin-bottom:6px">LOOT TIERS</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${[["#bf5af2","Superior"],["#4a9eff","Enhanced"],["#8aad6a","Standard"],["#ffd600","Event/Extract"],["#ff4444","High Risk"]].map(([c,l])=>`
              <div style="display:flex;align-items:center;gap:4px">
                <div style="width:8px;height:8px;border:1px solid ${c};background:${c}22;border-radius:1px"></div>
                <span style="font-size:8px;color:#4a6070">${l}</span>
              </div>`).join("")}
          </div>
          <div style="font-size:8px;color:#2a3a48;margin-top:7px">Click any zone to pin details · hover pins for loot tips</div>
        </div>
      </div>
    </div>`;
}

function _renderZoneList(map) {
  return `
    <div style="padding:8px 14px;font-family:'Orbitron',monospace;font-size:8.5px;color:#4a6070;letter-spacing:2px;border-bottom:1px solid #1a2530">
      ZONES — click to pin details
    </div>
    ${map.zones.map(z=>`
      <div onclick="pinZone='${z.id}';renderMap()" style="padding:11px 14px;border-bottom:1px solid #1a2530;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .15s"
        onmouseenter="this.style.background='${z.color}0d'" onmouseleave="this.style.background=''">
        <div style="width:10px;height:10px;border:1.5px solid ${z.color};background:${z.color}1a;flex-shrink:0;border-radius:2px"></div>
        <div style="flex:1">
          <div style="font-size:10.5px;color:${z.color};font-family:'Orbitron',monospace;margin-bottom:2px">${z.label}</div>
          <div style="font-size:8.5px;color:${z.tcolor}">${z.tier}</div>
        </div>
        <div style="display:flex;gap:2px">
          ${Array.from({length:5},(_,i)=>`<div style="width:5px;height:5px;border-radius:1px;background:${i<z.danger?'#ff4444':'#1a2530'}"></div>`).join("")}
        </div>
      </div>
    `).join("")}
    <div style="padding:12px 14px;border-bottom:1px solid #1a2530">
      <div style="font-family:'Orbitron',monospace;font-size:8.5px;color:#ffd600;letter-spacing:1px;margin-bottom:10px">📍 KEY LOOT PINS</div>
      ${map.pins.map(p=>`
        <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px">
          <span style="font-size:15px;flex-shrink:0">${p.icon}</span>
          <div>
            <div style="font-size:10px;color:${p.hot?'#ff4444':'#c8d8e8'}">${p.label}</div>
            <div style="font-size:8.5px;color:#4a6070;margin-top:1px">${p.tip}</div>
          </div>
        </div>`).join("")}
    </div>`;
}

function _renderZoneDetail(map) {
  const z = map.zones.find(x=>x.id===pinZone);
  if (!z) return _renderZoneList(map);
  return `
    <div style="padding:8px 14px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:8px">
      <button onclick="pinZone=null;renderMap()" style="font-size:9.5px;color:#4a6070;background:transparent;border:none;cursor:pointer;padding:0;transition:color .2s" onmouseenter="this.style.color='#c8d8e8'" onmouseleave="this.style.color='#4a6070'">← ALL ZONES</button>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid ${z.color}44">
      <div style="font-family:'Orbitron',monospace;font-size:13px;color:${z.color};margin-bottom:6px">${z.label}</div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <span style="font-size:9px;padding:2px 8px;border:1px solid ${z.tcolor};color:${z.tcolor}">${z.tier}</span>
        <div style="display:flex;gap:3px">
          ${Array.from({length:5},(_,i)=>`<div style="width:8px;height:8px;border-radius:1px;background:${i<z.danger?'#ff4444':'#1a2530'}"></div>`).join("")}
        </div>
        <span style="font-size:8.5px;color:#4a6070">Danger ${z.danger}/5</span>
      </div>
      <div style="font-size:10px;color:#8aa0b0;line-height:1.7">${z.desc}</div>
    </div>
    <div style="padding:12px 16px;border-bottom:1px solid #1a2530">
      <div style="font-family:'Orbitron',monospace;font-size:8.5px;color:#00e5ff;letter-spacing:1px;margin-bottom:10px">LOOT FOUND HERE</div>
      ${z.loot.map(l=>`
        <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-left:2px solid ${z.color};margin-bottom:5px">
          <span style="font-size:10px;color:#c8d8e8">${l}</span>
        </div>`).join("")}
    </div>
    <div style="margin:12px 16px;padding:12px;background:${z.color}08;border:1px solid #1a2530;border-left:3px solid #ffd600">
      <div style="font-family:'Orbitron',monospace;font-size:8.5px;color:#ffd600;margin-bottom:7px">💡 PRO TIP</div>
      <div style="font-size:10px;color:#8aa0b0;line-height:1.7">${z.tip}</div>
    </div>`;
}

// Map tooltip helpers
function showMapZoneTT(e, mapId, zoneId) {
  const map  = MAPS[mapId];
  const zone = map?.zones.find(z=>z.id===zoneId);
  if (!zone) return;
  const tt = document.getElementById("tt");
  tt.innerHTML = `
    <div style="font-family:'Orbitron',monospace;font-size:11px;color:${zone.color};margin-bottom:6px">${zone.label}</div>
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:7px">
      <span style="font-size:8.5px;padding:1px 6px;border:1px solid ${zone.tcolor};color:${zone.tcolor}">${zone.tier}</span>
      <div style="display:flex;gap:2px">${Array.from({length:5},(_,i)=>`<div style="width:7px;height:7px;background:${i<zone.danger?'#ff4444':'#1a2530'}"></div>`).join("")}</div>
    </div>
    <div style="font-size:9px;color:#8aa0b0;margin-bottom:6px;line-height:1.6;max-width:220px">${zone.desc.substring(0,110)}…</div>
    <div style="font-size:8px;color:#4a6070">Click to pin full details</div>`;
  tt.style.display = "block";
  moveTT(e);
}

function showMapPinTT(e, label, tip, hot) {
  const col = hot ? "#ff4444" : "#ffd600";
  const tt  = document.getElementById("tt");
  tt.innerHTML = `
    <div style="font-size:10.5px;color:${col};margin-bottom:5px">${decodeURIComponent(label)}</div>
    <div style="font-size:9px;color:#8aa0b0;line-height:1.5">${decodeURIComponent(tip)}</div>`;
  tt.style.display = "block";
  moveTT(e);
}
