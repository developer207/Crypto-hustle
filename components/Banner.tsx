import { Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { coins } from '../config/interfaces';
import { AuthContext } from '../Context/context';
import Carosle from './Caurosle'
import CoinCard from './CoinCard'
import Loader from './Loader';

const Banner = () => {
    const [coins, setCoins] = useState<coins[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    console.log("coins---- ", coins)
    const fetchCoins = async () => {
        setIsLoading(true)
        const { data } = await axios.get(CoinList("INR"))
        setCoins(data)
        setTimeout(() => {
            setIsLoading(false);
        },0) 
       

    }

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
                <img

                    className='cursor-pointer w-screen h-full absolute -z-10' src="https://res.cloudinary.com/zarmariya/image/upload/v1654066340/samples/banner2_kkmt5q.jpg" alt="" />


                <Link href={"/"}>
                    <h1 className='text-white text-3xl lg:text-6xl text-center pt-10 font-bold '>
                        Crypto Hustle </h1>
                </Link>


                <div className='mt-28 z-50 px-3 lg:px-28'>
                    <Carosle />
                </div>

            </div>
            <div className='pt-10 px-5 lg:px-28'>
                <h1 className='text-center font-bold lg:text-3xl text-white'>Cryptocurrency Prices by Market Cap</h1>
                <input
                    className='mt-10 w-full bg-black border border-gray-500 rounded-md h-16 pl-3 lg:pl-10 text-white  lg:text-2xl outline-1 outline-gray-900'
                    type="text"
                    placeholder='Search Currency'
                    onChange={(e) => setSearch(e.target.value)}
                />
                {isLoading && <div className='flex justify-center items-center py-5'><Loader/></div>}
                {!isLoading && <><div className='flex flex-wrap justify-center mt-10'>
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
                    <div className='flex justify-center space-x-10 items-center py-4 bg-gray-900 px-20'>
                        <Button onClick={() => { page > 1 ? setPage(page - 1) : setPage(page) }} className='bg-blue-600' variant="contained">prev</Button>
                        <p className='font-bold text-white border border-blue-700 py-1 px-10 rounded-sm bg-blue-700'>{page}</p>
                        <Button onClick={() => { setPage(page + 1) }} className='bg-blue-600' variant="contained">Next</Button>
                    </div> </>}


            </div>


        </div>
    )
}

export default Banner
