import type { SystemMap } from "../types/atlas";

// ─────────────────────────────────────────────────────────────────────────
// Everon — transmedia storyworld.
// The civic engine, re-lexiconed for myth: Realm / Locus / Character /
// Force / Theme / Canon. World nodes are explorable splat realms.
// ─────────────────────────────────────────────────────────────────────────

const PLACEHOLDER_SPLAT = "https://sparkjs.dev/assets/splats/butterfly.spz";

export const everon: SystemMap = {
  id: "everon",
  name: "Everon — The Storyworld Atlas",
  shortLabel: "Everon",
  question:
    "How do Everon's realms, characters, and forces connect into one navigable mythos?",
  description:
    "The transmedia spine of Everon: the realms you can enter, the characters who move through them, the forces that bend the world, and the themes each song carries.",
  lexicon: {
    world: { label: "Realm", glyph: "◉" },
    site: { label: "Locus", glyph: "▢" },
    stakeholder: { label: "Character", glyph: "◇" },
    policy: { label: "Force", glyph: "✦" },
    metric: { label: "Theme", glyph: "▲" },
    dataSource: { label: "Canon", glyph: "≡" },
  },
  nodes: [
    // Forces (top band)
    {
      id: "fo-tide",
      type: "policy",
      name: "The Tide",
      summary: "The slow pull that rises through every realm, carrying memory with it.",
      position: { x: 560, y: 90 },
      data: [{ label: "Domain", value: "Time & memory" }],
    },
    {
      id: "fo-severance",
      type: "policy",
      name: "The Severance",
      summary: "The fracture that split the realms — and the wound the story heals.",
      position: { x: 980, y: 90 },
      data: [{ label: "Domain", value: "Loss & division" }],
    },

    // Characters (left column)
    {
      id: "ch-wayfarer",
      type: "stakeholder",
      name: "The Wayfarer",
      summary: "Protagonist who crosses every threshold; the player's anchor.",
      position: { x: 150, y: 300 },
      desires: ["Reach the far shore", "Recover lost memory", "Reunite the realms"],
    },
    {
      id: "ch-choir",
      type: "stakeholder",
      name: "The Hollow Choir",
      summary: "Antagonist chorus that feeds on forgetting.",
      position: { x: 150, y: 480 },
      desires: ["Spread the Severance", "Silence the Threads"],
    },
    {
      id: "ch-cartographer",
      type: "stakeholder",
      name: "Cartographer-Prime",
      summary: "Keeper of the maps between realms; guide and gatekeeper.",
      position: { x: 150, y: 660 },
      desires: ["Preserve the true map", "Test the Wayfarer"],
    },

    // Loci (center-lower)
    {
      id: "lo-lantern",
      type: "site",
      name: "The Lantern Market",
      summary: "A crossroads bazaar where realms bleed into one another.",
      position: { x: 540, y: 620 },
    },
    {
      id: "lo-archive",
      type: "site",
      name: "The Sunken Archive",
      summary: "Drowned library holding the canon of what was severed.",
      position: { x: 760, y: 760 },
    },

    // Realms (worlds — fly-into)
    {
      id: "world-threshold",
      type: "world",
      name: "The Threshold",
      summary: "The opening realm — a luminous gate between worlds.",
      position: { x: 720, y: 380 },
      splatUrl: PLACEHOLDER_SPLAT,
      source: { provider: "Placeholder (Marble realm pending)", synthetic: true },
    },
    {
      id: "world-cathedral",
      type: "world",
      name: "Tidal Cathedral",
      summary: "A drowned sanctuary where the Tide is loudest.",
      position: { x: 950, y: 460 },
      splatUrl: PLACEHOLDER_SPLAT,
      source: { provider: "Placeholder (Marble realm pending)", synthetic: true },
    },
    {
      id: "world-span",
      type: "world",
      name: "The Hollow Span",
      summary: "The broken bridge across the Severance.",
      position: { x: 430, y: 430 },
      splatUrl: PLACEHOLDER_SPLAT,
      source: { provider: "Placeholder (Marble realm pending)", synthetic: true },
    },

    // Themes (right column)
    {
      id: "th-memory",
      type: "metric",
      name: "Memory",
      summary: "How much of the world the Wayfarer has recovered.",
      position: { x: 1300, y: 330 },
      metric: { value: 0.35, unit: "resonance", trend: "up", target: 1 },
    },
    {
      id: "th-belonging",
      type: "metric",
      name: "Belonging",
      summary: "Whether the realms recognize the Wayfarer as kin.",
      position: { x: 1300, y: 500 },
      metric: { value: 0.5, unit: "resonance", trend: "up", target: 1 },
    },
    {
      id: "th-transformation",
      type: "metric",
      name: "Transformation",
      summary: "The arc's irreversible change once a realm is healed.",
      position: { x: 1300, y: 670 },
      metric: { value: 0.2, unit: "resonance", trend: "up", target: 1 },
    },

    // Canon (bottom band)
    {
      id: "cn-album1",
      type: "dataSource",
      name: "Album I — Threshold",
      summary: "The first soundtrack; each track scores a realm.",
      position: { x: 640, y: 980 },
      source: { provider: "Everon OST Vol. I", synthetic: false },
    },
    {
      id: "cn-fieldnotes",
      type: "dataSource",
      name: "Field Notes",
      summary: "The Cartographer's annotations — primary lore source.",
      position: { x: 940, y: 1000 },
      source: { provider: "Everon Codex", synthetic: false },
    },
  ],

  edges: [
    // Forces → themes (causality)
    { id: "c1", type: "causality", from: "fo-tide", to: "th-memory", label: "erodes" },
    { id: "c2", type: "causality", from: "fo-severance", to: "th-belonging", label: "fractures" },
    { id: "c3", type: "causality", from: "fo-tide", to: "th-transformation", label: "carries" },

    // Characters ↔ realms (relationship)
    { id: "r1", type: "relationship", from: "ch-wayfarer", to: "world-threshold", label: "enters" },
    { id: "r2", type: "relationship", from: "ch-choir", to: "world-span", label: "haunts" },
    { id: "r3", type: "relationship", from: "ch-cartographer", to: "lo-archive", label: "keeps" },
    { id: "r4", type: "relationship", from: "ch-wayfarer", to: "th-memory", label: "carries arc" },

    // Loci ↔ realms
    { id: "r5", type: "relationship", from: "lo-lantern", to: "world-threshold", label: "opens to" },
    { id: "r6", type: "relationship", from: "lo-archive", to: "world-cathedral", label: "lies beneath" },

    // Flows (journey through the realms)
    { id: "f1", type: "flow", from: "world-span", to: "world-threshold", label: "crossing" },
    { id: "f2", type: "flow", from: "world-threshold", to: "world-cathedral", label: "descent" },
    { id: "f3", type: "flow", from: "world-cathedral", to: "th-transformation", label: "the turn" },

    // Canon → realms (provenance)
    { id: "p1", type: "relationship", from: "cn-album1", to: "world-threshold", label: "scores" },
    { id: "p2", type: "relationship", from: "cn-fieldnotes", to: "lo-archive", label: "annotates" },
  ],
};
