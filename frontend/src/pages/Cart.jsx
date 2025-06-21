import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncUpdateUser } from '../store/actions/userActions';

const cart = () => {
  const user = useSelector((state) => state.user.user);
  const Products = useSelector((state) => state.productReducer.products);

   let dispatch = useDispatch();

  const ItemsDecreaseHandler = (id) => {
    let copyUser = {
      ...user,
      cart: user.cart.map((item) => ({ ...item }))
    }
    const x = copyUser.cart.findIndex((c) => c.productId == id);
    console.log(x);

    if (x !== -1) {
      copyUser.cart[x].quantity = copyUser.cart[x].quantity - 1;
    }
    console.log(copyUser.cart[x])
    if(copyUser.cart[x].quantity == 0) copyUser.cart.splice(x,1);
    console.log(copyUser.cart)
    dispatch(asyncUpdateUser(copyUser));
  }

  const itemsIncreaseHandler = (id) => {
     let copyUser = {
      ...user,
      cart: user.cart.map((item) => ({ ...item }))
    }
    const x = copyUser.cart.findIndex((c) => c.productId == id)
    console.log(x);
    copyUser.cart[x].quantity = copyUser.cart[x].quantity + 1 ;
    dispatch(asyncUpdateUser(copyUser));
  }

  const AddToCartHandler = (id) => {
    let copyUser = { ...user, cart: [...user.cart] }
    const x = copyUser.cart.find((c) => c.id == id)
    console.log(x);
    if (x) {

    }
    else {
      copyUser.cart.push({
        productId: id,
        quantity: 1
      })
      dispatch(asyncUpdateUser(copyUser))
    }
  }

  let renderItems = user.cart?.map((data) => {
    const product = Products.find((p) => p.id === data?.productId)
    return (
      <div className='w-[90%] h-[25%] rounded-2xl p-4 max-[630px]:p-2 flex justify-between bg-[#efefe35f] backdrop-blur-lg' key={data.productId} style={{ fontFamily: "Lexend" }}>
        <div className='w-[50%] flex gap-2 text-xl'>
          <img className='w-[120px] object-cover max-[630px]:w-[100px] aspect-square rounded-xl' src={product?.image} alt={product?.title || "Product"} />
          <div className='max-[630px]:text-[10px] flex flex-col gap-1 justify-center'>
            <h1>{product?.title}</h1>
            <h3 className='text-black'>Category: {product?.category}</h3>
            <p>Price: {product?.price}</p>
          </div>
        </div>
        <div className='h-full flex items-center'>
            {user.cart.findIndex((c) => c.productId === data.productId) === -1 ? (
          <button onClick={() => AddToCartHandler(data.id)}>Add to Cart</button>
        ) : (
          <div className='flex gap-2 items-center'>
            <button onClick={() => ItemsDecreaseHandler(data.productId)} className='rounded-[6px] text-3xl bg-[#322e36ce]  backdrop-blur-lg justify- max-[630px]:text-[22px] max-[630px]:text-center items-center w-[32px] h-[32px]'>-</button>
            <button className='text-2xl max-[630px]:text-[14px]'>{user.cart[user.cart.findIndex((c) => c.productId == data.productId)].quantity}</button>
            <button onClick={() => (itemsIncreaseHandler(data.productId))} className='rounded-[6px] text-3xl bg-[#322e36ce] backdrop-blur-lg justify-center max-[630px]:text-[22px] items-center  w-[32px] h-[32px]'>+</button>
          </div>
        )}
        </div>
      </div>
    );
  });

  return (
   user?.cart?.length > 0 ? <div className='w-full h-[90%] flex flex-col p-2 gap-4 items-center overflow-auto'>{renderItems}</div> : <div className='w-full h-[90%] text-white flex justify-center items-center'>
    <h2 className='text-2xl font-semibold' style={{fontFamily:"Josefin Sans"}}>Add Items</h2>
   </div>
  )
}

export default cart