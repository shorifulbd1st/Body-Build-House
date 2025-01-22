import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoStarSharp } from "react-icons/io5";
import { MdSportsGymnastics } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TrainerBooking = () => {
    const { i, id } = useParams()
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [trainer, setTrainer] = useState([])
    const location = useLocation();
    const from = location.state || { from: { pathname: "/" } };

    // console.log(from)
    // if (from.from?.classID) {
    //     console.log(from.from?.classID)
    // }
    // else {
    //     console.log('null')
    // }
    useEffect(() => {
        const trainerFun = async () => {
            const { data } = await axiosSecure.get(`/trainer/${id}`);
            // console.log(data)
            setTrainer(data)
        }
        trainerFun()
    }, [])
    const { _id, photoURL, name, age, experience, skill, availableDays, availableTime, biography, slotName, slotTime, selectClass, socialMedia } = trainer;
    return (
        <div className='w-11/12 mx-auto my-5 '>
            <h1 className='text-center text-xl font-semibold italic'>Trainer Booked Page</h1>
            <div className='my-5'>
                <div className="card max-w-xl border border-red-500 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 " >
                    <div className="lg:flex  items-center px-6 py-3 bg-gray-900 text-white justify-between">
                        <p><strong>Name : </strong> <span className='text-lg'>{name}</span> </p>
                        <p className='capitalize'><strong>Selected slot : </strong> <span className='text-lg '>{i}</span> </p>
                    </div>
                    <div className="px-4 py-1 h-16 my-5">

                        <div className='flex flex-wrap gap-2 '>
                            <h2><strong>Classes : </strong> </h2>
                            {
                                skill?.map((i, j) =>
                                    i.length <= 20 ?
                                        <div key={j}
                                            className=" p-1  text-xs font-semibold text-white capitalize transition-colors duration-300 transform bg-green-800 rounded hover:bg-green-700 dark:hover:bg-green-600 focus:bg-green-700 dark:focus:bg-green-600 focus:outline-none"
                                        >
                                            {i}
                                        </div>
                                        : ''
                                )
                            }
                        </div>
                    </div>
                    <div className='my-4 text-center '>
                        <Link to={`/trainerDetails/${_id}`}
                            className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                        >
                            know more
                        </Link>
                    </div>
                </div>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <div className="border-2 border-blue-500 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex justify-center -mt-16 md:justify-end">
                        <div className='flex justify-center items-center gap-2 mt-2'>
                            <div
                                className=" p-2 text-md font-semibold text-white uppercase transition-colors duration-300 transform bg-green-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                            >
                                Trainer
                            </div>
                            <div className='w-20 h-20'>
                                <img
                                    className="object-cover object-[40%_8%] w-full h-full border-2 border-red-500 rounded-full dark:border-blue-400"
                                    alt="Testimonial avatar"
                                    src={trainer?.photoURL}
                                />
                            </div>
                        </div>
                    </div>
                    <h2 className="mt-2 text-xl text-center italic font-extrabold text-gray-800 dark:text-white md:mt-0">
                        Basic Membership
                    </h2>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Access to gym facilities during regular operating 2 hours.</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Use of cardio and strength training equipment.</p>
                    </div><div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Access to locker rooms and showers.</p>
                    </div>
                    <div className='mt-5'>
                        <button
                            className=" p-2 text-lg font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                        >
                            Price: $10
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Link to={`/payment/${'basic'}/${i}/${id}`}
                            state={{ from: from.from }}
                            className="text-lg capitalize font-medium text-blue-600 dark:text-blue-300"
                            tabIndex={0}
                            role="link"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
                <div className="border-2 border-blue-500 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex justify-center -mt-16 md:justify-end">
                        <div className='flex justify-center items-center gap-2 mt-2'>
                            <div
                                className=" p-2 text-md font-semibold text-white uppercase transition-colors duration-300 transform bg-green-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                            >
                                Trainer
                            </div>
                            <div className='w-20 h-20'>
                                <img
                                    className="object-cover object-[40%_8%] w-full h-full border-2 border-red-500 rounded-full dark:border-blue-400"
                                    alt="Testimonial avatar"
                                    src={trainer?.photoURL}
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                        Standard Membership
                    </h2>

                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> All benefits of the basic membership.</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Access to group fitness classes such as yoga, spinning, and Zumba.</p>
                    </div><div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Use of additional amenities like a sauna or steam room.</p>
                    </div>
                    <div className='mt-3'>
                        <button
                            className=" p-2 text-lg font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                        >
                            Price: $50
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Link to={`/payment/${'standard'}/${i}/${id}`}
                            state={{ from: from.from }}
                            className="text-lg capitalize font-medium text-blue-600 dark:text-blue-300"
                            tabIndex={0}
                            role="link"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
                <div className="border-2 border-blue-500  w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex justify-center -mt-16 md:justify-end">
                        <div className='flex justify-center items-center gap-2 mt-2'>
                            <div
                                className=" p-2 text-md font-semibold text-white uppercase transition-colors duration-300 transform bg-green-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                            >
                                Trainer
                            </div>
                            <div className='w-20 h-20'>
                                <img
                                    className="object-cover object-[40%_8%] w-full h-full border-2 border-red-500 rounded-full dark:border-blue-400"
                                    alt="Testimonial avatar"
                                    src={trainer?.photoURL}
                                />
                            </div>
                        </div>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                        Premium Membership
                    </h2>

                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> All benefits of the standard membership.</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Access to personal training sessions with certified trainers.</p>
                    </div><div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        <p className='flex items-center gap-1'><span className='text-3xl'><MdSportsGymnastics /></span> Discounts on additional services such as massage therapy or nutrition counseling.</p>
                    </div>
                    <div className='mt-4'>
                        <button
                            className=" p-2 text-lg font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                        >
                            Price: $100
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Link to={`/payment/${'premium'}/${i}/${id}`}
                            state={{ from: from.from }}
                            className="text-lg  capitalize font-medium text-blue-600 dark:text-blue-300"
                            tabIndex={0}
                            role="link"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TrainerBooking

