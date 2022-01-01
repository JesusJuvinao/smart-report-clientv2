import React from 'react'
import { CommissionStatements } from '../../../container/CommissionStatement'

export default function Clases () {
    return <CommissionStatements />
}
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login' } } }
    return {
        props: {}
    }
}
