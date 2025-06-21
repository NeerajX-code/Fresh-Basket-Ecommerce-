import React from 'react'
import { data, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { asyncregisterUser } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

const Register = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const registerHandler = (data) => {
    console.log(data);
    data.id = nanoid();
    data.cart = [];
    data.isAdmin = false;
    reset();
    dispatch(asyncregisterUser(data))
  }

  return (
    <div className='w-full h-[90%] text-white flex flex-col gap-4 justify-center items-center' style={{ fontFamily: "Lexend" }}>
      <div className='w-[400px] h-fit p-4 flex flex-col justify-center max-[480px]:w-full gap-2 items-center rounded-2xl bg-[#08191b]'>
        <h1 className='text-3xl mb-4 max-[480px]:text-xl'>Register Here</h1>
        <form className='w-[80%] flex flex-col gap-3 max-[1080px]:w-[90%] items-center justify-center' onSubmit={handleSubmit(registerHandler)}>
          <input className='w-full bg-[#ffffff75] max-[480px]:text-[14px] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("username", { required: "Enter your Username" })} type="text" placeholder='Enter Your Email Here' />
          <input className='w-full bg-[#ffffff75] max-[480px]:text-[14px] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("email", { required: "Enter your email" })} type="email" placeholder='Enter Your Email Here' />
          <input className='w-full bg-[#ffffff75] max-[480px]:text-[14px]  py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("password", { required: "Enter your password" })} type="password" placeholder='Enter Password Here' />
          <input className='w-full mt-1 bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' type="submit" value={"Submit"} />
        </form>
        <p className='max-[1080px]:text-[12px]'>already have an account? <Link className='text-green-400' to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register