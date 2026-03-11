export interface MediaItem {
  id: string;
  type: "image" | "video" | "audio" | "link" | "document";
  title: string;
  url: string;
  thumbnailUrl?: string;
  description?: string;
}

export interface MediaCluster {
  id: string;
  label: string;
  items: MediaItem[];
}

export interface WorldNode {
  id: string;
  name: string;
  description: string;
  splatUrl: string;
  position: { x: number; y: number };
  chapter: number;
  color?: string;
  media?: MediaCluster[];
}

export interface SystemData {
  id: string;
  name: string;
  description: string;
  worlds: WorldNode[];
}
