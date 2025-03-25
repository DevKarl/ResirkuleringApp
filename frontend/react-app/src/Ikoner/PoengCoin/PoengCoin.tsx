import poengcoin from "./PoengCoin.png"
import styled from "styled-components"

const Image = styled.img`

`

export const PoengCoin = ({height= "25px", width= "25px"}: any) => {

  return<img src={poengcoin} alt="Logo" height={height} width={width}></img>
}