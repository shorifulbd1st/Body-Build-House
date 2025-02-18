import React, { useEffect, useState } from 'react'
import SingleClass from './SingleClass';
import useClass from '../../hooks/useClass';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const AllClasses = () => {
    const [allClass, isPending] = useClass();

    const [currentPage, setCurrentPage] = useState(0);
    // const [itemsPerPage, setItemPerPage] = useState(6)
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const [searchData, setSearchData] = useState([])

    // const [totalCount, setTotalCount] = useState({});



    // const { data: allClassl = [], isPending: isPendingll } = useQuery({
    //     queryKey: ['all-class'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/all-class?page=${currentPage}&size=${6}`);
    //         return res.data
    //     }
    // })
    const [allData, setData] = useState([]);
    useEffect(() => {
        const pageData = async () => {
            const res = await axiosSecure.get(`/all-class?page=${currentPage}&size=${6}`);
            setData(res.data)
        }
        pageData();
    }, [currentPage])
    const { data: totalCount = {}, isPending: isPendingL } = useQuery({
        queryKey: ['totalCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('/class-page');
            return res.data
        }
    })

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

    if (!allData) {
        return <LoadingSpinner></LoadingSpinner>
    } if (!searchData) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isPending || isPendingL || loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(searchData)
    // console.log(allClass)
    let newClass = []
    if (searchData.length < allClass.length) {
        newClass = searchData;
    }
    else {
        newClass = allData
    }
    // console.log('newclass', newClass.length)

    // console.log(totalCount.result)


    const totalPage = totalCount.result;

    const numberOfPage = Math.ceil(totalPage / 6)
    const pages = [...Array(numberOfPage)?.keys()];
    // console.log(typeof (currentPage))
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }


    // console.log(allData)

    return (
        <div className='w-11/12 mx-auto mb-5'>
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
            <div>
                <h1 className='text-3xl mb-5 font-bold text-[#C70039] text-center'> You can book any trainer</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    newClass.map((item, idx) => <SingleClass key={idx} item={item}></SingleClass>)
                }
            </div>

            <div className='my-8'>
                <div className="flex justify-center">
                    {/* <p>current page:{currentPage} </p> */}
                    <button onClick={handlePrevPage}
                        class="px-6 py-2 font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-2">

                        Prev</button>
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-6 py-1 border border-red-400 ml-2 rounded-xl text-lg font-semibold ${currentPage == page ? 'bg-green-500' : 'bg-orange-400'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} class="px-6 py-2 font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ml-2">
                        Next</button>
                </div>


            </div>
        </div >
    )
}

export default AllClasses
