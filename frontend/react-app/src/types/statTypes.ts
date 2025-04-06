import { Avfall, Avfallspunkt } from "./avfallTypes";
import { User } from "./userTypes";

export type Stat = {
  avfall: Avfall;
  avfallspunkt: Avfallspunkt;
  bruker: User;
  id: number;
  tidspunktKastet: string;
};

export type BuiltStats = {
  id: number;
  name: string;
  count: number;
};

export interface ActiveUserStats {
  builtStats: BuiltStats[];
  user: User;
}
