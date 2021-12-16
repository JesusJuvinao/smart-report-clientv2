import React from 'react'
import '../public/styles/App.css'
import PropTypes from 'prop-types'
import { Maintenance } from '../components/Maintenance'
import { LayoutC as Layout } from '../container/Layout'
import Context from '../context'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import {
  ApolloProvider
} from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
const production = true

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return(
    <Context>
       <ApolloProvider client={apolloClient}>
    <GlobalStyle />
    <Layout>
    {<Component {...pageProps} /> }
    </Layout>
       </ApolloProvider>
    </Context>
     )
}
// vamos 

export default MyApp
