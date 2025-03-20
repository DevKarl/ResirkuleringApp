export type AvfallsType = {
  id: number;
  type: string;
};

export type Avfall = {
  id: number;
  navn: string;
  beskrivelse: string;
  avfallsType: AvfallsType;
  strekkode: string;
};

export type Avfallspunkt = {
  id: number;
  navn: string;
  latitude: string;
  longitude: string;
};

export type ScanAvfallResponse = {
  avfall: Avfall;
  avfallspunkter: Avfallspunkt[];
} | null;
