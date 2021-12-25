import styled, { keyframes, css } from 'styled-components';
import { BColor, BGColor, PColor, SECColor, PVColor  } from '../../public/colors';

export const Content = styled.div`
  background-color: rgb(249, 251, 253);
  padding: 30px;
`
export const Title = styled.h1`
  font-size: ${({ size }) => size || '12px'};
  color: ${BColor};
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    color:  ${({ color }) => color || BColor};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ overflow }) => overflow && css`overflow: ${overflow};`}
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
`
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
`
export const WrapperPdf = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    align-items: flex-start;
    justify-content: center;
    margin-top: 3cm;


`
export const DocumentFormatA4 = styled.div`
    width: 22cm;    
    /* min-height: 29.7cm; */
    min-height: 29.7cm;
    position: relative;
    padding: 2cm; 
    margin-right: 3cm;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

`
export const WrapperControls = styled.div`
    flex: 0 0 25%;
    max-width: 25%;
`
export const bounce = keyframes`
  0% {
    width: 70px;
    height: 40px;
  }

  50% {
    width: 70px;
    height: 40px;
    font-size: 22px;
  }

  100% {
    width: 70px;
    height: 40px;
  }
`;

export const animate = css`
  animation: ${bounce} 0.5s ease;
`;

export const flexCenter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

export const FooterInfoCard = styled.div`
    position: absolute;
    border-top: 1px solid #ccc;
    right: 0;
    bottom: 25px;
    padding: 10px;
    ${flexCenter}
`
export const CntTextArea = styled.div`
  height: 100px;
  overflow: auto;
  margin: 15px 0;
  max-height: 100px;
  padding: 20px;
  border: 3px dashed;
  min-height: 100px;
`
export const RowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);

`
export const Anchor = styled.a`
    display: flex;
    justify-content: center;

`
export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  ${({ display }) => display && css`display: ${display};`}
  ${({ direction }) => direction && css`flex-direction: ${direction};`}
  ${({ justify }) => justify && css`justify-content: ${justify};`}
`;
export const Row = styled.div`
    ${flexCenter}
`
export const CardInner = styled.div`
  background-color: rgb(249 249 249);
  border-radius: 10px;
`
export const Card = styled.div`
    height: 700px;
    position: relative;
    ${({ width }) => width && css`width: ${width};`}
    ${({ display }) => display && css`display: ${display};`}
    ${({ direction }) => direction && css`flex-direction: ${direction};`}
    border-radius: 8px;
    box-shadow: rgba(35, 68, 101, 0.05) 0px 4px 16px, rgba(35, 68, 101, 0.05) 0px 4px 4px;
    background-color: rgb(255, 255, 255);
    padding: 32px;
`;

export const Button = styled.button`
  width: auto;
  height: auto;
  border-radius: 5px;
  border: none;
  background-color: ${PColor};
  color: ${BColor};
  font-family: PFont-Light;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: flex-end;
  ${props => (props.animate ? animate : null)}
  &:focus {
    outline: none;
  }

  &:hover {
    background: #282828;
  }
`;
export const CardInvoice = styled.div`
    padding: 15px;
    color: gray;
    position: relative;
    margin: 5px;
    font-size: 12px;
    font-weight: 400;
    border: 1px solid rgb(206, 206, 206);
    box-shadow: 0 4px 0 rgb(91 105 135 / 20%);
    border-radius: .5rem;
    height: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: all 0.2s ease;
    width: 100%;
    &:hover {
      border: 1px solid #c0c2d3;
      box-shadow: 0 2px 0 rgb(91 105 135 / 20%);
    }
`

export const ContentInvoice = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    grid-template-columns: repeat(auto-fill,minmax(20%, 1fr));
    position: relative;
    /* overflow-y: auto; */
    /* height: ${({ height }) => height || '50vh'}; */
    /* min-height: ${({ height }) => height || '50vh'}; */
    /* max-height: ${({ height }) => height || '50vh'}; */
    @media only screen and (max-width: 960px){
      grid-template-columns: repeat(auto-fill,minmax(25%, 1fr));
    }
    @media only screen and (max-width: 768px){
      grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
    }
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
    right: 0;
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