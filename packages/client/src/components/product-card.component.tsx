import React, { useContext } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { CartContext } from '../cart.context'

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
  }
}

function ProductCard({ product }: ProductCardProps) {
  const { id, title, price } = product
  const {
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
  } = useContext(CartContext)

  const productQty = getProductQuantity(product.id)

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>

        {productQty > -1 ? (
          <>
            <Form as={Row}>
              <Form.Label column={true} sm='6'>
                {`In Cart: ${productQty}`}
              </Form.Label>
              <Col sm='6'>
                <Button
                  size='sm'
                  className='mx-2'
                  onClick={() => addOneToCart(product.id)}
                >
                  +
                </Button>
                <Button
                  size='sm'
                  className='mx-2'
                  onClick={() => removeOneFromCart(product.id)}
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button
              variant='danger'
              className='my-2'
              onClick={() => deleteFromCart(product.id)}
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button variant='primary' onClick={() => addOneToCart(id)}>
            Add To Card
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
