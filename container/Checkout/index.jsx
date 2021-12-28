import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useSetState } from '../../components/hooks/useState';
import { RippleButton } from '../../components/Ripple';
import { IconArrowBottom, IconCancel } from '../../public/icons';
import { GET_ONE_LICENCE } from '../DashboardAdmin/queries';
import { useQuery } from '@apollo/client';
import { BColor, BGColor, PColor, PLColor, PVColor, SECColor, SFVColor } from '../../public/colors'
import { Card, Container, ContentCarPrice, Text, Section, PayMethod, Navigation, ModuleInfo, Module } from './styled';
import { BtnClose } from '../Home/styled';
import { Overline } from '../../components/common/Reusable';
import { Context } from '../../context';

export const Checkout = ({ licenceId }) => {
  // STATES
  const Switch = useSetState(0)
  const router = useRouter();
  const { status } = router.query;
  const { setAlertBox, company } = useContext(Context)

  const [loading, setLoading] = useState(false);
  // QUERIES
  const { data } = useQuery(GET_ONE_LICENCE, { variables: { id: licenceId }, fetchPolicy: 'cache-and-network' })
  // const [item, setItem] = useState({
  //   name: `Licence Smart-repot ${data?.GetOneLicences.LName}`,
  //   description: 'Latest Apple AirPods.',
  //   image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
  //   quantity: 10,
  //   price: 999,
  // });
  // useEffect(() => {
  //   setItem({ name: data?.GetOneLicences?.LName, price: data?.GetOneLicences?.LPrice, ...item })
  // }, [data])
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-stripe-session', {
      name: data?.GetOneLicences?.LName,
      price: data?.GetOneLicences?.LPrice,
      description: 'Licence Smart-repot',
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      quantity: 1,
      licenceId: 1,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      setAlertBox({ message: `${result.error.message}`, duration: 8000 })
    }
    setLoading(false);
  };
  const show = useSetState(0)
  return (
    <Container>
      {status && status === 'success' && (
        <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>  Payment Successful </div>)}
      {status && status === 'cancel' && (<div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'> Payment Unsuccessful </div>)}
      <Overline bgColor='rgba(0,0,0,.4)' show={show.state} onClick={() => show.setState(!show.state)} />
      <Section>
        <Navigation>
          askdhaslkdjh
        </Navigation>
      </Section>
      <Card>
        <Text size='20px' color={SFVColor}># {data?.GetOneLicences?.Ref}</Text>
        <Text margin='7px 0' size='30px' >Name: {data?.GetOneLicences?.LName}</Text>
        <Text margin='7px 0' size='30px' >Price: £ {data?.GetOneLicences?.LPrice}</Text>
        <Navigation >
          <RippleButton onClick={() => show.setState(!show.state)} widthButton='19em' bgColor={PVColor}>Description</RippleButton>
        </Navigation>
      </Card>
      <Section style={{ backgroundColor: 'transparent' }}>
        <PayMethod>
          <RippleButton
            disabled={data?.GetOneLicences?.LPrice === 0 || loading}
            onClick={createCheckOutSession}
            widthButton='19em' bgColor={PVColor}>{loading ? 'Processing...' : 'Buy'}</RippleButton>
        </PayMethod>
      </Section>
      <ModuleInfo show={show.state}>
        <Module>
          <BtnClose onClick={() => show.setState(false)}>
            <IconCancel size='20px' />
          </BtnClose>
          <Text color={SECColor} lineHeight='1.4' bold='600' size='2rem' margin='2.5rem 0 0'>{data?.GetOneLicences?.LName}</Text>
          <ul>
            <li>See how your business is doing in real-time on your dashboard.</li>
            <li>Connect your bank accounts to categorise your expenses.</li>
            <li>Sort your income and expenses fully-customisable categories.</li>
          </ul>
        </Module>
      </ModuleInfo>
    </Container>
  );
}
