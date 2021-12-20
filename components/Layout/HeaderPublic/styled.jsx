import styled from 'styled-components'
import Link from 'next/link'
import { PColor } from '../../../public/colors'

export const ContentLink = styled.div`
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: space-between;
    `
export const ContentLogo = styled.div`
  @media (max-width: 769px) {
  display: none;
  }
`
export const Container = styled.div`
    display: flex;
    height: 45px;
    grid-area: head;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    align-items: center;
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    height: 72px;
    max-width: 1440px;
    top: 40px;
    width: 100vw;
    z-index: 1000;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
    @media (min-width: 992px) {
    }
    `
export const NavLink = styled(Link)`
    margin-right: 30px;
    `
export const ContainerLink = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

    `
export const Button = styled.button`
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    min-width: 100px;
    font-size: 15px;
    padding: 6px;
    transition: .5s ease;
    margin-left: 5px;
    background-color: transparent;
    &:hover{
        background-color: rgba(64,87,109,.07);
    }
    @media (max-width: 960px){
        min-width: 75px;
        margin-left: 0px;
        font-size: 13px;
        font-weight: 400;
    }
    
`
