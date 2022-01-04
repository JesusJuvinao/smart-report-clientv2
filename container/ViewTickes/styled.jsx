import styled, { css } from 'styled-components'
import { PColor, SECColor, PVColor, PSColor, BGColor } from '../../public/colors'

export const CardWidgets = styled.div`
    flex: 0 0 24%;
    max-width: 24%;
    background-color: ${BGColor};
    border-radius: 5px;
    margin: 5px;
    height: auto;
`
export const Container = styled.div`
    min-width:500px;
    position: relative;
    z-index: 999;
    overflow: auto;
    background-color: #f0f0f5;
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    @media only screen and (max-width: 960px) {
       
    }
`
export const Content = styled.div`
    margin: auto;
    ${props => props.center && css`
    display: grid;
    place-content: center;
    `}
    ${({ padding }) => padding && css`padding: ${padding};`}
    padding: ${({ padding }) => padding || '20px 0px'};
    justify-content: ${({ justify }) => justify || 'center'};
    margin: auto;
    height: 100%;
    display: grid;
    place-content: center;
    border-right: 1px solid #cccccc7a;
    &:last-child {
        border-right: none;
    }
    `
    export const TableButton = styled.button`
    display:flex;
    padding:5px;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 10px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 4px;
    border:none;
    outline: none;
    color:${({ color }) => color === 1 ? '#1db9aa' : color === 2 ? 'red' : color || null};
    font-size: 12px;
    font-weight:bold;
    :hover{
        cursor:pointer;
    }
    `
    export const ContentTableItem = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    justify-content: center;
    align-items: baseline;
    width: 100%;
    /* height: 15px; */
    flex-wrap: nowrap;
    margin: 0px 0;
    padding: ${({ padding }) => padding || '0px 0px 0px 15px'};
    `
    export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ color }) => color && css`color: ${color};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
`