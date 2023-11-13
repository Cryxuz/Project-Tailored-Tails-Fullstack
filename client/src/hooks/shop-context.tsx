// import axios from 'axios'
// import { createContext, useState } from 'react'
// import { useGetToken } from './useGetToken'
// import { useNavigate } from 'react-router-dom'
// export interface IShopContext {
//   addToCart: (itemId: string) => void
//   removeFromCart: (itemId: string) => void
//   updateCartCount: (newAmount: number, itemId: string) => void
//   getCartItemCount: (itemId: string) => number
//   getTotalCartAmount: () => number
//   checkout: () => void
// }

// const defaultValue: IShopContext = {
//   addToCart: () => null,
//   removeFromCart: () => null,
//   updateCartCount: () => null,
//   getCartItemCount: () => 0,
//   getTotalCartAmount: () => 0,
//   checkout: () => null,
// }

// export const ShopContext = createContext<IShopContext>(defaultValue)

// export const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState<{ string: number } | {}>({})
//   const { headers } = useGetToken()
//   const navigate = useNavigate()

//   const getCartItemCount = (itemId: string) => {
//     if (itemId in cartItems) {
//       return cartItems[itemId]
//     }
//     return 0
//   }
//   const addToCart = (itemId: string) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//       console.log('1')
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//       console.log('+1')
//     }
//   }

//   const removeFromCart = (itemId: string) => {}

//   const updateCartCount = (newAmount: number, itemId: string) => {
//     if (newAmount < 0) return

//     setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
//   }

//   const getTotalCartAmount = () => {
//     let totalAmount = 0
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo: IProduct = products.find(
//           (product) => product._id === item
//         )
//         totalAmount = cartItems[item] * itemInfro.price
//       }
//     }
//     return totalAmount
//   }

//   const checkout = async () => {
//     const body = { customerID: localStorage.getItem('userID'), cartItems }
//     try {
//       await axios.post('http://localhost:3000/cart', body, { headers })
//       navigate('/')
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const contextValue: IShopContext = {
//     addToCart,
//     removeFromCart,
//     updateCartCount,
//     getCartItemCount,
//     checkout,
//   }

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   )
// }
