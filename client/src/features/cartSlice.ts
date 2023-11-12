import { createSlice } from '@reduxjs/toolkit'
import {toast} from "react-toastify"
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
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [],
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
        toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-left"
        })
      } else {
        // if we dont have product in the cart we run this code
      const tempProduct = {...action.payload, cartQuantity: 1};
      state.cartItems.push(tempProduct)
      toast.success(`${action.payload.name} added to cart`, {
        position: "bottom-left"
      })
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer