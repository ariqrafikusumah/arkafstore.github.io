import React from 'react'
import Banner from '../assets/img/banner-arkafstore.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Carousel() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner} alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default Carousel