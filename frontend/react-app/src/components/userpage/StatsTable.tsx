import styled, { css } from "styled-components";
import { CoreContainer } from "../core/CoreContainer";
import { CoinIcon } from "../iconsAndLogos/Points";
import { AvfallsIcon } from "../iconsAndLogos/AvfallsIcon";
import { ActiveUserStats } from "../../types/statTypes";

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

const PointsWrapper = css`
  gap: 0px;
`;

interface StatTableProps {
  activeUserStats: ActiveUserStats;
}

export const StatsTable = ({ activeUserStats }: StatTableProps) => {
  const getPoints = () =>
    activeUserStats?.builtStats?.reduce((sum, item) => sum + item.count, 0);

  return (
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
          {activeUserStats?.builtStats?.map((stat: any) => (
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
  );
};
