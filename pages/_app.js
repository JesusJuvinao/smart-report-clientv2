import React from 'react'
import '../public/styles/App.css'
import PropTypes from 'prop-types'
import { Maintenance } from '../components/Maintenance'
import AuthProvider from '../context'
import { GlobalStyle } from '../public/styles/GlobalStyle'
const production = true

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
    <GlobalStyle />
    {production ? <Component {...pageProps} /> : <Maintenance />}
    </AuthProvider>
     )
}
// vamos 

export default MyApp
