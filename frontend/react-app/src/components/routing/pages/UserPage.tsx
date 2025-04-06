import { AvfallsIcon } from "../../iconsAndLogos/AvfallsIcon";
import { useAppContext } from "../../../context/ContextProvider";
import { useEffect, useState } from "react";
import { CoreButton } from "../../core/CoreButton";
import { useGetMainUserStats } from "../../../hooks/API/useGetMainUserStats";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreSubheading } from "../../core/CoreSubheading";
import { countOccurrences } from "../../../utils/countOccurences";
import { iconMap } from "../../iconsAndLogos/AvfallsIcon";
import styled, { css } from "styled-components";
import { CoreLoader } from "../../core/CoreLoader";
import { CoinIcon } from "../../iconsAndLogos/Points";
import { SearchUsersModal } from "../../userpage/SearchUsersModal";
import { User } from "../../../types/userTypes";
import { Stat } from "../../../types/statTypes";
import { usePostActivateStatShare } from "../../../hooks/API/usePostActivateStatShare";
import { usePostDeactivateStatShare } from "../../../hooks/API/usePostDeactivateStatShare";

const MainContainerStyles = css`
  margin-bottom: 15px;
  max-width: 700px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-right: 20px;
  padding-left: 20px;
`;

const TopHeaderStyles = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px;
  font-family: ${({ theme }) => theme.fontFamily};
  border: 2px solid ${({ theme }) => theme.colors.green};
`;

const PointsText = styled.p`
  font-size: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.greenBright};
  color: ${({ theme }) => theme.colors.darkGrey};
  margin: 0;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.colors.greenWhite};
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: bold;
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.greenBright};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.greenWhite};
  }
`;

const StyledCaption = styled.caption`
  margin-bottom: 5px;
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-family: ${({ theme }) => theme.fontFamily};
`;

const TableData = styled.td`
  padding: 10px;
  font-size: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greenBright};
  color: ${({ theme }) => theme.colors.darkGrey};
`;
const disableStatBtn = css`
  background-color: ${({ theme }) => theme.colors.danger};
`;

const PointsWrapper = css`
  gap: 0px;
`;

const ShowOtherUsersBtn = css`
  margin-bottom: 15px;
`;

type BuiltStats = {
  id: number;
  name: string;
  count: number;
};

interface ActiveUserStats {
  builtStats: BuiltStats[];
  user: User;
}

export const UserPage = () => {
  const { user } = useAppContext();
  const {
    isLoading: mainUserLoading,
    mainUserStats,
    getMainUserStats,
  } = useGetMainUserStats();
  const { isLoading: activateStatShareLoading, postActivateStatShare } =
    usePostActivateStatShare();
  const { isLoading: deactivateStatShareLoading, postDeactivateStatShare } =
    usePostDeactivateStatShare();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeUserStats, setActiveUserStats] = useState<ActiveUserStats>({
    builtStats: [],
    user: null,
  });

  useEffect(() => {
    getMainUserStats();
  }, []);

  useEffect(() => {
    setActiveUserStats(getBuiltActiveUserStats(mainUserStats, user));
  }, [mainUserStats, user]);

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

  console.log({ activeUserStats });

  const handleChangeActiveUserStats = (stats: Stat[], user: User) => {
    setActiveUserStats(getBuiltActiveUserStats(stats, user));
  };

  const getPoints = () =>
    activeUserStats?.builtStats?.reduce((sum, item) => sum + item.count, 0);

  const toggleModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const handleResetStats = () => {
    setActiveUserStats(getBuiltActiveUserStats(mainUserStats, user));
  };

  return (
    <CoreContainer styles={MainContainerStyles}>
      <CoreHeading>Min Side</CoreHeading>
      {activeUserStats?.user && (
        <CoreSubheading>{`${activeUserStats?.user?.fornavn} ${activeUserStats?.user?.etternavn}`}</CoreSubheading>
      )}
      {mainUserLoading ? (
        <CoreLoader />
      ) : (
        <>
          <CoreContainer>
            <CoreContainer styles={PointsWrapper}>
              <PointsText>Poeng</PointsText>
              <CoinIcon points={getPoints()} />
            </CoreContainer>
          </CoreContainer>
          <StyledTable>
            <StyledCaption>Statistikk over all avfall hivd</StyledCaption>
            <thead>
              <tr>
                <TableHeader></TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Antall</TableHeader>
              </tr>
            </thead>
            <tbody>
              {activeUserStats?.builtStats?.map((stat) => (
                <TableRow key={stat.id}>
                  <TableData>
                    <AvfallsIcon id={stat.id} width="30px" height="30px" />
                  </TableData>
                  <TableData>{stat.name}</TableData>
                  <TableData>{stat.count}</TableData>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
      {user?.id === activeUserStats?.user?.id ? (
        <CoreButton styles={ShowOtherUsersBtn} onClick={toggleModal}>
          Vis andre brukere
        </CoreButton>
      ) : (
        <CoreButton onClick={handleResetStats}>Vis min statistikk</CoreButton>
      )}
      {user?.delerStat ? (
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
      {searchModalOpen && (
        <SearchUsersModal
          toggleModal={toggleModal}
          mainUser={user}
          handleChangeActiveUserStats={handleChangeActiveUserStats}
          setSearchModalOpen={setSearchModalOpen}
        />
      )}
    </CoreContainer>
  );
};
