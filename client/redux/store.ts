import { configureStore } from '@reduxjs/toolkit';
// Reducers need to be added

const store = configureStore({
  reducer: // reducer needs to be added and this comment is causing error to everything else but it is fine.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
  devTools: process.env.NODE_ENV !== 'production', // This enables Redux DevTools extension in development
});

export default store;