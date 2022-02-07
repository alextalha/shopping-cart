import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CartState } from '../context/Context';
import Rating from './Rating';



const Cart = () => {

  const { state: { cart }, dispatch } = CartState()

  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
  }, [cart])

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {
            cart.map((product) => (
              <ListGroupItem key={product.id}>
                <Row>

                  <Col md={2}>
                    <Image src={product.image} alt={product.name} fluid rounded />
                  </Col>

                  <Col md={2}>
                    <span>{product.name}</span>
                  </Col>

                  <Col md={2}>
                    <span>$ {product.price}</span>
                  </Col>

                  <Col md={2}>
                    <Rating rating={product.ratings} />
                  </Col>

                  <Col md={2}>
                    <FormControl as="select" value={product.qty}
                    onChange={(e) => dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: product.id,
                        qty: e.target.value
                      }
                    })}
                    >
                      {[...Array(product.inStock).keys()].map((x) => (
                        <option ley={x + 1}>{x + 1}</option>
                      ))}

                    </FormControl>
                  </Col>


                  <Col md={2}>

                    <Button type="button" variant="light" onClick={() => dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product
                    })}>
                      <AiFillDelete fontSize="20px" />
                    </Button>

                  </Col>

                </Row>
              </ListGroupItem>
            )
            )
          }
        </ListGroup>
        <div className="filters summary">
          <span className="title">SubTotal ({cart.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}> Total : $ {total} </span>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>

    </div>
  )
};

export default Cart;