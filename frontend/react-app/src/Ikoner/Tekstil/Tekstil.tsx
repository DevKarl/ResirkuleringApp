import tekstil from "./Tekstil.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Tekstil = ({height= "25px", width= "25px"}: any) => {

  return<img src={tekstil} alt="Logo" height={height} width={width} id="8"></img>
}