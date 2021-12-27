import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useState } from 'react'
import { ForgotPassword } from '../../components/ForgotPassword'
import { useFormTools } from '../../components/hooks/useForm'
import CountdownApp from '../../components/hooks/useSetInterval'
import { useSetState } from '../../components/hooks/useState'
import { Context } from '../../context'
import { CHANGE_PASSWORD, RECOVER_ACCOUNT, VALIDATE_TOKEN } from './queries'

export const ForgotPasswordC = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
  const [status, component, handleStart] = CountdownApp()
  const { state, setState } = useSetState(1)
  const [Otp, setOtp] = useState({})
  const { setAlertBox } = useContext(Context)
  const router = useRouter()

  const handleShow = index => {
    setState(index === state ? false : index)
  }
  const [CreateRecoverAccount, { data, loading }] = useMutation(RECOVER_ACCOUNT, {
    onCompleted: (data) => {
      if (data?.CreateRecoverAccount.success) {
        setState(2)
        setAlertBox({ message: `${data?.CreateRecoverAccount?.message}`, duration: 8000 });
        handleStart()
      } else {
        setAlertBox({ message: `${data?.CreateRecoverAccount?.message}`, duration: 8000 });
      }
    }
  })
  const [ResetPassword, { loading: loadingChange }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      if (data?.ResetPassword.success === true) {
        setAlertBox({ message: `${data?.ResetPassword?.message}`, duration: 8000 }); 
        router.push('/login')
      } else {
        setAlertBox({ message: `${data?.ResetPassword?.message}`, duration: 8000 }); 
      }
    }
  })
  const [messageErr, setMessageErr] = useState('')
  const [validateToken,{ data: dataValidate  }] = useLazyQuery(VALIDATE_TOKEN, {
    onError: () => { setAlertBox({ message: 'Internal error', duration: 8000 }) },
    onCompleted: (data) => {
      if (data?.validateToken?.success === true) {
        setAlertBox({ message: `${data?.validateToken?.message}`, duration: 8000 })
        setState(3)
      } else {
        setMessageErr('Verify that the parameters are correct')
      }
    },
    variables: { uEmail: dataForm.uEmail, uToken: Otp }
  })
  const handleForm = e => handleSubmit({
    event: e,
    action: () => CreateRecoverAccount({
      variables: { input: { uEmail: dataForm.uEmail } }
    }),
    msgSuccess: '',
    actionAfterSuccess: () => {
    }
  })

  const handleFormValidation = async e => {
    e.preventDefault()
    await validateToken()
  }

  const handleResetPassword = e => handleSubmit({
    event: e,
    action: () => ResetPassword({
      variables: {
        input: {
          uEmail: dataForm.uEmail,
          uPassword: dataForm.uPassword,
          uToken: Otp
        }
      }
    })
  })

  // useEffect(() => {
  //   if (data) {
  //     setAlertBox({ message: `${data?.CreateRecoverAccount?.message}`, duration: 8000 })
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (dataValidateToken) {
  //     setAlertBox({ message: `${dataValidateToken?.validateToken?.message}`, duration: 8000 })
  //     setState(3)
  //   }
  // }, [dataValidateToken])

  return (
    <ForgotPassword
      status={status}
      component={component}
      handleShow={handleShow}
      setOtp={setOtp}
      handleSubmit={handleForm}
      state={state}
      messageErr={messageErr}
      loadingValidate={false}
      loadingEmali={loading}
      loadingChange={loadingChange}
      handleFormValidation={handleFormValidation}
      handleResetPassword={handleResetPassword}
      onChange={handleChange}
      setState={setState}
      dataForm={dataForm}
    />
  )
}
