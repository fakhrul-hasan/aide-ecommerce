import EmployeeTable from '@/components/EmployeeTable';
import React from 'react';

const page = () => {
    return (
        <div className='p-4'>
            <h3 className='font-medium text-3xl text-[#9155fd]'>All Employee</h3>
            <EmployeeTable />
        </div>
    );
};

export default page;