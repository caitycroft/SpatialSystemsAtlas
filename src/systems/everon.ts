export type { WorldNode, SystemData, MediaCluster, MediaItem } from "../types/world";
import type { SystemData } from "../types/world";

// Everon — Caity's transmedia IP
// Each chapter = a level in the parallel universe
// Each song = a soundtrack to adventures on that level
export const everon: SystemData = {
  id: "everon",
  name: "Everon",
  description: "A parallel universe with 4 levels. Each song is a soundtrack to adventures on a different level.",
  worlds: [
    {
      id: "threshold",
      name: "The Threshold",
      description: "The entry point. A liminal space between worlds where reality begins to dissolve.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 0, y: 0 },
      chapter: 1,
    },
    {
      id: "descent",
      name: "The Descent",
      description: "Deeper into Everon. Gravity shifts, light bends, the familiar becomes alien.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 200, y: 150 },
      chapter: 2,
    },
    {
      id: "archive",
      name: "The Archive",
      description: "A vast library of accumulated memory. Every wall holds a story waiting to be unlocked.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: -150, y: 300 },
      chapter: 3,
    },
    {
      id: "resonance",
      name: "The Resonance",
      description: "Sound becomes structure. Music is the architecture here — frequencies you can walk through.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 100, y: 450 },
      chapter: 4,
    },
    {
      id: "convergence",
      name: "The Convergence",
      description: "All paths lead here. The worlds overlap, bleed into each other, become one system.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: -50, y: 600 },
      chapter: 5,
    },
    {
      id: "emergence",
      name: "The Emergence",
      description: "The return. But you are not the same. The atlas has changed how you see everything.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 0, y: 750 },
      chapter: 6,
    },
  ],
};

// CRE Demo — Commercial Real Estate portfolio
export const creDemo: SystemData = {
  id: "cre-demo",
  name: "CRE Portfolio",
  description: "Walk through a commercial real estate portfolio as connected 3D environments.",
  worlds: [
    {
      id: "tower-a",
      name: "One Market Plaza",
      description: "Class A office tower. 1.6M sq ft. 98% occupied.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 0, y: 0 },
      chapter: 1,
    },
    {
      id: "retail-center",
      name: "Westfield Center",
      description: "Mixed-use retail. 500K sq ft. Ground floor activation strategy.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 200, y: 100 },
      chapter: 2,
    },
    {
      id: "residential",
      name: "Transbay Block 9",
      description: "Residential tower. 545 units. Transit-oriented development.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: -100, y: 200 },
      chapter: 3,
    },
  ],
};

// Urban Futures — CityScience Lab SF demo
export const urbanFutures: SystemData = {
  id: "urban-futures",
  name: "Urban Futures: SF",
  description: "Explore proposed San Francisco developments as walkable 3D environments.",
  worlds: [
    {
      id: "one-sf-center",
      name: "One SF Center",
      description: "Former Oceanwide Center. 50 First St. Mixed-use megatower proposal.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 0, y: 0 },
      chapter: 1,
    },
    {
      id: "soma-district",
      name: "SoMa 2035",
      description: "South of Market area plan. Density, transit, and public space futures.",
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      position: { x: 150, y: 150 },
      chapter: 2,
    },
  ],
};

// All available systems
export const systems: SystemData[] = [everon, creDemo, urbanFutures];

// Helper to get a system by ID
export function getSystem(id: string): SystemData | undefined {
  return systems.find((s) => s.id === id);
}
