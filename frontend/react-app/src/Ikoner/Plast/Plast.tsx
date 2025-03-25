import plast from "./Plast.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Plast = ({height= "25px", width= "25px"}: any) => {

  return<img src={plast} alt="Logo" height={height} width={width} id="1"></img>
}