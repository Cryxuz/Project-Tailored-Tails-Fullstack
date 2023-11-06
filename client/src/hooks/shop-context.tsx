import {createContext, useState} from 'react'

export interface IShopContext {
  addToCart: (itemId: string) => void
  removeFromCart: (itemId: string) => void
  updateCartCount: (newAmount: number, itemId: string) => void
  getCartItemCount: (itemId: string)=> number
}

const defaultValue: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartCount: () => null,
  getCartItemCount: () => 0

}

export const ShopContext = createContext<IShopContext>(defaultValue)

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState<{string: number} | {}>({})

  const getCartItemCount = (itemId: string) => {
    if(itemId in cartItems) {
      return cartItems[itemId]
    }
      return 0
  }
  const addToCart = (itemId: string) => {
    if(!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1}))
      console.log("1")
    } else {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+ 1}))
      console.log("+1")
      
    }
  }

  const removeFromCart = (itemId: string) => {


  }

  const updateCartCount = (newAmount: number, itemId: string) => {

  }
  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartCount,
    getCartItemCount,
  }


  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}