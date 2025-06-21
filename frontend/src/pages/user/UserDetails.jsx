import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from "../../store/actions/userActions";

const UserDetails = () => {
    let { user } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const UpdateUserHandler = (data) => {
        console.log(data);
        reset();
        dispatch(asyncUpdateUser(data));//This is an action that will be dispatched to the store
    }
    const LogoutHandler = () => {
        dispatch(asyncLogoutUser());
        navigate("/")
    }
    const DeleteHandler = (id) => {
        dispatch(asyncDeleteUser(id))
        navigate("/")
    }

    useEffect(() => {
        if (user) reset(user)
    }, [user, reset])

    return (
        <div className="w-full h-[90%] flex flex-col gap-4" style={{ fontFamily: "Lexend" }}>
            <div className="w-full h-fit border-b-2 border-white p-4">
                <h1 className="text-6xl max-[760px]:text-4xl">{user.username}</h1>
                <h3 className="text-3xl max-[760px]:text-xl">{user.email}</h3>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#123939] rounded-2xl gap-4">
                <h1 className="text-4xl max-[480px]:text-2xl">Update User Here</h1>
                <form className='w-[700px] flex flex-col gap-4 items-center max-[720px]:w-[75%] max-[480px]:w-[100%]' onSubmit={handleSubmit(UpdateUserHandler)}>

                    <input className='w-1/2 bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl max-[760px]:w-[80%]' {...register("username", { required: "Enter your Username" })} type="text" placeholder='Enter Your Email Here' />

                    <input className='w-1/2 bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl max-[760px]:w-[80%]' {...register("email", { required: "Enter your email" })} type="email" placeholder='Enter Your Email Here' />

                    <input className='w-1/2 bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl max-[760px]:w-[80%]' {...register("password", { required: "Enter your password" })} type="text" placeholder='Enter Password Here' />
                    <div className="w-[100%] pt-2 flex gap-1 justify-center max-[760px]:text-[12px] max-[760px]:justify-center max-[760px]:gap-1">
                        <input className="bg-[#80f123e9] py-1 px-3 outline-0 rounded-2xl backdrop-blur-2xl" type="submit" value={"Update User"} />


                        <button className="bg-[#f1d923e9] py-1 px-3 outline-0 rounded-2xl backdrop-blur-2xl" type="button" onClick={LogoutHandler} >Logout User</button>
                        <button className="bg-[#f14223e9] py-1 px-3 outline-0 rounded-2xl backdrop-blur-2xl" type="button" onClick={() => DeleteHandler(user.id)} >Delete User</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserDetails