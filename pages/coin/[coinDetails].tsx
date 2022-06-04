import { LinearProgress } from '@mui/material';
import axios from 'axios';
import { Router } from 'next/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { HistoricalChart } from '../../config/api';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import Charts from '../../components/Charts';
Chart.register(CategoryScale);

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
  const [days,setDays]=useState(1)
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
  return (
    <div>
      {loding && <LinearProgress />}
      <div className='flex pt-10'>
        <div className='w-[30%] h-screen flex flex-col items-center space-y-5 px-3'>
          <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="" />
          <h2 className='text-white text-center text-3xl font-bold'>Name</h2>
          <p className='text-white '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae natus rem nobis voluptatem reiciendis aspernatur illo laborum, sapiente quidem, tempora cumque quasi, aliquid quibusdam blanditiis commodi id delectus. Est, pariatur.</p>
          <div className='w-full'>
            <h3 className='text-white'>Price</h3>
          <h3 className='text-white'>Marcket Cap</h3>
          </div>
          
        </div>
        <div className='w-[70%] h-screen px-3'>
         
          <Charts historical={historical} days={days} />
        </div>
      </div>
    </div>
  )
}

export default coinDetails
