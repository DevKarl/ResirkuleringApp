import treverk from "./Treverk.png"
import styled from "styled-components"

const Image = styled.img`

`

export const Treverk = ({height= "25px", width= "25px"}: any) => {

  return<img src={treverk} alt="Logo" height={height} width={width}></img>
}