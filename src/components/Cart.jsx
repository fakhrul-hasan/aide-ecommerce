import { decreaseFromCart, getProductCart, handleAddToCart, removeFromCart } from "@/utilities/fakeDb";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CiTrash } from "react-icons/ci";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const cart = getProductCart();
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [cart]);
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  return (
    <div className="content">
      <h1 className="font-bold text-4xl text-center">Cart Item</h1>
      {Object.keys(cart).map((productId) => {
        const quantity = cart[productId];
        const product = getProductById(Number(productId));

        if (product) {
          const { productName, image, price, id } = product;
          const total = price * quantity;
          return(
            <div key={id} className="flex border p-2 rounded-md w-1/2 mx-auto mb-2">
                <Image src={image} alt="" width={60} height={60} />
                <div className="flex-grow">
                <h4>{productName}</h4>
                <p>Qty: <span onClick={()=>decreaseFromCart(id)} className="text-lg p-1 cursor-pointer">-</span> {quantity} <span onClick={()=>handleAddToCart(id)} className="text-lg p-1 text-[#008ecc] cursor-pointer">+</span></p>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <h6 className="font-medium">Total: &#2547;{total}</h6>
                    <CiTrash onClick={()=>removeFromCart(id)} className="bg-red-500 text-white rounded-full text-xl hover:bg-red-600 cursor-pointer" />
                </div>
            </div>
          )
        }
      })}
    </div>
  );
};

export default Cart;
