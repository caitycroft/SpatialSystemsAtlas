import React from "react";
import type { SystemData, WorldNode } from "../systems/everon";
import { systems } from "../systems/everon";

interface SidebarProps {
  currentSystem: SystemData;
  activeWorldId: string | null;
  onWorldSelect: (world: WorldNode) => void;
  onSystemSelect: (system: SystemData) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSystem,
  activeWorldId,
  onWorldSelect,
  onSystemSelect,
}) => {
  return (
    <aside
      style={{
        position: "fixed",
        top: 48,
        left: 0,
        bottom: 0,
        width: 280,
        background: "rgba(10, 10, 10, 0.95)",
        borderRight: "1px solid rgba(0, 229, 255, 0.1)",
        overflowY: "auto",
        zIndex: 90,
        backdropFilter: "blur(12px)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* System Switcher */}
      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            fontSize: 10,
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 8,
            fontFamily: "monospace",
          }}
        >
          Systems
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {systems.map((sys) => (
            <button
              key={sys.id}
              onClick={() => onSystemSelect(sys)}
              style={{
                background:
                  sys.id === currentSystem.id
                    ? "rgba(0, 229, 255, 0.15)"
                    : "rgba(255, 255, 255, 0.03)",
                border:
                  sys.id === currentSystem.id
                    ? "1px solid rgba(0, 229, 255, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                padding: "6px 10px",
                color:
                  sys.id === currentSystem.id ? "#00e5ff" : "#888",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "monospace",
                transition: "all 0.2s ease",
              }}
            >
              {sys.name}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(0, 229, 255, 0.08)",
          margin: "12px 16px",
        }}
      />

      {/* World List */}
      <div style={{ padding: "0 12px 16px" }}>
        <div
          style={{
            fontSize: 10,
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 8,
            padding: "0 4px",
            fontFamily: "monospace",
          }}
        >
          Worlds
        </div>

        {currentSystem.worlds.map((world) => {
          const isActive = world.id === activeWorldId;
          return (
            <button
              key={world.id}
              onClick={() => onWorldSelect(world)}
              style={{
                width: "100%",
                textAlign: "left",
                background: isActive
                  ? "rgba(0, 229, 255, 0.08)"
                  : "transparent",
                border: "none",
                borderRadius: 8,
                padding: "12px",
                cursor: "pointer",
                marginBottom: 4,
                transition: "all 0.2s ease",
                borderLeft: isActive
                  ? "2px solid #00e5ff"
                  : "2px solid transparent",
              }}
            >
              {/* World name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isActive
                      ? "#00e5ff"
                      : "rgba(0, 229, 255, 0.3)",
                    boxShadow: isActive
                      ? "0 0 6px rgba(0, 229, 255, 0.5)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <span
                  style={{
                    color: isActive ? "#e0e0e0" : "#999",
                    fontSize: 13,
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {world.name}
                </span>
                <span
                  style={{
                    color: "#444",
                    fontSize: 10,
                    fontFamily: "monospace",
                    marginLeft: "auto",
                  }}
                >
                  Ch.{world.chapter}
                </span>
              </div>

              {/* World description */}
              <p
                style={{
                  color: "#555",
                  fontSize: 11,
                  lineHeight: 1.4,
                  margin: 0,
                  paddingLeft: 14,
                }}
              >
                {world.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 16px",
          borderTop: "1px solid rgba(0, 229, 255, 0.08)",
          background: "rgba(10, 10, 10, 0.98)",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "#333",
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          Spatial Systems Atlas v0.1
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
