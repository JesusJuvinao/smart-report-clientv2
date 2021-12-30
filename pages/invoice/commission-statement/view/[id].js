import { useRouter } from 'next/router'
import React from 'react'
import {ViewStatement} from '../../../../container/invoice/ViewStatement'

export default function StatementsView () {
    const router = useRouter()
    const id = router.query.id
    return <ViewStatement id={id} />
}
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login' } } }
    return {
        props: {}
    }
}
