import { useRouter } from 'next/router'
import React from 'react'
import { CreateInvoice } from '../../../container/invoice/create'
import withSession from '../../../apollo/session'

export default function InvoiceCreate () {
    const router = useRouter()
    const idInput = router.query.idInvoice
    return (<CreateInvoice idInvoice={idInput} />)
}

export const getServerSideProps = withSession(async function ({ req }) {
    const user = req?.session?.get('user')
    if (!user) {
    // res.next()
        return { props: {} }
    }
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }

    return {
        props: {}
    }
}
)
