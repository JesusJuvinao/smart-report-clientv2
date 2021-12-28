import React from 'react'
import withSession from '../../../apollo/session'
import { useRouter } from 'next/router'
import { DashboardComp } from '../../../container/dashboard/dashboardComp'

export default function Company() {
    const router = useRouter()
    const idComp = router.query.id
    console.log(idComp)
    return (<DashboardComp idComp={idComp} />)
}
export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login', permanent: false } } }
    return {
        props: {}
    }
})
