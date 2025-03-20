import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../../context/ContextProvider";
import { useGeolocated } from "react-geolocated";
import L from "leaflet";
import MapLoader from "./MapLoader";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const Map = () => {
  const { scannedAvfallResult } = useAppContext();
  console.log({ scannedAvfallResult });
  const defaultLocation = { lat: 61.458982498103865, lng: 5.888914753595201 }; // HVL Førde

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

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
      <Marker
        position={[coords?.latitude, coords?.longitude]}
        icon={markerIcon}
      >
        <Popup>Din posisjon</Popup>
      </Marker>
      <Circle center={[coords?.latitude, coords?.longitude]} radius={100} />
      {scannedAvfallResult?.avfallspunkter?.map((punkt) => (
        <Marker
          key={punkt.id}
          position={[parseFloat(punkt.latitude), parseFloat(punkt.longitude)]}
          icon={markerIcon}
        >
          <Popup>{punkt.navn}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
