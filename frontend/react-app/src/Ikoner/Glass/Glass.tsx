import glass from "./Glass.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Glass = ({height= "25px", width= "25px"}: any) => {

  return<img src={glass} alt="Logo" height={height} width={width} id="5"></img>
}