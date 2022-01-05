import styled, { css } from 'styled-components'
import Link from 'next/link'
import { PVColor, PColor, BGColor, SECColor } from '../../public/colors'
import { FadeOup } from '../../components/animations'
export const Container = styled.div`
`

export const Card = styled.div`
    display: ${({ display }) => display || 'flex'};
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: ${({ justify }) => justify || 'space-between'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    margin: ${({ margin }) => margin || '30px 0px 0px 0px'};
    border: ${({ border }) => border || 'none'};
    padding: ${({ padding }) => padding || '0'};
    background-color: ${({ bgColor }) => bgColor || BGColor};
    min-width:${({ minWidth }) => minWidth || 'auto'};
    max-width:${({ maxWidth }) => maxWidth || 'auto'};
    min-height:${({ minHeight }) => minHeight || 'auto'};
    height:${({ height }) => height || 'auto'};
    ${({ shadow }) => shadow && css`box-shadow: ${shadow};`}
    ${({ overflow }) => overflow && css`overflow: ${overflow};`}
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    ${({ alignContent }) => alignContent && css`align-content: ${alignContent};`}
`
