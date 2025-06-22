import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteProduct, asyncUpdateProduct } from '../store/actions/productActions';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import CartControl from '../components/CartControl';

const ProductDetails = () => {
    let { id } = useParams();
    let navigate = useNavigate();

    let products = useSelector((state) => state.productReducer.products)
    let product = products.find((p) => p.id == id);
    let dispatch = useDispatch();

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product, reset]);

    const UpdateProductHandler = (data) => {
        dispatch(asyncUpdateProduct(data));
    }

    const DeleteHandler = (id) => {
        dispatch(asyncDeleteProduct(id));
        navigate("/products")
    }

    return (
        <div className='w-full h-[90%] px-10 flex items-center max-[760px]:px-5' style={{ fontFamily: "Lexend" }}>
            <div className='w-full flex justify-center overflow-scroll items-center max-[760px]:h-full max-[760px]:flex-wrap'>

                <div className='w-1/3 pt-5 max-[760px]:flex justify-center max-[760px]:w-[50%] max-[760px]:pt-4'>
                    <img className='w-[90%] aspect-square rounded-2xl object-cover' src={product?.image} alt="" />
                </div>

                <div className='w-[500px] h-full flex flex-col items-center justify-start pt-6 gap-4 max-[760px]:w-[50%] max-[760px]:h-fit max-[760px]:py-2'>

                    {/* Product Title */}
                    <h1 className='text-4xl pt-2 font-semibold text-center max-[760px]:text-base'>
                        {product?.title}
                    </h1>

                    {/* Category & Price */}
                    <div className='w-full flex flex-col items-center gap-1 text-2xl text-center max-[760px]:text-xs'>
                        <p><span className="font-medium">Category:</span> {product?.category}</p>
                        <p><span className="font-medium">Price:</span> ${product?.price}</p>
                    </div>

                    {/* Description */}
                    <p className='w-[85%] text-center text-xl max-[760px]:text-[10px]'>
                        {product?.description}
                    </p>

                    {/* Add to Cart Button */}
                    <CartControl data={product} />
                </div>

                <div className='w-1/3 flex flex-col items-center gap-4 max-[760px]:w-full max-[760px]:pt-8'>
                    <h1 className='text-3xl'>Update Product</h1>
                    <form className='w-[95%] flex flex-col gap-4 justify-center items-center' onSubmit={handleSubmit(UpdateProductHandler)}>
                        <input className='w-full bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("image", { required: "Enter your password" })} type="text" placeholder='Image Url' />
                        <input className='w-full bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' {...register("title", { required: "Enter your email" })} type="text" placeholder='Enter Title' />
                        <div className='w-full flex justify-between items-center gap-[5px]'>
                            <input className='w-[40%] bg-[#ffffff75] py-3 px-6 max-[1080px]:text-[12px] outline-0 rounded-2xl backdrop-blur-2xl' {...register("price", { required: "Enter your password" })} type="number" placeholder='Enter Price' />
                            <p className='text-xl max-[720px]:text-[10px]'>Category:</p>
                            <select {...register("category", { required: "Enter Category" })} className='w-fit appearance-none text-center max-[1080px]:text-[12px] text-black bg-[#ffffff75] max-[1080px]:py-2 max-[1080px]px-4  py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' name="" id="">
                                <option className='text-black' value="vegetable">Vegetable</option>
                                <option className='text-black' value="fruit">Fruit</option>
                                <option value="exotic">Exotic</option>
                            </select>
                        </div>

                        <textarea className='w-full h-[200px] bg-[#ffffff75] py-3 px-6 outline-0 rounded-2xl resize-none backdrop-blur-2xl' {...register("description", { required: "Enter Description" })} type="text" placeholder='Enter Description' />

                        <div className='w-full flex gap-2'>
                            <input className='w-1/2 bg-[#7af71be7] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' type="submit" value={"Submit"} />
                            <button type='button' className='w-1/2 bg-[#fb3a3aeb] py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl' onClick={() => DeleteHandler(product.id)}>Delete</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default ProductDetails