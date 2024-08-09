import { useState,useContext, Children } from 'react'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'


function App() {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login" />
    }

     else return children
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home'element={
          <ProtectedRoute>
            <Home /> 
           </ProtectedRoute>}
            />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
