import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { Table } from '../../components/Table'
import { Text } from '../../components/Table/styled'
import { GET_ONE_COMMISSION_STATEMENT } from '../CommissionStatement/queries'
import { Clip, DownLoadButton, PaymentStatus, Toast, Wrapper } from '../dashboard/styled'

export const ViewStatement = ({ id }) => {
  const { data, error, loading } = useQuery(GET_ONE_COMMISSION_STATEMENT, { 
    variables: { IdStatement: id }, fetchPolicy: 'cache-and-network' })

  // const [getOneCommissionStatement, { data }] = useLazyQuery(GET_ONE_COMMISSION_STATEMENT, {
  //     variables: { IdStatement: id },
  //     fetchPolicy: 'cache-and-network'
  // })

    console.log(data)
    return (
    <div>
        
    </div>
    )
}


