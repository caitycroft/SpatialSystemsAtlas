# CLAUDE.md — Spatial Systems Atlas

## Project Overview
Spatial Systems Atlas transforms complex system data into networks of explorable 3D worlds using World Labs' Marble API and SparkJS. Each node in a system becomes a navigable Gaussian splat environment, with relationships visualized as animated connections between worlds.

## Creator
Caity Croft — Creative Technologist & Spatial Intelligence Researcher
- GitHub: caitycroft (confirm username)
- Contact: via Telegram or Claude.ai

## Tech Stack
- **Framework:** React + TypeScript + Vite
- **3D Rendering:** SparkJS (Gaussian Splat renderer for Three.js)
- **Scene Management:** React Three Fiber (R3F) + drei
- **World Generation:** World Labs Marble API (155K credits available)
- **Styling:** Void black (#0a0a0a) + bioluminescent cyan (#00e5ff) aesthetic

## Architecture
```
src/
├── components/
│   ├── spark/           # SparkRenderer + SplatMesh (from starter)
│   ├── atlas/           # Node graph UI overlay
│   │   ├── NodeGraph.tsx      # Interactive system map
│   │   ├── WorldViewer.tsx    # Full-screen splat world viewer
│   │   └── SystemPanel.tsx    # System info sidebar
│   └── ui/              # Shared UI components
├── systems/             # System data definitions
│   ├── everon.ts        # Everon universe (4 levels, 6 chapters)
│   ├── cre-portfolio.ts # Commercial real estate demo
│   └── urban-futures.ts # CityScience urban planning demo
├── hooks/
│   ├── useMarbleAPI.ts  # World Labs API integration
│   └── useWorldLoader.ts # SPZ file loading + caching
├── lib/
│   └── marble.ts        # Marble API client
└── App.tsx              # Main app with system switching
```

## Key Concepts
- **System:** A collection of related nodes (e.g., Everon universe, CRE portfolio, city infrastructure)
- **Node:** A single location/concept that maps to a 3D world (e.g., "The Threshold", "100 Market St")
- **Edge:** A relationship between nodes, visualized as particle connections
- **World:** A Marble-generated Gaussian splat environment (.spz file) rendered by SparkJS

## Three Demo Domains
1. **Everon Storyworlds** — Transmedia IP with 4 levels, each song = adventure soundtrack
2. **CRE Portfolio** — Commercial real estate properties as walkable 3D environments
3. **Urban Futures** — CityScience Lab SF urban planning visualization

## Marble API Reference
- Endpoint: https://api.worldlabs.ai/v1
- Auth: Bearer token (store in .env as VITE_MARBLE_API_KEY)
- Key endpoints: /generations (create world), /generations/{id} (check status), /generations/{id}/download (get .spz)
- Credits: 155K available on Caity's account

## Development Commands
```bash
npm install          # Install dependencies
npm run assets:download  # Download sample splat assets
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
```

## Design Principles
- Void black backgrounds with bioluminescent cyan accents
- Nodes as glowing orbs with animated particle connections
- Smooth transitions between graph view and immersive world view
- Mobile-responsive (touch controls for splat navigation)

## Current Status (March 1, 2026)
- [x] Cloned spark-react-r3f starter
- [x] Confirmed SparkJS rendering works (butterfly splat)
- [ ] Replace butterfly with Marble-generated world
- [ ] Build node graph overlay UI
- [ ] Connect Marble API for on-demand world generation
- [ ] Add system switching (Everon / CRE / Urban)
- [ ] Deploy to production

## Context
Built for World Labs Hack [01] (Feb 28, 2026). Presented to World Labs founders Christoph Lassner, Ian Curtis, and Ben Mildenhall. They invited partnership discussions. This repo is the production evolution of that hackathon prototype.
