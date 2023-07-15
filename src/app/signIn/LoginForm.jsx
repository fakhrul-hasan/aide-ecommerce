'use client';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
        } = useForm();
        const {signIn} = useAuth();
        const onSubmit = (data)=>{
            console.log(data);
            signIn(data.email, data.password)
            .then(result=>{
                const loggedUser = result.user;
                console.log(loggedUser);
                reset();
                router.push('/');
                toast.success('Login Successfully!')
            })
            .catch(error=>{
                console.error(error);
            })
        }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body content">
        <div className="form-control w-1/2 mx-auto">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" id="email" name="email" className="input input-bordered" {...register('email', {required: true})} />
          {errors.email && (
            <span className="text-red-500 text-base mt-1">
                Please enter your email
            </span>
          )}
        </div>
        <div className="form-control w-1/2 mx-auto">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" id="password" name="password" className="input input-bordered" {...register('password', {required: true, minLength: 6})} />
          {errors.password && (
            <span className="text-red-500 text-base mt-1">
                Please enter a password
            </span>
          )}
          <label className="label justify-start gap-2">
           New User?
            <Link href="/signUp" className="label-text-alt link link-hover">Sign up here</Link>
          </label>
        </div>
        <div className="form-control mt-6 w-1/2 mx-auto">
          <button className="btn bg-[#008ecc] text-white">Login</button>
        </div>
      </form>
    );
};

export default LoginForm;