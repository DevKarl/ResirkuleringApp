import metall from "./Metall.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Metall = ({height= "25px", width= "25px"}: any) => {

  return<img src={metall} alt="Logo" height={height} width={width} id="2"></img>
}