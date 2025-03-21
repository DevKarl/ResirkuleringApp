import styled from "styled-components"
import appLogo from "./AppLogo.png"

const Image = styled.img`

`

export const AppLogo = ({height = "50px", width="50px"}: any) => {

  return<img src={appLogo} alt="Logo" height={height} width={width}></img>
}