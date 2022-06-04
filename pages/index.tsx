import type { NextPage } from 'next'
import Head from 'next/head'
import Main from '../components/Main'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className="scroll-smooth">
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <Main/>
    </div>
  )
}

export default Home
