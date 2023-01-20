import React, { useContext, useState } from 'react'
import { Button, Container, Navbar, Modal } from 'react-bootstrap'
import { CartContext } from '../cart.context'
import { getProductData } from '../productsStore'
import { Product } from '../types/types'
import CartProduct from './cart-product.component'

function NavbarComponent() {
  const { items, getTotalCost } = useContext(CartContext)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const productsCount = items.reduce(
    (sum, product) => sum + product.quantity,
    0,
  )

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.url) {
          window.location.assign(json.url)
        }
      })
  }

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={handleShow}>{`Cart ${productsCount} Items`}</Button>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {items.map((currentProduct, index) => {
                return (
                  <CartProduct
                    id={currentProduct.id}
                    quantity={currentProduct.quantity}
                    key={currentProduct.id}
                  />
                )
              })}

              <h1>Total: {getTotalCost().toFixed(2)} </h1>

              <Button variant='success' onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavbarComponent
