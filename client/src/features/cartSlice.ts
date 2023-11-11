import { createSlice } from '@reduxjs/toolkit'

interface CartItems {
  id: string
  price: number
  cartQuantity: number
}

interface Cart {
  cartItems: CartItems[]
  cartTotalQuantity: number
  cartTotalAmount: number
}

const initialState: Cart = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      )

      if (existingItem) {
        existingItem.cartQuantity += 1
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 })
      }
      state.cartTotalQuantity = state.cartItems.reduce(
        (total, item) => total + item.cartQuantity,
        0
      )
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.cartQuantity,
        0
      )
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
