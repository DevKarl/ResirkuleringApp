import plast from "../../assets/avfall/Plast.png";
import glass from "../../assets/avfall/Glass.png";
import elektronikk from "../../assets/avfall/Elektronikk.png";
import farligAvfall from "../../assets/avfall/FarligAvfall.png";
import matavfall from "../../assets/avfall/Matavfall.png";
import papir from "../../assets/avfall/Papp.png";
import restavfall from "../../assets/avfall/Restavfall.png";
import tekstil from "../../assets/avfall/Tekstil.png";
import treverk from "../../assets/avfall/Treverk.png";
import metall from "../../assets/avfall/Metall.png";
import styled from "styled-components";

const iconMap: Record<number, string> = {
  1: plast,
  2: metall,
  3: restavfall,
  4: papir,
  5: glass,
  6: matavfall,
  7: elektronikk,
  8: tekstil,
  9: farligAvfall,
  10: treverk,
};

type IconProps = {
  id: number;
  height?: string;
  width?: string;
};

const IconWrapper = styled.img<{ height?: string; width?: string }>`
  height: ${(props) => props.height || "25px"};
  width: ${(props) => props.width || "25px"};
`;

export const AvfallsIcon = ({ id, height, width }: IconProps) => {
  const src = iconMap[id];
  if (!src) return null;

  return (
    <IconWrapper
      id={`icon-${id}`}
      src={src}
      alt="Ikon for avfall"
      height={height}
      width={width}
    />
  );
};
