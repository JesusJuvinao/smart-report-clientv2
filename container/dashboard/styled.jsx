import styled, { css, keyframes } from 'styled-components'
import { StyleSheet } from '@react-pdf/renderer'
import { BColor, BGColor, EColor, ESFColor, PColor } from '../../public/colors'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 #12d4aaef;
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const WrapperButtonAction = styled.div`
  position: absolute;
  right: 0;
`
export const Wrapper = styled.div`
  padding: 1%;
`
export const Button = styled.button`
  border-bottom: 3px solid transparent;
  background-color: transparent;
  padding: ${({ padding }) => padding || '7px'};
  height: ${({ height }) => height || '50px'};
  font-family: PFont-Light;
  font-weight: 500;
  transition: 100ms;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: ${BColor};
  
  ${props => props.active && css`
  border-bottom: 3px solid ${PColor};
  font-weight: 400;
  ` }
  ${props => props.shadow && css`
    box-shadow: 0 2px 16px 0 rgb(0 0 0 / 10%);
    margin-right: 24px;
    transition: color .16s ease-in-out,
    background-color .16s ease-in-out,
    border-color .16s ease-in-out;
` }
`

export const WrapperFilter = styled.div`  
    margin-bottom: 30px;
    display: flex;
    width: 100%;
    height: min-content;
    border-bottom: 3px solid #f5f0eb;
`
export const Circle = styled.div` 
  border: 2px solid #12d4aaef;
  border-radius: 50%;
  height: 50px;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${props => props.pulse
    ? css`
    animation: ${pulse} 2s infinite;
  `
    : css`
  /* margin-left: -30px; */
  ` }
  ${props => props.active
    ? css`
    box-shadow: 0 0 0 10px #12d4aaef, 0 0 0 22px #12d4aa9e;
    `
    : css`
    box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
  /* margin-left: -30px; */
  ` }
`

export const OptionsFunction = styled.div`
    display: flex;
    position: absolute;
    background: ${BGColor};
    height: 200px;
    width: 200px;
    z-index: 999;
    right: 20px;
    grid-template-columns: auto;
    padding: 10px 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ${({ show }) => show
    ? css`
                 display: grid;
                 `
    : css`
        display: none;
              ` }
    @media only screen and (min-width: 960px){
    }
    border-radius: 10px;
    box-shadow: 0 10px 30px rgb(65 72 86 / 5%);
`
export const Current = styled.div`
  cursor: pointer;
 ${props => props.current && css`
      border-bottom: 3px solid ${PColor};
      font-weight: 400;
      background-color: ${BColor};
  ` }
`
export const Pagination = styled.div`
  background: #fdfdfd;
  padding: 1rem;
  margin: 3rem auto;
  display: flex;
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px 0 rgb(0 0 0 / 30%);
  counter-reset: pagination;
  text-align: center;
  overflow-x: auto;
  & > div {
    border: solid 1px #d7d7d7;
    margin: 0px 5px;
    border-radius: 0.2rem;
    color: #7d7d7d;
    text-decoration: none;
    width: 60px;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    padding: 0.5rem 0.9rem;
  
  }
`
export const ButtonPagination = styled.button`
    border-radius: 0.2rem;
    color: ${BGColor};
    text-decoration: none;
    width: 80px;
    display: inline-block;
    text-align: center;
    background-color: ${BColor};
    padding: 0.5rem 0.9rem;
`
export const ContentHead = styled.div`
  display: flex;
  flex-direction: row;
`
export const InputFilterNumber = styled.input`
  border: 1px solid #ccc;
  width: 50px;
  height: 40px;
  outline: none;
  `
const LinkPdf = styled.a`
  background-color: transparent;
`
export const LineItems = styled.div`
    margin: 0 auto;
    background-color: ${BGColor};
    width: 100%;
    display: grid;    
    grid-template-columns: repeat(minmax(100px, 1fr));
    transition: .5s ease;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: -134px;
    z-index: 99;
    background-color: red;
    height: ${({ height }) => height || 'auto'}px;
    margin: ${({ margin }) => margin || ' 1% auto'};
    box-shadow: 0px 0px 14px #00000017;
    `
export const Section = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x?.width} `) : '1fr'}; 
    height: auto;
    margin: 0 auto;
    border-bottom: 1px solid #f0f0f0;
    transition: .5s ease;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    align-items: center;
    margin: ${({ margin }) => margin || ' 1% auto'};
    box-shadow: 0px 0px 14px #00000017;
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    &:hover {
    box-shadow: 0 9px 47px 11px rgb(51 51 51 / 18%);
    }
    :hover {
        :first-child {
            background-color: #fff;
        }
    }
`
export const PageA4Format = styled.div`
  width: 20cm;
  height: 29.7cm;
  padding: 2cm;
  margin: 1cm auto;
  border: 1px #D3D3D3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
export const BoxArrow = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
`
export const InputHide = styled.input`
  display: block;
  opacity: 0;
  z-index: 99;
  top: 0;
  bottom: 0;
  position: absolute;
  zoom: 5;
  width: 100%;
  margin: auto;
`
export const ArrowsLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  user-select: none;
`
export const List = styled.div`
    transition: all 200ms ease-in-out;
    display: flex;
    margin-left: 0px;
    justify-content: center;
    width: min-content;
    align-items: center;
    font-size: 16px !important;
    font-family: PFont-Light;
  ${({ show }) => show
    ? css`
        margin-left: 20px;
        `
    : css`
          margin-left: 30px;
      ` }
    @media only screen and (min-width: 960px){
    }
`
export const Container = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${BGColor};
  padding: 30px;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
`
export const Avatar = styled.img`
    height: 4rem;
    width: 4rem;
    min-height: 4rem;
    max-height: 4rem;
    min-width: 4rem;
    max-width: 4rem;
    position: absolute;
    top: -28px;
    left: 10%;
    object-fit: contain;
    border-radius: 50%;
    background-color: ${PColor};
    border: 3px solid ${BGColor};
`
export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  width: 100%;
  margin: 0 auto;
  flex-direction: ${({ direction }) => direction || 'column'};
  width: ${({ width }) => width || '100%'};

`
export const WrapperRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33.33%, 1fr));
    ${({ margin }) => margin && css`margin: ${margin};`}


`
export const Card = styled.div`
  display: ${({ display }) => display || 'flex'};
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
  height: ${({ height }) => height || 'min-content'};
  width: ${({ width }) => width || 'auto'};
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'initial'};
  padding: ${({ padding }) => padding || ' 1%'};
  position: relative;
  ${({ radius }) => radius && css`border-radius: ${radius};`}
  transition: .5s ease;
  align-items: center;
  margin: ${({ margin }) => margin || ' 1% auto'};
  background-color: ${BGColor};
  box-shadow: 0px 0px 14px #00000017;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
  ${props => props.animation && css`
    &:hover {
      transform: scale(1.2); 
    }  
  ` }
`
export const CardPrimary = styled.div`
    background-color: ${({ bgColor }) => bgColor || BGColor};
    padding: ${({ padding }) => padding || '0'};
    display: ${({ display }) => display || 'flex'};
    flex-direction: ${({ direction }) => direction || 'column'};
    display: flex;
    border-radius: ${({ radius }) => radius || '0'};
    align-items: center;
    position: relative;
    width: 100%;
    
    `
export const Text = styled.span`
    font-weight: ${({ bold }) => bold || 'initial'};
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: ${({ display }) => display || 'flex'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ color }) => color && css`color: ${color};`}
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
    letter-spacing: 0.64px;
    margin-left: 12px;
`
// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: '30px'
  },
  title: {
    fontSize: '30px',
    padding: '30px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '25% repeat(auto-fill, 24%)'

  }
})
