// ══════════════════════════════════════════
// RUN TRACKER
// ══════════════════════════════════════════
let runLog = JSON.parse(localStorage.getItem("mara_runs") || "[]");
let showRunForm = false;

function saveRuns(){ try{localStorage.setItem("mara_runs", JSON.stringify(runLog));}catch(e){} }

function renderRuns(){
  const el = document.getElementById("runsv");
  
  // Stats summary
  const total = runLog.length;
  const wins = runLog.filter(r=>r.outcome==="extract").length;
  const totalCreds = runLog.reduce((s,r)=>s+(r.credits||0),0);
  const totalKills = runLog.reduce((s,r)=>s+(r.kills||0),0);
  const wrate = total>0?Math.round(wins/total*100):0;
  
  // Best run
  const best = runLog.reduce((b,r)=>(!b||r.credits>b.credits)?r:b, null);
  
  el.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #1a2530;display:flex;align-items:center;gap:12px;position:sticky;top:0;background:#070d12;z-index:10;flex-wrap:wrap">
      <div class="page-hdr" style="margin:0">📊 RUN TRACKER</div>
      <button onclick="showRunForm=!showRunForm;renderRuns()" style="margin-left:auto;padding:5px 14px;border:1px solid #39ff14;color:#39ff14;background:transparent;cursor:pointer;font-family:inherit;font-size:10px">+ LOG RUN</button>
      ${runLog.length>0?`<button onclick="if(confirm('Clear all run history?')){runLog=[];saveRuns();renderRuns();}" style="padding:5px 10px;border:1px solid #ff006e;color:#ff006e;background:transparent;cursor:pointer;font-family:inherit;font-size:9px">✕ CLEAR</button>`:""}
    </div>
    <div style="padding:16px 20px">
    
    ${showRunForm ? renderRunForm() : ""}
    
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:16px">
      ${[
        ["RUNS",total,"#00e5ff"],
        ["EXTRACTS",wins,"#39ff14"],
        ["WIN RATE",wrate+"%","#ffd600"],
        ["TOTAL ₵",totalCreds.toLocaleString(),"#ffd600"],
        ["TOTAL KILLS",totalKills,"#ff4444"],
        ["BEST RUN",best?"₵"+(best.credits||0).toLocaleString():"—","#bf5af2"]
      ].map(([l,v,c])=>`
        <div class="card" style="text-align:center;border-top:3px solid ${c}">
          <div style="font-size:22px;font-weight:700;font-family:'Orbitron',monospace;color:${c}">${v}</div>
          <div style="font-size:8px;color:#4a6070;letter-spacing:1px;margin-top:3px">${l}</div>
        </div>`).join("")}
    </div>
    
    <!-- Run history -->
    ${runLog.length===0?`<div style="text-align:center;padding:40px;color:#4a6070;font-size:11px;letter-spacing:2px">NO RUNS LOGGED YET<br><span style="font-size:9px;margin-top:8px;display:block">Click + LOG RUN after each raid</span></div>`:`
    <div>
      <div style="font-family:'Orbitron',monospace;font-size:10px;color:#4a6070;letter-spacing:2px;margin-bottom:10px">RUN HISTORY (${runLog.length})</div>
      ${[...runLog].reverse().map((r,i)=>{
        const ri = runLog.length - 1 - i;
        const oc = {extract:"#39ff14",died:"#ff4444",quit:"#ffd600"}[r.outcome]||"#4a6070";
        const ol = {extract:"EXTRACTED","died":"DIED","quit":"QUIT"}[r.outcome]||r.outcome;
        return`<div class="run-row">
          <div style="font-size:16px">${{extract:"✅",died:"💀",quit:"🏃"}[r.outcome]||"?"}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
              <span style="font-size:9px;font-family:'Orbitron',monospace;color:${oc}">${ol}</span>
              <span style="font-size:8px;color:#4a6070">${r.map||"Unknown Map"}</span>
              <span style="font-size:8px;color:#4a6070">${r.runner||""}</span>
              <span style="font-size:8px;color:#4a6070;margin-left:auto">${r.date||""}</span>
            </div>
            <div style="display:flex;gap:14px;font-size:9px;flex-wrap:wrap">
              ${r.credits?`<span style="color:#ffd600">₵${r.credits.toLocaleString()}</span>`:""}
              ${r.kills!=null?`<span style="color:#ff4444">⚔ ${r.kills} kills</span>`:""}
              ${r.loot?`<span style="color:#bf5af2">◈ ${r.loot}</span>`:""}
            </div>
            ${r.notes?`<div style="font-size:8.5px;color:#4a6070;margin-top:3px;font-style:italic">"${r.notes}"</div>`:""}
          </div>
          <button onclick="runLog.splice(${ri},1);saveRuns();renderRuns()" style="font-size:8px;padding:2px 6px;border:1px solid #ff006e;color:#ff006e;background:transparent;cursor:pointer;font-family:inherit">✕</button>
        </div>`;
      }).join("")}
    </div>`}
    </div>`;
}

function renderRunForm(){
  return `<div class="card" style="margin-bottom:16px;border-color:#39ff14;border-left:3px solid #39ff14">
    <div class="card-hdr" style="color:#39ff14">+ LOG A NEW RUN</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px">
      <div>
        <div style="font-size:8px;color:#4a6070;margin-bottom:4px">OUTCOME</div>
        <select id="rf-outcome" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:10px">
          <option value="extract">✅ Extracted</option>
          <option value="died">💀 Died</option>
          <option value="quit">🏃 Quit</option>
        </select>
      </div>
      <div>
        <div style="font-size:8px;color:#4a6070;margin-bottom:4px">MAP</div>
        <select id="rf-map" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:10px">
          <option>Perimeter</option><option>Dire Marsh</option>
        </select>
      </div>
      <div>
        <div style="font-size:8px;color:#4a6070;margin-bottom:4px">RUNNER</div>
        <select id="rf-runner" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:10px">
          <option>Destroyer</option><option>Vandal</option><option>Triage</option><option>Recon</option><option>Assassin</option><option>Thief</option><option>Rook</option>
        </select>
      </div>
      <div>
        <div style="font-size:8px;color:#4a6070;margin-bottom:4px">CREDITS EARNED</div>
        <input id="rf-credits" type="number" placeholder="0" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#ffd600;padding:5px;font-family:inherit;font-size:10px">
      </div>
      <div>
        <div style="font-size:8px;color:#4a6070;margin-bottom:4px">KILLS</div>
        <input id="rf-kills" type="number" placeholder="0" min="0" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#ff4444;padding:5px;font-family:inherit;font-size:10px">
      </div>
      <div>
        <div style="font-size:8px;color:#4a6070;margin-bottom:4px">ITEMS EXTRACTED</div>
        <input id="rf-loot" placeholder="e.g. Refined Wire x5" style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:10px">
      </div>
    </div>
    <div style="margin-bottom:10px">
      <div style="font-size:8px;color:#4a6070;margin-bottom:4px">NOTES (optional)</div>
      <input id="rf-notes" placeholder="What happened? Ambushed at station, found Prestige AR..." style="width:100%;background:#070d12;border:1px solid #1a2530;color:#c8d8e8;padding:5px;font-family:inherit;font-size:10px">
    </div>
    <div style="display:flex;gap:8px">
      <button onclick="submitRun()" style="padding:7px 18px;border:1px solid #39ff14;color:#39ff14;background:transparent;cursor:pointer;font-family:inherit;font-size:10px;letter-spacing:1px">SAVE RUN</button>
      <button onclick="showRunForm=false;renderRuns()" style="padding:7px 14px;border:1px solid #1a2530;color:#4a6070;background:transparent;cursor:pointer;font-family:inherit;font-size:10px">CANCEL</button>
    </div>
  </div>`;
}

function submitRun(){
  const run = {
    outcome: document.getElementById("rf-outcome").value,
    map: document.getElementById("rf-map").value,
    runner: document.getElementById("rf-runner").value,
    credits: parseInt(document.getElementById("rf-credits").value)||0,
    kills: parseInt(document.getElementById("rf-kills").value)||0,
    loot: document.getElementById("rf-loot").value,
    notes: document.getElementById("rf-notes").value,
    date: new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short"})
  };
  runLog.push(run);
  saveRuns();
  showRunForm = false;
  renderRuns();
}