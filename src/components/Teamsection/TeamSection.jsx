
import React from 'react';
import useTrainer from '../../hooks/useTrainer';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { div } from 'motion/react-client';

const TeamSection = () => {
    const [allTrainer, isPending] = useTrainer();
    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(allTrainer.length)
    return (
        <div className='w-11/12 mx-auto my-8'>
            <div data-aos="zoom-in"
                data-aos-duration="3000" className='lg:w-8/12 mx-auto flex flex-col justify-center items-center'>
                <h2 className=' font-extrabold capitalize text-4xl text-[#C70039]'>our top trainer</h2>
                <p className='lg:w-[90%] text-md lg:text-lg font-semibold text-center text-gray-500'>Our top trainer inspires success, motivates growth, delivers exceptional knowledge, fosters progress, and ensures results through dedicated guidance</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>

                {
                    allTrainer.slice(0, 3).map((item, idx) =>

                        <div data-aos="fade-up"
                            data-aos-duration="3000" key={idx} className="w-full border border-[#C70039] max-w-md px-4 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            {/* <div className="flex justify-center -mt-16 md:justify-end">
                                <img
                                    className="object-cover w-20 h-20 border-2 border-[#C70039] rounded-full dark:border-blue-400"
                                    alt="Testimonial avatar"
                                    src={item.photoURL}
                                />
                            </div> */}
                            <div className="flex justify-center -mt-16 md:justify-end px-4">
                                <div className='flex justify-center items-center gap-2 mt-2'>
                                    <div
                                        className=" p-2 text-md font-semibold text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                    >
                                        {item.name}
                                    </div>
                                    <div className='w-20 h-20'>
                                        <img
                                            className="object-cover object-[40%_8%] w-full h-full border-2 border-red-500 rounded-full dark:border-blue-400"
                                            alt="Testimonial avatar"
                                            src={item?.photoURL}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                                Design Tools
                            </h2> */}

                            <p className="mt-2 text-md h-20 text-gray-600 dark:text-gray-200">
                                {item.biography}
                            </p>

                            {/* <div className="flex justify-end mt-4">
                                <a
                                    href="#"
                                    className="text-lg font-medium text-blue-600 dark:text-blue-300"
                                    tabIndex="0"
                                    role="link"
                                >
                                    John Doe
                                </a>
                            </div> */}
                            <div className=" py-1 ">
                                <h2><strong>Skill : </strong> </h2>
                                <div className='flex flex-wrap gap-2 '>
                                    {
                                        item.skill?.slice(0, 5)?.map((i, j) =>
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
                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default TeamSection;
