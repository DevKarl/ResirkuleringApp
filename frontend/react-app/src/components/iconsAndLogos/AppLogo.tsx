import appLogo from "../../assets/other/AppLogo.png";

export const AppLogo = ({ height = "40px", width = "40px" }: any) => {
  return <img src={appLogo} alt="Logo" height={height} width={width}></img>;
};
