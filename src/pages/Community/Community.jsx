import React, { useContext } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import SingleForum from './SingleForum';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Community = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const { data: allForum = [], isPending, refetch } = useQuery({
        queryKey: ['NewForum'],
        queryFn: async () => {
            const res = await axiosSecure.get('/NewForum');
            return res.data;
        }
    })

    if (isPending || loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
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
        <div className='w-11/12 mx-auto my-5 '>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    allForum.map((item, idx) =>
                        <div key={idx} className="card w-full border-b-2 border-[#C70039]  max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
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
                                    {
                                        item.role === 'admin' ? <img width="48" height="48" src="https://img.icons8.com/color/48/warranty.png" alt="warranty" /> : ''
                                    }
                                </div>

                                <p className="py-2 text-gray-700 dark:text-gray-400">
                                    {item.formDetails.slice(0, 100)} <Link to={`/forumDetails/${item._id}`} className='text-blue-600'>.....details</Link>
                                </p>
                                {/* <div className='flex gap-4'>
                                    <button onClick={() => handleLike('dislike', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiDislike /></span>  {item.downVote}</p>
                                    </button><button onClick={() => handleLike('like', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiLike /></span>  {item.upVote} </p>
                                    </button>

                                </div> */}
                                <div className='flex gap-4'>
                                    {/* <button onClick={() => handleLike('dislike', item._id)} class="flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                                                        <p class="mx-1 flex justify-center items-center gap-3"><span className='text-2xl'><BiDislike /></span>  {item.downVote}</p>
                                                                    </button> */}
                                    <button
                                        onClick={() => handleLike('dislike', item._id)}
                                        className={`flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80 ${user ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 cursor-not-allowed'
                                            }`}
                                        disabled={!user}
                                    >
                                        <p className="mx-1 flex justify-center items-center gap-3">
                                            <span className="text-2xl"><BiDislike /></span> {item.downVote}
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => handleLike('like', item._id)}
                                        className={`flex items-center px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${user ? 'bg-green-600 hover:bg-green-500' : 'bg-green-400 cursor-not-allowed'
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

export default Community
