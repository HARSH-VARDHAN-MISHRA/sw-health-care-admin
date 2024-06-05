import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'

const Home = () => {
  return (
    <>
    
      <Header/>
      <div className="rightside">
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard/>}/>

          {/* Category --  */}
          <Route path={"/all-category"} element={<AllCategory/>}/>
          <Route path={"/add-category"} element={<AddCategory/>}/>
          <Route path={"/edit-category/:id"} element={<EditCategory/>}/>

          {/* Product --  */}
          <Route path={"/all-product"} element={<AllProduct/>}/>
          <Route path={"/add-product"} element={<AddProduct/>}/>
          <Route path={"/edit-product/:id"} element={<EditCategory/>}/>

        </Routes>
      </div>

    </>
  )
}

export default Home