import { usePostActivateStatShare } from "../../hooks/API/usePostActivateStatShare";
import { usePostDeactivateStatShare } from "../../hooks/API/usePostDeactivateStatShare";
import { User } from "../../types";
import { CoreLoader } from "../core/CoreLoader";
import { ShareStatButton } from "./ShareStatBtn";
import { HideStatButton } from "./HideStatBtn";

interface StatShareBtnsInterface {
  mainUser: User;
}

export const StatShareBtns = ({ mainUser }: StatShareBtnsInterface) => {
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
          <HideStatButton
            postDeactivateStatShare={() => postDeactivateStatShare()}
          />
        )
      ) : activateStatShareLoading ? (
        <CoreLoader />
      ) : (
        <ShareStatButton
          postActivateStatShare={() => postActivateStatShare()}
        />
      )}
    </>
  );
};
