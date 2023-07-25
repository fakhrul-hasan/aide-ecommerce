import React from 'react';
import ProductsTable from '@/components/ProductsTable';

const page = () => {
    return (
        <div className='p-4'>
            <h3 className='font-medium text-3xl text-[#9155fd]'>All Products</h3>
            <ProductsTable />
        </div>
    );
};

export default page;