import React from 'react'
import { useForm } from 'react-hook-form';
import { asyncCreateProduct } from '../../store/actions/productActions';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';

const CreateProduct = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
 const {register ,reset , handleSubmit , formState:{errors}} = useForm();
  const CreateProductHandler = (data) =>{
    data.id = nanoid();
    console.log(data);
    reset(); 
    dispatch(asyncCreateProduct(data));//This is an action that will be dispatched to the store
    navigate("/products");
  }
  return (
    <div className='w-full h-[90%] text-white text-[20px] px-4 py-2 flex flex-col justify-center items-center gap-4' style={{fontFamily : "Lexend"}}>
      <h1 className='text-4xl'>Create Product</h1>
      <form className='w-1/2 flex flex-col gap-4 justify-start max-[720px]:w-[100%]' onSubmit={handleSubmit(CreateProductHandler)}>
         <input className='w-full bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("image", { required: "Enter your password" })} type="text" placeholder='Image Url' /> 
        <input className='w-full bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("title", { required: "Enter your email" })} type="text" placeholder='Enter Title' />
        <div className='w-full flex justify-between items-center gap-1'>
        <input className='w-[60%] bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("price", { required: "Enter your password" })} type="number" placeholder='Enter Price' />
         <p className='text-2xl max-[720px]:text-[14px]'>Category:</p>
         <select  {...register("category", { required: "Enter Category" })} className='w-fit appearance-none text-center max-[720px]:text-xl bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' name="" id="">
          <option value="vegetable">Vegetable</option>
          <option value="fruit">Fruit</option>
          <option value="exotic">Exotic</option>
          </select>    
          </div>

         <textarea className='w-full h-[200px] bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl resize-none backdrop-blur-2xl' {...register("description", { required: "Enter Description" })} type="text" placeholder='Enter Description' />

        <input className='w-fit rounded-xl mx-auto bg-[#ffffff75] py-3 px-6' type="submit" value={"Submit"} />
      </form>
    </div>
  )
}

export default CreateProduct