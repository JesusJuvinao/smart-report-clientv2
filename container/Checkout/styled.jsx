import styled, { css } from 'styled-components'
import Link from 'next/link'
import { PVColor, PColor, BGColor, SECColor } from '../../public/colors'
import { FadeOup } from '../../components/animations';

export const Container = styled.div`
    position: relative;
    height: 100vh;
    // display: grid;
    flex: 1 1 auto;
    justify-content: center;
    // grid-template-columns: 50% repeat(auto-fill, 50%);
`;
export const Section = styled.section`
    background-color: #f6f9fc;
    min-height: 500px;
`;
export const Navigation = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px 0 80px 0;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
`;
export const PayMethod = styled.section`
    margin: 70px auto;
    display: flex;
    text-align: left;
    min-width: 1000px;
    max-width: 1000px;
    width: 1000px;
`;

export const ContentCarPrice = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* height: 70vh; */
    @media (max-width: 900px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`
export const Card = styled.div`
    text-align: start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 1.5rem .625rem 0;
    border: none;
    padding: 20px 20px;
    background-color: #FFFFFF;
    min-width: auto;
    max-width: 16.5625rem;
    min-height: auto;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);
    align-content: flex-start;
    max-width: 800px;
    min-height: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -200px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
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
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
    color: ${({ color }) => color};

`
export const ModuleInfo = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${BGColor};
    z-index: 1300;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    ${({ show }) => show
        ? css`
                opacity: 1;
                animation: ${FadeOup} 333ms cubic-bezier(.35,0,.5,1) backwards;
                `
        : css`
                
                visibility: hidden;
                margin: 0;
                opacity: 0;
                transform: translateY(-11px);
              `}
`
export const Module = styled.div`
    padding: 2.375rem .625rem 0 2.5rem;
    & ul {
        padding: 0 0 0 1.25rem!important;
        margin: 0;
        list-style-type: disc;
    
    }
    & li {
        font-size: .9rem;
        line-height: 1.5;

        margin: 0.75rem 0;
        font-family: PFont-Light;
    
    }
`