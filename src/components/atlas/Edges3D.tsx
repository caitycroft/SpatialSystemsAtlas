import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { AtlasEdge, EdgeType } from "../../types/atlas";

// Light-theme edge palette — soft prismatic, not the dark bioluminescent set.
const EDGE_COLOR: Record<EdgeType, string> = {
  relationship: "#b9bfd6",
  causality: "#c4a9e6",
  flow: "#9fd8c2",
};

interface Props {
  edges: AtlasEdge[];
  layout: Map<string, THREE.Vector3>;
  activeFor: (edge: AtlasEdge) => boolean;
}

// A glowing mote that travels along a flow edge to imply movement.
const FlowDot: React.FC<{ a: THREE.Vector3; b: THREE.Vector3; phase: number; color: string }> = ({
  a,
  b,
  phase,
  color,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * 0.25 + phase) % 1 + 1) % 1;
    ref.current.position.lerpVectors(a, b, t);
    const s = 0.04 + Math.sin(t * Math.PI) * 0.05;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};

export const Edges3D: React.FC<Props> = ({ edges, layout, activeFor }) => {
  const drawn = useMemo(
    () =>
      edges
        .map((e) => {
          const a = layout.get(e.from);
          const b = layout.get(e.to);
          if (!a || !b) return null;
          return { e, a, b };
        })
        .filter((x): x is { e: AtlasEdge; a: THREE.Vector3; b: THREE.Vector3 } => x !== null),
    [edges, layout],
  );

  return (
    <group>
      {drawn.map(({ e, a, b }, i) => {
        const active = activeFor(e);
        const color = EDGE_COLOR[e.type];
        return (
          <group key={e.id}>
            <Line
              points={[a, b]}
              color={color}
              lineWidth={e.type === "flow" ? 1.6 : 1.1}
              transparent
              opacity={active ? 0.55 : 0.1}
              dashed={e.type !== "causality"}
              dashSize={0.18}
              gapSize={0.12}
            />
            {e.type === "flow" && active && (
              <FlowDot a={a} b={b} phase={(i % 5) / 5} color={color} />
            )}
          </group>
        );
      })}
    </group>
  );
};
