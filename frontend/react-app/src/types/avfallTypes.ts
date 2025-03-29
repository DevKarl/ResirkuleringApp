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

export type AvfallspunktAvfallstyper = {
  avfallstype: {
    id: number;
    type: string;
  };
};

export type Avfallspunkt = {
  id: number;
  navn: string;
  latitude: string;
  longitude: string;
  avfallspunktAvfallstyper: AvfallspunktAvfallstyper[];
};

export type ScanAvfallResponse = {
  avfall: Avfall;
  avfallspunkter: Avfallspunkt[];
};
