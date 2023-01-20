import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { CartContext } from '../cart.context'
import { getProductData } from '../productsStore'

interface CartProductProps {
  id: string
  quantity: number
}

function CartProduct({ id, quantity }: CartProductProps) {
  const { deleteFromCart } = useContext(CartContext)
  const productData = getProductData(id)

  return (
    <>
      <h3>{productData?.title}</h3>
      <p>{quantity} total</p>
      {productData && <p> ${quantity * productData.price}</p>}
      <Button size='sm' onClick={() => deleteFromCart(id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  )
}

export default CartProduct
