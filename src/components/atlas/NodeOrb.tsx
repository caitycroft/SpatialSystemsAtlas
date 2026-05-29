import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { type AtlasNode, NODE_TYPE_META } from "../../types/atlas";

interface Props {
  node: AtlasNode;
  position: THREE.Vector3;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
  onEnterWorld: (node: AtlasNode) => void;
}

const radiusFor = (type: AtlasNode["type"]): number =>
  type === "world" ? 0.62 : type === "site" ? 0.46 : 0.4;

export const NodeOrb: React.FC<Props> = ({
  node,
  position,
  selected,
  dimmed,
  onSelect,
  onEnterWorld,
}) => {
  const meta = NODE_TYPE_META[node.type];
  const tint = new THREE.Color(meta.iri);
  const r = radiusFor(node.type);

  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Smoothly approach a target scale based on hover/selection state.
  useFrame((_, dt) => {
    const target = selected ? 1.28 : hovered ? 1.14 : 1;
    if (group.current) {
      const k = 1 - Math.exp(-dt * 9);
      group.current.scale.lerp(new THREE.Vector3(target, target, target), k);
    }
    if (halo.current) {
      const mat = halo.current.material as THREE.MeshBasicMaterial;
      const want = selected ? 0.34 : hovered ? 0.2 : 0.08;
      mat.opacity += (want - mat.opacity) * (1 - Math.exp(-dt * 8));
    }
  });

  const opacity = dimmed ? 0.18 : 1;
  const isWorld = node.type === "world";

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.25}
      floatIntensity={isWorld ? 0.7 : 0.45}
      position={position}
    >
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (isWorld) onEnterWorld(node);
        }}
      >
        {/* Subtle colored bloom — kept faint so orbs read as glass beads, not discs */}
        <mesh ref={halo} scale={1.34}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshBasicMaterial
            color={tint}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Iridescent glass body */}
        <mesh>
          <sphereGeometry args={[r, 64, 64]} />
          <meshPhysicalMaterial
            color={tint}
            transmission={0.9}
            thickness={0.9}
            roughness={0.06}
            metalness={0}
            ior={1.38}
            iridescence={1}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[140, 780]}
            clearcoat={1}
            clearcoatRoughness={0.1}
            attenuationColor={tint}
            attenuationDistance={1.6}
            envMapIntensity={1.5}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Small offset specular highlight — reads as a glint, not a bullseye */}
        <mesh scale={0.16} position={[r * 0.34, r * 0.36, r * 0.34]}>
          <sphereGeometry args={[r, 16, 16]} />
          <meshBasicMaterial
            color={"#ffffff"}
            transparent
            opacity={dimmed ? 0.15 : 0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* World nodes get a thin orbital ring to signal "enter" */}
        {isWorld && (
          <mesh rotation={[Math.PI / 2.3, 0.4, 0]}>
            <torusGeometry args={[r * 1.55, 0.012, 16, 96]} />
            <meshBasicMaterial color={"#cbb6e6"} transparent opacity={dimmed ? 0.15 : 0.7} />
          </mesh>
        )}

        {/* Label */}
        <Html
          center
          distanceFactor={9}
          position={[0, -r - 0.55, 0]}
          className="cc-node-label"
          style={{ opacity, transition: "opacity 0.25s" }}
        >
          <div style={{ textAlign: "center", width: 220, transform: "translateY(0)" }}>
            <div
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "#2b2d3a",
                textShadow: "0 1px 6px rgba(255,255,255,0.9)",
                lineHeight: 1.2,
              }}
            >
              {node.name}
            </div>
            <div
              style={{
                fontFamily: "var(--ui)",
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#8a8fa3",
                marginTop: 3,
              }}
            >
              {isWorld ? "↳ double-click to enter" : meta.label}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};
