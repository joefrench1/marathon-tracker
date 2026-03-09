// ══════════════════════════════════════════
// TOOLS HUB — Run Tracker + Loadout + Ammo
// ══════════════════════════════════════════

let toolsTab = "runs";

function renderToolsHub() {
  const el = document.getElementById("view-tools");
  if (!el) return;

  el.innerHTML = `
    <div class="tools-tabs" id="tools-tab-bar">
      <button class="tools-tab ${toolsTab==="runs"?"on":""}"    onclick="switchToolsTab('runs')">📊 RUN TRACKER</button>
      <button class="tools-tab ${toolsTab==="loadout"?"on":""}" onclick="switchToolsTab('loadout')">🎒 LOADOUT</button>
      <button class="tools-tab ${toolsTab==="ammo"?"on":""}"    onclick="switchToolsTab('ammo')">🔹 AMMO CALC</button>
    </div>
    <div id="tools-content"></div>`;

  renderToolsContent();
}

function switchToolsTab(t) {
  toolsTab = t;
  document.querySelectorAll(".tools-tab").forEach(b=>{
    b.classList.toggle("on", b.getAttribute("onclick")?.includes(`'${t}'`));
  });
  renderToolsContent();
}

function renderToolsContent() {
  const el = document.getElementById("tools-content");
  if (!el) return;
  if (toolsTab === "runs") {
    // Render into #runsv inside tools-content, then call renderRuns
    el.innerHTML = `<div id="runsv" style="padding:22px"></div>`;
    renderRuns();
  } else if (toolsTab === "loadout") {
    el.innerHTML = `<div id="loadoutv" style="padding:22px"></div>`;
    renderLoadout();
  } else if (toolsTab === "ammo") {
    el.innerHTML = `<div id="ammov" style="padding:22px"></div>`;
    renderAmmo();
  }
}
