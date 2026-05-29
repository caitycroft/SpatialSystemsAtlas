// Maps the 2D authored canvas positions of a SystemMap into a depth-layered
// 3D point cloud. Deterministic: same map always yields the same constellation,
// so the atlas feels like a real place you can learn.
import type { AtlasNode, NodeType, SystemMap } from "../../types/atlas";
import * as THREE from "three";

// Authored canvas spans roughly x:[140,1320], y:[70,1010].
const CENTER_X = 730;
const CENTER_Y = 540;
const SCALE = 0.0122;

// Each node type lives on its own depth shell, so the graph reads as layered
// strata rather than a flat sheet when you orbit it.
const Z_BY_TYPE: Record<NodeType, number> = {
  stakeholder: 2.6,
  policy: -1.6,
  site: 0.4,
  world: 1.3,
  metric: -2.8,
  dataSource: 3.4,
};

// Cheap deterministic hash → [-1, 1]; used to scatter depth so shells aren't flat.
const jitter = (seed: string): number => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) / 0xffffffff) * 2 - 1;
};

export const node3DPosition = (n: AtlasNode): THREE.Vector3 =>
  new THREE.Vector3(
    (n.position.x - CENTER_X) * SCALE,
    -(n.position.y - CENTER_Y) * SCALE,
    Z_BY_TYPE[n.type] + jitter(n.id) * 0.9,
  );

export const buildLayout = (map: SystemMap): Map<string, THREE.Vector3> => {
  const out = new Map<string, THREE.Vector3>();
  for (const n of map.nodes) out.set(n.id, node3DPosition(n));
  return out;
};
