import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const FitBounds = ({ coords, scannedAvfallResult }: any) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !coords) return;

    const bounds = L.latLngBounds([
      [coords.latitude, coords.longitude],
      ...(scannedAvfallResult?.avfallspunkter?.map((p: any) => [
        parseFloat(p.latitude),
        parseFloat(p.longitude),
      ]) || []),
    ]);

    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
  }, [map, coords, scannedAvfallResult]);

  return null;
};
