import React, { useEffect, useState } from 'react'
import SingleClass from './SingleClass';
import useClass from '../../hooks/useClass';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const AllClasses = () => {
    const [allClass, isPending] = useClass();

    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const [searchData, setSearchData] = useState([])

    const { data, isPending: loading, refetch } = useQuery({
        queryKey: ['search'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class-name?search=${search}`)
            setSearchData(res.data);
            return res.data;
        }
    })

    useEffect(() => {
        refetch()
    }, [search])



    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(searchData)
    // console.log(allClass)
    let newClass = []
    if (searchData.length < allClass.length) {
        newClass = searchData;
    }
    else {
        newClass = allClass
    }
    // console.log('newclass', newClass.length)
    return (
        <div className='w-11/12 mx-auto '>
            <div
                className="bg-cover bg-center bg-no-repeat py-8 -mt-2 mb-8 rounded-b-xl relative "
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/16310070/pexels-photo-16310070/free-photo-of-weight-dumbbells-and-skipping-rope-near-legs-of-standing-person.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                }}
            >

                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>


                <div className="relative z-10 bg-white bg-opacity-70 p-6 rounded-lg max-w-lg mx-auto text-center">
                    <h1 className="mb-5 font-bold text-2xl text-gray-800">
                        Easily search any class by name
                    </h1>
                    <div className='text-center '>
                        <div className='flex justify-center items-center'>

                            <input
                                type="text"
                                placeholder="Enter class name"
                                onChange={(e) => setSearch(e.target.value)}
                                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
                            />
                            <div className='text-3xl mt-2 -ml-8'><IoSearchOutline /></div>
                        </div>
                    </div >

                </div>
            </div >

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    newClass.map((item, idx) => <SingleClass key={idx} item={item}></SingleClass>)
                }
            </div>
        </div>
    )
}

export default AllClasses
