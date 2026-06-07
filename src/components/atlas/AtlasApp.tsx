import React, { useMemo, useState } from "react";
import {
  type AtlasNode,
  type NodeType,
  type SystemMap,
  NODE_TYPE_META,
  resolveTypeMeta,
} from "../../types/atlas";
import { SYSTEMS, getSystem } from "../../data/systems";
import { AtlasScene } from "./AtlasScene";
import { Inspector } from "./Inspector";
import { WorldViewer } from "./WorldViewer";

const SystemSwitcher: React.FC<{
  activeId: string;
  onSwitch: (id: string) => void;
}> = ({ activeId, onSwitch }) => (
  <div
    style={{
      display: "flex",
      gap: 4,
      marginTop: 8,
      padding: 3,
      borderRadius: 999,
      background: "rgba(255,255,255,0.45)",
      border: "1px solid rgba(255,255,255,0.7)",
    }}
  >
    {SYSTEMS.map((s) => {
      const active = s.id === activeId;
      return (
        <button
          key={s.id}
          onClick={() => onSwitch(s.id)}
          className={active ? "cc-iri-border" : undefined}
          style={{
            border: "none",
            borderRadius: 999,
            padding: "5px 14px",
            cursor: "pointer",
            fontFamily: "var(--ui)",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: active ? "#2b2d3a" : "#8a8fa3",
            background: active ? "rgba(255,255,255,0.92)" : "transparent",
            boxShadow: active ? "0 2px 10px rgba(120,130,170,0.18)" : "none",
            transition: "color 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {s.shortLabel}
        </button>
      );
    })}
  </div>
);

const Header: React.FC<{
  map: SystemMap;
  activeId: string;
  onSwitch: (id: string) => void;
}> = ({ map, activeId, onSwitch }) => (
  <div
    className="cc-glass cc-fade-in"
    style={{
      position: "absolute",
      top: 16,
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: 18,
      padding: "12px 26px 14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      zIndex: 10,
      maxWidth: "min(94vw, 760px)",
      textAlign: "center",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span className="cc-holo-text" style={{ fontSize: 12 }}>✦</span>
      <span className="cc-wordmark" style={{ fontSize: 15, color: "#2b2d3a" }}>
        Caity Croft
      </span>
      <span className="cc-holo-text" style={{ fontSize: 12 }}>✦</span>
    </div>
    <div className="cc-label" style={{ fontSize: 8.5, color: "#9398aa", marginTop: 1 }}>
      Navigate the Infinite
    </div>

    <SystemSwitcher activeId={activeId} onSwitch={onSwitch} />

    <div
      className="cc-serif"
      style={{
        fontSize: 16,
        fontStyle: "italic",
        color: "#4a4d5e",
        marginTop: 8,
        lineHeight: 1.2,
      }}
      title={map.question}
    >
      {map.name}
    </div>
  </div>
);

const StrataPanel: React.FC<{
  map: SystemMap;
  hiddenTypes: Set<NodeType>;
  onToggleType: (t: NodeType) => void;
}> = ({ map, hiddenTypes, onToggleType }) => {
  const counts = useMemo(() => {
    const c = {} as Record<NodeType, number>;
    for (const n of map.nodes) c[n.type] = (c[n.type] ?? 0) + 1;
    return c;
  }, [map.nodes]);

  return (
    <div
      className="cc-glass cc-fade-in"
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        width: 184,
        borderRadius: 16,
        padding: 16,
        zIndex: 9,
      }}
    >
      <div className="cc-label" style={{ fontSize: 9, color: "#9398aa", marginBottom: 12 }}>
        Strata
      </div>
      {(Object.keys(NODE_TYPE_META) as NodeType[]).map((t) => {
        const meta = resolveTypeMeta(map, t);
        const count = counts[t] ?? 0;
        if (count === 0) return null;
        const hidden = hiddenTypes.has(t);
        return (
          <button
            key={t}
            onClick={() => onToggleType(t)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "6px 2px",
              cursor: "pointer",
              opacity: hidden ? 0.35 : 1,
              textAlign: "left",
              transition: "opacity 0.2s",
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: meta.iri,
                boxShadow: `0 0 10px ${meta.iri}, inset 0 1px 2px rgba(255,255,255,0.9)`,
                flexShrink: 0,
              }}
            />
            <span style={{ fontFamily: "var(--ui)", fontSize: 12.5, color: "#3a3d4c", flex: 1 }}>
              {meta.label}
            </span>
            <span style={{ fontSize: 11, color: "#9398aa" }}>{count}</span>
          </button>
        );
      })}
    </div>
  );
};

const Hint: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 14,
      left: "50%",
      transform: "translateX(-50%)",
      fontFamily: "var(--ui)",
      fontSize: 10.5,
      letterSpacing: "0.14em",
      color: "#8a8fa3",
      textTransform: "uppercase",
      pointerEvents: "none",
      zIndex: 8,
      textShadow: "0 1px 6px rgba(255,255,255,0.8)",
      textAlign: "center",
    }}
  >
    drag to orbit · scroll to zoom · click an orb to inspect · double-click a world to enter
  </div>
);

export const AtlasApp: React.FC = () => {
  const [systemId, setSystemId] = useState<string>(SYSTEMS[0].id);
  const map = useMemo(() => getSystem(systemId), [systemId]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hiddenTypes, setHiddenTypes] = useState<Set<NodeType>>(new Set());
  const [worldNode, setWorldNode] = useState<AtlasNode | null>(null);

  const selectedNode = useMemo(
    () => map.nodes.find((n) => n.id === selectedId) ?? null,
    [map.nodes, selectedId],
  );

  const switchSystem = (id: string) => {
    if (id === systemId) return;
    setSystemId(id);
    setSelectedId(null);
    setWorldNode(null);
    setHiddenTypes(new Set());
  };

  const toggleType = (t: NodeType) =>
    setHiddenTypes((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      {/* The atlas layer unmounts while immersed in a world, so its floating
          3D labels never bleed over the world viewer (and the GPU rests). */}
      {!worldNode && (
        <>
          {/* key by system id → clean remount (fresh layout + camera framing) */}
          <AtlasScene
            key={map.id}
            map={map}
            selectedId={selectedId}
            hiddenTypes={hiddenTypes}
            onSelect={setSelectedId}
            onEnterWorld={setWorldNode}
          />

          <Header map={map} activeId={systemId} onSwitch={switchSystem} />
          <StrataPanel map={map} hiddenTypes={hiddenTypes} onToggleType={toggleType} />
          <Hint />

          <Inspector
            node={selectedNode}
            map={map}
            onSelect={setSelectedId}
            onEnterWorld={setWorldNode}
            onClose={() => setSelectedId(null)}
          />
        </>
      )}

      {worldNode && <WorldViewer node={worldNode} onExit={() => setWorldNode(null)} />}
    </div>
  );
};

export default AtlasApp;
