import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Wrapper, Card, Label, Text, InputField, TabsListWrapper, ContentPricing, Line, Pricing, FeatureItem, BtnItem, ContentPrice, ModuleInfo, Module, BtnClose, SwitchButton, ButtonTheme, ContentToggle, ContentCarPrice } from './styled'
import { BColor, BGColor, PColor, PLColor, SECColor } from '../../public/colors'
import { useSetState } from '../../components/hooks/useState';
import { RippleButton } from '../../components/Ripple';

export const Checkout = ({ licenceId }) => {
  const Switch = useSetState(0)
  const router = useRouter();
  const { status } = router.query;

  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState(
    {
      name: 'Premium',
      description: 'Start your business',
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      quantity: 0,
      price: 999,
    }
  );

  const changeQuantity = (value) => {
    // Don't allow the quantity less than 0, if the quantity is greater than value entered by user then the user entered quantity is used, else 0
    setItem({ ...item, quantity: Math.max(0, value) });
  };

  const onInputChange = (e) => {
    changeQuantity(parseInt(e.target.value));
  };

  const onQuantityPlus = () => {
    changeQuantity(item.quantity + 1);
  };

  const onQuantityMinus = () => {
    changeQuantity(item.quantity - 1);
  };

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-stripe-session', {
      item: item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };
  return (
    <ContentPricing>
      <ContentCarPrice>
        <Card alignContent='flex-start' radius='15px' shadow='0 0.125rem 0.5rem 0 rgb(0 0 0 / 20%)' maxWidth='16.5625rem' width="100vw" margin='1.5rem .625rem 0' padding='20px 20px' justify='flex-start'>
            <Text color={BColor} lineHeight='1.4' bold='500' size='1.25rem' >{item.name}</Text>
            <Line />
            <Text margin='0px 0px 1.25rem 0'>{item.description}</Text>
            <ContentPrice>
                <Text lineHeight={'1.3'} font='PFont-Bold' bold='700' color={SECColor} size='2.5rem' margin='.5rem 0'>US$ {item.price}</Text>
            </ContentPrice>
            <RippleButton margin='0px 10px 0px 0px' border='624.9375rem' color={BGColor} widthButton='150px' bgColor={'#61D2B4'} family='PFont-Medium'>Buy now</RippleButton>
            
            <RippleButton borderSolid='.125rem solid #393a3d' margin='0px 0px 0px 0px' border='624.9375rem' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Medium'> - </RippleButton>
            <Wrapper>
              <InputField></InputField>
              <Label>Quantity</Label>
            </Wrapper>
            <RippleButton borderSolid='.125rem solid #393a3d' margin='0px 0px 0px 0px' border='624.9375rem' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Medium'> + </RippleButton>
        </Card>
                  <Head>
          <title>Stripe Checkout with Next.js</title>
          <meta
            name='description'
            content='Complete Step By Step Tutorial for integrating Stripe Checkout with Next.js'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
      <main>
        {status && status === 'success' && (
          <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
            Payment Successful
          </div>
        )}
        {status && status === 'cancel' && (
          <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
            Payment Unsuccessful
          </div>
        )}
        <div className='shadow-lg border rounded p-2 '>
          {/* <Image src={item.image} width={300} height={150} alt={item.name} /> */}
          <h2 className='text-2xl'>$ {item.price}</h2>
          <h3 className='text-xl'>{item.name}</h3>
          <p className='text-gray-500'>{item.description}</p>
          <p className='text-sm text-gray-600 mt-1'>Quantity:</p>
          <div className='border rounded'>
            <button
              onClick={onQuantityMinus}
              className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
            >
              -
            </button>
            <input
              type='number'
              className='p-2'
              onChange={onInputChange}
              value={item.quantity}
            />
            <button
              onClick={onQuantityPlus}
              className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
            >
              +
            </button>
          </div>
          <p>Total: ${item.quantity * item.price}</p>
          <button
            disabled={item.quantity === 0 || loading}
            onClick={createCheckOutSession}
            className='bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100'
          >
            {loading ? 'Processing...' : 'Buy'}
          </button>
        </div>
      </main>
      {/* <ContentPricing>
                <ContentCarPrice>
                    {[1,2,3].map(x => (
                        <Card key={x} alignContent='flex-start' radius='15px' shadow='0 0.125rem 0.5rem 0 rgb(0 0 0 / 20%)' maxWidth='16.5625rem' width="100vw" margin='1.5rem .625rem 0' padding='20px 20px' justify='flex-start'>
                            <Text color={BColor} lineHeight='1.4' bold='500' size='1.25rem' >Simple Start</Text>
                            <Line />
                            <Text margin='0px 0px 1.25rem 0'>Start your business</Text>
                            <Pricing>
                                <s>
                                    {Switch.state ? 'US$172' : 'US$16'}
                                </s>

                            </Pricing>
                            <ContentPrice>
                                <Text lineHeight={'1.3'} font='PFont-Bold' bold='700' color={SECColor} size='2.5rem' margin='.5rem 0'>{Switch.state ? 'US$151' : 'US$8'}</Text>
                                <span id='number'>{!Switch.state && 36}</span>
                                <span id='letters'>{Switch.state ? '/yr' : '/mo'}</span>
                            </ContentPrice>
                            <ActiveLink activeClassName="active" href={`/checkout/${`61bea73d746e9fa4a79ffc99`}`}>
                                <a>
                                    <RippleButton margin='0px 10px 0px 0px' border='624.9375rem' color={BGColor} widthButton='150px' bgColor={'#61D2B4'} family='PFont-Medium'>Buy now</RippleButton>
                                </a>
                            </ActiveLink>
                            {/* <RippleButton margin='0px 10px 0px 0px' border='624.9375rem' color={BGColor} widthButton='150px' bgColor={'#0e8900'} family='PFont-Medium'></RippleButton> *
                            <RippleButton borderSolid='.125rem solid #393a3d' margin='15px 10px 40px 0px' border='624.9375rem' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Medium'>Free 30-day trial</RippleButton>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => handleShow(1)}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                        </Card>
                    ))}
                </ContentCarPrice>
            </ContentPricing> */}
            </ContentCarPrice>
    </ContentPricing>
  );
}