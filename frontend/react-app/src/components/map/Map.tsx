import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { useAppContext } from "../../context/ContextProvider";
import { useGeolocated } from "react-geolocated";
import L from "leaflet";
import MapLoader from "./MapLoader";

// Custom marker icon to prevent missing icon issue
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const Map = () => {
  // const { publicTrashLocations } = useAppContext();
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
    return <div>Kart krever at geolokasjon skrus på 😠 </div>;

  if (!coords) return <MapLoader />;

  return (
    <MapContainer
      // center={[
      //   coords?.latitude || defaultLocation.lat,
      //   coords?.longitude || defaultLocation.lng,
      // ]}
      center={[defaultLocation.lat, defaultLocation.lng]}
      zoom={17}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker
        position={[coords?.latitude, coords?.longitude]}
        icon={markerIcon}
      >
        <Popup>Du er her</Popup>
      </Marker>
      <Circle center={[coords?.latitude, coords?.longitude]} radius={100} />
      {/* {publicTrashLocations?.map((loc: any, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]} icon={markerIcon} />
      ))} */}
    </MapContainer>
  );
};
