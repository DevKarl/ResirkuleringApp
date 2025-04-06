import { css } from "styled-components";
import { usePostActivateStatShare } from "../../hooks/API/usePostActivateStatShare";
import { usePostDeactivateStatShare } from "../../hooks/API/usePostDeactivateStatShare";
import { User } from "../../types";
import { CoreButton } from "../core/CoreButton";
import { CoreLoader } from "../core/CoreLoader";
import { ActiveUserStats } from "../../types/statTypes";

const disableStatBtn = css`
  background-color: ${({ theme }) => theme.colors.danger};
`;

interface StatShareBtnsInterface {
  mainUser: User;
  activeUserStats: ActiveUserStats;
}

export const StatShareBtns = ({
  mainUser,
  activeUserStats,
}: StatShareBtnsInterface) => {
  const { isLoading: activateStatShareLoading, postActivateStatShare } =
    usePostActivateStatShare();
  const { isLoading: deactivateStatShareLoading, postDeactivateStatShare } =
    usePostDeactivateStatShare();

  return (
    <>
      {mainUser?.delerStat ? (
        deactivateStatShareLoading ? (
          <CoreLoader />
        ) : (
          <CoreButton
            onClick={() => postDeactivateStatShare()}
            styles={disableStatBtn}
          >
            Skjul statistikk
          </CoreButton>
        )
      ) : activateStatShareLoading ? (
        <CoreLoader />
      ) : (
        <CoreButton onClick={() => postActivateStatShare()}>
          Publiser statistikk
        </CoreButton>
      )}
    </>
  );
};
