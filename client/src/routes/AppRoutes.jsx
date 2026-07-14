import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Admin from '../pages/Admin'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import AdminRoute from '../components/AdminRoute'
import ProtectedRoute from '../components/ProtectedRoute'
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>


       {/*  <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        /> */}
        <Route path='/admin/add-product' element={<AddProduct />} />
        <Route path='/admin/edit-product/:id' element={<EditProduct />} />
      </Routes>
    </div>
  )
}

export default AppRoutes