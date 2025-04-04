import { AvfallsIcon } from "../../iconsAndLogos/AvfallsIcon";
import { useAppContext } from "../../../context/ContextProvider";
import { useEffect, useState } from "react";
import { CoreButton } from "../../core/CoreButton";
import { useGetStats } from "../../../hooks/API/useGetStats";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreSubheading } from "../../core/CoreSubheading";
import { countOccurrences } from "../../../utils/countOccurences";
import { iconMap } from "../../iconsAndLogos/AvfallsIcon";
import styled, { css } from "styled-components";
import { CoreLoader } from "../../core/CoreLoader";
import { CoinIcon } from "../../iconsAndLogos/Points";
import { CoreModal } from "../../core/CoreModal";
import { SearchUsersModal } from "../../userpage/SearchUsersModal";

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

const InfoText = styled.p`
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-family: ${({ theme }) => theme.fontFamily};
`;

const TableData = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greenBright};
  color: ${({ theme }) => theme.colors.darkGrey};
`;
const disableStatBtn = css`
  background-color: ${({ theme }) => theme.colors.danger};
`;

export const UserPage = () => {
  const { user } = useAppContext();
  const { isLoading: statsLoading, data: stats, getStats } = useGetStats();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    getStats();
  }, []);

  const typeOccurences = countOccurrences(
    stats,
    (stat) => stat.avfall.avfallsType.id
  );

  const tableStats = Object.entries(iconMap).map(([id, src]) => ({
    id: id,
    name: src.split("/").pop()?.split(".")[0] ?? "Ukjent",
    count: typeOccurences[id] ?? 0,
  }));

  const getPoints = () => tableStats.reduce((sum, item) => sum + item.count, 0);

  const toggleModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const handleEnableStatShare = () => {};

  const handleDisableStatShare = () => {};

  return (
    <CoreContainer styles={MainContainerStyles}>
      <CoreHeading>Min Side</CoreHeading>
      {user && (
        <CoreContainer styles={TopHeaderStyles}>
          <CoreSubheading>{`${user?.fornavn} ${user?.etternavn}`}</CoreSubheading>
          <CoreContainer>
            <CoreSubheading>Poeng</CoreSubheading>
            <CoinIcon points={getPoints()} />
          </CoreContainer>
        </CoreContainer>
      )}
      {statsLoading ? (
        <CoreLoader />
      ) : (
        <>
          <InfoText>
            Din statistikk over antall avfall hivd for alle avfallstyper
          </InfoText>
          <CoreButton onClick={toggleModal}>Søk etter andre brukere</CoreButton>
          <StyledTable>
            <thead>
              <tr>
                <TableHeader></TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Antall</TableHeader>
              </tr>
            </thead>
            <tbody>
              {tableStats?.map((stat) => (
                <TableRow key={stat.id}>
                  <TableData>
                    <AvfallsIcon id={stat.id} />
                  </TableData>
                  <TableData>{stat.name}</TableData>
                  <TableData>{stat.count}</TableData>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
      {user?.delerStat ? (
        <CoreButton onClick={handleEnableStatShare} styles={disableStatBtn}>
          Skjul statistikk
        </CoreButton>
      ) : (
        <CoreButton onClick={handleDisableStatShare}>
          Publiser statistikk
        </CoreButton>
      )}
      {searchModalOpen && <SearchUsersModal toggleModal={toggleModal} />}
    </CoreContainer>
  );
};
