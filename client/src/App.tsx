import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Items from './pages/Items'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import SingleItem from './pages/SingleItem'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/items/:itemId" element={<SingleItem />} />
        <Route path="registration" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
