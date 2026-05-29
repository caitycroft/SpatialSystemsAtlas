import type { SystemMap } from "../types/atlas";

// ─────────────────────────────────────────────────────────────────────────
// Mission Corridor case (Urban Futures SF / CityScience civic-tech framing)
//
// One corridor, one question. Mission St between 16th and 24th.
// Data is a hybrid: real public SF sources are cited where the shape of the
// data is real; values marked { synthetic: true } are illustrative stand-ins
// until live ingest lands. Nothing here pretends to be a calibrated model.
// ─────────────────────────────────────────────────────────────────────────

export const missionCorridor: SystemMap = {
  id: "mission-corridor",
  name: "Mission Corridor — Mid-Rise Housing",
  question:
    "How does adding mid-rise housing along the Mission St corridor (16th–24th) affect transit load, retail mix, and displacement risk?",
  description:
    "A scoped systems map of one San Francisco corridor: the stakeholders, the sites in play, the policy levers, the outcomes we measure, and where the data comes from.",
  nodes: [
    // ── Policy levers (top band) ──────────────────────────────────────────
    {
      id: "pol-upzone",
      type: "policy",
      name: "Mid-Rise Upzoning",
      summary:
        "Allow 5–8 story residential on currently low-rise corridor parcels.",
      position: { x: 520, y: 90 },
      data: [
        { label: "Proposed height", value: "85 ft (≈8 stories)" },
        { label: "Affected parcels", value: "~40 along corridor" },
        { label: "Status", value: "Proposal / not adopted" },
      ],
    },
    {
      id: "pol-inclusionary",
      type: "policy",
      name: "Inclusionary Zoning",
      summary:
        "Require a share of below-market-rate units in new market-rate buildings.",
      position: { x: 820, y: 70 },
      data: [
        { label: "BMR requirement", value: "22% on-site" },
        { label: "Affordability", value: "55–110% AMI" },
        { label: "Status", value: "Citywide policy in force" },
      ],
    },
    {
      id: "pol-legacy-biz",
      type: "policy",
      name: "Legacy Business Protection",
      summary:
        "Registry + grants to keep long-standing small businesses in place.",
      position: { x: 1120, y: 110 },
      data: [
        { label: "Registered (Mission)", value: "31 businesses" },
        { label: "Lever", value: "Rent stabilization grants" },
      ],
    },

    // ── Stakeholders (left column) ────────────────────────────────────────
    {
      id: "sh-residents",
      type: "stakeholder",
      name: "Long-Term Renters",
      summary:
        "Households who have lived in the corridor for years, many rent-controlled.",
      position: { x: 140, y: 300 },
      desires: [
        "Stay in the neighborhood (avoid displacement)",
        "Stable, affordable rent",
        "Keep cultural/community ties",
      ],
      data: [
        { label: "Est. households", value: "~6,200" },
        { label: "Rent-controlled share", value: "~68%" },
      ],
      source: { provider: "ACS 2022 (tract-level)", synthetic: false },
    },
    {
      id: "sh-smallbiz",
      type: "stakeholder",
      name: "Small Business Owners",
      summary:
        "Taquerias, bodegas, services — the corridor's street-level economy.",
      position: { x: 140, y: 470 },
      desires: [
        "Predictable commercial rent",
        "Steady foot traffic",
        "Avoid formula-retail crowd-out",
      ],
      data: [{ label: "Storefronts", value: "~210 active" }],
    },
    {
      id: "sh-planners",
      type: "stakeholder",
      name: "City Planners",
      summary: "SF Planning staff balancing housing targets against impacts.",
      position: { x: 140, y: 640 },
      desires: [
        "Hit RHNA housing production targets",
        "Minimize displacement",
        "Defensible, data-backed decisions",
      ],
    },
    {
      id: "sh-transit",
      type: "stakeholder",
      name: "Transit Agency (SFMTA)",
      summary: "Operates the 14-Mission and 49 lines; BART serves the stations.",
      position: { x: 140, y: 810 },
      desires: ["Match capacity to demand", "Avoid pass-up crowding", "Fund service"],
    },
    {
      id: "sh-developers",
      type: "stakeholder",
      name: "Developers",
      summary: "Build the new units; respond to what's financially feasible.",
      position: { x: 140, y: 980 },
      desires: ["Feasible pro forma", "Entitlement certainty", "Reasonable BMR burden"],
    },

    // ── Sites / assets (center) ───────────────────────────────────────────
    {
      id: "site-corridor",
      type: "site",
      name: "Mission St Corridor (16th–24th)",
      summary: "The ~1 mile study area: the spine everything else attaches to.",
      position: { x: 720, y: 420 },
      geo: { lat: 37.7599, lng: -122.4148 },
      data: [
        { label: "Length", value: "~1.0 mi" },
        { label: "Current zoning", value: "NCT-3 (low/mid-rise mix)" },
      ],
      source: { provider: "DataSF — Zoning Districts", synthetic: false },
    },
    {
      id: "site-2070",
      type: "site",
      name: "2070 Mission (Vacant Parcel)",
      summary: "Candidate development site; underused lot near 16th & Mission.",
      position: { x: 520, y: 560 },
      geo: { lat: 37.7651, lng: -122.4197 },
      data: [
        { label: "Lot area", value: "~13,500 sq ft" },
        { label: "Potential units (mid-rise)", value: "~95" },
      ],
      source: { provider: "DataSF — Parcels (synthetic build-out)", synthetic: true },
    },
    {
      id: "site-bart-24th",
      type: "site",
      name: "24th St Mission BART",
      summary: "Heavy-rail station anchoring the south end of the corridor.",
      position: { x: 940, y: 600 },
      geo: { lat: 37.7522, lng: -122.4187 },
      data: [{ label: "Avg weekday entries", value: "~11,400" }],
      source: { provider: "BART ridership (2023)", synthetic: false },
    },

    // ── 3D world (fly-into) ──────────────────────────────────────────────
    {
      id: "world-24th-plaza",
      type: "world",
      name: "24th & Mission Plaza",
      summary:
        "Immersive splat capture of the BART plaza — fly in to see the street-level reality.",
      position: { x: 940, y: 430 },
      geo: { lat: 37.7522, lng: -122.4187 },
      // Placeholder splat until a real Marble world is generated (Increment 1).
      splatUrl: "https://sparkjs.dev/assets/splats/butterfly.spz",
      source: { provider: "Placeholder (Marble world pending)", synthetic: true },
    },

    // ── Metrics (right column) ────────────────────────────────────────────
    {
      id: "m-units",
      type: "metric",
      name: "Housing Units Added",
      summary: "Net new homes delivered along the corridor under the scenario.",
      position: { x: 1320, y: 320 },
      metric: { value: 0, unit: "units", trend: "flat", target: 1200 },
    },
    {
      id: "m-rent",
      type: "metric",
      name: "Median Rent",
      summary: "Median asking rent for a 1-bedroom in the corridor.",
      position: { x: 1320, y: 470 },
      metric: { value: 2950, unit: "$/mo", trend: "up", target: 2600 },
      source: { provider: "Synthetic (anchored to Zillow ZORI)", synthetic: true },
    },
    {
      id: "m-displacement",
      type: "metric",
      name: "Displacement Risk",
      summary: "Composite index of involuntary-move risk for existing renters.",
      position: { x: 1320, y: 620 },
      metric: { value: 0.62, unit: "index 0–1", trend: "up", target: 0.4 },
      source: { provider: "Urban Displacement Project (method)", synthetic: false },
    },
    {
      id: "m-transit-load",
      type: "metric",
      name: "Transit Load Factor",
      summary: "Peak-hour 14-Mission load vs. seated+standing capacity.",
      position: { x: 1320, y: 770 },
      metric: { value: 0.88, unit: "× capacity", trend: "up", target: 1.0 },
      source: { provider: "SFMTA APC (2023)", synthetic: false },
    },
    {
      id: "m-retail-mix",
      type: "metric",
      name: "Retail Mix Diversity",
      summary: "Diversity of independent vs. formula retail (higher = more diverse).",
      position: { x: 1320, y: 920 },
      metric: { value: 0.71, unit: "Shannon idx", trend: "down", target: 0.7 },
    },

    // ── Data sources (bottom band) ────────────────────────────────────────
    {
      id: "ds-datasf",
      type: "dataSource",
      name: "DataSF Open Data",
      summary: "Parcels, zoning, business registrations.",
      position: { x: 560, y: 980 },
      source: { provider: "DataSF", url: "https://data.sfgov.org", synthetic: false },
    },
    {
      id: "ds-census",
      type: "dataSource",
      name: "ACS / Census",
      summary: "Tenure, income, demographics at tract level.",
      position: { x: 820, y: 1010 },
      source: { provider: "US Census ACS 2022", synthetic: false },
    },
    {
      id: "ds-sfmta",
      type: "dataSource",
      name: "SFMTA Ridership",
      summary: "Automatic passenger counts by line and stop.",
      position: { x: 1080, y: 980 },
      source: { provider: "SFMTA", synthetic: false },
    },
  ],

  edges: [
    // Policy → outcomes (causality)
    { id: "e1", type: "causality", from: "pol-upzone", to: "m-units", label: "enables" },
    { id: "e2", type: "causality", from: "m-units", to: "m-rent", label: "supply ↑ → rent" },
    { id: "e3", type: "causality", from: "m-units", to: "m-transit-load", label: "more riders" },
    { id: "e4", type: "causality", from: "m-rent", to: "m-displacement", label: "rent → risk" },
    { id: "e5", type: "causality", from: "pol-inclusionary", to: "m-displacement", label: "BMR buffers" },
    { id: "e6", type: "causality", from: "pol-legacy-biz", to: "m-retail-mix", label: "protects" },
    { id: "e7", type: "causality", from: "m-units", to: "m-retail-mix", label: "new demand" },

    // Stakeholders ↔ system (relationships)
    { id: "e8", type: "relationship", from: "sh-residents", to: "site-corridor", label: "live in" },
    { id: "e9", type: "relationship", from: "sh-smallbiz", to: "site-corridor", label: "operate in" },
    { id: "e10", type: "relationship", from: "sh-planners", to: "pol-upzone", label: "author" },
    { id: "e11", type: "relationship", from: "sh-developers", to: "site-2070", label: "build on" },
    { id: "e12", type: "relationship", from: "sh-transit", to: "site-bart-24th", label: "operate" },
    { id: "e13", type: "relationship", from: "sh-residents", to: "m-displacement", label: "bear risk" },
    { id: "e14", type: "relationship", from: "sh-smallbiz", to: "m-retail-mix", label: "constitute" },

    // Flows (people / development)
    { id: "e15", type: "flow", from: "site-2070", to: "m-units", label: "delivers units" },
    { id: "e16", type: "flow", from: "site-corridor", to: "site-bart-24th", label: "rider flow" },
    { id: "e17", type: "flow", from: "site-corridor", to: "world-24th-plaza", label: "see in 3D" },

    // Provenance (data sources → what they back)
    { id: "e18", type: "relationship", from: "ds-datasf", to: "site-corridor", label: "sources" },
    { id: "e19", type: "relationship", from: "ds-census", to: "sh-residents", label: "sources" },
    { id: "e20", type: "relationship", from: "ds-sfmta", to: "m-transit-load", label: "sources" },
  ],
};
