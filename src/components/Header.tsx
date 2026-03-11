import React from "react";

interface HeaderProps {
  systemName: string;
  worldCount: number;
}

const Header: React.FC<HeaderProps> = ({ systemName, worldCount }) => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        background: "rgba(10, 10, 10, 0.95)",
        borderBottom: "1px solid rgba(0, 229, 255, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 100,
        backdropFilter: "blur(12px)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Cyan dot indicator */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#00e5ff",
            boxShadow: "0 0 8px rgba(0, 229, 255, 0.6)",
          }}
        />
        <span
          style={{
            color: "#00e5ff",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Spatial Systems Atlas
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "#666", fontSize: 12, fontFamily: "monospace" }}>
          {systemName}
        </span>
        <span style={{ color: "#444", fontSize: 11, fontFamily: "monospace" }}>
          {worldCount} worlds
        </span>
      </div>
    </header>
  );
};

export default Header;
