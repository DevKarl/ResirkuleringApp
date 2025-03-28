import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../../context/ContextProvider";
import { useGeolocated } from "react-geolocated";
import L from "leaflet";
import MapLoader from "./MapLoader";
import { useEffect, useMemo, useState } from "react";
import { usePostHivAvfall } from "../../hooks/API/usePostHivAvfall";
import { AvfallspunktMarker } from "./AvfallspunktMarker";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FitBounds = ({ coords, scannedAvfallResult }: any) => {
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

// haversine formel
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // i km
};

const findClosestPoint = (coords: any, avfallspunkter: any) => {
  if (!coords || !avfallspunkter?.length) return null;

  return avfallspunkter.reduce((closest: any, punkt: any) => {
    const distance = getDistance(
      coords.latitude,
      coords.longitude,
      parseFloat(punkt.latitude),
      parseFloat(punkt.longitude)
    );

    return !closest || distance < closest.distance
      ? { ...punkt, distance }
      : closest;
  }, null);
};

export const Map = () => {
  const { user, scannedAvfallResult } = useAppContext();
  const [activeAvfallspunkt, setActiveAvfallspunkt] = useState<number | null>(
    null
  );
  const defaultLocation = { lat: 61.458982498103865, lng: 5.888914753595201 }; // HVL Førde
  const { responseData, error, isLoading, postHivAvfall } = usePostHivAvfall();

  const handleHivAvfall = () => {
    postHivAvfall(scannedAvfallResult.avfall.id, activeAvfallspunkt);
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const closestPoint = useMemo(
    () => findClosestPoint(coords, scannedAvfallResult?.avfallspunkter),
    [coords, scannedAvfallResult]
  );

  if (!isGeolocationAvailable)
    return <div>Enheten din støtter ikke geolokasjon 😢 </div>;

  if (!isGeolocationEnabled)
    return <div>Kart krever at posisjon deles 😠 </div>;

  if (!coords) return <MapLoader />;

  return (
    <MapContainer
      center={[
        coords?.latitude || defaultLocation.lat,
        coords?.longitude || defaultLocation.lng,
      ]}
      // center={[defaultLocation.lat, defaultLocation.lng]}
      zoom={17}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <FitBounds coords={coords} scannedAvfallResult={scannedAvfallResult} />
      <Marker
        position={[coords?.latitude, coords?.longitude]}
        icon={markerIcon}
      >
        <Popup>Din posisjon</Popup>
      </Marker>
      <Circle center={[coords?.latitude, coords?.longitude]} radius={100} />
      {scannedAvfallResult?.avfallspunkter?.map((punkt) => (
        <AvfallspunktMarker
          punkt={punkt}
          handleHivAvfall={handleHivAvfall}
          setActiveAvfallspunkt={setActiveAvfallspunkt}
          isLoading={isLoading}
          error={error}
        />
      ))}
      {closestPoint && (
        <Polyline
          positions={[
            [coords.latitude, coords.longitude],
            [
              parseFloat(closestPoint.latitude),
              parseFloat(closestPoint.longitude),
            ],
          ]}
          pathOptions={{ color: "blue", dashArray: "5, 10" }}
        />
      )}
    </MapContainer>
  );
};
