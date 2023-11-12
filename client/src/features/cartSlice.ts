import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
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
  // the line below will include the localStorage cartItems to the application state.
  // cartItems inside getItem is the key from localStorage.setItem('cartItems') below
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // if we have product in the cart we increase its quantity

      const itemIndex = state.cartItems.findIndex(
        (item) => item.name === action.payload.name
      )
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
          position: 'bottom-left',
        })
      } else {
        // if we dont have product in the cart we run this code
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.name} added to cart`, {
          position: 'bottom-left',
        })
      }
      // cartItems is the key. this will add the cartItems to the localStorage and cartItems is the key
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      )
      state.cartItems = nextCartItems
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

      toast.error(`${action.payload.name} removed from cart`, {
        position: 'bottom-left',
      })
    },
    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      )
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1

        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: 'bottom-left',
        })
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        )
        state.cartItems = nextCartItems

        toast.error(`${action.payload.name} removed from cart`, {
          position: 'bottom-left',
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
  },
})

export const { addToCart, removeFromCart, decreaseCartQuantity } =
  cartSlice.actions
export default cartSlice.reducer
