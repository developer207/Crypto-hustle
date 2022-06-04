import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { TrendingCoins } from '../config/api';

interface coins {
  image: string,
  current_price: number,
  id: string,
  symbol: string,
  price_change_percentage_24h: -2.96296,
  total_volume: 21539907930,
  name: string

}
// const items = [
//   <img src="path-to-img" onDragStart={(e)=>e.preventDefault()} role="presentation" />,
//   <img src="path-to-img" onDragStart={(e)=>e.preventDefault()} role="presentation" />,
//   <img src="path-to-img" onDragStart={(e)=>e.preventDefault()} role="presentation" />,
// ];

const Carosle = () => {
  const [trendingCoins, setTrendingCoins] = useState<coins[]>([])
  const fetchTrendig = async () => {
    const res = await axios.get(TrendingCoins("inr"))
    setTrendingCoins(res.data)
    console.log("res", res)
  }
  console.log(trendingCoins)

  useEffect(() => {
    fetchTrendig()

  }, [])

  let items = trendingCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h
    return (
      <div className='flex flex-col items-center'>
        <img className='w-24 h-24 rounded-full'
        src={coin?.image}
        alt={coin.name}
        height="80"
        style={{ marginBottom: 10 }}
      />
        <span className='flex space-x-1'>
          <p className='text-white'>{coin?.symbol}</p>
          
          
          <span className={`${profit>0?"text-green-600":"text-red-600"} font-bold `}
            
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className='text-white'>{ `₹ ${coin?.current_price}`}</span>
      </div>
      
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    720: {
      items: 4
    },
    2000: {
      items: 11,
    }
  };
  return (
    <div className='flex justify-center'>
      
        <AliceCarousel
          mouseTracking
          controlsStrategy={"default"}
          items={items}
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          
        />
     

    </div>

  );
}

export default Carosle

function numberWithCommas(arg0: string): React.ReactNode {
  throw new Error('Function not implemented.');
}
