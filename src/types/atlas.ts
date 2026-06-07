// Spatial Systems Atlas — foundational data model (v3)
// A SystemMap is a graph of typed nodes connected by typed edges.
// This is the spine the whole product is built on; later increments
// (scenarios, simulation, AI collaborators) attach to these types
// rather than replacing them.

export type NodeType =
  | "stakeholder" // a party with a stake + stated desires
  | "site" // a physical asset / parcel / place
  | "policy" // a lever that can be pulled
  | "metric" // a measured outcome we care about
  | "dataSource" // provenance: where a fact came from
  | "world"; // a generative 3D splat environment you can fly into

// Edges carry meaning, not just connection.
export type EdgeType =
  | "relationship" // A is related to / participates in B
  | "causality" // A drives / affects B
  | "flow"; // something moves from A to B (people, money, goods)

export interface NodeDatum {
  label: string;
  value: string;
}

export interface NodeMetric {
  value: number;
  unit: string;
  trend?: "up" | "down" | "flat";
  target?: number; // a threshold; used later for breakpoint detection
}

export interface NodeSource {
  provider: string; // e.g. "DataSF", "ACS 2022", "SFMTA"
  url?: string;
  synthetic?: boolean; // be honest about fabricated data
}

export interface AtlasNode {
  id: string;
  type: NodeType;
  name: string;
  summary: string;
  position: { x: number; y: number }; // canvas coordinates (world space)

  data?: NodeDatum[]; // arbitrary attached key/values, shown in inspector
  desires?: string[]; // stakeholder nodes: what this party actually wants
  metric?: NodeMetric; // metric nodes: the measured value
  geo?: { lat: number; lng: number }; // site/world nodes: real-world position
  source?: NodeSource; // dataSource nodes (and any node citing provenance)
  splatUrl?: string; // world nodes: the .spz environment to render
}

export interface AtlasEdge {
  id: string;
  type: EdgeType;
  from: string; // AtlasNode id
  to: string; // AtlasNode id
  label?: string;
}

// A per-system relabeling of the generic node types, so the same engine can
// speak "Stakeholder / Policy / Metric" for a civic map and "Character /
// Force / Theme" for a storyworld. Colors stay global; only label/glyph change.
export type Lexicon = Partial<
  Record<NodeType, Partial<{ label: string; glyph: string }>>
>;

export interface SystemMap {
  id: string;
  name: string;
  shortLabel: string; // compact name for the system switcher
  question: string; // the single question this map exists to answer
  description: string;
  lexicon?: Lexicon; // optional per-system relabeling of node types
  nodes: AtlasNode[];
  edges: AtlasEdge[];
}

// Visual language per node type.
//  - color: legacy bioluminescent hue (kept for the inspector accents)
//  - iri:   the pearlescent/iridescent glass tint used by the 3D orbs
//  - glyph: symbol drawn on the orb / in lists
export const NODE_TYPE_META: Record<
  NodeType,
  { label: string; color: string; iri: string; glyph: string }
> = {
  stakeholder: { label: "Stakeholder", color: "#00e5ff", iri: "#a8d6ea", glyph: "◇" },
  site: { label: "Site / Asset", color: "#7c9cff", iri: "#b3c4ee", glyph: "▢" },
  policy: { label: "Policy lever", color: "#ffd166", iri: "#f5dcc4", glyph: "✦" },
  metric: { label: "Metric", color: "#9b5cff", iri: "#c9b6e6", glyph: "▲" },
  dataSource: { label: "Data source", color: "#4a5568", iri: "#d3d8e6", glyph: "≡" },
  world: { label: "3D world", color: "#2ee6a6", iri: "#bfe6d2", glyph: "◉" },
};

// Resolve the visual + textual meta for a node type within a given system,
// applying the system's lexicon overrides on top of the global defaults.
export interface ResolvedTypeMeta {
  label: string;
  color: string;
  iri: string;
  glyph: string;
}

export const resolveTypeMeta = (
  map: Pick<SystemMap, "lexicon">,
  type: NodeType,
): ResolvedTypeMeta => {
  const base = NODE_TYPE_META[type];
  const o = map.lexicon?.[type];
  return { ...base, ...(o ?? {}) };
};

export const EDGE_TYPE_META: Record<
  EdgeType,
  { label: string; color: string; dashed: boolean }
> = {
  relationship: { label: "Relationship", color: "#3a4a6b", dashed: false },
  causality: { label: "Causality", color: "#9b5cff", dashed: false },
  flow: { label: "Flow", color: "#2ee6a6", dashed: true },
};
