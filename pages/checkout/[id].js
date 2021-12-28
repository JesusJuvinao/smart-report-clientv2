import { useRouter } from 'next/router'
import React from 'react'
import { Checkout } from '../../container/Checkout'

export default function CheckoutView() {
    const router = useRouter()
    return <Checkout licenceId={router.query.id} />
}