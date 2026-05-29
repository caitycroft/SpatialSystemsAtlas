import React from "react";
import {
  type AtlasNode,
  type SystemMap,
  NODE_TYPE_META,
} from "../../types/atlas";

interface Props {
  node: AtlasNode | null;
  map: SystemMap;
  onSelect: (id: string) => void;
  onEnterWorld: (node: AtlasNode) => void;
  onClose: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div style={{ marginBottom: 20 }}>
    <div className="cc-label" style={{ fontSize: 9, color: "#9398aa", marginBottom: 9 }}>
      {title}
    </div>
    {children}
  </div>
);

export const Inspector: React.FC<Props> = ({
  node,
  map,
  onSelect,
  onEnterWorld,
  onClose,
}) => {
  if (!node) return null;
  const meta = NODE_TYPE_META[node.type];

  const connections = map.edges
    .filter((e) => e.from === node.id || e.to === node.id)
    .map((e) => {
      const otherId = e.from === node.id ? e.to : e.from;
      const other = map.nodes.find((n) => n.id === otherId);
      return { edge: e, other, direction: e.from === node.id ? "→" : "←" };
    })
    .filter((c) => c.other);

  return (
    <div
      className="atlas-scroll cc-glass cc-fade-in"
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        bottom: 16,
        width: 336,
        borderRadius: 18,
        padding: 22,
        overflowY: "auto",
        zIndex: 11,
        color: "#2b2d3a",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          className="cc-label"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 9,
            color: "#5b5f72",
            background: `${meta.iri}55`,
            border: `1px solid ${meta.iri}`,
            borderRadius: 20,
            padding: "4px 11px",
          }}
        >
          <span>{meta.glyph}</span>
          {meta.label}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#9398aa",
            fontSize: 20,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <h2
        className="cc-serif"
        style={{ fontSize: 26, fontWeight: 500, margin: "16px 0 6px", color: "#2b2d3a", lineHeight: 1.1 }}
      >
        {node.name}
      </h2>
      <p style={{ fontSize: 13, lineHeight: 1.5, color: "#5b5f72", marginTop: 0 }}>
        {node.summary}
      </p>

      {node.type === "world" && (
        <button
          onClick={() => onEnterWorld(node)}
          className="cc-iri-border"
          style={{
            width: "100%",
            margin: "10px 0 18px",
            padding: "12px 14px",
            background: "rgba(255,255,255,0.6)",
            color: "#3a3d4c",
            border: "none",
            borderRadius: 12,
            fontFamily: "var(--ui)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ✦ Enter this world
        </button>
      )}

      {node.metric && (
        <Section title="Measured value">
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="cc-serif" style={{ fontSize: 34, fontWeight: 500, color: "#2b2d3a" }}>
              {node.metric.value}
            </span>
            <span style={{ fontSize: 13, color: "#9398aa" }}>{node.metric.unit}</span>
            {node.metric.trend && (
              <span style={{ fontSize: 13, color: "#9398aa" }}>
                {node.metric.trend === "up" ? "↑" : node.metric.trend === "down" ? "↓" : "→"}
              </span>
            )}
          </div>
          {node.metric.target != null && (
            <div style={{ fontSize: 11, color: "#9398aa", marginTop: 4 }}>
              target: {node.metric.target} {node.metric.unit}
            </div>
          )}
        </Section>
      )}

      {node.desires && node.desires.length > 0 && (
        <Section title="What they want">
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {node.desires.map((d) => (
              <li key={d} style={{ fontSize: 13, color: "#4a4d5e", marginBottom: 5, lineHeight: 1.4 }}>
                {d}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {node.data && node.data.length > 0 && (
        <Section title="Attached data">
          {node.data.map((d) => (
            <div
              key={d.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                fontSize: 12.5,
                padding: "6px 0",
                borderBottom: "1px solid rgba(43,45,58,0.08)",
              }}
            >
              <span style={{ color: "#8a8fa3" }}>{d.label}</span>
              <span style={{ color: "#2b2d3a", textAlign: "right" }}>{d.value}</span>
            </div>
          ))}
        </Section>
      )}

      {node.geo && (
        <Section title="Location">
          <div style={{ fontSize: 12.5, color: "#4a4d5e" }}>
            {node.geo.lat.toFixed(4)}, {node.geo.lng.toFixed(4)}
          </div>
        </Section>
      )}

      {node.source && (
        <Section title="Provenance">
          <div style={{ fontSize: 12.5, color: "#4a4d5e" }}>
            {node.source.provider}
            {node.source.synthetic && (
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 10,
                  color: "#a07a3a",
                  border: "1px solid rgba(160,122,58,0.4)",
                  borderRadius: 4,
                  padding: "1px 5px",
                }}
              >
                synthetic
              </span>
            )}
          </div>
          {node.source.url && (
            <a
              href={node.source.url}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 12, color: "#7c6aa8", textDecoration: "none" }}
            >
              {node.source.url} ↗
            </a>
          )}
        </Section>
      )}

      <Section title={`Connections (${connections.length})`}>
        {connections.map(({ edge, other, direction }) => (
          <button
            key={edge.id}
            onClick={() => other && onSelect(other.id)}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(43,45,58,0.08)",
              padding: "8px 0",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              className="cc-label"
              style={{ fontSize: 8, color: "#9398aa", width: 62, flexShrink: 0 }}
            >
              {edge.type}
            </span>
            <span style={{ color: "#9398aa", fontSize: 12 }}>{direction}</span>
            <span style={{ color: "#3a3d4c", fontSize: 12.5, flex: 1 }}>{other?.name}</span>
            {edge.label && (
              <span className="cc-serif" style={{ color: "#9398aa", fontSize: 11, fontStyle: "italic" }}>
                {edge.label}
              </span>
            )}
          </button>
        ))}
      </Section>
    </div>
  );
};
