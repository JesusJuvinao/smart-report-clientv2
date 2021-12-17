import styled, { keyframes, css } from 'styled-components';
import { BColor, PColor, SECColor } from '../../public/colors';

export const Content = styled.div`
  padding: 30px;
`
export const Text = styled.span`
  font-size: 12px;
  font-family: PFont-Regular;
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
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 400px;
  ${flexCenter}
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
