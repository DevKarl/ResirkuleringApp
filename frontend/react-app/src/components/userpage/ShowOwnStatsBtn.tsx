import { css } from "styled-components";
import { ButtonType, CoreButton } from "../core/CoreButton";
import { CoreContainer } from "../core/CoreContainer";
import { ResetIcon } from "../iconsAndLogos/ResetIcon";

const ShowOwnStatsBtn = css`
  margin-bottom: 15px;
`;

const ShowOwnStatsInnerContainer = css`
  margin-bottom: 15px;
  height: 100%;
  flex-direction: row;
`;

interface ShowOwnStatsButtonInterface {
  handleResetStats: () => void;
}

export const ShowOwnStatsButton = ({
  handleResetStats,
}: ShowOwnStatsButtonInterface) => {
  return (
    <CoreButton
      type={ButtonType.Danger}
      onClick={handleResetStats}
      styles={ShowOwnStatsBtn}
    >
      <CoreContainer styles={ShowOwnStatsInnerContainer}>
        <p>Tilbake til min statistikk</p>
        <ResetIcon width="40px" height="40px" />
      </CoreContainer>
    </CoreButton>
  );
};
