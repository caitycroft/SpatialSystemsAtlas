import React, { useState, Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { SplatMesh } from "./spark/SplatMesh";
import { SparkRenderer } from "./spark/SparkRenderer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MediaPanel from "./MediaPanel";
import { everon } from "../systems/everon";
import type { SystemData, WorldNode } from "../types/world";

const SplatScene: React.FC<{ url: string }> = ({ url }) => {
  const renderer = useThree((state) => state.gl);

  const sparkRendererArgs = useMemo(() => {
    return { renderer };
  }, [renderer]);

  const splatMeshArgs = useMemo(
    () => ({ url }) as const,
    [url],
  );

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

const Atlas: React.FC = () => {
  const [currentSystem, setCurrentSystem] = useState<SystemData>(everon);
  const [activeWorld, setActiveWorld] = useState<WorldNode | null>(
    everon.worlds[0]
  );
  const [mediaPanelOpen, setMediaPanelOpen] = useState(false);

  const handleWorldSelect = (world: WorldNode) => {
    setActiveWorld(world);
    setMediaPanelOpen(true);
  };

  const handleSystemSelect = (system: SystemData) => {
    setCurrentSystem(system);
    setActiveWorld(system.worlds[0]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}>
      <Header
        systemName={currentSystem.name}
        worldCount={currentSystem.worlds.length}
      />

      <Sidebar
        currentSystem={currentSystem}
        activeWorldId={activeWorld?.id ?? null}
        onWorldSelect={handleWorldSelect}
        onSystemSelect={handleSystemSelect}
      />

      <MediaPanel
        world={activeWorld}
        open={mediaPanelOpen}
        onClose={() => setMediaPanelOpen(false)}
      />

      {/* 3D Viewport */}
      <div
        style={{
          position: "fixed",
          top: 48,
          left: 280,
          right: mediaPanelOpen ? 320 : 0,
          bottom: 0,
          transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Canvas
          gl={{ antialias: false }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: "#0a0a0a" }}
        >
          <Suspense fallback={null}>
            {activeWorld && (
              <SplatScene url={activeWorld.splatUrl} />
            )}
          </Suspense>
        </Canvas>

        {/* Active world label overlay */}
        {activeWorld && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              background: "rgba(10, 10, 10, 0.85)",
              border: "1px solid rgba(0, 229, 255, 0.15)",
              borderRadius: 8,
              padding: "12px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                color: "#00e5ff",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {activeWorld.name}
            </div>
            <div
              style={{
                color: "#666",
                fontSize: 11,
                maxWidth: 300,
                lineHeight: 1.4,
              }}
            >
              {activeWorld.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Atlas;
