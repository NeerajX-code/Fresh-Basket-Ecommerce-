import React from 'react'
import { useForm } from 'react-hook-form';
import { asyncCreateProduct } from '../../store/actions/productActions';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';

const CreateProduct = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const CreateProductHandler = (data) => {
    data.id = nanoid();
    console.log(data);
    dispatch(asyncCreateProduct(data));
    reset();//This is an action that will be dispatched to the store
    navigate("/products");
  }
  return (
    <div className='w-full h-[90%] text-white text-[20px] px-4 py-2 flex flex-col justify-center items-center gap-4' style={{ fontFamily: "Lexend" }}>
      <h1 className='text-4xl'>Create Product</h1>
      <form className='w-1/2 flex flex-col gap-4 justify-start max-[720px]:w-[100%]' onSubmit={handleSubmit(CreateProductHandler)}>
        <input
          className='w-full bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl'
          {...register("image", { required: "Image URL is required" })}
          type="text"
          placeholder='Image Url'
        />
        {errors.image && <span className="text-red-500">{errors.image.message}</span>}

        <input
          className='w-full bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl'
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder='Enter Title'
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}

        <div className='w-full flex justify-between items-center gap-1'>
          <input
            className='w-[60%] bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl'
            {...register("price", { required: "Price is required" })}
            type="number"
            placeholder='Enter Price'
          />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          <p className='text-2xl max-[720px]:text-[14px]'>Category:</p>
          <select
            {...register("category", { required: "Category is required" })}
            className='w-fit appearance-none text-center max-[720px]:text-xl bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl'
          >
            <option value="">Select Category</option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="exotic">Exotic</option>
          </select>
        </div>
        {errors.category && <span className="text-red-500">{errors.category.message}</span>}

        <textarea
          className='w-full h-[200px] bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl resize-none backdrop-blur-2xl'
          {...register("description", { required: "Description is required" })}
          type="text"
          placeholder='Enter Description'
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <input className='w-fit rounded-xl mx-auto bg-[#ffffff75] py-3 px-6' type="submit" value={"Submit"} />
      </form>
    </div>
  )
}

export default CreateProduct