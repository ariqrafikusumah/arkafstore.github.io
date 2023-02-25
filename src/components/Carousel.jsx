import React from 'react'
import Banner from '../assets/img/banner-arkafstore.png'
import Banner2 from '../assets/img/banner-arkafstore-2.png'
import Banner3 from '../assets/img/banner-arkafstore-3.png'
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
                    <img className='rounded-xl' src={Banner2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-xl' src={Banner3} alt="" />
                </SwiperSlide>
                {/* <SwiperSlide>
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
                </SwiperSlide> */}
            </Swiper>
        </>
    )
}

export default Carousel