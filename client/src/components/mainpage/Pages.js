import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../login/Login'
import Register from '../login/Register'
import Dashboard from './expenses/Dashboard'

const Pages = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/home' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default Pages
