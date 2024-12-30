import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./Pages/Home"
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from "./Components/Header"
import { ProtectRoutes } from './utils/ProtectRoutes'

function App() {
  return (
    <div className='p-10'>
      
      <BrowserRouter>
      <Header/>
      <Routes>
       
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectRoutes/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
