# MARATHON // UPGRADE TRACKER

A fan-made upgrade tracker for **Marathon** (Bungie 2025), built as a single-file HTML app.

## Features

- 🌐 **Upgrade Tree** — Interactive faction upgrade nodes, left-click to own, right-click to plan
- ◈ **Salvage Planner** — Track owned and planned salvage materials
- 📋 **Build Summary** — Full cost breakdown and recommended unlock order
- 🏃 **Runner Builds** — All 7 shells rated and explained with loadout tips
- 🔫 **Guns & Items** — Full weapon database with stat bars, tier ratings, and item guide
- 🗺️ **Map** — Interactive Perimeter and Dire Marsh zone guides with loot pins
- 📊 **Run Tracker** — Log raid outcomes, kills, loot, and credits across sessions
- 🎒 **Loadout Planner** — Save and load pre-raid weapon + item loadouts
- 📋 **Contract Tracker** — Track faction contract progress across all six factions
- 🔹 **Ammo Calc** — Calculate recommended ammo stacks per raid based on playstyle
- 👥 **Squad** — Real-time squad sessions — see your team's builds side-by-side

## Setup

### Quick Start (local)
1. Download `index.html`
2. Double-click to open in any browser — no server required

### Authentication + Squad (Supabase)
Squad sessions and build auto-save require a free [Supabase](https://supabase.com) project.

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your **anon / public** JWT key (starts with `eyJ…`)
3. Open `index.html` in a text editor, find:
   ```js
   const SB_KEY = "PASTE_YOUR_ANON_JWT_HERE";
   ```
   Replace the value with your key.
4. In the Supabase **SQL Editor**, run:
   ```sql
   -- User profiles (stores build data)
   create table public.profiles (
     id uuid primary key references auth.users(id),
     username text not null,
     email text,
     faction_data jsonb default '{}',
     updated_at timestamptz default now()
   );
   alter table public.profiles enable row level security;
   create policy "Users can read all profiles" on public.profiles for select using (true);
   create policy "Users can update own profile" on public.profiles for all using (auth.uid() = id);

   -- Squad sessions
   create table public.squad_sessions (
     id uuid primary key default gen_random_uuid(),
     session_code text not null,
     player_name text not null,
     faction_data jsonb default '{}',
     updated_at timestamptz default now()
   );
   alter table public.squad_sessions enable row level security;
   create policy "Anyone can read squad sessions" on public.squad_sessions for select using (true);
   create policy "Anyone can insert squad sessions" on public.squad_sessions for insert with check (true);
   create policy "Anyone can update squad sessions" on public.squad_sessions for update using (true);
   create policy "Anyone can delete squad sessions" on public.squad_sessions for delete using (true);
   ```
5. Enable **Email Auth** in Supabase Authentication settings

### Hosting (Netlify — free, easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop `index.html` onto the page
3. Your tracker is live instantly — copy the URL for squad invite links

### Hosting with a Custom Domain (Namecheap)
See [HOSTING.md](HOSTING.md) for full step-by-step instructions.

## Repository Structure

```
marathon-tracker/
├── index.html          ← Complete single-file deployable app
├── README.md
├── HOSTING.md          ← Domain + hosting setup guide
├── .gitignore
├── css/
│   └── main.css        ← Extracted stylesheet (reference)
└── js/
    ├── data.js          ← Faction, upgrade, and salvage data
    ├── state.js         ← App state (LV, PL objects)
    ├── ui-core.js       ← Header, tabs, faction bar, zoom
    ├── ui-tree.js       ← Upgrade tree rendering + tooltips
    ├── ui-salvage.js    ← Salvage planner, build summary, save/load
    ├── ui-runners.js    ← Runner builds page
    ├── ui-guns.js       ← Guns & items page
    ├── ui-map.js        ← Interactive map page
    ├── ui-runs.js       ← Run tracker
    ├── ui-loadout.js    ← Loadout planner
    ├── ui-contracts.js  ← Contract tracker
    ├── ui-ammo.js       ← Ammo calculator
    ├── auth-squad.js    ← Auth + squad session system
    └── init.js          ← App initialisation
```

> **Note:** The `js/` and `css/` files are for reference and version control. The app runs from `index.html` alone — all JS and CSS is inlined for zero-dependency deployment.

## Data Accuracy

Upgrade costs, salvage drops, and faction data sourced from:
- Dexerto Marathon guides
- Shacknews wiki
- Community spreadsheets (Reddit r/Marathon)

Data will be updated as the game releases and community findings are verified.

## Contributing

PRs welcome for:
- Corrected upgrade costs / salvage locations
- Missing faction node layouts (NuCaloric, Traxus, MIDA, Arachne, SekGen)
- Map zone additions and loot spawn corrections

## Disclaimer

Fan-made tool. Not affiliated with Bungie. Marathon is a trademark of Bungie, Inc.
