import React, { useEffect, useState } from 'react'
import { Link, Links, useLocation, useParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import SocialButtons from '../../components/Shared/SocialButtons';
import { CgGym } from "react-icons/cg";
import useAxiosSecure from '../../hooks/useAxiosSecure';

import { MdSportsGymnastics } from "react-icons/md";
const TrainerDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [trainer, setTrainer] = useState([])
    const location = useLocation();
    const newForm = location.state || '/';

    // console.log('trainerDetails', newForm)

    useEffect(() => {
        const trainerFun = async () => {
            const { data } = await axiosSecure.get(`/trainer/${id}`);
            // console.log(data)
            setTrainer(data)
        }
        trainerFun()
    }, [])
    // console.log(trainer)
    if (!trainer) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(trainer)
    const { photoURL, name, age, experience, skill, availableDays, availableTime, biography, slotName, slotTime, selectClass, socialMedia } = trainer;

    // console.log(photoURL)
    return (


        <div className="w-11/12 mx-auto my-5">
            <div className="w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 border-2 hover:border-blue-400 transition duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column: Image and Description */}
                    <div>
                        <img
                            className="object-cover w-full h-[650px] rounded-xl p-2 run-image-area-img"
                            src={photoURL}
                            alt="Article"
                        />
                        <p className="font-semibold text-gray-800 dark:text-white text-2xl p-2">Biography:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 p-2">{biography}</p>
                    </div>

                    {/* Right Column: Details and Facilities */}
                    <div className="p-6">
                        {/* Header: Name and Price */}
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Trainer</span>
                            <span className="font-semibold text-gray-800 dark:text-white text-xl">Experience: {experience} years</span>
                        </div>

                        {/* Skills Section */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white text-2xl">Skills:</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skill?.map((i, j) => (
                                    i.length <= 20 ? (
                                        <div
                                            key={j}
                                            className="p-1 text-xs font-semibold text-white capitalize transition-colors duration-300 transform bg-green-800 rounded hover:bg-green-700 dark:hover:bg-green-600 focus:bg-green-700 dark:focus:bg-green-600 focus:outline-none"
                                        >
                                            {i}
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>

                        {/* Available Days Section */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white text-2xl">Available Days:</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {availableDays?.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="hover:scale-110 transition duration-1000 ease-in-out p-1 text-md text-white uppercase transform bg-blue-800 rounded dark:hover:bg-blue-600 focus:bg-blue-700 dark:focus:bg-blue-600 focus:outline-none"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white text-2xl">Connect:</h3>
                            <div className="flex items-center gap-4 mt-2">
                                <a
                                    href="http://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="text-3xl fab fa-facebook text-[#1877F2] "></i>
                                </a>
                                <a
                                    href="http://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="text-3xl fab fa-twitter text-[#1877F2] "></i>
                                </a>
                                <a
                                    href="http://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="text-3xl fab fa-linkedin text-[#1877F2] "></i>
                                </a>
                            </div>
                        </div>

                        {/* Booking Button */}
                        {/* <div className="mt-6 text-center">
                            {booking === true ? (
                                <button
                                    disabled
                                    className="cursor-not-allowed px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                                >
                                    Unavailable
                                </button>
                            ) : (
                                <button
                                    onClick={handleBook}
                                    className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                                >
                                    Book Now
                                </button>
                            )}
                        </div> */}
                        <div className="my-2">
                            <p className='text-2xl font-semibold'>Available Slot : </p>
                            <div className="w-full flex gap-2 text-center ">

                                {
                                    Array.isArray(slotName) && slotName.length > 0 ? slotName.map((i, j) =>
                                        <Link key={j} to={`/trainer-booking/${i}/${id}`} state={{ from: newForm }}
                                            className="px-4 py-3 text-lg font-semibold text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                        >
                                            {i}
                                        </Link>
                                    ) : <span className="px-2 py-2 w-full text-lg font-semibold text-white capitalize transition-colors duration-300 transform bg-red-800 rounded hover:bg-red-700 dark:hover:bg-red-600 focus:bg-red-700 dark:focus:bg-gray-600 focus:outline-none">Slot is empty</span>
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:w-6/12 mx-auto my-5 flex flex-col justify-center items-center text-center'>
                <div className="card  border border-red-500 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 " >


                    <div className=' my-4 flex flex-col justify-center items-center gap-4'>
                        <div className='text-lg px-5'>Turn your passion into a career! Join Body Build House and inspire others on their fitness journey. Start today! 💪</div>
                        <div className="flex items-center">
                            <img
                                className="object-cover w-16 h-16 -mx-3 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                src="https://images.pexels.com/photos/10765194/pexels-photo-10765194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="User 1"
                            />
                            <img
                                className="object-cover w-16 h-16 -mx-3 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                src="https://images.pexels.com/photos/6684836/pexels-photo-6684836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="User 2"
                            />
                            <img
                                className="object-cover w-16 h-16 -mx-3 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                src="https://images.pexels.com/photos/6050426/pexels-photo-6050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="User 3"
                            />
                            <img
                                className="object-cover w-16 h-16 -mx-3 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                src="https://images.pexels.com/photos/26903608/pexels-photo-26903608/free-photo-of-portrait-of-man-in-black-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="User 4"
                            /> <img
                                className="object-cover w-16 h-16 -mx-3 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                src="https://images.pexels.com/photos/20591481/pexels-photo-20591481/free-photo-of-portrait-of-brunette-man-in-red-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="User 4"
                            />
                            {/* <p className="flex items-center justify-center w-16 h-16 -mx-3 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                +4
                            </p> */}
                        </div>
                        <Link to={`/addTrainer`}
                            className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none flex justify-center items-center"
                        >
                            become a trainer <span><img width="30" height="30" src="https://img.icons8.com/dusk/64/arrow.png" alt="arrow" /></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>








    )
}

export default TrainerDetails

