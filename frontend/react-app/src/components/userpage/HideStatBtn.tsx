import { css } from "styled-components";
import { ButtonType, CoreButton } from "../core/CoreButton";
import { CoreContainer } from "../core/CoreContainer";
import { HideStatIcon } from "../iconsAndLogos/HideStatIcon";

const HideStatBtn = css`
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.danger};
`;

const HideStatInnerContainer = css`
  margin-bottom: 15px;
  height: 100%;
  flex-direction: row;
`;

interface HideStatButtonInterface {
  postDeactivateStatShare: () => void;
}

export const HideStatButton = ({
  postDeactivateStatShare,
}: HideStatButtonInterface) => {
  return (
    <CoreButton type={ButtonType.Danger} onClick={postDeactivateStatShare}>
      <CoreContainer styles={HideStatInnerContainer}>
        <p>Skjul min statistikk</p>
        <HideStatIcon width="35px" height="35px" />
      </CoreContainer>
    </CoreButton>
  );
};
