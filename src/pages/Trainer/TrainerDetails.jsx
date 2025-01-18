import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import SocialButtons from '../../components/Shared/SocialButtons';
import { CgGym } from "react-icons/cg";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TrainerDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [trainer, setTrainer] = useState([])
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
        <LoadingSpinner></LoadingSpinner>
    }
    const { photoURL, name, age, experience, skill, availableDays, availableTime, biography, slotName, slotTime, selectClass, socialMedia } = trainer;

    // console.log(photoURL)
    return (
        <div className='w-11/12 mx-auto my-8 '>
            <section className="bg-white dark:bg-gray-900 border-2 border-blue-500 rounded-lg overflow-hidden">
                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-2'>
                        <div className='col-span-4 border border-r-red-500'>
                            <div className="flex flex-col items-center justify-center w-full mx-auto">
                                <div className="w-full h-[36rem] pt-3 object-cover rounded-2xl shadow-md "
                                >
                                    <img className='h-full w-full rounded-xl ' src={photoURL} alt="" />
                                </div>

                                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                                    <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                                        {name}
                                    </h3>

                                    <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">

                                        <SocialButtons></SocialButtons>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5 border border-blue-500 py-5'>
                            <div className="flex flex-col items-center justify-center w-full mx-auto">
                                <div className="w-full  bg-center bg-cover rounded-lg shadow-md">
                                    <h2><strong>Name :</strong> {name}</h2>
                                    <h2><strong>Age : </strong> {age} Years</h2>
                                    <h2><strong>Experience : </strong> {experience} Years</h2>
                                    <h2><strong>Skill : </strong> </h2>
                                    {
                                        skill?.map((i, j) => <p key={j} className='ml-8  flex items-center gap-1'><span className='text-2xl'><CgGym /></span>{i}</p>)
                                    }
                                    <div className='flex gap-2'>
                                        <h2><strong> Available Days: </strong> </h2>
                                        {
                                            availableDays?.map((i, j) =>
                                                <button key={j}
                                                    className=" px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                                >
                                                    {i}
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>


                            </div></div>
                        <div className='col-span-3'>
                            <div className="flex flex-col items-center justify-center w-full  mx-auto">
                                <div className="w-full flex flex-col gap-2 text-center h-64 ">
                                    {
                                        slotName?.map((i, j) =>
                                            <Link key={j} to={`/trainer-booking/${i}/${id}`}
                                                className="px-2 py-2 w-full text-lg font-semibold text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                            >
                                                {i}
                                            </Link>
                                        )
                                    }
                                </div>


                            </div></div>
                    </div>
                    <div></div>
                </div>
            </section>
        </div>
    )
}

export default TrainerDetails

