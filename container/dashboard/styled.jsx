import styled, { css, keyframes } from 'styled-components'
import { StyleSheet } from '@react-pdf/renderer'
import { BColor, BGColor, EColor, ESFColor, PColor, SECColor, PVColor, TBGSColor } from '../../public/colors'
import { fadeIn, fadeOut } from '../../components/AlertBox/styled'

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
`
export const Toolbar = styled.div`
    position: relative;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background-color: #0069ff;
`
export const Options = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: space-between;
  ${props => props.justify && css`
      width: 50%;
      align-items: flex-end;
  `}
`
export const Wrapper = styled.div`
  border-left: 1px dotted #00000017;
  padding: 5px;
  align-items: center;
  position: relative;
`
export const Button = styled.button`
  background-color: transparent;
  padding: ${({ padding }) => padding || '7px'};
  height: ${({ height }) => height || '50px'};
  font-family: PFont-Light;
  transition: 100ms;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: ${BColor};
  font-size: ${({ size }) => size || '1.1em'};
  ${props => props.active && css`
    border-bottom: 3px solid ${PColor};
    font-weight: 400;
    border: 1px solid #ccc;
  ` }
  ${props => props.border && css`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
  `}
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
  ` }
  ${props => props.active
    ? css`
    box-shadow: 0 0 0 10px #12d4aaef, 0 0 0 22px #12d4aa9e;
    `
    : css`
    box-shadow: 0 0 0 5px #ebeef3, 0 0 0 10px #f3f4f6;
  ` }
`
export const CheckAnimation = styled.div`
 .success-checkmark {
    width: 50px;
    height: 40px;
    margin: 0 auto;
    
    .check-icon {
        width: 40px;
        height: 40px;
        position: relative;
        border-radius: 50%;
        box-sizing: content-box;
        border: 4px solid #4CAF50;
        
        &::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
        }
        
        &::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
        }
        
        &::before, &::after {
            content: '';
            height: 100px;
            position: absolute;
            transform: rotate(-45deg);
        }
        
        .icon-line {
            height: 5px;
            background-color: #4CAF50;
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
            
            &.line-tip {
                top: 46px;
                left: 14px;
                width: 25px;
                transform: rotate(45deg);
                animation: icon-line-tip 0.75s;
            }
            
            &.line-long {
                top: 38px;
                right: 8px;
                width: 47px;
                transform: rotate(-45deg);
                animation: icon-line-long 0.75s;
            }
        }
        
        .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid rgba(76, 175, 80, .5);
        }
        
        .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
        }
    }
}

@keyframes rotate-circle {
    0% {
        transform: rotate(-45deg);
    }
    5% {
        transform: rotate(-45deg);
    }
    12% {
        transform: rotate(-405deg);
    }
    100% {
        transform: rotate(-405deg);
    }
}

@keyframes icon-line-tip {
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }
    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }
    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
}

@keyframes icon-line-long {
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }
    100% {
        width: 47px;
        right: 8px;
        top: 38px;
    }
}
`
export const Clip = styled.div`
  .chip{
    display: inline-flex;
    flex-direction: row;
    border: none;
    cursor: pointer;
    height: 30px;
    align-items: center;
    border-radius: 16px;
    /* ${props => props.activebg ? css`
      background-color: rgba(15, 183, 107,0.12) !important;
      ` : css`
      background-color: rgba(242, 17, 54,0.12) !important;
    
    `} */
    vertical-align: middle;
    text-decoration: none;
    justify-content: center;
}
`

export const ChipHead = styled.div`
  transition: 1s ease;
`
export const PaymentStatus = styled.div` 
  height: 15px;
  text-align: center;
  display: flex;
  place-content: center;
  ${props => props.active
    ? css`
        color #12d4aa7d;
        `
    : css`
    color ${BColor};
  ` }
`
export const CircleCompany = styled.div` 
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
  ` }
`

export const BlueButton = styled.button`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: 'WorkSans-Bold','Helvetica','san-serif';
    font-size: 1em;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    background-color: #0069ff;
    border: 1px solid #0069ff;
    color: #fff;
    transition: all 0.2s ease;
    align-self: flex-start;
    margin-right: 24px;
    width: auto;
    display: flex;
    justify-content: center;
`
export const OptionsFunction = styled.div`
    display: flex;
    position: absolute;
    background: ${BGColor};
    height: 200px;
    z-index: 999;
    width: 200px;
    right: 130px;
    grid-template-columns: auto;
    padding: 10px 0;
    top: 60px;
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
export const ContainerInfo = styled.div`

  border-top: 5px solid ${PVColor};
  padding: 40px;
`
export const ContentModal = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    grid-template-columns: repeat(auto-fill,minmax(20%, 1fr));
    position: relative;
    ${({ overflow }) => overflow && css`overflow: ${overflow};`}
    height: ${({ height }) => height || '50vh'};
    min-height: ${({ height }) => height || '50vh'};
    max-height: ${({ height }) => height || '50vh'};
    @media only screen and (max-width: 960px){
      grid-template-columns: repeat(auto-fill,minmax(25%, 1fr));
    }
    @media only screen and (max-width: 768px){
      grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
    }
    ${props => props.showInvoice && css`
        grid-template-columns: repeat(auto-fill,minmax(25%, 1fr));
    `}
`
export const ButtonAdd = styled.button`
    position: absolute;
    right: 0;
    top: 0px;
    border-radius: 10px 10px 10px 200px;
    width: 60px;
    height: 45px;
    margin: 0;
    overflow: hidden;
    border: none;
    line-height: 1.75;
    text-transform: uppercase;
    transition: background-color 0.3s;
    cursor: pointer;
    padding: .5em;
    font-size: 12px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    font-family: PFont-Light;
    position: absolute;
    right: 0;
    top: 0px;
    border-radius: 10px 10px 10px 200px;
    width: 60px;
    height: 45px;
`
export const HeaderModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
    & > #line {
    line-height: 1.5;
    font-family: "Inter", sans-serif;
    font-weight: inherit;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: .1em;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #d2d6dc;
    background-color: rgba(63,131,248);
    display: block;
    margin-top: 1rem;
    width: 4rem;
    height: 1.5px;
    position: absolute;
    margin-top: 30px;
    }
`
export const Tooltip = styled.div`
    cursor: pointer;
    height: auto;
    width: 100px;
    background-color: ${BGColor};
    transition: all 200ms ease-in-out;
    padding: 5px;
    box-shadow: rgba(10, 10, 10, 0.445) 0px 4px 12px;
    position: absolute;
    margin: 0;
    right: 135px;
    visibility: hidden;
    z-index: 999; 
    opacity: 0;
    &:hover {
          background-color: rgb(44, 160, 28);
          color: ${BGColor};
    }
`
export const ButtonContentT = styled.div`
  position: relative;
  &:hover > ${Tooltip} {
      visibility: visible;
      opacity: 1;
      transform: translateY(-35px);
  }
`

export const CtnInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  ${props => props.border && css`
  border-top: 1px solid #33282830;
  `}
`
export const WrapperInnerInvoiceTo = styled.div`
  /* border: 1px solid rgb(206, 206, 206); */
`
export const CardInvoice = styled.div`
    padding: 15px;
    color: gray;
    position: relative;
    margin: 5px;
    font-size: 12px;
    font-weight: 400;
    ${props => !props.showInvoice && css`
         border: 1px solid rgb(206, 206, 206);
         box-shadow: 0 4px 0 rgb(91 105 135 / 20%);
        &:hover {
          border: 1px solid #c0c2d3;
          box-shadow: 0 2px 0 rgb(91 105 135 / 20%);
        }
    `}
    border-radius: .5rem;
    height: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: all 0.2s ease;
    width: 100%;
    max-width: 100%;
    
    ${({ height }) => height && css`height: ${height};`}
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
    background-color: red;
    height: ${({ height }) => height || 'auto'}px;
    margin: ${({ margin }) => margin || ' .5% auto'};
    box-shadow: 0px 0px 14px #00000017;
    `
export const Section = styled.div`
     display: grid;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x?.width} `) : '1fr'}; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    border-bottom: 1px solid #f0f0f0;
    background-color: #8e8e8e5e;
    /* background-color: ${({ bgRow }) => bgRow === 1 ? `${TBGAColor}` : bgRow === 2 ? `${TBGVColor}` : bgRow === 3 ? `${TBGBColor}` : bgRow === 4 ? `${TBGSColor}` : bgRow === 5 ? TBGAColor : bgRow === 6 ? TBGEColor : bgRow === 7 ? TBGRColor : bgRow === 8 && TBGDColor}; */
    :hover {
        background-color: rgba(0,0,0,.075);
        :first-child {
            background-color: #ccc;
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
  flex-wrap: wrap;
  margin-top: 30px;
  display: flex;
  width: 95%;
  @media (max-width: 769px) {
    flex-direction: ${({ direction }) => direction || 'column'};
  }
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
  @media only screen and (max-width: 769px){
    width: ${({ widthMovil }) => widthMovil || '100%'};
  }

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
  ${({ overflow }) => overflow && css`overflow: ${overflow};`}
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
export const ContentListInvoice = styled.div`
  padding: 30px;
  margin-top: 40px;
`
export const FilterOptions = styled.div`
    box-sizing: border-box;
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    z-index: 2;
    width: calc(100% + 40px);
    padding: 25px 20px 10px 20px;
    margin: -20px -20px 0 -20px;
    position: sticky;
    margin-bottom: 30px;
    top: 0px;
    margin-top: -30px;
`
export const Toast = styled.div`
    animation: ${({ open }) => open && (open ? fadeIn : fadeOut)} 1s forwards;
    height: 89px;
    top: -50%;
    background-color: #50a773;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    align-items: center;
    width: 100%;
    margin: auto;
    padding: 30px;
    z-index: 999999999;
    transition: 400ms;
    box-shadow: 0px 0px 6px #00000052;
    color: ${BGColor};
`
export const DownLoadButton = styled.button`
    box-sizing: border-box;
    margin: 0;
    width: 200px;
    overflow: visible;
    text-transform: none;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid hsla(0,0%,100%,.9);
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
    font-size: 13px;
    transition: all;
    transition-duration: .3s;
    margin-left: 10px;
`
export const Text = styled.span`
    font-weight: ${({ bold }) => bold || 'initial'};
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || '0'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: ${({ display }) => display || 'flex'};
    white-space: ${({ wrap }) => wrap || 'nowrap'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ color }) => color && css`color: ${color};`}
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    overflow: hidden;
    text-overflow: ellipsis;
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

export const ButtonTheme = styled.div`
    width: 65px;
    min-width: 65px;
    cursor: pointer;
    height: 24px;
    background-color: ${SECColor};
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
export const SwitchButton = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    position: absolute;
    ${({ active }) => active && css`left: ${active};`}
    transition: .3s ease;
`
export const ContentToggle = styled.div`
    align-items: center;
    display: flex;
    width: min-;
    justify-content: center;
`