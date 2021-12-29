import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { ALL_COMMISSION_STATEMENT } from './queries'
import { Container } from './styled'

export const CommissionStatements = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const { data } = useQuery(ALL_COMMISSION_STATEMENT, {
    variables: { idComp: company.idLasComp ? company.idLasComp : null, company: '', search: '', min: 12, max: 100  },
    fetchPolicy: 'cache-and-network'
  })
  console.log(data)
  return (
    <Container>
      Holadasdasdasd
    </Container>
  )
}
