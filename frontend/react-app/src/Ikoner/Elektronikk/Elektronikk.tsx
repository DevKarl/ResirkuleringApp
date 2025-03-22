import elektronikk from "./Elektronikk.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Elektronikk = ({height= "25px", width= "25px"}: any) => {

  return<img src={elektronikk} alt="Logo" height={height} width={width} id="7"></img>
}