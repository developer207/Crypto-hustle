import { Button, LinearProgress } from '@mui/material';
import axios from 'axios';
import { Router } from 'next/router'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { HistoricalChart } from '../../config/api';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import Charts from '../../components/Charts';
Chart.register(CategoryScale);
import styles from "../../styles/coinDetail.module.css"
import { AuthContext } from '../../Context/context';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

type Params = {
  params: {
    slug: string
  }
}

const coinDetails = () => {
  const router = useRouter();
  const { coinDetails } = router.query
  const [loding, setLoding] = useState(true)
  const [historical, setHistorical] = useState([])
  const [days, setDays] = useState(1)
  const {user}=useContext(AuthContext)
  console.log(coinDetails)

  const fetchHistoricle = async () => {
    if (coinDetails) {
      const { data } = await axios.get(HistoricalChart(coinDetails?.toString() || "", 365, "inr"))
      setHistorical(data.prices)
    }
    

    if(historical) setLoding(false)
    
    
  }
  console.log("data",historical)
  useEffect(() => {
    fetchHistoricle();
  }, [coinDetails])

  const addToWatchList=async ()=> {
    const coin = await addDoc(collection(db, "post"), {
      discription:'hello ashok',
      id:user?.uid
    })
  }
  return (
    <div>
      {loding && <LinearProgress />}
      <div className='flex flex-col lg:flex-row pt-10 h-screen'>
        <div className='w-full lg:w-[30%] flex flex-col items-center space-y-5 px-6'>
          <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="" />
          <h2 className='text-white text-center text-6xl font-bold'>Name</h2>
          <p className='text-white px-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae natus rem nobis voluptatem reiciendis aspernatur illo laborum, sapiente quidem, tempora cumque quasi, aliquid quibusdam blanditiis commodi id delectus. Est, pariatur.</p>
          <div className='w-full px-3'>
          <h3 className='text-white text-lg font-bold'>Rank</h3>
            <h3 className='text-white text-lg font-bold'>Price</h3>
          <h3 className='text-white text-lg font-bold'>Marcket Cap</h3>
          </div>
          <Button
            onClick={addToWatchList}
            className='bg-blue-600 w-full font-semibold text-lg py-3'
            variant="contained">Add To Watchlist</Button>
        </div>
        <div className={styles.vl}></div>
        <div className='w-full pt-10 lg:w-[70%]  px-3'>
          <Charts historical={historical} days={days} />
          <div className='flex justify-between pt-10 px-2'>
            <Button className='bg-blue-600 w-28 lg:w-60 lg:font-semibold lg:first-letter:text-lg p-3' variant="contained">24 Hours</Button>
            <Button className='w-28 lg:w-60 lg:font-semibold lg:text-lg' variant="outlined">30 Days</Button>
            <Button className=' w-28 lg:w-60 lg:font-semibold lg:text-lg' variant="outlined">3 Months</Button>
            <Button  className=' w-28 lg:w-60 lg:font-semibold lg:text-lg' variant="outlined">1 Year</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default coinDetails
