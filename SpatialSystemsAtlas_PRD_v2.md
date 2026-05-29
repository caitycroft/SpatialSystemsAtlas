# SPATIAL SYSTEMS ATLAS — Product Requirements Document v2
## March 7, 2026

---

## PRODUCT VISION

The Spatial Systems Atlas is a web platform that organizes complex systems as navigable networks of rich media environments. Each node is a **media cluster** — containing documents, data, images, audio, video, and AI-generated 3D environments — that users explore spatially rather than through flat interfaces.

**One-sentence pitch:** "Obsidian for 3D worlds — a spatial knowledge graph where every node is an explorable environment."

---

## THREE VERTICALS

### 1. Transmedia IP (Everon)
- Target user: Worldbuilders, transmedia producers, IP creators
- Each node = a story chapter containing: narrative text, character profiles, concept art, soundtrack, video clips, AI-generated 3D world
- Supports branching narratives, character agent profiles (SOUL.md), and multi-platform asset tracking
- First test case: Everon (6 chapters)

### 2. Commercial Real Estate (CRE)
- Target user: Portfolio investors (like Commonwealth Partners), brokers (like CBRE), tenants
- Each node = a property containing: building specs, floor plans, tenant roster, lease data, available spaces, neighborhood data, comparable rents, AI-generated TI renderings, 3D walkthrough
- Portfolio-level spatial navigation — fly between assets, compare, scenario-plan
- Complements (not competes with) CBRE Plans Pro, Vantage suite

### 3. Urban Planning / CityScience
- Target user: City planners, developers, community stakeholders
- Each node = a development site or district containing: zoning data, 3D captures, community input, cost projections, environmental data, AI-generated future scenario renderings
- Built in collaboration with CityScience Lab SF and Luke Hollis's simulation research
- First test case: One SF Centre revitalization

---

## CORE ARCHITECTURE

### Layer 1: Spatial Navigation (Node Graph)
- 2D HTML/CSS overlay on 3D canvas
- Nodes as interactive circles with glowing connections (edges)
- Click node → camera fly-through into 3D world
- System switcher tabs (Everon / CRE / Urban Futures)
- Sidebar with world list, descriptions, chapter/property metadata

### Layer 2: Rich Media Clusters
- Each node contains a structured data package:
  - **Overview panel**: Title, description, metadata, tags
  - **Media gallery**: Images, concept art, floor plans, renders
  - **Audio**: Soundtrack file, spatial audio, ambient sound
  - **Video**: Clips, AI-generated video, walkthroughs
  - **Documents**: Narrative text, specs, reports, contracts
  - **Data**: Structured data (lease terms, zoning rules, character stats)
  - **3D World**: AI-generated Gaussian splat environment (primary view)
- Contextual panel slides in from right when node is active
- Media types are domain-specific (story assets for Everon, building data for CRE)

### Layer 3: Generative Pipeline
- World Labs Marble API integration for on-demand 3D world generation
- Text/image → 3D environment with configurable resolution (100k, 500k, full)
- Midjourney/DALL-E integration for concept art generation (future)
- AI-generated TI renderings for CRE (future)
- Future scenario generation for urban planning (future)

### Layer 4: Export & Share
- Shareable links to specific nodes/systems
- Embed mode for presentations
- Export 3D worlds as .spz, .glb, .ply
- PDF/image export of node data panels
- API for programmatic access (future)

---

## TECH STACK

- **Frontend**: React + TypeScript + Vite
- **3D Rendering**: React Three Fiber + SparkJS (Gaussian splats)
- **Camera**: CameraControls from @react-three/drei
- **Node Graph**: Custom HTML/CSS overlay (Phase 2) or D3.js force-directed graph
- **State Management**: React Context or Zustand
- **Data**: TypeScript interfaces per vertical (everon.ts, cre.ts, urbanfutures.ts)
- **API**: World Labs Marble API (POST /marble/v1/worlds:generate)
- **Deployment**: Vercel (primary), localhost for development
- **Design Language**: Void black (#0a0a0a), bioluminescent cyan (#00e5ff), monospace + serif typography

---

## DATA SCHEMA

### WorldNode (base)
```typescript
interface WorldNode {
  id: string;
  name: string;
  description: string;
  splatUrl: string;           // Gaussian splat file URL
  position: { x: number; y: number };  // Graph layout position
  type: 'everon' | 'cre' | 'urban';
  media: MediaCluster;
  metadata: Record<string, any>;  // Domain-specific structured data
}

interface MediaCluster {
  images: MediaItem[];
  audio: MediaItem[];
  video: MediaItem[];
  documents: MediaItem[];
  data: Record<string, any>;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;          // mime type
  description?: string;
  createdAt: string;
  source?: string;       // 'midjourney' | 'marble' | 'upload' | 'kling' etc.
  status: 'draft' | 'final' | 'generated';
}
```

### EveronNode (extends WorldNode)
```typescript
interface EveronNode extends WorldNode {
  chapter: number;
  characters: Character[];
  keyMoments: string[];
  mood: string;
  song: SongData;
  narrativeText: string;
  colorAccent: string;
}
```

### CRENode (extends WorldNode)
```typescript
interface CRENode extends WorldNode {
  address: string;
  city: string;
  propertyType: 'office' | 'retail' | 'residential' | 'mixed';
  sqft: number;
  occupancyRate: number;
  tenants: Tenant[];
  availableSpaces: Space[];
  capRate?: number;
  yearBuilt?: number;
}
```

### UrbanNode (extends WorldNode)
```typescript
interface UrbanNode extends WorldNode {
  location: { lat: number; lng: number };
  zoning: string;
  projectStatus: string;
  stakeholders: string[];
  communityInput: string[];
  costEstimate?: number;
  environmentalData?: Record<string, any>;
}
```

---

## BUILD PHASES

### Phase 1: Foundation (DONE — Feb 28–Mar 7)
- [x] SparkJS Gaussian splat rendering in browser
- [x] World switcher sidebar with system tabs
- [x] Header bar with branding
- [x] everon.ts with 6 chapters + CRE + Urban Futures data
- [x] Atlas.tsx main layout with real SplatMesh
- [x] GitHub repo: github.com/caitycroft/SpatialSystemsAtlas

### Phase 2: Rich Media Clusters (March 8–31)
- [ ] Contextual panel component (slides in from right on node select)
- [ ] Media gallery sub-component (images, video, audio)
- [ ] Document viewer sub-component
- [ ] Data display sub-component (domain-specific structured data)
- [ ] Audio player integration (for Everon soundtracks)
- [ ] Extend everon.ts to include full MediaCluster data

### Phase 3: Node Graph Overlay (April)
- [ ] 2D node graph component overlaid on 3D canvas
- [ ] Force-directed or manual layout
- [ ] Animated edges between connected nodes
- [ ] Click node → camera fly-through transition
- [ ] Mini-map for navigation in large graphs
- [ ] Zoom levels: graph overview → node detail → 3D immersion

### Phase 4: Marble API Integration (April–May)
- [ ] World generation from text/image prompts
- [ ] Poll for completion, extract spz_urls
- [ ] Replace placeholder butterfly splats with real generated worlds
- [ ] Generation queue and status tracking
- [ ] World editing and regeneration

### Phase 5: Vertical-Specific Features (May–July)
- [ ] CRE: Property data import, tenant management, TI rendering
- [ ] Urban: GIS data overlay, community input aggregation
- [ ] Everon: Spatial audio, interactive story elements, character agents
- [ ] Export and sharing functionality

### Phase 6: Deploy & Showcase (July — Gray Area Showcase)
- [ ] Vercel deployment with custom domain
- [ ] Performance optimization for multiple splat worlds
- [ ] Demo mode for presentations
- [ ] Documentation and onboarding flow

---

## COMPETITIVE LANDSCAPE

| Tool | What It Does | What's Missing |
|------|-------------|----------------|
| Obsidian Graph View | 2D node graph of markdown notes | No 3D, no spatial worlds, no media clusters |
| IVGraph (Notion) | 3D graph of Notion pages | Nodes are documents, not environments |
| CBRE Plans Pro | 3D test-fit visualization | Single property only, no portfolio graph |
| Miro AI | Collaborative canvas | 2D, no 3D worlds, no generative pipeline |
| World Labs Marble | AI 3D world generation | Individual worlds, no graph/network layer |
| Luke Hollis tools | 3D digital twins + simulation | Individual scenes, no navigation network |
| Kumu | Network visualization for systems | 2D, no 3D, no AI generation |
| Neo4j Bloom | Graph database visualization | Developer-focused, no spatial immersion |

**Atlas's unique position:** The ONLY tool combining knowledge graph navigation + AI-generated 3D environments + rich media clusters across multiple verticals.

---

## SUCCESS METRICS

- Gray Area Showcase (July 2026): Functional demo with all 3 verticals
- World Labs partnership conversation: Demonstrate Atlas as Marble showcase app
- 3+ generated Marble worlds replacing placeholder butterfly splats
- At least 1 CRE stakeholder demo (Commonwealth Partners or CBRE contact)
- At least 1 urban planning demo with CityScience data

---

*This PRD should be included in the SpatialSystemsAtlas GitHub repo as PRD.md and referenced by CLAUDE.md for all Claude Code sessions.*
