import { css } from "styled-components";
import { CoreButton } from "../core/CoreButton";
import { CoreContainer } from "../core/CoreContainer";
import { ResetIcon } from "../iconsAndLogos/ResetIcon";

const ShowOwnStatsBtn = css`
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.danger};
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
    <CoreButton styles={ShowOwnStatsBtn} onClick={handleResetStats}>
      <CoreContainer styles={ShowOwnStatsInnerContainer}>
        <p>Vis min statistikk</p>
        <ResetIcon width="40px" height="40px" />
      </CoreContainer>
    </CoreButton>
  );
};
