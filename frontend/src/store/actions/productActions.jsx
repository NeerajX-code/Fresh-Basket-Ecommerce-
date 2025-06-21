import axios from "../../utils/axios";
import { loadproducts } from "../reducers/productSlice";

export const asyncLoadProduct = () => async (dispatch,getState) =>{
    try {
        let products = await axios.get("/products")
        dispatch(loadproducts(products.data));
    } catch (error) {
        console.log(error)
    }
}

export const asyncCreateProduct = (product) => async (dispatch,getState) => {
    try {
        await axios.post("/products",product);
        dispatch(asyncLoadProduct());
    } catch (error) {
        console.log(error)
    }
}

export const asyncUpdateProduct = (product) => async (dispatch,getState) => {
    try{
        await axios.patch(`/products/${product.id}`,product);
        dispatch(asyncLoadProduct());
    }
    catch(error){
        console.log(error)
    }
}

export const asyncDeleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`/products/${id}`);
        dispatch(asyncLoadProduct());
    } catch (error) {
        console.error("Failed to delete product:", error);
    }
};
