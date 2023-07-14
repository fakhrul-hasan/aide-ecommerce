'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ProductSlider = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('products.json')
  .then(res=>res.json())
  .then(data=>setData(data))
  },[])
    return (
        <div className='w-full my-8 swiper-container'>
          <h3 className='font-medium uppercase text-2xl absolute'>Trending Now</h3>
      <Swiper
      spaceBetween={5}
      slidesPerView={5}
      navigation
    >
      {
        data.map(product=><SwiperSlide key={product.id}>
          <div className='border flex justify-center flex-col w-48 mt-12 bg-gray-100 p-2'>
          <Image className='mx-auto bg-gray-100' src={product.image} alt="" width={150} height={300} />
          <p>{product.productName}</p>
          <p className='text-gray-400 text-xs'>{product.variant}</p>
          <h6 className='font-medium text-[#008ECC]'><span className='text-xl'>&#2547;</span>{product.price}</h6>
          </div>
        </SwiperSlide>)
      }
    </Swiper>
    </div>
    );
};

export default ProductSlider;