import React from 'react';
import SignUpForm from './SignUpForm';
import { Toaster } from 'react-hot-toast';

const page = () => {
    return (
        <>
        <div>
            <h3 className='font-bold text-center text-5xl'>Sign Up Now</h3>
        </div>
        <SignUpForm />
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </>
    );
};

export default page;