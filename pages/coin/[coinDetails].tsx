import { Button, LinearProgress } from '@mui/material';
import axios from 'axios';
import { Router } from 'next/router'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { HistoricalChart, SingleCoin } from '../../config/api';
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

interface SingleCoin{
  description: {
    en:string
  }
  id: string
  image: {
    large:string
  }
}

const coinDetails = () => {
  const router = useRouter();
  const { coinDetails } = router.query
  const [loding, setLoding] = useState(true)
  const [historical, setHistorical] = useState([])
  const [singleCoin, setSingleCoin] = useState<SingleCoin>();
  const [days, setDays] = useState(1)
  const {user}=useContext(AuthContext)
  console.log(coinDetails, "coinDetails")
  const [isActive, setIsActive] = useState(false);

  const fetchHistoricle = async () => {
    if (coinDetails) {
      const { data } = await axios.get(HistoricalChart(coinDetails?.toString() || "", 365, "inr"))
      setHistorical(data.prices)
    }
    

    if(historical) setLoding(false)
    
    
  }
  const fetchSingleCoin = async () => {
    setLoding(true)
    if (coinDetails) {
      const { data } = await axios.get(SingleCoin(coinDetails))
      setSingleCoin(data);
    }
    setLoding(false)
     
  }
  console.log("singleCoin",singleCoin)
  useEffect(() => {
    fetchSingleCoin();
    fetchHistoricle();

  }, [coinDetails])

  const addToWatchList=async ()=> {
    const coin = await addDoc(collection(db, "post"), {
      discription:'hello ashok',
      id:user?.uid
    })
  }
  const handleSetDays = (days:number)=>{
    setDays(days)
  }
  return (
    <div>
      {loding && <LinearProgress />}
      {!loding &&  <div className='flex flex-col lg:flex-row pt-10 h-screen'>
        <div className='w-full lg:w-[30%] flex flex-col items-center space-y-5 px-6'>
          <img src={singleCoin?.image.large} alt="" />
          <h2 className='text-white text-center text-6xl font-bold'>{ `${singleCoin?.id}`}</h2>
          <p className='text-white w-[94%] '>{ singleCoin?.description.en.slice(0,333)}</p>
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
            <Button
              onClick={()=>handleSetDays(1)}
              className=' w-28 lg:w-60 lg:font-semibold lg:first-letter:text-lg p-3' variant={`${days==1?"contained":"outlined"}`}>24 Hours</Button>
            <Button
              onClick={()=>handleSetDays(30)}
              className='w-28 lg:w-60 lg:font-semibold lg:text-lg' variant={`${days==30?"contained":"outlined"}`}>30 Days</Button>
            <Button
              onClick={()=>handleSetDays(90)}
              className=' w-28 lg:w-60 lg:font-semibold lg:text-lg' variant={`${days==90?"contained":"outlined"}`}>3 Months</Button>
            <Button
              onClick={()=>handleSetDays(365)}
              className=' w-28 lg:w-60 lg:font-semibold lg:text-lg' variant={`${days==365?"contained":"outlined"}`}>1 Year</Button>
          </div>
        </div>
      </div>}
     
    </div>
  )
}

export default coinDetails
