import React, { useContext, useRef, useState, useEffect  } from 'react'
import { useFormTools } from '../../components/hooks/useForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { IndexPaypal } from './paypal'
import { Button, CardContainer, CardTarget, CardTarget2, Container, Content, DynamicCards, DynamicCardWrapper, From, Market, Separator, Text } from './styled'
export const PaymentMethod = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()

  let loading = false
  if (loading) return <Loading />
  const [rotate, setRotate] = useState(false)
  const ref = useRef(null)
  return (
    <Container>
      <IndexPaypal />
      <Content>
        <From>
          <InputHooks title='Numero de tarjeta.' width='100%' required error={errorForm?.target} value={dataForm?.target} disabled={false} onChange={handleChange} name='target' />
          <InputHooks title='Name  target.' width='100%' required error={errorForm?.Nametarget} value={dataForm?.Nametarget} disabled={false} onChange={handleChange} name='Nametarget' />
          <InputHooks title='Valid.' width='50%' required error={errorForm?.Valid} onBlur={() => setRotate(true)} value={dataForm?.Valid} disabled={false} onChange={handleChange} name='Valid' />
          <InputHooks title='CVV.' width='50%' required reference={ref} onBlur={() => setRotate(false)} error={errorForm?.CVV} value={dataForm?.CVV} disabled={false} onChange={handleChange} name='CVV' />
          <InputHooks title='CC/NIT.' width='100%' required reference={ref} error={errorForm?.CCNIT} value={dataForm?.CCNIT} disabled={false} onChange={handleChange} name='CCNIT' />
        </From>
        <CardContainer>
          <DynamicCardWrapper>  
            <Separator />
            <DynamicCards>
              <CardTarget rotate={rotate}>
                Card 1
              </CardTarget>
              <CardTarget2 rotate={rotate}>
                <Market>

                </Market>
              </CardTarget2>
            </DynamicCards>
            <Separator />
          </DynamicCardWrapper>
        </CardContainer>
      </Content>
    </Container>
  )
}
