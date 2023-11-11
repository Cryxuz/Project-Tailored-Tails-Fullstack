import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productsReducer, { productsFetch } from './features/productsSlice.js'
import { itemsApi } from './features/productsApi.ts'
import cartReducer from './features/cartSlice.ts'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
})

store.dispatch(productsFetch())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
