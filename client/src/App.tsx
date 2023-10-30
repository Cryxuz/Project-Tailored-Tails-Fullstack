import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Items from './pages/Items'
import Cart from './pages/Cart'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default App
