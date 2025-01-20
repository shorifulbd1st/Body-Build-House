import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import LoadingSpinner from '../../components/Shared/LoadingSpinner';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useApplyTrainer from '../../hooks/useApplyTrainer';
const ApplyTrainer = () => {
    // Sample data - In a real app, this would come from your MongoDB through an API
    const [isAdmin, isPending] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const [applyTrainer, applyIsPending, refetch] = useApplyTrainer();

    if (applyIsPending) {
        <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='w-11/12 mx-auto my-8'>
            <section className="w-full mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white capitalize"> total applications for Trainer</h2>
                    <span className="px-3 py-1 text-md text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{applyTrainer?.length} users</span>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                    <span>Image and Name</span>
                                                </div>
                                            </th>


                                            <th scope="col" className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address

                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Details</th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {applyTrainer.map((member) => (
                                            <tr key={member._id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <div className="flex items-center gap-x-2">
                                                            <img referrerPolicy="no-referrer" className="object-cover w-20 h-20 rounded-full" src={member.photoURL} alt={member.name} />
                                                            <div>
                                                                <h2 className="font-medium text-gray-800 dark:text-white text-lg">{member.name}</h2>
                                                                {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{member.username}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>



                                                <td className="px-4 py-4 text-lg text-gray-500 dark:text-gray-300 whitespace-nowrap">{member.email}</td>
                                                <td className="px-4 py-4 text-lg text-gray-500 dark:text-gray-300 whitespace-nowrap">

                                                    <Link to={`/dashboard/apply-trainer-details/${member._id}`} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                                                        Details
                                                    </Link>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="flex items-center justify-between mt-6">
                <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>previous</span>
                </button>

                <div className="items-center hidden lg:flex gap-x-3">
                    <button className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</button>
                    <button className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</button>
                    <button className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</button>
                    <button className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</button>
                    <button className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</button>
                    <button className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</button>
                    <button className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</button>
                </div>

                <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div> */}
            </section>
        </div>
    );
};

export default ApplyTrainer;