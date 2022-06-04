import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import Charts from './Charts';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface props{
  profit: string;
  name: string;
  image: string;
  inrPrice: number;
  id:string
}
const CoinCard = ({ profit, image, inrPrice, name, id }: props) => {
  const [historical,setHistorical]=useState([])
  
  const fetchHistoricle = async () => {
    if (id) {
      const { data } = await axios.get(HistoricalChart(id, 365, "inr"))
      setHistorical(data.prices)
    }    
  }

  useEffect(() => {
    fetchHistoricle()
  },[])
  return (
    <Link href={`/coin/${id}`}>
      <div className='w-80 h-96 m-5 rounded-md border border-slate-700 bg-gray-900 cursor-pointer'>
        <div className='px-4 py-6'>
          <div className='flex items-center relative'>
            <img className='w-8 h-8 rounded-full' src={image} alt="" />
            <p className=' ml-3 text-gray-400'>{name}</p>
            <p className='absolute right-0 text-gray-400 top-0'>24h</p>


          </div>
          <p className='text-white pt-10 left-0 font-bold text-lg'>{`USD ${inrPrice}`}</p>
          <p className='text-white pt-1 font-bold left-0 text-lg'>{`INR 62,548.2254`}</p>
          <p className={` ${+profit > 0 ? 'text-green-600' : "text-red-500"} pt-1`}>
            {+profit > 0 && "+"}{`${profit}%`}</p>
          <div className='pt-9'>
            <Charts historical={historical} days={ 1}/>
          </div>
          
        </div>
      </div>
    </Link>
  )
}

export default CoinCard
