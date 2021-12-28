import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY );

export default function Stripe() {
    const router = useRouter();
    const { success, canceled } = router.query;
    // const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    if( success !== undefined || canceled !== undefined ){
        if (success) {
            console.log('');
        }
      
        if (canceled) {
        console.log('');
        }
    }
  }, [success, canceled]);

  return (
    <form action="api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}