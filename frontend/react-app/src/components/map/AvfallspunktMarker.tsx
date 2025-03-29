import { Marker, Popup } from "react-leaflet";
import { CoreContainer } from "../core/CoreContainer";
import { CoreSubheading } from "../core/CoreSubheading";
import { AvfallsIcon } from "../iconsAndLogos/AvfallsIcon";
import { CoreLoader } from "../core/CoreLoader";
import { CoreButton } from "../core/CoreButton";
import styled, { css, keyframes } from "styled-components";
import L from "leaflet";
import trashBin from "../../assets/other/trash-bin.png";
import { useState } from "react";

const Buttonstyles = css`
  width: 230px;
  max-width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 1.2rem;
`;

const IconsContainer = css`
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const PopupContainer = css`
  align-items: flex-start;
`;

const ReminderText = styled.p`
  color: red;
  margin: 0;
  font-size: 15px;
  font-weight: 500;
`;

const markerIcon = new L.Icon({
  iconUrl: trashBin,
  iconAnchor: [25, 0],
  iconSize: [50, 50],
});

export const AvfallspunktMarker = ({
  punkt,
  hivAvfall,
  setActiveAvfallspunkt,
  isLoading,
  isLoggedIn,
  error,
}: any) => {
  const [showLoginReminder, setShowLoginReminder] = useState(false);

  const handleHivAvfall = () => {
    if (!isLoggedIn) {
      setShowLoginReminder(true);
      setTimeout(() => setShowLoginReminder(false), 10000); // Hide after 10x
      return;
    }
    hivAvfall();
  };

  return (
    <Marker
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
            <>
              <CoreButton
                styles={Buttonstyles}
                onClick={handleHivAvfall}
                errorShake={showLoginReminder}
              >
                Hiv Avfall
              </CoreButton>
              {showLoginReminder && (
                <ReminderText>
                  Du må logge inn for å registrere avfall
                </ReminderText>
              )}
              {error && <ReminderText>{error.message}</ReminderText>}
            </>
          )}
        </CoreContainer>
      </Popup>
    </Marker>
  );
};
