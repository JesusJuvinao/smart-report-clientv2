import styled, { css } from 'styled-components'

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
    margin: auto;
    min-width: 600px;
    width: auto;
    align-self: center;
    height: 100vh;
    display: grid;
    place-content: center;
`
export const Content = styled.div`
    position: relative;
    padding: 15px;
    display: grid;
    grid-template-columns: auto 445px;
    grid-template-rows: initial;
    position: relative;
    overflow: hidden;
    height: min-content;
    max-width: 1200px;
    justify-content: center;
    display: flex;
    margin: auto;
    place-content: center;
`
export const Button = styled.button`
    position: relative;
    padding: 15px;
    overflow: hidden;

`
export const DynamicCards = styled.div`
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    margin: 0px;
    padding: 0px;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: SulSans, Helvetica, sans-serif;
    display: grid;
    -webkit-box-align: center;
    align-items: center;
    grid-template-columns: repeat(2, 350px);
    transition: all 150ms ease-in-out 0s;
`
export const Separator = styled.div`
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    margin: 0px;
    padding: 0px;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: SulSans, Helvetica, sans-serif;
    display: initial;
    background: rgb(255, 255, 255);
    z-index: 1;
    height: 250px;
`
export const DynamicCardWrapper = styled.div`
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: SulSans, Helvetica, sans-serif;
    width: initial;
    display: grid;
    grid-template-columns: 50px 345px 50px;
    align-content: center;
`
export const CardContainer = styled.div`
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    margin: 0px;
    padding: 0px;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: SulSans, Helvetica, sans-serif;
    display: grid;
    grid-template-rows: 230px auto;
    row-gap: 20px;
    align-content: center;
    transition: all 350ms ease-in-out 0s;
    -webkit-box-align: center;
    align-items: center;
`
export const CardTarget = styled.div`
    padding-top: 26px;
    transform-style: preserve-3d;
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    user-select: none;
    padding: 0px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 10px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwOCIgdmlld0JveD0iMCAwIDMzNSAyMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjMzNSIgaGVpZ2h0PSIyMDgiPgo8cmVjdCB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwOCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMCkiPgo8cmVjdCB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwOCIgcng9IjEwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMjcwLjc2OSIgaGVpZ2h0PSI2OTguMTk3IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjgzODg1OSAwLjU0NDM0OCAtMC40NDg4NTcgMC44OTM2MDQgMzUxLjM5MSAtMjE0LjgyKSIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjE2OCIgeTE9IjI2NS45NjciIHgyPSIzNTYuNzc1IiB5Mj0iLTI2LjkzNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMzIzNDEiIHN0b3AtY29sb3I9IiNFQTFEMkMiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkUzNzQ2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhciIgeDE9IjI5Ljk4NDEiIHkxPSIyODMuNTg5IiB4Mj0iMTQ4LjExOCIgeTI9IjM1NS44MzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3AvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
    background-size: cover;
    width: 335px;
    height: 208px;
    position: absolute;
    transition: all 350ms ease-in-out 10ms;
    ${props => props.rotate && css`
        transform: translateX(100%) rotateY(181deg);
        margin: 0px auto;
        border-radius: 10px;
        transform-origin: left center;
         visibility: visible;
         
         backface-visibility: visible;
         
         `}
         `
export const CardTarget2 = styled(CardTarget)`
    ${props => !props.rotate && css`
    visibility: hidden;
        /* transform: rotateY(180deg); */
        backface-visibility: hidden;
        transform-origin: right center;

    `}
`
export const Market = styled.div`
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    user-select: none;
    margin: 0px;
    padding: 0px;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: SulSans, Helvetica, sans-serif;
    width: calc(100% - 0.1px);
    height: 48px;
    background: rgba(0, 0, 0, 0.9);
`
export const From = styled.form`
    text-rendering: optimizelegibility;
    font-size: 1.6rem;
    margin: 0px;
    padding: 0px;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: SulSans, Helvetica, sans-serif;
    z-index: 2;
    row-gap: 10px;
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    background: rgb(255, 255, 255);
`
