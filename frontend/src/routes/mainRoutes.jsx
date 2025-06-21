import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from "../pages/Login"
import Register from "../pages/Register"
import Products from '../pages/Products'
import Cart from '../pages/cart'

import CreateProduct from "../pages/admin/CreateProduct"
import ProductDetails from '../pages/ProductDetails'
import UserDetails from '../pages/user/UserDetails'
import Authwrapper from '../utils/Authwrapper'

const mainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path='/product/details/:id' element={<ProductDetails />} />
      <Route path='/create-product' element={<CreateProduct />} />
      <Route
        path="/user-profile"
        element={
          <Authwrapper>
            <UserDetails />
          </Authwrapper>
        }
      />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default mainRoutes