import { Avfall, Avfallspunkt } from "./avfallTypes";
import { User } from "./userTypes";

export type Stat = {
  avfall: Avfall;
  avfallspunkt: Avfallspunkt;
  bruker: User;
  id: number;
  tidspunktKastet: string;
};
