import { Marker, Popup } from "react-leaflet";
import { CoreContainer } from "../core/CoreContainer";
import { CoreSubheading } from "../core/CoreSubheading";
import { AvfallsIcon } from "../iconsAndLogos/AvfallsIcon";
import { CoreLoader } from "../core/CoreLoader";
import { CoreButton } from "../core/CoreButton";
import { css } from "styled-components";
import L from "leaflet";
import trashBin from "../../assets/other/trash-bin.png";

const IconsContainer = css`
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const Buttonstyles = css`
  width: 230px;
  max-width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 1.2rem;
`;
const PopupContainer = css`
  align-items: flex-start;
`;

const markerIcon = new L.Icon({
  iconUrl: trashBin,
  iconAnchor: [25, 0],
});

export const AvfallspunktMarker = ({
  punkt,
  handleHivAvfall,
  setActiveAvfallspunkt,
  isLoading,
  error,
}: any) => {
  return (
    <Marker
      key={punkt.id}
      position={[parseFloat(punkt.latitude), parseFloat(punkt.longitude)]}
      icon={markerIcon}
    >
      <Popup
        eventHandlers={{
          add: () => setActiveAvfallspunkt(punkt.id),
          remove: () => setActiveAvfallspunkt(null),
        }}
      >
        <CoreContainer styles={PopupContainer}>
          <CoreSubheading>{punkt.navn}</CoreSubheading>
          <CoreContainer styles={IconsContainer}>
            {punkt.avfallspunktAvfallstyper?.map((type) => (
              <AvfallsIcon id={type.avfallstype.id} />
            ))}
          </CoreContainer>
          {isLoading ? (
            <CoreLoader />
          ) : (
            <CoreButton onClick={handleHivAvfall} styles={Buttonstyles}>
              Hiv Avfall
            </CoreButton>
          )}
        </CoreContainer>
      </Popup>
    </Marker>
  );
};
