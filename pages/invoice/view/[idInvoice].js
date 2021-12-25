import { useRouter } from 'next/router'
import React from 'react'
import withSession from '../../../apollo/session'
import { ViewComponentInvoice } from '../../../container/invoice/view'

export default function InvoiceView () {
    const router = useRouter()
    const idInput = router.query.idInvoice
    return (<ViewComponentInvoice idInvoice={idInput} />)
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
