import { createContext, useState } from 'react'

export interface IShopContext {
  addToCart: (itemId: string) => void
  removeFromCart: (itemId: string) => void
  updateCartCount: (newAmount: number, itemId: string) => void
  getCartItemCount: (itemId: string) => number
  getTotalCartAmount: () => number
  checkout: () => void
}

const defaultValue: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartCount: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
}

export const ShopContext = createContext<IShopContext>(defaultValue)

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({})

  const getCartItemCount = (itemId: string) => {
    if (itemId in cartItems) {
      return cartItems[itemId]
    }
    return 0
  }
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
      console.log('1')
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
      console.log('+1')
    }
  }

  // const removeFromCart = (itemId: string) => {}

  // const updateCartCount = (newAmount: number, itemId: string) => {
  //   if (newAmount < 0) return

  //   setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
  // }

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       const itemInfo = items.find(
  //         (product) => product._id === item
  //       )
  //       totalAmount = cartItems[item] * itemInfo.price
  //     }
  //   }
  //   return totalAmount
  // }

  const contextValue: IShopContext = {
    addToCart,
    // removeFromCart,
    // updateCartCount,
    getCartItemCount,
    getTotalCartAmount: function (): number {
      throw new Error('Function not implemented.')
    },
    checkout: function (): void {
      throw new Error('Function not implemented.')
    }
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

