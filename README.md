# 🌐 Spatial Systems Atlas

**Transform complex systems into networks of explorable 3D worlds.**

Spatial Systems Atlas is a spatial intelligence tool that converts system data — real estate portfolios, urban infrastructure, fictional universes — into interconnected Gaussian splat environments you can walk through in your browser.

Built with [SparkJS](https://sparkjs.dev) + [World Labs Marble API](https://worldlabs.ai) + React Three Fiber.

---

## ✨ What It Does

Every node in a system becomes a navigable 3D world. Relationships between nodes are visualized as animated particle connections. Click a node in the graph → fly into a photorealistic AI-generated environment.

### Demo Domains

| Domain | Description |
|--------|-------------|
| **Everon Storyworlds** | A transmedia universe with 4 levels — each song serves as the soundtrack to adventures in a different world |
| **CRE Portfolio** | Commercial real estate properties rendered as walkable 3D environments for investors |
| **Urban Futures** | City infrastructure and urban planning scenarios for CityScience Lab SF |

## 🛠 Tech Stack

- **React** + TypeScript + Vite
- **SparkJS** — Advanced Gaussian Splat renderer for Three.js
- **React Three Fiber** — Declarative 3D scene management
- **World Labs Marble API** — AI-powered image-to-world generation
- **drei** — R3F helpers (CameraControls, etc.)

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/SpatialSystemsAtlas.git
cd SpatialSystemsAtlas

# Install dependencies
npm install

# Download sample splat assets
npm run assets:download

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## 📁 Project Structure

```
src/
├── components/
│   ├── spark/          # SparkJS renderer + splat mesh components
│   ├── atlas/          # Node graph UI + world viewer
│   └── ui/             # Shared UI components
├── systems/            # System data (Everon, CRE, Urban)
├── hooks/              # Custom hooks (Marble API, world loading)
└── App.tsx             # Main application
```

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_MARBLE_API_KEY=your_world_labs_api_key
```

## 🎨 Design

Void black aesthetic with bioluminescent cyan accents. Nodes rendered as glowing orbs with animated particle edges. Smooth camera transitions between graph overview and immersive world exploration.

## 📖 Background

Originally prototyped at **World Labs Hack [01]** (February 28, 2026). The concept: an "Obsidian for 3D worlds" — a spatial knowledge graph where every node becomes a navigable, AI-generated environment.

## 👤 Author

**Caity Croft** — Creative Technologist & Spatial Intelligence Researcher

## 📄 License

MIT
