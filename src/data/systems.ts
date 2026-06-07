import type { SystemMap } from "../types/atlas";
import { missionCorridor } from "./missionCorridor";
import { crePortfolio } from "./crePortfolio";
import { everon } from "./everon";

// The ordered set of systems the atlas can switch between.
// Add a new SystemMap here and it appears in the switcher automatically.
export const SYSTEMS: SystemMap[] = [missionCorridor, crePortfolio, everon];

export const getSystem = (id: string): SystemMap =>
  SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
