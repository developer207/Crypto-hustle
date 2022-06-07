import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import AuthState from '../Context/context'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <AuthState>
      <Navbar />
    <Component {...pageProps} />
    </AuthState>
   
  </>
}

export default MyApp
