import React from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';

const FeaturedClass = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topClass = [], isPending } = useQuery({
    queryKey: ['top-class'],
    queryFn: async () => {
      const res = await axiosPublic.get('/top-class')
      return res.data;
    }
  })

  if (isPending) {
    <LoadingSpinner></LoadingSpinner>
  }
  console.log(topClass.length)

  return (
    <div className='w-11/12 mx-auto mt-20 mb-5'>
      <div className='w-8/12 mx-auto flex flex-col justify-center items-center'>
        <h2 className='text-lg font-extrabold capitalize lg:text-4xl text-[#C70039]'>Our Most Booked Classes</h2>
        <p className='w-[90%] text-md lg:text-lg font-semibold text-center text-gray-500'>Explore our top six most popular classes, ranked by total bookings. Join the favorites and elevate your fitness journey!</p>
      </div>

    </div>
  )
}

export default FeaturedClass
