import { Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { coins } from '../config/interfaces';
import Carosle from './Caurosle'
import CoinCard from './CoinCard'

const Banner = () => {
    const [coins, setCoins] = useState<coins[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const fetchCoins = async () => {
        const { data } = await axios.get(CoinList("INR"))
        setCoins(data)

    }
    console.log("coins", coins)
    useEffect(() => {
        fetchCoins();

    }, [])

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.symbol.toLowerCase().includes(search)
            || coin.name.toLowerCase().includes(search)
        ))
    }
    return (
        <div className=''>
            <div className='h-[27rem] relative'>
                <img className='w-screen h-full absolute -z-10' src="https://res.cloudinary.com/zarmariya/image/upload/v1654066340/samples/banner2_kkmt5q.jpg" alt="" />


                <Link href={"/ashok"}>
                    <h1 className='text-white text-6xl text-center pt-10 font-bold '>
                        Crypto Hustle </h1>
                </Link>


                <div className='mt-28 z-50 px-28'>
                    <Carosle />
                </div>

            </div>
            <div className='pt-10 px-28'>
                <h1 className='text-center font-bold text-3xl text-white'>Cryptocurrency Prices by Market Cap</h1>
                <input
                    className='mt-10 w-full bg-black border border-gray-500 rounded-md h-16 pl-10 text-white text-2xl outline-1 outline-gray-900'
                    type="text"
                    placeholder='Search Currency'
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className='flex flex-wrap justify-center mt-10'>
                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 12).map((coin) => {
                        return (
                            <CoinCard
                                image={coin.image}
                                name={coin.name}
                                inrPrice={coin.current_price}
                                key={coin.id} profit={coin?.price_change_percentage_24h?.toFixed(2)}
                                id={coin.id}
                            />
                        )


                    })}


                </div>

                <Button onClick={() => setPage(page - 1)} className='bg-blue-600' variant="contained">prev</Button>
                <Button onClick={() => setPage(page + 1)} className='bg-blue-600' variant="contained">Next</Button>
            </div>


        </div>
    )
}

export default Banner
