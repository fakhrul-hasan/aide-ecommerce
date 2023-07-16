'use client';
const getProductCart = ()=>{
    let productCart = {};
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('product-cart');
        if(storedCart){
            productCart = JSON.parse(storedCart);
        }
      }
    return productCart;
}

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

const decreaseFromCart = id =>{
    let productCart = getProductCart();
    const quantity = productCart[id];
    if(quantity>1){
        const newQuantity = quantity - 1;
        productCart[id] = newQuantity;
    }else if(quantity>0){
        delete productCart[id];
    }
    localStorage.setItem('product-cart', JSON.stringify(productCart));
}

const removeFromCart = id =>{
    const productCart = getProductCart();
    if(id in productCart){
        delete productCart[id];
        localStorage.setItem('product-cart', JSON.stringify(productCart));
    }
}

export{
    getProductCart,
    handleAddToCart,
    decreaseFromCart,
    removeFromCart,
}