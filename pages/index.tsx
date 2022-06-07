import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import Alerts from '../components/Alerts'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import { AuthContext } from '../Context/context'

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log("user",user)
  return (
    <div className="scroll-smooth">
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <Main />
      <Alerts/>
    </div>
  )
}

export default Home
