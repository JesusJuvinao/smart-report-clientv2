import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { AwesomeModal } from '../../components/AwesomeModal'
import { GET_ONE_COMMISSION_STATEMENT } from '../CommissionStatement/queries'
import { ViewCommissionStatementsTo } from '../CommissionStatement/ViewCommissionTo'

export const ViewStatement = ({ id }) => {
  const [modal, setModal] = useState(true)

  const { data, error, loading } = useQuery(GET_ONE_COMMISSION_STATEMENT, { 
    variables: { IdStatement: id }, fetchPolicy: 'cache-and-network' 
  })

    return (
    <div>
      <button onClick={() => setModal(true)}>View Invoice</button>
      <AwesomeModal
        show={modal}
        backdrop
        onHide={() => setModal(false)}
        onCancel={() => false}
        btnCancel={false}
        btnConfirm={false}
        header={true}
        size="large"
        title='Invoice Stements To'
        height='100vh'
        width='100%'
        footer={false}
      >
        {modal && <ViewCommissionStatementsTo
          data={data?.getOneCommissionStatement}
          loading={loading}
        />}
      </AwesomeModal>
    </div>
    )
}


