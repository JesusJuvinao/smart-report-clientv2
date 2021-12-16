import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
import { IndexC } from '../container/Home';

export default function Home() {
  return (<IndexC />)
}

const Container = styled.div`
  background: red;
  padding: 30px;
`