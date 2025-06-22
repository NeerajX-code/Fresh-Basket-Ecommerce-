import React from 'react'
import { useDispatch, useStore } from 'react-redux';
import { loadproducts } from '../store/reducers/productSlice';
import { asyncLoadProduct } from '../store/actions/productActions';

const ProductFilters = () => {
    const store = useStore();
    const dispatch = useDispatch();

    const searchHandler = (input) => {
        const keyword = input.toLowerCase().trim();

        if (keyword === "") {
            dispatch(asyncLoadProduct());
            return;
        }

        dispatch(asyncLoadProduct()).then(() => {
            const allProducts = store.getState().productReducer.products;
            const filtered = allProducts?.filter((product) => product.title.toLowerCase().includes(keyword));
            dispatch(loadproducts(filtered));
        })
    }

    function categoryHandler(e) {
        const input = e.target.value.trim().toLowerCase();
        if (input === "") {
            dispatch(asyncLoadProduct());
            return;
        }
        if (input === "vegetable" || input === "fruit" || input === "exotic") {
            // Reload all products, then filter after products are updated in the store
            dispatch(asyncLoadProduct()).then(() => {
                // Get latest products from store
                const latest = store.getState().productReducer.products;
                console.log(latest)
                const filtered = latest.filter(p => p.category === input);
                console.log(filtered)
                dispatch(loadproducts(filtered));
            });
        } else {
            dispatch(asyncLoadProduct());
        }
    }

    const underHandler = (checked) => {
        if (checked) {
            dispatch(asyncLoadProduct()).then(() => {
                const allProducts = store.getState().productReducer.products
                const filtered = allProducts.filter((f) => f.price <= 2);
                dispatch(loadproducts(filtered));
            })
        } else {
            dispatch(asyncLoadProduct());
        }
    };

    const aboveHandler = (checked) => {
        if (checked) {
            dispatch(asyncLoadProduct()).then(() => {
                const allProducts = store.getState().productReducer.products;
                const filtered = allProducts?.filter((f) => f.price > 2);
                dispatch(loadproducts(filtered));
            })
        } else {
            dispatch(asyncLoadProduct());
        }
    };

    return (
        <div className='flex max-[940px]:flex-col max-[940px]:gap-4 max-[370px]:w-[98%] max-[430px]:pl-[10px] max-[630px]:justify-items-center max-[700px]:mx-0 max-[700px]:pr-0 py-2 mx-5 pr-4 justify-between items-center' style={{ fontFamily: "Josefin Sans" }}>
            <input
                onInput={(e) => searchHandler(e.target.value)}
                className='bg-[#ffffff75] w-fit py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl max-[940px]:w-full'
                type="text"
                placeholder='Search Products'
            />

            <form className='flex gap-1 flex-wrap justify-between text-white items-center max-[640px]:text-[12px] max-[640px]:w-full'>
                <div className='flex justify-center items-center max-[720px]:w-full'>
                    <h2>Filters</h2>
                    <select onChange={categoryHandler} className='py-2 px-3 rounded-md outline-0'>
                        <option className='bg-gray-600' value="">Select Options</option>
                        <option className='bg-gray-600' value="vegetable">Vegetables</option>
                        <option className='bg-gray-600' value="fruit">Fruits</option>
                        <option className='bg-gray-600' value="exotic">Exotic</option>
                    </select>
                </div>

                {/* Price Filter */}
                <div className='text-center flex gap-2 items-center flex-wrap justify-center max-[720px]:w-full'>
                    <p>By Price</p>
                    <input type="checkbox" id="under2" onChange={(e) => underHandler(e.target.checked)} />
                    <label htmlFor="under2">Under - 2$</label>

                    <input type="checkbox" id="above2" onChange={(e) => aboveHandler(e.target.checked)} />
                    <label htmlFor="above2">Above - 2$</label>
                </div>
            </form>
        </div>
    )
}

export default ProductFilters