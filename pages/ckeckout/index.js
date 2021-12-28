import React from 'react'
import { Checkout } from '../../container/Checkout'

export default function CheckoutView () {
    return <Checkout/>
}
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login' } } }
    return {
        props: {}
    }
}
