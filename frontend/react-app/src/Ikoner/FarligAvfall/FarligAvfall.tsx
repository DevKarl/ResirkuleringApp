import farligavfall from "./FarligAvfall.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Farligavfall = ({height= "25px", width= "25px"}: any) => {

  return<img src={farligavfall} alt="Logo" height={height} width={width} id="9"></img>
}