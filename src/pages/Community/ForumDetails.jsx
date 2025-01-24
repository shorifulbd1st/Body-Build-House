import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAxiosPublic from '../../hooks/useAxiosPublic';

import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const ForumDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: forum = [], isPending, refetch } = useQuery({
        queryKey: ['Forum-details'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/forum-details/${id}`);
            return res.data;
        }
    })
    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(forum)
    const handleLike = async (str, id) => {
        if (str === 'like') {
            const like = true;
            const res = await axiosSecure.patch(`/forum-update/${id}`, { like })
            // console.log(res)
            refetch();
        }
        else {
            const like = false;
            const res = await axiosSecure.patch(`/forum-update/${id}`, { like })

            refetch();
        }
    }
    return (
        <div className='w-11/12 mx-auto my-8'>
            <div className="max-w-screen-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 border-2 border-blue-500">
                <img
                    className="object-cover w-full h-64"
                    src={forum.image}
                    alt="Article"
                />
                <div className="p-6">
                    <div>
                        {/* <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                            Product
                        </span> */}
                        <p
                            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                            tabIndex="0"

                        >
                            {forum.forumTitle}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{forum.formDetails}
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img
                                    className="object-cover h-16 w-16 rounded-full"
                                    src={forum.UserPhoto}
                                    alt="Avatar"
                                />
                                <a
                                    href="#"
                                    className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                                    tabIndex="0"
                                    role="link"
                                >
                                    {forum.userName}
                                </a>
                            </div>

                        </div>
                        <div className='flex gap-4 my-4'>
                            {/* <button onClick={() => handleLike('dislike', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiDislike /></span>  {item.downVote}</p>
                                                                    </button> */}
                            <button
                                onClick={() => handleLike('dislike', forum._id)}
                                className={`flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80 ${user ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 cursor-not-allowed'
                                    }`}
                                disabled={!user}
                            >
                                <p className="mx-1 flex justify-center items-center gap-3">
                                    <span className="text-2xl"><BiDislike /></span> {forum.downVote}
                                </p>
                            </button>
                            <button
                                onClick={() => handleLike('like', forum._id)}
                                className={`flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${user ? 'bg-green-600 hover:bg-green-500' : 'bg-green-400 cursor-not-allowed'
                                    }`}
                                disabled={!user}
                            >
                                <p className="mx-1 flex justify-center items-center gap-3">
                                    <span className="text-2xl"><BiLike /></span> {forum.upVote}
                                </p>
                            </button>


                        </div>
                    </div>
                </div>
            </div>;

        </div>
    )
}

export default ForumDetails
