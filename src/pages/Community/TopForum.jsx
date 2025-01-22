import React, { useContext } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AuthContext } from '../../providers/AuthProvider';
const TopForum = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: topForum = [], isPending, refetch } = useQuery({
        queryKey: ['topForum'],
        queryFn: async () => {
            const res = await axiosSecure.get('/top-NewForum');
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
            <h2 className='text-lg font-extrabold capitalize lg:text-4xl text-[#C70039] text-center my-3'>Discover our latest news</h2>
            <p className='text-gray-500 w-7/12 mx-auto text-center mb-8'>At Body Build House, we’re committed to empowering fitness enthusiasts with cutting-edge tools, inspiring stories, and expert advice. Our mission is to help you achieve your body goals and lead a healthier, stronger life. Today, we’re thrilled to share some exciting updates and initiatives happening within our community.</p>
            {/* <h1 className='text-'></h1> */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    topForum.map((item, idx) =>
                        <div key={idx} className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <img
                                className="object-cover object-center w-full h-56"
                                src={item.image}
                                alt="avatar"
                            />
                            <div className="flex items-center px-6 py-3 bg-gray-900">
                                <h1 className="mx-3 text-lg font-semibold text-white">{item.forumTitle}</h1>
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
                                    {/* <button onClick={() => handleLike('dislike', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiDislike /></span>  {item.downVote}</p>
                                    </button> */}
                                    <button
                                        onClick={() => handleLike('dislike', item._id)}
                                        className={`flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${user ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!user}
                                    >
                                        <p className="mx-1 flex justify-center items-center gap-3">
                                            <span className="text-2xl"><BiDislike /></span> {item.downVote}
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => handleLike('like', item._id)}
                                        className={`flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${user ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!user}
                                    >
                                        <p className="mx-1 flex justify-center items-center gap-3">
                                            <span className="text-2xl"><BiLike /></span> {item.upVote}
                                        </p>
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

export default TopForum
