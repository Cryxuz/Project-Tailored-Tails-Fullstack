import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Item {
  name: string;
}

interface ProductsState {
  items: Item[];
  status: 'idle' | 'pending' | 'success' | 'rejected';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const productsFetch = createAsyncThunk<Item[], void>(
  'products/productsFetch',
  async () => {
    try {
      const response = await axios.get<Item[]>('http://localhost:3000/items');
      return response?.data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to let the UI handle it if needed
    }
  }
);

const productsSlice = createSlice({
  name: 'items', // Keep the name as 'products' or choose another appropriate name
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(
        productsFetch.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = 'success';
          state.items = action.payload;
        }
      )
      .addCase(productsFetch.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export default productsSlice.reducer;