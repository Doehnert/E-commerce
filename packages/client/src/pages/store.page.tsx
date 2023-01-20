import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { CartContext } from '../cart.context'
import ProductCard from '../components/product-card.component'
import { productsArray } from '../productsStore'

function StorePage() {
  const test = useContext(CartContext)
  console.log(
    '🚀 ~ file: store.page.tsx:9 ~ StorePage ~ test',
    test.getTotalCost(),
  )

  return (
    <>
      <div className='d-flex justify-content-center'>
        <h1 className='p3'>Welcome to the store</h1>
      </div>

      <Row xs={1} md={3} className='g-4'>
        {productsArray.map((product, index) => {
          return (
            <Col key={product.id} align='center'>
              <ProductCard product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default StorePage
