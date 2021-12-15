import { GlobalStyle } from '../public/styles/GlobalStyle'
import '../public/styles/App.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <>
    <GlobalStyle />
     <Component {...pageProps} />
    </>
     )
}

export default MyApp
