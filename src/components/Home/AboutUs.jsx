import React from 'react'

const AboutUs = () => {
    return (
        <div className='w-11/12 mx-auto my-5'>
            <div className='lg:flex '>
                <div className='lg:w-1/2 flex flex-wrap gap-5'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className='lg:w-1/2'>
                    <h2 className='text-3xl text-[#C70039] font-semibold'>About Us</h2>
                    <p className='text-xl font-extrabold'> Giving Good health To Good People</p>
                    <p className='text-gray-600'>Once you choose to begin your training journey, we'll ensure you receive the best fitness program tailored to your needs. Our team of sports experts, combined with the latest fitness equipment, creates the perfect environment for achieving your gym goals</p>
                    <p className='text-gray-600'>2,000+ locations open (and we're just getting started!)</p>
                </div>

            </div>
        </div>
    )
}

export default AboutUs
