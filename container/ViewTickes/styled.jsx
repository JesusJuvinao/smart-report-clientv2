import styled, { css } from 'styled-components'
import { PColor, SECColor, PVColor, PSColor, BGColor } from '../../public/colors'

export const Container = styled.div`
    min-width:500px;
    height: 100vh;
    position: relative;
    z-index: 999;
    overflow: hidden;
    @media only screen and (max-width: 960px) {
       margin-top: -46px;
       
    }
`