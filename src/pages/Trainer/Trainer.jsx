import React from 'react'
import { CgGym } from "react-icons/cg";
import { MdSportsGymnastics } from "react-icons/md";
import SocialButtons from '../../components/Shared/SocialButtons';
import { Link } from 'react-router-dom';

const Trainer = ({ trainer }) => {
    const { _id, photoURL, name, age, experience, skill, availableDays, availableTime, biography, slotName, slotTime, selectClass, socialMedia } = trainer;
    return (
        <div className=''>
            <div className="card w-full overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 border-blue-500" >
                <div className="w-full h-[400px]  overflow-hidden">
                    <img
                        className="w-full h-full  hover:rounded-xl cursor-pointer object-fit image-area  hover:scale-90 transition duration-1000 ease-in-out"
                        src={photoURL}
                        alt="avatar"
                    />
                </div>
                <div className="flex items-center px-6 py-3 bg-gray-900">
                    <div className="mx-3 text-lg font-semibold text-white flex justify-start items-center -ml-3">
                        <span className='text-3xl'><MdSportsGymnastics /></span> <p>{name} </p>
                        <div>
                            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-facebook text-[#1877F2] hover:text-white"></i></a>
                            <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-twitter text-[#1877F2] hover:text-white"></i></a>
                            <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><i className=" text-3xl ml-4 fab fa-linkedin text-[#1877F2] hover:text-white"></i></a>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-1 h-24">
                    <h2><strong>Skill : </strong> </h2>
                    <div className='flex flex-wrap gap-2 '>
                        {
                            skill?.slice(0, 8)?.map((i, j) =>
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
                    <Link to={`/trainerDetails/${_id}`}
                        className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                    >
                        know more
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Trainer
