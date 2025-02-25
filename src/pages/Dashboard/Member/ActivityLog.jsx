import React, { useContext, useState } from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { div } from 'motion/react-client';


const ActivityLog = () => {
    const axiosPublic = useAxiosPublic();
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading } = useContext(AuthContext);
    const { data: member = [], isPending } = useQuery({
        queryKey: ['member'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainer-register/${user?.email}`)
            return res.data;
        }
    })
    const { data: member1 = [], isPending1 } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/review/${user?.email}`)
            return res.data;
        }
    })
    if (isPending || loading || isPending1) {
        return <LoadingSpinner></LoadingSpinner>
    }
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    // const handleReview = async (e) => {
    //     e.preventDefault();

    //     closeModal();
    // }
    // console.log(member)
    return (
        <div className='w-11/12 mx-auto my-8'>
            <div>
                <section class="container px-4 mx-auto">
                    {/* <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Team members</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">100 users</span>
                </div> */}

                    <div class="flex flex-col mt-6">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead class="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div class="flex items-center gap-x-3">
                                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <span>Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>
                                                <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button class="flex items-center gap-x-2">
                                                        <span>Status</span>

                                                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                        </svg>
                                                    </button>
                                                </th>

                                                {/* <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button class="flex items-center gap-x-2">
                                                    <span>Role</span>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                    </svg>
                                                </button>
                                            </th> */}



                                                {/* <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Teams</th> */}

                                                <th scope="col" class="relative py-3.5 px-4">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {member &&
                                                <tr>
                                                    <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div class="inline-flex items-center gap-x-3">
                                                            <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                                                            <div class="flex items-center gap-x-2">
                                                                {/* <img class="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" /> */}
                                                                <div>
                                                                    <h2 class="font-medium text-gray-800 dark:text-white ">{member.name}</h2>
                                                                    {/* <p class="text-sm font-normal text-gray-600 dark:text-gray-400">@authurmelo</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{member.email}</td>
                                                    <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                                            <h2 className={`text-sm font-normal ${member.status === 'pending' && 'text-emerald-500'}`}> {member.status} </h2>
                                                        </div>
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                member1 && <tr>
                                                    <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div class="inline-flex items-center gap-x-3">
                                                            <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                                                            <div class="flex items-center gap-x-2">

                                                                <div>
                                                                    <h2 class="font-medium text-gray-800 dark:text-white ">{member1.name}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{member1.email}</td>
                                                    <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div class="">
                                                            {/* <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> */}

                                                            <button onClick={openModal} className={`text-lg px-3 bg-red-600 py-2 rounded-xl text-white font-semibold ${member1.status === 'reject' && 'text-red-500'}`}> {member1.status} </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
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
                                {/* <div className="flex items-center justify-center mx-auto">
                                    <img
                                        className="h-64 rounded-lg"
                                        src={photoURL}
                                        alt="Modal Content"
                                    />
                                </div> */}

                                <div className="mt-2 text-center py-3">
                                    <h2 className='text-lg font-semibold text-center text-red-400'>Admin reject feedback</h2>
                                    <p
                                        className="text-md text-justify px-3"
                                    >
                                        {member1.review}
                                    </p>

                                    {/* <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        This blog post has been published. Team members will be able to
                                        edit this post.
                                    </p> */}
                                </div>




                                <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2 px-2">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 sm:mx-2 w-full py-2.5 text-lg font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors bg-green-500 duration-300 transform border border-gray-300 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                    >
                                        close
                                    </button>

                                    {/* <button   className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                            Confirm
                                        </button> */}
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ActivityLog
