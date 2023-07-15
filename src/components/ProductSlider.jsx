'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { decreaseFromCart, getProductCart } from '@/utilities/fakeDb';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ProductSlider = () => {
  const cart = getProductCart();
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);

  useEffect(()=>{
    fetch('products.json')
  .then(res=>res.json())
  .then(data=>setData(data))
  },[show, cart])

  const handleAddToCart = (id) =>{
    let productCart = getProductCart();
    const quantity = productCart[id];
    if(!quantity){
      productCart[id] = 1;
    }else{
      const newQuantity = quantity +1;
      productCart[id] = newQuantity;
    }
    localStorage.setItem('product-cart', JSON.stringify(productCart));
  }
  const existingCart=(id, price)=>{
    if(cart.hasOwnProperty(id)){
      const cartItem = cart[id];
      const totalPrice = price * cartItem;
      return <span className='flex justify-around'>
        <span>
          <p className='text-gray-400 text-xs'>Total</p>
          <p className='text-xs'>&#2547;<span className='font-medium'>{totalPrice}</span></p>
        </span>
        <span className='flex items-center gap-4'>
          <button onClick={()=>decreaseFromCart(id)}>-</button>
          <p className='text-[#008ecc]'>{cartItem}</p>
          <button onClick={()=>handleAddToCart(id)} className='text-[#008ecc]'>+</button>
        </span>
      </span>;
    }else{
      return <button onClick={()=>handleAddToCart(id)} className='font-medium text-[#008ecc] table-cell align-middle'>Add to cart</button>;
    }
  }
    
    return (
        <div className='w-full my-8 swiper-container'>
          <div className='flex justify-between w-full'>
          <h3 className='font-medium uppercase text-2xl absolute'>Trending Now</h3>
          <input className='absolute right-16 text-sm font-medium text-[#008ecc] cursor-pointer z-20' onClick={()=> setShow(!show)} type="button" value={`See ${show ? 'less':'all'}`} />
          </div>
{
  show ? <div className='grid grid-cols-5'>
  {
    data.map(product=><div key={product.id} className='border flex justify-center flex-col w-48 mt-12 bg-gray-100 p-2'>
    <Image className='mx-auto bg-gray-100' src={product.image} alt="" width={150} height={300} />
    <p>{product.productName}</p>
    <p className='text-gray-400 text-xs'>{product.variant}</p>
    <h6 className='font-medium text-[#008ECC]'><span className='text-xl'>&#2547;</span>{product.price}</h6>
    <span className='border-2 border-[#008ecc] mt-1 text-center h-9'>
            {
              existingCart(product.id, product.price)
            }
          </span>
    </div>)
  }
</div> : <Swiper
      spaceBetween={5}
      slidesPerView={5}
      navigation
    >
      {
        data.map(product=><SwiperSlide key={product.id}>
          <div className='border flex justify-center flex-col w-48 mt-12 bg-gray-100 p-2'>
          <Image className='mx-auto bg-gray-100 h-auto w-auto' src={product.image} alt="" width={150} height={300} />
          <p>{product.productName}</p>
          <p className='text-gray-400 text-xs'>{product.variant}</p>
          <h6 className='font-medium text-[#008ECC]'><span className='text-xl'>&#2547;</span>{product.price}</h6>
          <span className='border-2 border-[#008ecc] mt-1 text-center h-9'>
            {
              existingCart(product.id, product.price)
            }
          </span>
          </div>
        </SwiperSlide>)
      }
    </Swiper>
}
    </div>
    );
};

export default ProductSlider;