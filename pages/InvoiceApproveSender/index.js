import React from 'react'
import withSession from '../../apollo/session'
import { InvoiceApproveSender } from '../../container/InvoiceAproveSender/spiceStatement'

export default function Teams () {
    return (<InvoiceApproveSender />)
}

export const getServerSideProps = withSession(async function ({ req }) {
    const user = req?.session?.get('user')
    if (!user) {
        return { props: {} }
    }
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }

    return {
        props: {}
    }
}
)
