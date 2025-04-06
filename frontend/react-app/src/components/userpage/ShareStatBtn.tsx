import { css } from "styled-components";
import { CoreButton } from "../core/CoreButton";
import { CoreContainer } from "../core/CoreContainer";
import { ShareStatIcon } from "../iconsAndLogos/ShareStatIcon";

const ShareStatBtn = css`
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.green};
`;

const ShareStatInnerContainer = css`
  margin-bottom: 15px;
  height: 100%;
  flex-direction: row;
`;

interface ShareStatButtonInterface {
  postActivateStatShare: () => void;
}

export const ShareStatButton = ({
  postActivateStatShare,
}: ShareStatButtonInterface) => {
  return (
    <CoreButton styles={ShareStatBtn} onClick={postActivateStatShare}>
      <CoreContainer styles={ShareStatInnerContainer}>
        <p>Publiser min statistikk</p>
        <ShareStatIcon width="35px" height="35px" />
      </CoreContainer>
    </CoreButton>
  );
};
