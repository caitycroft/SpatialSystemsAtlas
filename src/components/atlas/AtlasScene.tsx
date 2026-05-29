import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  type AtlasNode,
  type NodeType,
  type SystemMap,
} from "../../types/atlas";
import { buildLayout } from "./layout3d";
import { NodeOrb } from "./NodeOrb";
import { Edges3D } from "./Edges3D";

interface Props {
  map: SystemMap;
  selectedId: string | null;
  hiddenTypes: Set<NodeType>;
  onSelect: (id: string | null) => void;
  onEnterWorld: (node: AtlasNode) => void;
}

// A soft radial-gradient sprite used for the prismatic backdrop blobs.
const makeGlowTexture = (): THREE.Texture => {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.4, "rgba(255,255,255,0.4)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  return tex;
};

const BACKDROP_BLOBS: { pos: [number, number, number]; scale: number; color: string }[] = [
  { pos: [-10, 6, -14], scale: 14, color: "#c9b6e6" },
  { pos: [11, 4, -16], scale: 16, color: "#f0c4d6" },
  { pos: [8, -7, -13], scale: 13, color: "#a8d6ea" },
  { pos: [-9, -6, -15], scale: 15, color: "#bfe6d2" },
  { pos: [0, 9, -18], scale: 18, color: "#b3c4ee" },
];

const Backdrop: React.FC = () => {
  const tex = useMemo(makeGlowTexture, []);
  return (
    <group>
      {BACKDROP_BLOBS.map((b, i) => (
        <sprite key={i} position={b.pos} scale={[b.scale, b.scale, 1]}>
          <spriteMaterial map={tex} color={b.color} transparent opacity={0.5} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
};

// Eases the orbit target toward the selected node so it recenters gracefully.
const CameraRig: React.FC<{
  controls: React.MutableRefObject<CameraControls | null>;
  target: THREE.Vector3 | null;
}> = ({ controls, target }) => {
  useEffect(() => {
    if (target && controls.current) {
      controls.current.moveTo(target.x, target.y, target.z, true);
    }
  }, [target, controls]);
  return null;
};

const SceneContents: React.FC<Props & { layout: Map<string, THREE.Vector3> }> = ({
  map,
  layout,
  selectedId,
  hiddenTypes,
  onSelect,
  onEnterWorld,
}) => {
  const controls = useRef<CameraControls | null>(null);
  const framed = useRef(false);
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;
  }, [gl]);

  // Frame the constellation slightly low so the header has clear air above it.
  useEffect(() => {
    if (controls.current && !framed.current) {
      framed.current = true;
      controls.current.setLookAt(0, -0.4, 17, 0, 1.7, 0, false);
    }
  });

  const visibleNodes = useMemo(
    () => map.nodes.filter((n) => !hiddenTypes.has(n.type)),
    [map.nodes, hiddenTypes],
  );
  const visibleIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);
  const visibleEdges = useMemo(
    () => map.edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to)),
    [map.edges, visibleIds],
  );

  const neighborIds = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const e of map.edges) {
      if (e.from === selectedId) set.add(e.to);
      if (e.to === selectedId) set.add(e.from);
    }
    return set;
  }, [selectedId, map.edges]);

  const selectedPos = useMemo(
    () => (selectedId ? layout.get(selectedId) ?? null : null),
    [selectedId, layout],
  );

  return (
    <>
      <color attach="background" args={["#eef0f7"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} color={"#ffffff"} />
      <directionalLight position={[-6, -3, 4]} intensity={0.4} color={"#d9c7ef"} />

      {/* Iridescent reflection environment built from colored light cards (no HDR fetch). */}
      <Environment resolution={256}>
        <Lightformer intensity={0.85} color="#ffffff" position={[0, 4, -6]} scale={[12, 6, 1]} />
        <Lightformer intensity={0.7} color="#c9b6e6" position={[-6, 1, -4]} scale={[6, 8, 1]} />
        <Lightformer intensity={0.7} color="#a8d6ea" position={[6, -1, -4]} scale={[6, 8, 1]} />
        <Lightformer intensity={0.5} color="#f0c4d6" position={[0, -5, -3]} scale={[10, 4, 1]} />
      </Environment>

      <Backdrop />
      <Sparkles count={90} scale={[22, 16, 14]} size={2.4} speed={0.25} opacity={0.6} color="#ffffff" />

      <Edges3D
        edges={visibleEdges}
        layout={layout}
        activeFor={(e) => !neighborIds || (neighborIds.has(e.from) && neighborIds.has(e.to))}
      />

      {visibleNodes.map((node) => {
        const pos = layout.get(node.id);
        if (!pos) return null;
        return (
          <NodeOrb
            key={node.id}
            node={node}
            position={pos}
            selected={node.id === selectedId}
            dimmed={!!neighborIds && !neighborIds.has(node.id)}
            onSelect={onSelect}
            onEnterWorld={onEnterWorld}
          />
        );
      })}

      <CameraControls
        ref={controls}
        makeDefault
        minDistance={4}
        maxDistance={26}
        dollySpeed={0.6}
      />
      <CameraRig controls={controls} target={selectedPos} />
    </>
  );
};

export const AtlasScene: React.FC<Props> = (props) => {
  const layout = useMemo(() => buildLayout(props.map), [props.map]);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, 15], fov: 42 }}
      gl={{ antialias: true, alpha: false }}
      onPointerMissed={() => props.onSelect(null)}
    >
      <SceneContents {...props} layout={layout} />
    </Canvas>
  );
};

export default AtlasScene;
