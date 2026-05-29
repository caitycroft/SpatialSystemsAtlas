import React, { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { SplatMesh } from "../spark/SplatMesh";
import { SparkRenderer } from "../spark/SparkRenderer";
import type { AtlasNode } from "../../types/atlas";

const SplatScene: React.FC<{ url: string }> = ({ url }) => {
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => ({ renderer }), [renderer]);
  const splatMeshArgs = useMemo(() => ({ url }) as const, [url]);

  return (
    <>
      <CameraControls />
      <SparkRenderer args={[sparkRendererArgs]}>
        <group rotation={[Math.PI, 0, 0]}>
          <SplatMesh args={[splatMeshArgs]} />
        </group>
      </SparkRenderer>
    </>
  );
};

interface Props {
  node: AtlasNode;
  onExit: () => void;
}

export const WorldViewer: React.FC<Props> = ({ node, onExit }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background:
          "radial-gradient(120% 100% at 50% 30%, #f7f8fd 0%, #e7eaf4 60%, #dadeec 100%)",
      }}
    >
      {/* Portal flash on entry */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          zIndex: 5,
          pointerEvents: "none",
          animation: "portal-flash 0.9s ease-out forwards",
        }}
      />
      <style>{`@keyframes portal-flash { 0% { opacity: 1; } 100% { opacity: 0; } }`}</style>

      <Canvas
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={({ gl }) => gl.setClearColor("#e7eaf4", 1)}
      >
        <Suspense fallback={null}>
          {node.splatUrl && <SplatScene url={node.splatUrl} />}
        </Suspense>
      </Canvas>

      <button
        onClick={onExit}
        className="cc-glass"
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          padding: "9px 16px",
          borderRadius: 12,
          fontFamily: "var(--ui)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#3a3d4c",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        ← Back to atlas
      </button>

      <div
        className="cc-glass cc-fade-in"
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          maxWidth: 380,
          borderRadius: 16,
          padding: "16px 20px",
          zIndex: 10,
        }}
      >
        <div
          className="cc-serif"
          style={{ color: "#2b2d3a", fontSize: 22, fontWeight: 500, marginBottom: 4 }}
        >
          {node.name}
        </div>
        <div style={{ color: "#5b5f72", fontSize: 12.5, lineHeight: 1.45 }}>{node.summary}</div>
        {node.source?.synthetic && (
          <div className="cc-label" style={{ color: "#a07a3a", fontSize: 9, marginTop: 8 }}>
            ✦ Placeholder splat — Marble world pending
          </div>
        )}
      </div>
    </div>
  );
};
