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
    const [isOpen, setIsOpen] = useState(false);

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

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const handleReview = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const review = form.get('review')
        const info = {
            name,
            email, review,
            status: 'reject'
        }
        const res = axiosSecure.post('/review', info)
        console.log(res)
        closeModal();
    }
    return (
        <div className='w-11/12 mx-auto my-8 '>
            <div className="max-w-2xl mx-auto card border-b-4 border-blue-600 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className='h-[600px]'>
                    <img
                        className="object-cover w-full h-full rounded-t-xl"
                        src={photoURL}
                        alt="Article"
                    />
                </div>
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
                        <button onClick={openModal}
                            className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-red-800 rounded  dark:hover:bg-red-600 focus:bg-red-700 dark:focus:bg-red-600 focus:outline-none"
                        >
                            Reject request
                        </button>
                    </div>
                </div>
            </div>


            <div className="relative flex justify-center ">

                {isOpen && (
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto "
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className=" flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>

                            <div className="border border-[#C70039] relative inline-block overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 my-8  py-5 sm:w-full ">
                                <div className="flex items-center justify-center mx-auto">
                                    <img
                                        className="h-64 rounded-lg"
                                        src={photoURL}
                                        alt="Modal Content"
                                    />
                                </div>

                                <div className="mt-5 text-center py-3">
                                    <h3
                                        className="text-lg font-medium text-gray-800 dark:text-white"
                                        id="modal-title"
                                    >
                                        User Name: {name}
                                    </h3>

                                    {/* <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        This blog post has been published. Team members will be able to
                                        edit this post.
                                    </p> */}
                                </div>
                                <div className="ml-2" >
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

                                    {/* <div className="mt-4 pr-2 pb-4">
                                        <p><strong>Biography : </strong>
                                            <span className='text-justify'> {biography}</span>
                                        </p>

                                    </div> */}
                                </div>
                                <form onSubmit={handleReview}>
                                    <div className="mb-4 col-span-2 px-3">
                                        <label className="block text-lg font-medium text-gray-700 capitalize">
                                            rejection feedback
                                        </label>
                                        <textarea
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            rows="4"
                                            name="review"
                                            placeholder='write your rejection feedback'
                                        ></textarea>
                                    </div>

                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2 px-2">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        >
                                            Cancel
                                        </button>

                                        <button type='submit' className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default ApplyTrainerDetails
