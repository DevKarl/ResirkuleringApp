import restavfall from "./Restavfall.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Restavfall = ({height= "25px", width= "25px"}: any) => {

  return<img src={restavfall} alt="Logo" height={height} width={width}></img>
}