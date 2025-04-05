import { iconMap } from "../components/iconsAndLogos/AvfallsIcon";
import { countOccurrences } from "./countOccurences";

export const getBuiltUserStats = (stats) => {
  const typeOccurences = countOccurrences(
    stats,
    (stat) => stat.avfall.avfallsType.id
  );

  return Object.entries(iconMap).map(([id, src]) => ({
    id: id,
    name: src.split("/").pop()?.split(".")[0] ?? "Ukjent",
    count: typeOccurences[id] ?? 0,
  }));
};
