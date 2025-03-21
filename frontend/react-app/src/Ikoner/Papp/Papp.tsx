import papp from "./Papp.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Papp = ({height= "25px", width= "25px"}: any) => {

  return<img src={papp} alt="Logo" height={height} width={width}></img>
}