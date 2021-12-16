import React from 'react'
import '../public/styles/App.css'
import PropTypes from 'prop-types'
import { Maintenance } from '../components/Maintenance'
import Context from '../context'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import {
  createHttpLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client'
const production = true

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({ uri: '/api/graphql' })
  })

  return(
    <Context>
       <ApolloProvider client={client}>
    <GlobalStyle />
    {production ? <Component {...pageProps} /> : <Maintenance />}
       </ApolloProvider>
    </Context>
     )
}
// vamos 

export default MyApp
