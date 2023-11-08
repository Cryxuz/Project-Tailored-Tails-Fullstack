import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productsReducer, { productsFetch } from './features/productsSlice.js'

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})

store.dispatch(productsFetch())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
