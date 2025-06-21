import { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { asyncLoginUser } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  let { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const loginHandler = (data) => {
    dispatch(asyncLoginUser(data));
    reset();
    navigate("/products")
  }

  // useEffect(() => {
  //   if (user) {
  //     navigate("/products");
  //   }
  // }, [user]);

  return (
    <div className='w-full h-[90%] flex flex-col justify-center text-black items-center' style={{fontFamily: "Lexend"}}>
      <div className='w-[400px] h-fit text-white gap-4 max-[480px]:w-full max-[480px]:h-fit max-[480px]:text-xl rounded-2xl py-2 flex flex-col items-center justify-center px-10 bg-[#08191b]'>
      <h1 className='text-2xl mb-2 max-[480px]:text-xl'>Login Here</h1>
      <form className='w-[100%] flex flex-col max-[480px]:w-full gap-3 items-center' onSubmit={handleSubmit(loginHandler)}>
        <input className='w-full bg-[#ffffff75] max-[480px]:text-[14px] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("email", { required: "Enter your email" })} type="email" placeholder='Enter Your Email Here' />
        <input className='w-full bg-[#ffffff75] max-[480px]:text-[14px] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("password", { required: "Enter your password" })} type="password" placeholder='Enter Password Here' />
        <input className='w-full bg-[#ffffff75] max-[480px]:text-[14px] mt-1 py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' type="submit" value={"Submit"} />
      </form>
      <p className='max-[480px]:text-[12px]'>Don't have an account? <Link className='text-green-400' to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login