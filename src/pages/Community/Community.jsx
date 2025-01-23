import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import SingleForum from './SingleForum';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
const Community = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allForum = [], isPending, refetch } = useQuery({
        queryKey: ['NewForum'],
        queryFn: async () => {
            const res = await axiosSecure.get('/NewForum');
            return res.data;
        }
    })
    if (isPending) {
        <LoadingSpinner></LoadingSpinner>
    }
    const handleLike = async (str, id) => {
        if (str === 'like') {
            const like = true;
            const res = await axiosSecure.patch(`/forum-update/${id}`, { like })
            console.log(res)
            refetch();
        }
        else {
            const like = false;
            const res = await axiosSecure.patch(`/forum-update/${id}`, { like })

            refetch();
        }
    }
    return (
        <div className='w-11/12 mx-auto my-5 '>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    allForum.map((item, idx) =>
                        <div key={idx} className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <img
                                className="object-cover object-center w-full h-56"
                                src={item.image}
                                alt="avatar"
                            />
                            <div className="flex items-center px-6 py-3 bg-gray-900">
                                <h1 className="-ml-2 text-lg font-semibold text-white">{item.forumTitle}</h1>
                            </div>

                            <div className="px-2 py-4">
                                <div className='flex items-center gap-2'>
                                    <img className='w-16 h-16 rounded-full' src={item.UserPhoto} alt="" />
                                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {item.userName}
                                    </h1>
                                </div>

                                <p className="py-2 text-gray-700 dark:text-gray-400">
                                    {item.formDetails.slice(0, 250)}.....
                                </p>
                                <div className='flex gap-4'>
                                    <button onClick={() => handleLike('dislike', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiDislike /></span>  {item.downVote}</p>
                                    </button><button onClick={() => handleLike('like', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiLike /></span>  {item.upVote} </p>
                                    </button>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Community
