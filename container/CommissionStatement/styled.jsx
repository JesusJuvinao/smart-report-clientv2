import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

export const Container = styled.div`
     width: 100%;
    background-color: #f8f8fa;
    max-width: 100%;
    min-width: 100%;
    overflow: hidden;
    padding: 30px;
`
export const WrapInvoice = styled.div`
    padding: 40px;
`
export const Options = styled.div`
    padding: 20px 0;
    justify-content: end;
    flex-direction: ${({ direction }) => direction || 'row'};
    display: flex;
    ${({ width }) => width && css`width: ${width};`}
    align-items: center;
    border-bottom: 1px solid #ccc;
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
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
    ${({ alignContent }) => alignContent && css`align-content: ${alignContent};`}
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    /* flex-flow: column; */
    width:${({ width }) => width || 'auto'};
    ${({ media }) => media && css`
        @media (max-width: 900px) {
            width: 47%;
            
        }
        
        ;`}
        `
export const Content = styled.div`
    padding: 20px 0px;
    margin: auto;
    ${props => props.center && css`
    display: grid;
    place-content: center;
    `}
    padding: 20px 0px;
    margin: auto;
    height: 100%;
    display: grid;
    place-content: center;
    border-right: 1px solid #cccccc7a;
    &:last-child {
        border-right: none;
    }
    `
export const ContentTableItem = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    justify-content: center;
    align-items: baseline;
    width: 100%;
    height: 15px;
    margin: 0px 0;
    padding: ${({ padding }) => padding || '0px 0px 0px 15px'};
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
export const ContainerStatements = styled.div`
    margin-bottom: 0.46428571em !important;
    position: relative;
    `
export const CardInvoice = styled.div`
width: 45%;
padding: 1%;
border-radius: 3px;
cursor: pointer;
transition: opacity .2s ease;
z-index: 0;
background: rgba(0,0,0,.015);
    border: 3px dashed rgba(0,0,0,.05);
    `
export const FooterInfo = styled.div`
    border-top: 3px solid rgba(0,0,0,.05);
    position: fixed;
    left: 0;
    background-color: ${BGColor};
    bottom: 0;
    display: flex;
    justify-content: space-between;
`

export const flexRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  `;
export const Row = styled.div`
    ${flexRow}
    ${({ width }) => width && css`width: ${width};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    flex-wrap: wrap;
    margin: ${({ margin }) => margin || '30px 0'};
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}
    `
export const flexCenter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${flexRow}
  `;