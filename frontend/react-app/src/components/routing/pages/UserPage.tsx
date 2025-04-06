import { useAppContext } from "../../../context/ContextProvider";
import { useEffect, useState } from "react";
import { CoreButton } from "../../core/CoreButton";
import { useGetMainUserStats } from "../../../hooks/API/useGetMainUserStats";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreSubheading } from "../../core/CoreSubheading";
import { countOccurrences } from "../../../utils/countOccurences";
import { iconMap } from "../../iconsAndLogos/AvfallsIcon";
import { css } from "styled-components";
import { CoreLoader } from "../../core/CoreLoader";
import { SearchUsersModal } from "../../userpage/SearchUsersModal";
import { User } from "../../../types/userTypes";
import { ActiveUserStats, Stat } from "../../../types/statTypes";
import { toast } from "sonner";
import { StatsTable } from "../../userpage/StatsTable";
import { StatShareBtns } from "../../userpage/StatShareBtns";
import { ShowOwnStatsButton } from "../../userpage/ShowOwnStatsBtn";
import { SearchUsersButton } from "../../userpage/SearchUsersBtn";

const MainContainerStyles = css`
  margin-bottom: 15px;
  max-width: 700px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-right: 20px;
  padding-left: 20px;
`;

const BtnStyles = css`
  margin-bottom: 15px;
`;

export const UserPage = () => {
  const { user: mainUser } = useAppContext();
  const {
    isLoading: mainUserLoading,
    mainUserStats,
    getMainUserStats,
  } = useGetMainUserStats();
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [activeUserStats, setActiveUserStats] = useState<ActiveUserStats>({
    builtStats: [],
    user: null,
  });

  useEffect(() => {
    getMainUserStats();
  }, []);

  useEffect(() => {
    setActiveUserStats(getBuiltActiveUserStats(mainUserStats, mainUser));
  }, [mainUserStats, mainUser]);

  const getBuiltActiveUserStats = (
    stats: Stat[],
    user: User
  ): ActiveUserStats => {
    const typeOccurences = countOccurrences(
      stats,
      (stat): Stat => stat.avfall.avfallsType.id
    );
    const builtStats = Object.entries(iconMap).map(([id, src]) => ({
      id: Number(id),
      name: src.split("/").pop()?.split(".")[0] ?? "Ukjent",
      count: typeOccurences[id] ?? 0,
    }));
    return { builtStats, user };
  };

  const handleChangeActiveUserStats = (stats: Stat[], user: User) => {
    setActiveUserStats(getBuiltActiveUserStats(stats, user));
    toast.info(
      "Du ser nå statistikken til " + user?.fornavn + " " + user?.etternavn
    );
  };

  const toggleModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const handleResetStats = () => {
    setActiveUserStats(getBuiltActiveUserStats(mainUserStats, mainUser));
    toast.info("Viser nå egen statistikk");
  };

  const activeUserIsMainUser = () => mainUser?.id === activeUserStats?.user?.id;

  return (
    <CoreContainer styles={MainContainerStyles}>
      <CoreHeading>Min Side</CoreHeading>
      {activeUserStats?.user && (
        <>
          <CoreSubheading>{`${activeUserStats?.user?.fornavn} ${activeUserStats?.user?.etternavn}`}</CoreSubheading>
        </>
      )}
      {mainUserLoading ? (
        <CoreLoader />
      ) : (
        <StatsTable activeUserStats={activeUserStats} />
      )}
      {!activeUserIsMainUser() && (
        <ShowOwnStatsButton handleResetStats={handleResetStats} />
      )}
      <SearchUsersButton onClick={toggleModal} />
      {activeUserIsMainUser() && <StatShareBtns mainUser={mainUser} />}
      {searchModalOpen && (
        <SearchUsersModal
          toggleModal={toggleModal}
          mainUser={mainUser}
          handleChangeActiveUserStats={handleChangeActiveUserStats}
          setSearchModalOpen={setSearchModalOpen}
        />
      )}
    </CoreContainer>
  );
};
