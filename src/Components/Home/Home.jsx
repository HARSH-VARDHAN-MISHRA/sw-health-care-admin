import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import AllBanner from '../../Pages/Banners/AllBanner'
import AddBanner from '../../Pages/Banners/AddBanner'
import EditBanner from '../../Pages/Banners/EditBanner'
import AllShopBanner from '../../Pages/ShopBanner/AllShopBanner'
import AddShopBanner from '../../Pages/ShopBanner/AddShopBanner'
import EditShopBanner from '../../Pages/ShopBanner/EditShopBanner'
import AllTags from '../../Pages/Tags/AllTags'
import AddTag from '../../Pages/Tags/AddTag'
import EditTag from '../../Pages/Tags/EditTag'

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
          <Route path={"/all-products"} element={<AllProduct/>}/>
          <Route path={"/add-product"} element={<AddProduct/>}/>
          <Route path={"/edit-product/:id"} element={<EditCategory/>}/>

          
          {/* --- Orders --- */}
          {/* <Route path={"/all-orders"} element={<EditCategory/>}/> */}

          {/* --- Coupons --- */}
          {/* <Route path={"/all-coupons"} element={<EditCategory/>}/> */}

          {/* --- Tags --- */}
          <Route path={"/all-tags"} element={<AllTags/>}/>
          <Route path={"/add-tag"} element={<AddTag/>}/>
          <Route path={"/edit-tag/:id"} element={<EditTag/>}/>

          {/* --- Banners --- */}
          <Route path={"/all-banners"} element={<AllBanner/>}/>
          <Route path={"/add-banner"} element={<AddBanner/>}/>
          <Route path={"/edit-banner/:id"} element={<EditBanner/>}/>

          {/* --- Banners --- */}
          <Route path={"/all-shop-banners"} element={<AllShopBanner/>}/>
          <Route path={"/add-shop-banner"} element={<AddShopBanner/>}/>
          <Route path={"/edit-shop-banner/:id"} element={<EditShopBanner/>}/>

          



{/* all-shop */}

        </Routes>
      </div>

    </>
  )
}

export default Home