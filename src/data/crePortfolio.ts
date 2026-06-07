import type { SystemMap } from "../types/atlas";

// ─────────────────────────────────────────────────────────────────────────
// Commercial Real Estate portfolio map.
// Same engine as the civic map, re-lexiconed for an investment context:
// Property / Strategy / Performance / Counterparty / Data feed / Walkthrough.
// All figures are illustrative (synthetic) demo values.
// ─────────────────────────────────────────────────────────────────────────

const PLACEHOLDER_SPLAT = "https://sparkjs.dev/assets/splats/butterfly.spz";

export const crePortfolio: SystemMap = {
  id: "cre-portfolio",
  name: "Vertex Capital — West Coast Portfolio",
  shortLabel: "CRE Portfolio",
  question:
    "Where is the portfolio's risk and upside concentrated across the West Coast assets?",
  description:
    "Three flagship assets, the strategies in play, the performance we underwrite to, and the counterparties whose incentives shape every outcome.",
  lexicon: {
    site: { label: "Property", glyph: "▢" },
    policy: { label: "Strategy lever", glyph: "✦" },
    metric: { label: "Performance", glyph: "▲" },
    stakeholder: { label: "Counterparty", glyph: "◇" },
    dataSource: { label: "Data feed", glyph: "≡" },
    world: { label: "Walkthrough", glyph: "◉" },
  },
  nodes: [
    // Strategy levers (top band)
    {
      id: "st-leaseup",
      type: "policy",
      name: "Lease-Up Push",
      summary: "Concessions + broker incentives to backfill vacant office floors.",
      position: { x: 520, y: 90 },
      data: [
        { label: "Free rent", value: "2 mo / 5 yr term" },
        { label: "TI allowance", value: "$85 / sq ft" },
      ],
    },
    {
      id: "st-capex",
      type: "policy",
      name: "Capex / Reposition",
      summary: "Amenitize lobby + add spec suites to lift effective rents.",
      position: { x: 820, y: 70 },
      data: [{ label: "Budget", value: "$12.4M" }],
    },
    {
      id: "st-refi",
      type: "policy",
      name: "Refinance Window",
      summary: "Term out the bridge loan before the 2027 maturity wall.",
      position: { x: 1120, y: 110 },
      data: [{ label: "Maturity", value: "Q3 2027" }],
    },

    // Counterparties (left column)
    {
      id: "cp-anchor",
      type: "stakeholder",
      name: "Anchor Tenant (Tech)",
      summary: "Occupies 40% of 100 Market; lease drives the whole valuation.",
      position: { x: 140, y: 300 },
      desires: ["Flexible expansion rights", "Sub-market rent", "Build-out support"],
      data: [{ label: "Lease expiry", value: "2029" }],
    },
    {
      id: "cp-lender",
      type: "stakeholder",
      name: "Senior Lender",
      summary: "Holds the loan; covenants gate distributions.",
      position: { x: 140, y: 470 },
      desires: ["DSCR above 1.25×", "Stable occupancy", "Refi certainty"],
    },
    {
      id: "cp-lp",
      type: "stakeholder",
      name: "LP Investors",
      summary: "Limited partners expecting a target net IRR at exit.",
      position: { x: 140, y: 640 },
      desires: ["Target 15% net IRR", "Quarterly distributions", "Capital preservation"],
    },
    {
      id: "cp-pm",
      type: "stakeholder",
      name: "Property Management",
      summary: "Runs operations; controls the controllable side of NOI.",
      position: { x: 140, y: 810 },
      desires: ["Opex discipline", "High tenant retention"],
    },

    // Properties (center)
    {
      id: "pr-100market",
      type: "site",
      name: "100 Market St (SF Office)",
      summary: "Class-A downtown office tower — the portfolio's keystone asset.",
      position: { x: 700, y: 420 },
      geo: { lat: 37.7937, lng: -122.3965 },
      data: [
        { label: "RSF", value: "420,000" },
        { label: "Year built", value: "2008" },
      ],
      source: { provider: "CoStar (illustrative)", synthetic: true },
    },
    {
      id: "pr-pearl",
      type: "site",
      name: "Pearl District Lofts (PDX)",
      summary: "Stabilized multifamily — steady cash flow ballast.",
      position: { x: 520, y: 560 },
      geo: { lat: 45.5289, lng: -122.6826 },
      data: [{ label: "Units", value: "186" }],
      source: { provider: "Rent roll (Yardi)", synthetic: true },
    },
    {
      id: "pr-arts",
      type: "site",
      name: "Arts District Reuse (LA)",
      summary: "Adaptive-reuse mixed-use — the value-add upside play.",
      position: { x: 940, y: 600 },
      geo: { lat: 34.0407, lng: -118.2331 },
      data: [{ label: "Status", value: "In lease-up" }],
      source: { provider: "Internal pro forma", synthetic: true },
    },

    // Walkthrough world (fly-into)
    {
      id: "world-skylobby",
      type: "world",
      name: "100 Market — Sky Lobby",
      summary: "Walk the repositioned lobby as a captured 3D environment.",
      position: { x: 940, y: 430 },
      geo: { lat: 37.7937, lng: -122.3965 },
      splatUrl: PLACEHOLDER_SPLAT,
      source: { provider: "Placeholder (Marble capture pending)", synthetic: true },
    },

    // Performance (right column)
    {
      id: "m-occ",
      type: "metric",
      name: "Occupancy",
      summary: "Blended physical occupancy across the portfolio.",
      position: { x: 1320, y: 320 },
      metric: { value: 84, unit: "%", trend: "up", target: 92 },
    },
    {
      id: "m-noi",
      type: "metric",
      name: "NOI",
      summary: "Trailing-12 net operating income, all assets.",
      position: { x: 1320, y: 470 },
      metric: { value: 31.6, unit: "$M", trend: "up", target: 38 },
    },
    {
      id: "m-cap",
      type: "metric",
      name: "Cap Rate",
      summary: "Implied exit capitalization rate.",
      position: { x: 1320, y: 620 },
      metric: { value: 6.4, unit: "%", trend: "up", target: 5.75 },
    },
    {
      id: "m-dscr",
      type: "metric",
      name: "Debt Service Coverage",
      summary: "NOI vs. annual debt service — the lender's tripwire.",
      position: { x: 1320, y: 770 },
      metric: { value: 1.18, unit: "× DSCR", trend: "down", target: 1.25 },
    },

    // Data feeds (bottom band)
    {
      id: "df-costar",
      type: "dataSource",
      name: "CoStar",
      summary: "Comps, vacancy, and submarket rents.",
      position: { x: 620, y: 980 },
      source: { provider: "CoStar", synthetic: false },
    },
    {
      id: "df-yardi",
      type: "dataSource",
      name: "Rent Roll (Yardi)",
      summary: "Lease-level rent, expiries, and arrears.",
      position: { x: 940, y: 1000 },
      source: { provider: "Yardi", synthetic: false },
    },
  ],

  edges: [
    // Strategy → performance (causality)
    { id: "c1", type: "causality", from: "st-leaseup", to: "m-occ", label: "fills space" },
    { id: "c2", type: "causality", from: "m-occ", to: "m-noi", label: "occ → NOI" },
    { id: "c3", type: "causality", from: "st-capex", to: "m-noi", label: "rent lift" },
    { id: "c4", type: "causality", from: "m-noi", to: "m-dscr", label: "covers debt" },
    { id: "c5", type: "causality", from: "m-noi", to: "m-cap", label: "drives value" },
    { id: "c6", type: "causality", from: "st-refi", to: "m-dscr", label: "resets terms" },

    // Counterparties ↔ assets (relationship)
    { id: "r1", type: "relationship", from: "cp-anchor", to: "pr-100market", label: "anchors" },
    { id: "r2", type: "relationship", from: "cp-lender", to: "m-dscr", label: "covenants" },
    { id: "r3", type: "relationship", from: "cp-lp", to: "m-cap", label: "exit return" },
    { id: "r4", type: "relationship", from: "cp-pm", to: "pr-pearl", label: "operates" },
    { id: "r5", type: "relationship", from: "cp-pm", to: "pr-100market", label: "operates" },

    // Flows (capital / movement)
    { id: "f1", type: "flow", from: "pr-100market", to: "m-noi", label: "income" },
    { id: "f2", type: "flow", from: "pr-pearl", to: "m-noi", label: "income" },
    { id: "f3", type: "flow", from: "pr-arts", to: "m-occ", label: "lease-up" },
    { id: "f4", type: "flow", from: "pr-100market", to: "world-skylobby", label: "walk it" },

    // Provenance
    { id: "p1", type: "relationship", from: "df-costar", to: "pr-arts", label: "sources" },
    { id: "p2", type: "relationship", from: "df-yardi", to: "pr-pearl", label: "sources" },
  ],
};
