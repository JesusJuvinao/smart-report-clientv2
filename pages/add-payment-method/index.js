import React from 'react'
import { PaymentMethod } from '../../container/PaymentMethod'

export default function PaymentMethodView() { return <PaymentMethod /> }
export async function getServerSideProps({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }
    return {
        props: {}
    }
}
