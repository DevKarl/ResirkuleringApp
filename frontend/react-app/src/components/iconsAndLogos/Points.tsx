import styled from "styled-components";
import pointsIcon from "../../assets/other/PoengCoin.png";

type CoinIconProps = {
  height?: string;
  width?: string;
  points?: number;
};

const CoinContainer = styled.div<{ height: string; width: string }>`
  position: relative;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  display: inline-block;
`;

const IconWrapper = styled.img`
  height: 100%;
  width: 100%;
  display: block;
`;

const PointsOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: bold;
  font-size: 25px;
  z-index: 2;
  pointer-events: none;
  margin-top: 2px;
`;

export const CoinIcon = ({
  height = "60px",
  width = "60px",
  points,
}: CoinIconProps) => {
  return (
    <CoinContainer height={height} width={width}>
      <IconWrapper src={pointsIcon} alt="Poeng Ikon" />
      {points !== undefined && <PointsOverlay>{points}</PointsOverlay>}
    </CoinContainer>
  );
};
