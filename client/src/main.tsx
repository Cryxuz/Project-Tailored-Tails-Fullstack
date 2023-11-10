import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsReducer, { productsFetch } from './features/productsSlice.js';
import { itemsApi } from './features/productsApi.ts';
import Items from './pages/Items.tsx';

const store = configureStore({
  reducer: {
    products: productsReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
});

// Dispatch the productsFetch action and wait for it to complete
store.dispatch(productsFetch()).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});