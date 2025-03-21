import recycle from "./Recycle.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Recycle = ({height= "25px", width= "25px"}: any) => {

  return<img src={recycle} alt="Logo" height={height} width={width}></img>
}