import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { BGColor, SEGColor } from '../../public/colors'
export const Offers = () => {
  const [timerDays, setTimerDays] = useState('00')
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')
  const [browser, setBrowser] = useState(false)
  let interval = useRef()

  const startTimer = () => {
    const countdownDate = new Date('Dec 30,  2021 00:00:00').getTime()
    interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownDate - now
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(interval.current)
      } else {
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
  }
  useEffect(() => {
    const someref = interval.current
    startTimer()
    return () => {
      clearInterval(someref)
    }
  }, [])

  useEffect(() => {
    setBrowser(true)
  }, [])
  return (
    <>
      <Content>
        <Card>
          <Title>Days</Title>
          <DateResponse>{timerDays}</DateResponse>
        </Card>
        <Card>
          <Title>Hours</Title>
          <DateResponse>{timerHours}</DateResponse>
        </Card>
        <Card>
          <Title>Minutes  </Title>
          <DateResponse>{timerMinutes}</DateResponse>
        </Card>
        <Card>
          <Title>Seconds</Title>
          <DateResponse>{timerSeconds}</DateResponse>
        </Card>
      </Content>
    </>
  )
}

const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex: wrap;
`
const Card = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    margin: 2px;
    border: 2px solid ${BGColor};
    width: fit-content;
    padding: 5px;
`
const DateResponse = styled.span`
    font-family:  PFont-Light;
    text-align: center;
    color: ${BGColor};
`
const Title = styled.span`
    font-family: PFont-Regular;
    text-align: center;
    color: ${BGColor};
`
