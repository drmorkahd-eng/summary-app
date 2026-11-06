import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Display from './components/Display'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'

const App = () => {
  return (
    <>
    
      <Navbar />

      <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App