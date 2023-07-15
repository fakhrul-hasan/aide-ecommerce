'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import groceries from '../../public/Groceries-Transparent-Images-PNG.png';
import groceries2 from '../../public/53982-2-grocery-png-image-high-quality.png';

import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const Banner = () => {
  
  return (
    <div className='w-full'>
      <Swiper
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div className='w-full h-[60vh] bg-lime-400 flex justify-center items-center gap-8 px-12'>
      <div className='w-1/2'>
        <h2 className='uppercase text-6xl font-medium text-white'><span className='text-[#fae883]'>Fresh Produce </span><br />& groceries everyday</h2>
        <button className='bg-[#fae883] px-6 py-2 uppercase font-medium text-green-500 my-2'>see more</button>
      </div>
        <Image className='w-1/2 h-auto' src={groceries} alt='' width={400} height={400} priority />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full h-[60vh] bg-lime-400 flex justify-center items-center gap-8 px-12'>
      <div className='w-1/2 '>
        <h2 className='uppercase text-6xl font-medium text-white'><span className='text-[#fae883]'>Fresh Produce </span><br />& groceries everyday</h2>
        <button className='bg-[#fae883] px-6 py-2 uppercase font-medium text-green-500 my-2'>see more</button>
      </div>
        <Image className='w-1/2 h-auto' src={groceries2} alt='' width={400} height={400} priority />
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default Banner;
