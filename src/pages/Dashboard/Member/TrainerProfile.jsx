import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { MdSportsGymnastics } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const TrainerProfile = ({ trainer }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { _id, photoURL, name, age, experience, skill, availableDays, availableTime, biography, slotName, slotTime, selectClass, socialMedia } = trainer;
    const axiosSecure = useAxiosSecure();
    const { user, loading, notify } = useContext(AuthContext);
    const navigate = useNavigate();
    const { data: userData = [], isPending } = useQuery({
        queryKey: ['trainer-profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`);
            return res.data;
        }
    })

    if (isPending || loading) {
        return <LoadingSpinner></LoadingSpinner>
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
            name: userData?.name,
            email: userData?.email,
            trainerEmail: trainer.email,
            review,

        }
        console.log(info)
        const res = axiosSecure.post('/testimonial', info)
        // if (res.data.insertedId) {
        notify('success', 'Review successful for testimonial')
        closeModal();
        navigate('/')
        // }
        // closeModal();
    }







    return (
        <div>
            <div className="card w-full overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 border-blue-500" >
                <div className="w-full h-[400px]  overflow-hidden">
                    <img
                        className="w-full h-full  hover:rounded-xl cursor-pointer object-fit image-area  hover:scale-90 transition duration-1000 ease-in-out"
                        src={photoURL}
                        alt="avatar"
                    />
                </div>
                {/* <div className="flex items-center px-6 py-3 bg-gray-900">
                    <div className="mx-3 text-lg font-semibold text-white flex justify-start items-center -ml-3">
                        <span className='text-3xl'><MdSportsGymnastics /></span> <p>{name} </p>
                        <div>
                            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-facebook text-[#1877F2] hover:text-white"></i></a>
                            <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-twitter text-[#1877F2] hover:text-white"></i></a>
                            <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-linkedin text-[#1877F2] hover:text-white"></i></a>
                        </div>
                    </div>
                </div> */}
                <div className='px-4'>
                    <h2><strong>Years of Experience : </strong> {experience}</h2>
                    <h2 className='h-16'><strong>Available slots : </strong> {slotName?.map((item, idx) => <span className="hover:scale-110 transition duration-1000 ease-in-out  p-1 text-xs mr-2 text-white uppercase  transform bg-blue-800 rounded  dark:hover:bg-blue-600 focus:bg-blue-700 dark:focus:bg-blue-600 focus:outline-none" >{item}</span>)}</h2>
                </div>
                <div className="px-4 py-1 h-24">
                    <h2><strong>Skill : </strong> </h2>
                    <div className='flex flex-wrap gap-2 '>
                        {
                            skill?.slice(0, 5)?.map((i, j) =>
                                i.length <= 20 ?
                                    <div key={j}
                                        className=" p-1  text-xs font-semibold text-white capitalize transition-colors duration-300 transform bg-green-800 rounded hover:bg-green-700 dark:hover:bg-green-600 focus:bg-green-700 dark:focus:bg-green-600 focus:outline-none"
                                    >
                                        {i}
                                    </div>
                                    : ''
                            )
                        }
                    </div>
                </div>
                <div className='my-4 text-center flex justify-center items-end'>
                    <button onClick={openModal}
                        className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                    >
                        Review button
                    </button>
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
                                {/* <div className="flex items-center justify-center mx-auto">
                                                <img
                                                    className="h-64 rounded-lg"
                                                    src={photoURL}
                                                    alt="Modal Content"
                                                />
                                            </div> */}

                                <form onSubmit={handleReview}>
                                    <div className="mb-5 col-span-2 px-3">
                                        <label className="capitalize block text-lg font-medium text-gray-700 ">
                                            review
                                        </label>
                                        <textarea
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            rows="4"
                                            name="review"
                                            placeholder='write your rejection feedback'
                                        ></textarea>
                                    </div>
                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2 px-2">
                                        <button onClick={() => setIsOpen(false)} type='submit' className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                            close
                                        </button><button type='submit' className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
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

export default TrainerProfile
