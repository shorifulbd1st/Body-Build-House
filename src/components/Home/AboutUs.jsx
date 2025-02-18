import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import { easeOut } from 'motion'
const AboutUs = () => {
    return (
        <div className='w-11/12 mx-auto mt-20 mb-10'>
            <div className='lg:flex gap-8 '>
                <div className='hidden relative  lg:w-1/2 lg:flex justify-center items-center'>
                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500" className='absolute w-96 top-20 left-0 z-20'>
                        <img className='rounded-xl border-l-4 border-b-2 border-[#C70039]' src="https://images.pexels.com/photos/4720254/pexels-photo-4720254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div data-aos="fade-down"
                        data-aos-duration="2000" className='absolute w-72 top-0 right-0 z-30'>
                        <img className='rounded-xl border-r-4 border-b-2 border-[#C70039]' src="https://images.pexels.com/photos/2995480/pexels-photo-2995480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="1500" className='absolute w-72 bottom-0 right-0'>
                        <img className='rounded-xl border-b-4 border-r-2 border-[#C70039]' src="https://images.pexels.com/photos/6046978/pexels-photo-6046978.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:hidden gap-3'>
                    <div data-aos="fade-up"
                        data-aos-duration="1500" className=''>
                        <img className='rounded-xl border-l-4 border-b-2 border-[#C70039]' src="https://images.pexels.com/photos/4720254/pexels-photo-4720254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500" className=''>
                        <img className='rounded-xl border-r-4 border-b-2 border-[#C70039]' src="https://images.pexels.com/photos/2995480/pexels-photo-2995480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="1500" className=''>
                        <img className='rounded-xl border-b-4 border-r-2 border-[#C70039]' src="https://images.pexels.com/photos/6046978/pexels-photo-6046978.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                </div>
                <div className='lg:w-1/2 flex flex-col gap-3 p-2'>
                    <h2 className='text-3xl text-[#C70039] font-semibold animate__animated animate__backInRight animate__delay-2s '>About Us</h2>
                    <p className='text-xl font-extrabold'> Giving Good health To Good People</p>
                    <p className='text-gray-600 ml-3'>Once you choose to begin your training journey, we'll ensure you receive the best fitness program tailored to your needs. Our team of sports experts, combined with the latest fitness equipment, creates the perfect environment for achieving your gym goals</p>
                    <p className='text-gray-600 flex items-center gap-2 ml-3'><span className='text-[#C70039]'><FaArrowRight /></span> 2,000+ locations open (and we're just getting started!)</p>
                    <p className='text-gray-600 flex items-center gap-2 ml-3'><span className='text-[#C70039]'><FaArrowRight /></span> Unique concept that combines fitness and technology</p>
                    <p className='text-gray-600 flex items-center gap-2 ml-3'><span className='text-[#C70039]'><FaArrowRight /></span> We have small studios designed for the large groups</p>
                    <p className='text-gray-600 flex items-center gap-2 ml-3'><span className='text-[#C70039]'><FaArrowRight /></span> 1800+ franchises awarded in 30 countries worldwide</p>
                    <div className="mt-5">
                        <Link to="/all-classes" className="px-2 py-3  w-full text-center  mt-4 text-sm font-medium hover:border-b-4  tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#C70039] rounded-md hover:bg-[#C70039] focus:outline-none focus:ring focus:ring-[#C70039]  focus:ring-opacity-40 sm:mt-0 sm:mx-2">Explore our all class</Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AboutUs
