import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Product {
  name: string
}

interface ProductsState {
  items: Product[]
  status: 'idle' | 'pending' | 'success' | 'rejected'
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
}

export const productsFetch = createAsyncThunk<Product[], void>(
  'products/productsFetch',
  async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:3000/items')
      return response?.data
    } catch (error) {
      console.log(error)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(
        productsFetch.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'success'
          state.items = action.payload
        }
      )
      .addCase(productsFetch.rejected, (state) => {
        state.status = 'rejected'
      })
  },
})

export default productsSlice.reducer
