import { InvoicePay } from '../../container/invoice/pay'
import { useRouter } from 'next/router'
import React from 'react'
import withSession from '../../apollo/session'

export default function InvoicePayView () {
    const router = useRouter()
    const idInput = router.query.idInvoice
    return (<InvoicePay idInvoice={idInput} />)
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
