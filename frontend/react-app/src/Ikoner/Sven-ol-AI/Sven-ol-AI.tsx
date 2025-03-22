import svenolai from "./Sven-ol-AI.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Svenolai = ({height= "50px", width= "50px"}: any) => {

  return<img src={svenolai} alt="Logo" height={height} width={width}></img>
}