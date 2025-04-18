import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../../context/ContextProvider";
import { useGeolocated } from "react-geolocated";
import L from "leaflet";
import MapLoader from "./MapLoader";
import { useMemo, useState } from "react";
import ikon from "../../assets/map/Sven-ol-AI.png";
import { usePostHivAvfall } from "../../hooks/API/usePostHivAvfall";
import { AvfallspunktMarker } from "./AvfallspunktMarker";
import { FitBounds } from "./FitBounds";
import { findClosestPoint } from "./findClosestPoint";
import useBreakpoints from "../../hooks/useBreakpoints";
import { toast } from "sonner";

const userIcon = new L.Icon({
  iconUrl: ikon,
  iconSize: [50, 67],
  iconAnchor: [25, 61],
});

export const Map = () => {
  const { user, scannedAvfallResult } = useAppContext();
  const [activeAvfallspunkt, setActiveAvfallspunkt] = useState<number | null>(
    null
  );
  const { isDesktop } = useBreakpoints();
  const defaultLocation = { lat: 61.458982498103865, lng: 5.888914753595201 }; // HVL Førde
  const { isLoading, postHivAvfall } = usePostHivAvfall();
  const [hasWarnedGeolocationUnavailable, setHasWarnedGeolocationUnavailable] =
    useState(false);
  const [hasWarnedGeolocationDisabled, setHasWarnedGeolocationDisabled] =
    useState(false);

  const hivAvfall = () => {
    //@ts-ignore
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

  if (!isGeolocationAvailable) {
    if (hasWarnedGeolocationUnavailable) return;
    toast.error("Enheten din støtter ikke geolokasjon.");
    setHasWarnedGeolocationUnavailable(true);
  }

  if (!isGeolocationEnabled) {
    if (hasWarnedGeolocationDisabled) return;
    toast.error("Kart krever at geolokasjon tillates");
    setHasWarnedGeolocationDisabled(true);
  }
  if (!coords) return <MapLoader />;

  return (
    <MapContainer
      center={[
        coords?.latitude || defaultLocation.lat,
        coords?.longitude || defaultLocation.lng,
      ]}
      zoom={17}
      style={{
        height: isDesktop ? "500px" : "350px",
        width: "80%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <FitBounds coords={coords} scannedAvfallResult={scannedAvfallResult} />
      <Marker position={[coords?.latitude, coords?.longitude]} icon={userIcon}>
        <Popup>Din posisjon</Popup>
      </Marker>
      <Circle center={[coords?.latitude, coords?.longitude]} radius={100} />
      {scannedAvfallResult?.avfallspunkter?.map((punkt) => (
        <AvfallspunktMarker
          key={punkt.id}
          punkt={punkt}
          hivAvfall={hivAvfall}
          setActiveAvfallspunkt={setActiveAvfallspunkt}
          isLoading={isLoading}
          isLoggedIn={Boolean(user)}
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
