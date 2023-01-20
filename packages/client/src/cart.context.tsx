import { createContext, useState } from 'react'
import { getProductData } from './productsStore'
import { Product, ShoppingCartItem } from './types/types'

type CartContextProviderProps = {
  children: React.ReactNode
}

// interface ICartContext {
//   items: ShoppingCartItem[]
//   getProductQuantity(id: number): number
//   addOneToCart(id: number): void
//   removeOneFromCart(id: number): void
//   deleteFromCart(id: number): void
//   getTotalCost(): number
// }

const defaultState = {
  items: [] as ShoppingCartItem[],
  getProductQuantity: (id: string) => 0,
  addOneToCart: (id: string) => {},
  removeOneFromCart: (id: string) => {},
  deleteFromCart: (id: string) => {},
  getTotalCost: () => 0,
}

export const CartContext = createContext(defaultState)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartProducts, setCartProducts] = useState([] as ShoppingCartItem[])

  function getProductQuantity(id: string) {
    const qty = cartProducts.find(
      (product: ShoppingCartItem) => product.id === id,
    )?.quantity

    if (qty === undefined) return 0

    return qty
  }

  function addOneToCart(id: string) {
    const qty = getProductQuantity(id)

    if (qty === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ])
    } else {
      setCartProducts((cartProducts) =>
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      )
    }
  }

  function deleteFromCart(id: string) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((product) => product.id !== id),
    )
  }

  function removeOneFromCart(id: string) {
    const qty = getProductQuantity(id)

    if (qty === 1) {
      deleteFromCart(id)
    } else {
      setCartProducts((cartProducts) =>
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      )
    }
  }

  function getTotalCost() {
    const totalValue = cartProducts.reduce((total, cartItem) => {
      const product = getProductData(cartItem.id)
      return total + (product?.price ?? 0) * cartItem.quantity
    }, 0)
    return totalValue
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
