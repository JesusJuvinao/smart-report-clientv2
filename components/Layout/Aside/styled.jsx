import styled, { css } from 'styled-components'
import { BGColor, SFVColor } from '../../../public/colors'

export const ContainerAside = styled.div`
    transition: 300ms ease;
    background-color: #393a3d;
    height: min-content;
    margin-bottom: 20px;
    @media (max-width: 768px){ 
        z-index: 999;
        height: 100%;
        width: 80%;
        position: absolute;
        ${ ({ collapsed }) => collapsed
            ? css`
            transform: translate(0px, 0px);
            `
            : css`
            transform: translate(-800px, 0px);
              ` }
    }
`
export const LeftNav = styled.div`
    display: grid;
    grid-template-columns: 30% repeat(auto-fill, 30%);
    position: absolute;
    background-color: ${BGColor};
    transition: all 200ms ease 0s;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: 999;
    border-radius: 5px;
    overflow: hidden;
    width: 400px;
    place-content: center;
    gap: 10px;
    height: 120px;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 50px;
    left: 12px;
    @media (max-width: 768px){ 
        left: 0;
        top: 40.988px;
        width: 100%;
        right: 0;
        margin: auto;
    }
    ${({ show }) => show
        ? css`
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
                `
        : css`
                
            margin: 0;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-50px);
    `}
`
export const ButtonGlobalCreate = styled.button`
    border-radius: 20px;
    position: relative;
    min-width: 100px;
    width: 90%;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    border: 2px solid ${BGColor};
    color: ${BGColor};
    height: 30px;
    font-size: 12px;
    cursor: pointer;
    margin: 10px auto;
    transition: 0.2s;
    background-color: transparent; 
    &:hover {
        box-shadow: rgb(255 255 255) 0px 0px 0px 2px;
    }
    &:active{
        transform: scale(0.9);
    }
`
export const Info = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    
`
export const ContentOption = styled.div`
    min-height: 150px;
`
export const Anchor = styled.a`
    padding: 0px;
    display: flex;
    font-family: PFont-Regular;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;    
    display: block;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.2em;
    margin: 0;
    font-size: 13px;
`

// export const Anchor = styled.a`
//     font-size: 12px;
// `
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms ease;
    height: 100vw;
`
