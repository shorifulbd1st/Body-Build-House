import React, { useState } from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import FSingleClass from './FSingleClass';

const FeaturedClass = () => {
  const axiosPublic = useAxiosPublic();

  const [sortBy, setSortBy] = useState(false)
  const { data: topClass = [], isPending } = useQuery({
    queryKey: ['top-class'],
    queryFn: async () => {
      const res = await axiosPublic.get('/top-class')
      return res.data;
    }
  })

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>
  }
  // console.log(topClass)
  const handleSort = (val) => {
    // console.log(val)
    setSortBy(!sortBy)
    if (val === 'asc') {
      topClass.sort((a, b) => a.count - b.count);
    }
    else {
      topClass.sort((a, b) => b.count - a.count)
    }

  }
  return (
    <div className='w-11/12 mx-auto mt-20 mb-5'>
      <div data-aos="zoom-in" data-aos-duration="3000" className='lg:w-8/12 mx-auto flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-extrabold capitalize md:text-4xl text-[#C70039]'>Our Most Booked Classes</h2>
        <p className='lg:w-[90%] text-md lg:text-lg font-semibold text-center text-gray-500'>Explore our top six most popular classes, ranked by total bookings. Join the favorites and elevate your fitness journey!</p>
      </div>
      <div className='mb-5 flex justify-end'>
        {
          sortBy === true ? <button onClick={() => handleSort('asc')} className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#C70039] rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="mx-1">Sort By bookings</span>
          </button>
            :
            <button onClick={() => handleSort('dsc')} className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  bg-[#C70039] rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="mx-1">Sort By bookings</span>
            </button>
        }


      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-8'>
        {
          topClass.map((item, idx) => <FSingleClass key={idx} item={item}></FSingleClass>)
        }
      </div>
    </div>
  )
}

export default FeaturedClass
