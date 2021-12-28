import React from 'react'
import withSession from '../../../apollo/session'
import { useRouter } from 'next/router'
import { WeeklyEventsreport } from '../../../container/dashboard/weekly-events-report'

export default function Company() {
    const router = useRouter()
    const idComp = router.query.idComp
    return (<WeeklyEventsreport idComp={idComp} />)
}
export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login', permanent: false } } }
    return {
        props: {}
    }
})
