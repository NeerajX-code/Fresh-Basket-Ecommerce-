import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Products = lazy(() => import('../pages/Products'))
const Cart = lazy(() => import('../pages/cart'))
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const UserDetails = lazy(() => import('../pages/user/UserDetails'))

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