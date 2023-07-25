import AddEmployee from '@/components/AddEmployee';
import React from 'react';

const page = () => {
    return (
        <div className='p-4'>
            <h3 className='font-medium text-3xl text-[#9155fd]'>Add Employee</h3>
            <AddEmployee />
        </div>
    );
};

export default page;