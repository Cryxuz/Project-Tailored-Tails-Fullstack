import { createSlice } from '@reduxjs/toolkit'

interface CartItems {
  name: string
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

    
      // if we have product in the cart we increase its quantity
    
      const itemIndex =  state.cartItems.findIndex( (item) => item.name === action.payload.name)
      if(itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        // if we dont have product in the cart we run this code
      const tempProduct = {...action.payload, cartQuantity: 1};
      state.cartItems.push(tempProduct)
      }
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer