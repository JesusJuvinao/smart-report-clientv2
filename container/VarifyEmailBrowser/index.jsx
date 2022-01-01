import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { Button, Container, Content, Text, Form, Title } from './styled'
import { useUser } from '../Profile'
import OTPInput from '../../components/Otp/Otp'
import { SEND_EMAIL_CONFIRMATION_NEW_BROWSER } from './queries'

export const VaryfyEmail = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [dataUser, { loading }] = useUser()
  const [showOtp, setshowOtp] = useState(false)
  const [sendEmailConfirmationBrowser, { loading: loadingSendEmail }] = useMutation(SEND_EMAIL_CONFIRMATION_NEW_BROWSER, {
    onCompleted: (data) => {
      if (data.sendEmailConfirmationBrowser.success === true)   setshowOtp(true)
      setAlertBox({ message: `${data.sendEmailConfirmationBrowser.message}`, color: 'success' })
    }
  })

  const HandleSendEmail = async (e) => {
    e.preventDefault()
    await sendEmailConfirmationBrowser({
      variables: { uEmail: dataUser.uEmail, userName: dataUser.userName }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
  }
  if (loading) return <Loading />
  return (<Container>
    <Content>
      <Title>Hi {dataUser?.userName}, We have detected a new device Please verify your email</Title>
      <Form>
     {showOtp &&  <SendVerifyEmail />  }
        <Button type='submit' onClick={(e) => HandleSendEmail(e)}>Send Email</Button>
      </Form>
      {/* <SendVerifyEmail /> */}
    </Content>
  </Container>
  )
}

export const SendVerifyEmail = () => {
  const [Otp, setOtp] = useState({})
  return (
    <div>
      <Form>
        Hi
      </Form>
      <OTPInput
        autoFocus
        isNumberInput
        length={5}
        inputClassName="otpInput" // send css
        onChangeOTP={(otp) => setOtp(otp)}
      />
    </div>
  )
}
