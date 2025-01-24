import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import SocialButtons from '../../components/Shared/SocialButtons';
import { CgGym } from "react-icons/cg";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useApplyTrainer from '../../hooks/useApplyTrainer';
import { MdSportsGymnastics } from 'react-icons/md';
import { AuthContext } from '../../providers/AuthProvider';

const ApplyTrainerDetails = () => {
    const { id } = useParams();
    const { notify } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [applyTrainer, applyIsPending, refetch] = useApplyTrainer()
    const navigate = useNavigate();
    const { data: trainer = [], isPending } = useQuery({
        queryKey: ['apply-trainer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/apply-trainers/${id}`)
            return res.data;
        }
    })
    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const { name, email, photoURL, age, experience, availableTime, biography, skill, availableDays } = trainer;
    const userInfo = {
        name, email, photoURL, age, experience, availableTime, biography, skill, availableDays, status: 'accepted'
    };
    const acceptRequest = () => {
        axiosSecure.patch(`/user/${email}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    notify('success', 'This user is now a trainer');
                    axiosSecure.delete(`/apply-trainers/${id}`)
                    axiosSecure.post('/trainer', userInfo)
                    refetch();
                    navigate('/dashboard')
                }
            })
    }
    const rejectRequest = () => {

    }
    return (
        <div className='w-11/12 mx-auto my-8 '>
            <div className="max-w-2xl mx-auto card border-b-4 border-blue-600 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <img
                    className="object-cover w-full h-64 rounded-t-xl"
                    src={photoURL}
                    alt="Article"
                />
                <div className="flex items-center justify-between px-6 py-3 bg-gray-900">
                    <div>
                        <p className='text-2xl capitalize text-white'>User Name: {name} </p>
                    </div>
                    <div className="mx-3 text-lg font-semibold text-white flex justify-between items-center -ml-3">
                        <div>
                            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-facebook text-[#1877F2] hover:text-white"></i></a>
                            <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-twitter text-[#1877F2] hover:text-white"></i></a>
                            <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-linkedin text-[#1877F2] hover:text-white"></i></a>
                        </div>
                    </div>
                </div>

                <div className="ml-6">
                    <p><strong>Email : </strong> <span className='text-lg'>{email}</span></p>
                    <p><strong>Age : </strong> <span className='text-lg'>{age} Years</span></p>
                    <p><strong>Available Time : </strong> <span className='text-lg'>{availableTime} Hours</span></p>
                    <p><strong>Experience : </strong> <span className='text-lg'>{experience} Years</span></p>
                    <h2 className="py-1">
                        <strong>Available Days : </strong>
                        <span className='flex flex-wrap gap-2'>
                            {
                                availableDays?.map((i, j) =>
                                    i.length <= 20 ?
                                        <span key={j}
                                            className=" p-2 text-md font-semibold text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:gray:bg-green-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                        >
                                            {i}
                                        </span>
                                        : ''
                                )
                            }
                        </span>

                    </h2> <div className="py-1 h-24">
                        <h2><strong>Skills : </strong>
                            <span className=' flex flex-wrap gap-2'>
                                {
                                    skill?.map((i, j) =>
                                        i.length <= 20 ?
                                            <span key={j}
                                                className=" p-1 text-xs font-semibold text-white capitalize transition-colors duration-300 transform bg-green-800 rounded hover:bg-green-700 dark:hover:bg-green-600 focus:bg-green-700 dark:focus:bg-green-600 focus:outline-none"
                                            >
                                                {i}
                                            </span>
                                            : ''
                                    )
                                }
                            </span>
                        </h2>
                    </div>

                    <div className="mt-4 pr-2 pb-4">
                        <p><strong>Biography : </strong>
                            <span className='text-justify'> {biography}</span>
                        </p>

                    </div>
                </div>
            </div>

            <div className='my-5 '>
                <div className="card mx-auto max-w-xl border border-red-500 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 " >


                    <div className='my-4 text-center space-x-4'>
                        <button onClick={acceptRequest}
                            className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-green-800 rounded  dark:hover:bg-green-600 focus:bg-green-700 dark:focus:bg-green-600 focus:outline-none"
                        >
                            Accept request
                        </button>
                        <button onClick={rejectRequest}
                            className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-red-800 rounded  dark:hover:bg-red-600 focus:bg-red-700 dark:focus:bg-red-600 focus:outline-none"
                        >
                            Reject request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyTrainerDetails

