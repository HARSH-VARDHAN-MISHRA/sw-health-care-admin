import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'

const Home = () => {
  return (
    <>
    
      <Header/>
      <div className="rightside">
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard/>}/>

          <Route path={"/all-category"} element={<AllCategory/>}/>

        </Routes>
      </div>

    </>
  )
}

export default Home