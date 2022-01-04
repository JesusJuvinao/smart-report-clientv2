import React from 'react'
import withSession from '../../apollo/session'
import { CommissionInvoice } from '../../container/dashboard/dashboardComp'

export default function Bills () {
    return <CommissionInvoice />
}
export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: { }
    }
})
