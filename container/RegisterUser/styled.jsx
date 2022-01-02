import styled, { css } from 'styled-components'
import { BGColor, PVColor, SECColor, SEGColor } from '../../public/colors'

export const Form = styled.form`
    display: flex;
    width: ${({ width }) => width || '500px'};
    margin: ${({ margin }) => margin || '50px auto'};
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: solid 1px #d4d7dc;
    border-radius: 8px;
    padding: 20px 30px;
    place-content: center;
    height: min-content;
    transition: opacity ease 300ms;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    margin: 0px auto 24px;
    width: 400px;
    padding: 32px 40px;
    background: rgb(255, 255, 255);
    border-radius: 3px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
    box-sizing: border-box;
    color: rgb(94, 108, 132);
    background-color: ${({ bgColor }) => bgColor || 'white'};
    @media only screen and (max-width: 960px) {
        
        float: none;
       
       
        
    }
`
export const Container = styled.div`
    place-content: center;
    display: grid;
    height: 100vh;
    z-index: 999;
    overflow: hidden;
    @media only screen and (max-width: 960px) {
       margin-top: -46px;
       
    }
`
export const DivInputs = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;        
`
export const Logo = styled.div`
    transition: 500ms;
    left: 35px;
    position: absolute;
    top: 15px;
    width: min-content;
    @media only screen and (max-width: 960px) {
        height: min-content;
        left: inherit;
        top: inherit;
        position: inherit;
        display: flex;
        justify-content: center;
        }
`

export const Text = styled.span` 
    font-size: ${({ size }) => size || '20px'};
    text-align: center;
    width: 100%;
    color: ${SEGColor} !important;
    margin: 5px 0px;
    font-family: PFont-Light;
    word-break: break-word;
`
export const ContentTerms = styled.div`
margin: 10px 0px 10px 0px;
`
export const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid #d4d7dc;
    display: inline-block;
    vertical-align: middle;
    margin: 10px 0px;
`
export const ImgTaken = styled.img`
    width: 100px;
    margin: auto;
    border: none;
    outline: none;
    height: 100px;
    object-fit: contain;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-bottom: 20px;
`
export const ContentInfo = styled.div`
    position: relative;
    width: min-content;
    margin: auto;
`
export const Anchor = styled.a`
    color: ${PVColor};
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    ${props => props.margin && css`
        margin: 10px 0px ;
    `}
`
export const Info = styled.span`
    top: -35px;
    font-family: PFont-Light;
    padding: 5px;
    font-size: 12px;
    overflow: hidden;
    width: 100px;
    border-radius: 5px;
    position: absolute;
    left: 23px;
    border: 1px solid #eee;
    z-index: -999;
    transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: ${BGColor};
    opacity: 0;
`
export const Tooltip = styled.div`
    top: -0px;
    width: min-content;
    position: absolute;
    right: -20px;
    &:hover >  ${Info}  {
        z-index: 9999;
        opacity: 1;
    }
`
export const InputDate = styled.input`
    outline: none;
    border: 1px solid #eee;
    padding: 20px ;
    width: 91.9%;
    border-radius: 5px;
    margin: auto;
    ${props => props.img && css`
        display: none;
    `}
`
export const FooterComponent = styled.footer`
    position: fixed;
    bottom: 0;
    height: 70px;
    display: flex;
    left: 0;
    align-items: center;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    z-index: 80;
    justify-content: center;
    background-color: ${SECColor};
`

export const ButtonSubmit = styled.button`
    background-color: ${ ({ color, theme }) => color === '1'
        ? ' #4065b4'
        : color === '2'
            ? `${ BGColor }`
            : theme.SFAColor };
    outline: none;
    border: none;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    font-family:  PFont-Regular;
    cursor: pointer;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: ${ ({ content }) => content ? content : 'space-between' };
    font-size: ${ ({ size }) => (size ? size : '1rem') };
    color: ${ ({ colorFont }) => (colorFont ? colorFont : `${ BGColor }`) };
    line-height: 1.5;
    border-radius: 0.3rem;
    text-align: center;
    width: 100%;
    margin: 10px 0px;
    ${ props => props.hoverColor &&
        css`
            &:hover {
                color: ${ BGColor };
                background-color:${ PColor };
            }
        ` };
    ${ props => props.colorPrimary &&
        css`
            {
                color: ${ BGColor };
                background-color:${ PColor };
            }
        ` };
`