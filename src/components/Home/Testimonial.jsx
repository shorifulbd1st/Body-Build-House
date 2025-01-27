import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../Shared/LoadingSpinner';

export default function Testimonial() {
    const axiosSecure = useAxiosSecure();
    const { data: testimonials = [], isPending } = useQuery({
        queryKey: ['testimonial'],
        queryFn: async () => {
            const res = await axiosSecure.get('/testimonials')
            return res.data;
        }
    })
    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='w-11/12 mx-auto my-5'>
            <div>
                <h1 className='text-center font-bold text-[#C70039] text-3xl my-5'>Testimonial section</h1>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                {
                    testimonials.map((item, idx) => <SwiperSlide>
                        <div className='border-2 border-red-300  rounded-xl p-3'>
                            <h1><strong>Name: </strong> {item.name} </h1>
                            <p>{item.review.slice(0, 100)}...</p>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
}
