// ══════════════════════════════════════════
// MAP PAGE
// ══════════════════════════════════════════
const MAPS = [
  {
    id: "perimeter",
    name: "PERIMETER",
    color: "#4a9eff",
    desc: "Urban industrial zone. Dense cover, vertical play, high PvP traffic. UESC patrols near the Station.",
    zones: [
      {id:"station",label:"STATION",x:18,y:15,w:18,h:14,color:"#4a9eff",loot:"Superior",
       desc:"Central hub. Highest traffic zone. Armory refreshes here. Multiple entry points make this dangerous.",
       lootTypes:["Superior Containers","Arms Locker x3","Deluxe Key Room"]},
      {id:"south_relay",label:"SOUTH\nRELAY",x:8,y:50,w:16,h:12,color:"#ff6d00",loot:"Enhanced",
       desc:"Communication relay. Medium traffic. Unstable Lead and Volatile Wire spawn here regularly.",
       lootTypes:["Arms Locker","Munitions Crate","Standard Containers"]},
      {id:"hauler",label:"HAULER",x:55,y:25,w:18,h:14,color:"#ff4444",loot:"Enhanced",
       desc:"Vehicle depot. Volatile Wire in shipping crates. Extraction point nearby.",
       lootTypes:["Munitions Crate x2","Standard Containers","Extraction"]},
      {id:"overflow",label:"OVERFLOW",x:70,y:55,w:18,h:12,color:"#39ff14",loot:"Standard",
       desc:"Overflow storage. Sparkleaf ground spawns. Low-risk loot route.",
       lootTypes:["Standard Containers","Sparkleaf Ground Spawn"]},
      {id:"perimeter_extract",label:"EXTRACT\nALPHA",x:85,y:20,w:12,h:8,color:"#ffd600",loot:"Extraction",
       desc:"Primary extraction point. Contested late-game. Hold approach from Station.",
       lootTypes:["Extraction Point"]},
      {id:"arms_locker_p",label:"ARMS\nLOCKER",x:38,y:65,w:14,h:10,color:"#bf5af2",loot:"Enhanced",
       desc:"Fractal Circuits and Unstable Diodes. Consistent spawn.",
       lootTypes:["Arms Locker","Fractal Circuit","Unstable Diode"]},
    ],
    lootHighlights: [
      {x:20,y:18,emoji:"🔒",label:"Deluxe Key Room",tip:"Superior container inside — bring Deluxe key"},
      {x:60,y:30,emoji:"📦",label:"Munitions Crate",tip:"Volatile Wire, Unstable Gunmetal"},
      {x:73,y:58,emoji:"🌿",label:"Sparkleaf",tip:"Ground spawns scattered — low risk, good salvage"},
      {x:87,y:23,emoji:"🚀",label:"Extract Alpha",tip:"Most contested extract — approach from south"},
    ]
  },
  {
    id: "dire_marsh",
    name: "DIRE MARSH",
    color: "#39ff14",
    desc: "Overgrown wetlands. Long sightlines in open areas, tight corridors in the research complex. Superior loot in UESC zones.",
    zones: [
      {id:"bio_research",label:"BIO\nRESEARCH",x:30,y:12,w:22,h:16,color:"#39ff14",loot:"Superior",
       desc:"Highest loot density on the map. Bioprinter rooms spawn Reclaimed Biostripping. UESC patrols inside.",
       lootTypes:["Bioprinter x2","Medical Cabinet","Superior Rooms (key req.)","Reclaimed Biostripping"]},
      {id:"algae_ponds",label:"ALGAE\nPONDS",x:8,y:40,w:18,h:14,color:"#4a9eff",loot:"Enhanced",
       desc:"Open wetland. Long sightlines. Reclaimed Biostripping in Bioprinter here.",
       lootTypes:["Bioprinter","Sparkleaf Ground","Tarax Seed"]},
      {id:"quarantine",label:"QUARANTINE",x:60,y:18,w:20,h:14,color:"#bf5af2",loot:"Superior",
       desc:"Volatile Lens and Sterilized Biostripping. High UESC density — come prepared.",
       lootTypes:["Medical Cabinet","Volatile Lens","Unstable Biomass","UESC Patrol"]},
      {id:"field_maint",label:"FIELD\nMAINT.",x:18,y:65,w:18,h:12,color:"#ff6d00",loot:"Enhanced",
       desc:"Munitions and Gel spawns. Dermachem Packs in medical cabinets.",
       lootTypes:["Munitions Crate","Dermachem Pack","Unstable Gel"]},
      {id:"ai_uplink",label:"AI UPLINK",x:65,y:55,w:16,h:10,color:"#ffd600",loot:"Enhanced",
       desc:"Tarax Seeds and Fractal Circuits. UESC Data Core event triggers here.",
       lootTypes:["Tarax Seed","AI Core Event","Fractal Circuit"]},
      {id:"greenhouse",label:"GREEN\nHOUSE",x:40,y:70,w:16,h:12,color:"#39ff14",loot:"Enhanced",
       desc:"Tarax Seeds and Sparkleaf everywhere. Low combat risk.",
       lootTypes:["Sparkleaf Ground","Tarax Seed","Standard Containers"]},
      {id:"marsh_extract",label:"EXTRACT\nBETA",x:82,y:40,w:12,h:8,color:"#ffd600",loot:"Extraction",
       desc:"Extraction. Flanked by Quarantine — watch the high ground approach.",
       lootTypes:["Extraction Point"]},
    ],
    lootHighlights: [
      {x:40,y:18,emoji:"🧬",label:"Bioprinter",tip:"Reclaimed Biostripping — Enhanced salvage"},
      {x:65,y:22,emoji:"⚠️",label:"UESC Heavy",tip:"Quarantine — dangerous but Superior loot"},
      {x:47,y:75,emoji:"🌱",label:"Sparkleaf",tip:"Ground spawns around greenhouse — free Enhanced"},
      {x:70,y:58,emoji:"💡",label:"AI Core Event",tip:"Complete for Superior reward drop"},
      {x:84,y:43,emoji:"🚀",label:"Extract Beta",tip:"Watch Quarantine high ground during extract"},
    ]
  }
];

let activeMap = "perimeter";
let mapHoverZone = null;

function renderMap(){
  const el = document.getElementById("mapv");
  const map = MAPS.find(m=>m.id===activeMap);
  
  el.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;position:sticky;top:0;background:#070d12;z-index:10">
      <div class="page-hdr" style="margin:0">🗺️ MAP OVERVIEW</div>
      ${MAPS.map(m=>`<button onclick="activeMap='${m.id}';renderMap()" style="padding:5px 14px;border:1px solid ${activeMap===m.id?m.color:"#1a2530"};color:${activeMap===m.id?m.color:"#4a6070"};background:${activeMap===m.id?m.color+"22":"transparent"};cursor:pointer;font-family:inherit;font-size:10px;letter-spacing:1px;transition:all .2s">${m.name}</button>`).join("")}
    </div>
    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 360px;gap:16px">
      <div>
        <div style="font-size:10px;color:#4a6070;margin-bottom:12px">${map.desc}</div>
        <div style="position:relative;background:#0a1520;border:1px solid #1a2530;overflow:hidden" id="map-canvas">
          <!-- Grid lines -->
          <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.15" viewBox="0 0 100 85">
            ${Array.from({length:10},(_,i)=>`<line x1="${i*10}" y1="0" x2="${i*10}" y2="85" stroke="#1a2530" stroke-width=".3"/>`).join("")}
            ${Array.from({length:9},(_,i)=>`<line x1="0" y1="${i*10}" x2="100" y2="${i*10}" stroke="#1a2530" stroke-width=".3"/>`).join("")}
          </svg>
          <!-- Map bg texture -->
          <svg viewBox="0 0 100 85" style="width:100%;display:block">
            <!-- Terrain base -->
            ${map.id==="perimeter"?`
              <rect x="0" y="0" width="100" height="85" fill="#0a1520"/>
              <ellipse cx="50" cy="42" rx="45" ry="38" fill="#0c1a28" opacity=".6"/>
              <path d="M10,10 L90,10 L95,75 L5,80 Z" fill="#0d1c2e" opacity=".4"/>
            `:`
              <rect x="0" y="0" width="100" height="85" fill="#081410"/>
              <ellipse cx="35" cy="45" rx="30" ry="28" fill="#0a1a12" opacity=".7"/>
              <ellipse cx="70" cy="38" rx="25" ry="20" fill="#091512" opacity=".6"/>
            `}
            <!-- Zones -->
            ${map.zones.map(z=>`
              <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" 
                fill="${z.color}18" stroke="${z.color}" stroke-width=".8" rx="1.5"
                style="cursor:pointer;transition:all .15s"
                onmouseenter="showMapZoneTT(event,'${map.id}','${z.id}')" 
                onmouseleave="hideTT()" onmousemove="moveTT(event)"
                onclick="highlightMapZone('${z.id}')"/>
              <text x="${z.x+z.w/2}" y="${z.y+z.h/2}" 
                text-anchor="middle" dominant-baseline="middle"
                font-family="Orbitron,monospace" font-size="2.2" 
                fill="${z.color}" style="pointer-events:none">${z.label}</text>
            `).join("")}
            <!-- Loot pins -->
            ${map.lootHighlights.map(p=>`
              <text x="${p.x}" y="${p.y}" font-size="3.5" text-anchor="middle"
                style="cursor:pointer;filter:drop-shadow(0 0 2px rgba(0,0,0,.9))"
                onmouseenter="showMapPinTT(event,'${encodeURIComponent(p.label)}','${encodeURIComponent(p.tip)}')"
                onmouseleave="hideTT()" onmousemove="moveTT(event)">${p.emoji}</text>
            `).join("")}
          </svg>
        </div>
        <div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap;font-size:8.5px">
          ${[["#ffd600","Extraction"],["#bf5af2","Superior Loot"],["#4a9eff","Enhanced Loot"],["#ff6d00","Standard Loot"],["#39ff14","Safe/Plants"]].map(([c,l])=>`
            <div style="display:flex;align-items:center;gap:5px;color:#4a6070">
              <div style="width:10px;height:10px;border:1px solid ${c};background:${c}33"></div>${l}
            </div>`).join("")}
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:10px">
          <div class="card-hdr" style="color:#ffd600">📍 ZONE GUIDE</div>
          <div style="font-size:8.5px;color:#4a6070;margin-bottom:8px">Hover zones on map for details</div>
          ${map.zones.map(z=>`
            <div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-left:2px solid ${z.color};margin-bottom:4px;cursor:pointer;background:#070d12"
              onmouseenter="this.style.background='${z.color}11'" onmouseleave="this.style.background='#070d12'">
              <div style="flex:1">
                <div style="font-size:9px;color:${z.color};font-family:'Orbitron',monospace">${z.label.replace("\\n"," ")}</div>
                <div style="font-size:7.5px;color:#4a6070;margin-top:1px">${z.loot} Loot</div>
              </div>
              <div style="font-size:7px;padding:1px 5px;border:1px solid ${z.color};color:${z.color}">${z.lootTypes[0]}</div>
            </div>`).join("")}
        </div>
        <div class="card">
          <div class="card-hdr" style="color:#00e5ff">🔑 TIPS FOR THIS MAP</div>
          ${map.id==="perimeter"?`
            <div style="font-size:9px;color:#8aa0b0;line-height:1.8">
              • Station is always hotly contested — plan your rotation before going in<br>
              • Hauler gives safe Volatile Wire without fighting<br>
              • Sparkleaf at Overflow is free Enhanced salvage — low risk<br>
              • Extract Alpha is north — opponents from Station will race you<br>
              • Arms Locker near center spawns Fractal Circuits consistently
            </div>
          `:`
            <div style="font-size:9px;color:#8aa0b0;line-height:1.8">
              • Bio-Research has the highest loot ceiling on the map<br>
              • Bring Mechanic's Kit for Quarantine — UESC hazard zones<br>
              • Greenhouse is near-zero risk Sparkleaf farming<br>
              • AI Uplink event gives Superior reward — worth triggering<br>
              • Algae Ponds has Bioprinters — Reclaimed Biostripping source
            </div>
          `}
        </div>
      </div>
    </div>`;
}

function showMapZoneTT(e, mapId, zoneId){
  const map = MAPS.find(m=>m.id===mapId);
  if(!map)return;
  const zone = map.zones.find(z=>z.id===zoneId);
  if(!zone)return;
  const tt = document.getElementById("tt");
  tt.innerHTML = `
    <div style="font-family:'Orbitron',monospace;font-size:11px;color:${zone.color};margin-bottom:6px">${zone.label.replace("\\n"," ")}</div>
    <div style="font-size:9px;color:#c8d8e8;margin-bottom:8px;line-height:1.6">${zone.desc}</div>
    <div style="font-size:8px;color:#ffd600;margin-bottom:4px;letter-spacing:1px">LOOT FOUND HERE</div>
    ${zone.lootTypes.map(l=>`<div style="font-size:8.5px;color:#8aa0b0;padding:2px 6px;border-left:2px solid ${zone.color};margin-bottom:2px">${l}</div>`).join("")}`;
  tt.style.display="block"; moveTT(e);
}

function showMapPinTT(e, label, tip){
  const tt = document.getElementById("tt");
  tt.innerHTML = `
    <div style="font-size:10px;color:#ffd600;margin-bottom:6px">${decodeURIComponent(label)}</div>
    <div style="font-size:9px;color:#8aa0b0">${decodeURIComponent(tip)}</div>`;
  tt.style.display="block"; moveTT(e);
}

function highlightMapZone(zoneId){ /* future: highlight selected zone */ }