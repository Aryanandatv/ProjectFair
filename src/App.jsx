import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css'
import {Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import Auth from './pages/Auth';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { TokenAuthContext } from '../Context Api/AuthContext';
import { useContext } from 'react';


import './App.css'

function App() {
   const {authStatus,setAuthStatus}=useContext(TokenAuthContext)
  

  return (
    <>
      {/* <h1>project fair</h1> */}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/projects' element={authStatus?<Projects/>:<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
