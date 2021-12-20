import styled from 'styled-components'
import { BColor } from '../../public/colors'

export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    text-align: center;
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
`
export const Container = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    padding: 30px;
    position: relative;
    height: 100vh;

`
export const Content = styled.div`
    position: relative;
    padding: 15px;
    min-width: 500px;
    overflow: hidden;
    overflow: hidden;
    width: 700px;
    margin: auto;
    justify-content: center;
    display: flex;
    flex-direction: column;

`
export const Title = styled.h1`
    hyphens: auto;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: border-box;
    margin: 0;
    color: ${BColor};
    font-family: "Poppins",sans-serif;
    font-weight: 700;
    font-size: 3rem;
    line-height: 1.26;
    margin-bottom: 1.5rem;
`
export const Form = styled.form`
    position: relative;
    padding: 15px;
    overflow: hidden;

`
export const Button = styled.button`
    position: relative;
    padding: 15px;
    overflow: hidden;
    cursor: pointer;
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: 'WorkSans-Bold','Helvetica','san-serif';
    font-size: 1em;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 16px 32px;
    border-radius: 8px;
    background-color: #0069ff;
    border: 1px solid #0069ff;
    color: #fff;
    transition: all 0.2s ease;
    align-self: flex-start;
    margin-right: 24px;
    width: 100%;
    box-shadow: 0 4px 0 rgb(91 105 135 / 20%);
    &:hover {
        border: 1px solid #c0c2d3;
    box-shadow: 0 2px 0 rgb(91 105 135 / 20%);
    }
`
