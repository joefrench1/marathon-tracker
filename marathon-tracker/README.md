# MARATHON // UPGRADE TRACKER

A fan-made upgrade tracker for Marathon (Bungie, 2025).

## Features
- **Upgrade Tree** — All 6 factions, L-click to own, R-click to plan
- **Salvage Planner** — Track owned and needed materials
- **Build Summary** — Recommended unlock order with costs
- **Runner Builds** — All 7 shells with tier ratings and build guides
- **Guns & Items** — Full weapon database with stats, mods, favourites
- **Map** — Interactive Perimeter and Dire Marsh zone guides
- **Run Tracker** — Log your raids, track extract rate and earnings
- **Loadout Planner** — Save pre-raid kit configurations
- **Contracts** — Track faction contract completion
- **Ammo Calculator** — Plan your ammo stack before a run
- **Squad Sessions** — Live build sharing with side-by-side comparison

## Squad / Auth Setup (Supabase)

1. Go to [supabase.com](https://supabase.com) → your project → **Settings → API**
2. Copy the **anon/public** key (starts with `eyJ…`)
3. Open `js/auth.js` and replace `PASTE_YOUR_ANON_JWT_HERE` with your key
4. Your Supabase URL is already set to `https://ppzulorxyiwkzhfeubhr.supabase.co`

## File Structure

```
marathon-tracker/
├── index.html          ← Open this in browser
├── css/
│   └── main.css        ← All styles
└── js/
    ├── data.js         ← Factions, salvage materials, upgrades data
    ├── core.js         ← State, tree render, tooltips
    ├── ui.js           ← Salvage planner, build summary, modal, zoom
    ├── runners.js      ← Runner builds page
    ├── guns.js         ← Guns & Items database
    ├── auth.js         ← Supabase auth (sign in / sign up)
    ├── squad.js        ← Squad sessions, side-by-side compare
    ├── map.js          ← Interactive map (Perimeter + Dire Marsh)
    ├── runs.js         ← Run tracker
    ├── loadout.js      ← Loadout planner
    ├── contracts.js    ← Contract tracker
    └── ammo.js         ← Ammo calculator
```

## Local Usage

Just open `index.html` in any modern browser. No server needed.

## Hosting Online

### Option A — Netlify (easiest, free)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `marathon-tracker/` folder onto the page
3. You get a `yoursite.netlify.app` URL instantly
4. To use a custom Namecheap domain: **Site settings → Domain management → Add custom domain**

### Option B — GitHub Pages (free, version controlled)
See HOSTING.md for full step-by-step instructions.

---

*Not affiliated with Bungie. All game data sourced from community wikis (Dexerto, Shacknews).*
