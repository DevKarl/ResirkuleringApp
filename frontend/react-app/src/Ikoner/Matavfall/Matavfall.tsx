import matavfall from "./Matavfall.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Matavfall = ({height= "25px", width= "25px"}: any) => {

  return<img src={matavfall} alt="Logo" height={height} width={width} id="6"></img>
}