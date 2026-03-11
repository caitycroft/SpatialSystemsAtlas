import React from "react";
import type { WorldNode, MediaCluster, MediaItem } from "../types/world";

interface MediaPanelProps {
  world: WorldNode | null;
  open: boolean;
  onClose: () => void;
}

const MediaItemCard: React.FC<{ item: MediaItem }> = ({ item }) => {
  const typeIcon: Record<MediaItem["type"], string> = {
    image: "\u25A3",
    video: "\u25B6",
    audio: "\u266B",
    link: "\u2197",
    document: "\u25A1",
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(0, 229, 255, 0.08)",
        borderRadius: 6,
        padding: "10px 12px",
        textDecoration: "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 229, 255, 0.3)";
        e.currentTarget.style.background = "rgba(0, 229, 255, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 229, 255, 0.08)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#00e5ff", fontSize: 12 }}>
          {typeIcon[item.type]}
        </span>
        <span style={{ color: "#ccc", fontSize: 12, flex: 1 }}>
          {item.title}
        </span>
        <span
          style={{
            color: "#444",
            fontSize: 9,
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          {item.type}
        </span>
      </div>
      {item.description && (
        <p
          style={{
            color: "#555",
            fontSize: 11,
            lineHeight: 1.4,
            margin: "6px 0 0 20px",
          }}
        >
          {item.description}
        </p>
      )}
    </a>
  );
};

const ClusterSection: React.FC<{ cluster: MediaCluster }> = ({ cluster }) => (
  <div style={{ marginBottom: 16 }}>
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
      {cluster.label}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {cluster.items.map((item) => (
        <MediaItemCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

const MediaPanel: React.FC<MediaPanelProps> = ({ world, open, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 48,
        right: 0,
        bottom: 0,
        width: 320,
        background: "rgba(10, 10, 10, 0.95)",
        borderLeft: "1px solid rgba(0, 229, 255, 0.1)",
        backdropFilter: "blur(12px)",
        zIndex: 90,
        fontFamily: "system-ui, -apple-system, sans-serif",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          borderBottom: "1px solid rgba(0, 229, 255, 0.08)",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "monospace",
          }}
        >
          Context
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 4,
            color: "#666",
            fontSize: 14,
            cursor: "pointer",
            padding: "2px 8px",
            lineHeight: 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 229, 255, 0.3)";
            e.currentTarget.style.color = "#00e5ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.color = "#666";
          }}
        >
          &times;
        </button>
      </div>

      {world && (
        <div style={{ padding: 16 }}>
          {/* World info */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                color: "#00e5ff",
                fontSize: 15,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {world.name}
            </div>
            <div
              style={{
                color: "#444",
                fontSize: 10,
                fontFamily: "monospace",
                marginBottom: 8,
              }}
            >
              Chapter {world.chapter}
            </div>
            <p
              style={{
                color: "#777",
                fontSize: 12,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {world.description}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(0, 229, 255, 0.08)",
              marginBottom: 16,
            }}
          />

          {/* Media clusters */}
          {world.media && world.media.length > 0 ? (
            world.media.map((cluster) => (
              <ClusterSection key={cluster.id} cluster={cluster} />
            ))
          ) : (
            <div
              style={{
                color: "#333",
                fontSize: 11,
                fontFamily: "monospace",
                textAlign: "center",
                padding: "24px 0",
              }}
            >
              No media attached
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaPanel;
