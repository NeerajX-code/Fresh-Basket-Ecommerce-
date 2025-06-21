import React from 'react'
import { useDispatch } from 'react-redux';
import { asyncUpdateUser } from '../store/actions/userActions';

const CartControl = ({ data, user }) => {
    let dispatch = useDispatch();

    const ItemsDecreaseHandler = (id) => {
        let copyUser = {
            ...user,
            cart: user?.cart?.map((item) => ({ ...item }))
        }
        const x = copyUser?.cart?.findIndex((c) => c.productId == id);
        console.log(x);

        if (x !== -1) {
            copyUser.cart[x].quantity = copyUser.cart[x].quantity - 1;
        }
        console.log(copyUser.cart[x])
        if (copyUser?.cart[x].quantity == 0) copyUser.cart.splice(x, 1);
        console.log(copyUser.cart)
        dispatch(asyncUpdateUser(copyUser));
    }

    const itemsIncreaseHandler = (id) => {
        let copyUser = {
            ...user,
            cart: user?.cart?.map((item) => ({ ...item }))
        }
        const x = copyUser.cart.findIndex((c) => c.productId == id)
        console.log(x);
        copyUser.cart[x].quantity = copyUser.cart[x].quantity + 1;
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

    return (
        <>
            {user ? (
                user.cart?.findIndex((c) => c.productId === data.id) === -1 ? (
                    <button
                        onClick={() => AddToCartHandler(data.id)}
                        className="bg-green-600 px-3 py-1 rounded-lg text-sm"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={() => ItemsDecreaseHandler(data.id)}
                            className="w-[25px] h-[25px] rounded-[4px] text-2xl bg-[#322e36ce] flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="text-xl">
                            {user?.cart?.find((c) => c.productId === data.id)?.quantity}
                        </span>
                        <button
                            onClick={() => itemsIncreaseHandler(data.id)}
                            className="w-[25px] h-[25px] rounded-[4px] text-2xl bg-[#322e36ce] flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                )
            ) : (
                <button
                    onClick={() => alert("Please login to add to cart")}
                    className="bg-green-600 px-3 py-1 rounded-lg text-sm text-white"
                >
                    Add to Cart
                </button>
            )}
        </>
    )
}

export default CartControl