import { useRouter } from 'next/dist/client/router'
import React from 'react'
import withSession from '../../apollo/session'
import { ViewOneTickes } from '../../container/ViewTickes/ViewOneTicket'

export default function ViewTickesView() {
    const router = useRouter()
    const idSalesTicket = router.query.id
    return (<ViewOneTickes eventName={idSalesTicket} />)
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
