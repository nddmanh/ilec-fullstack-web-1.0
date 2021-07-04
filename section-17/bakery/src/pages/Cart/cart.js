import React from 'react';
import { Row, Col } from 'antd';
import './cart.css';
import { connect } from 'react-redux';
import CartItem from './cartItem';

const Component = class Cart extends React.Component {
  render () {
    return (
      <div className="feature-product">
        <h3> Cart </h3>
        <div className="product-container">
          { this.props.cart.products.length ?
           <Row gutter={60}> 
           {
             this.props.cart.products.map( item =>
              <Col lg={8} sm={12} xs={24} key={item._id}> 
                <CartItem product={item} />
              </Col>)
           }
            </Row>
            : <h5>NO PRODUCTS</h5>
          }
      </div>
    </div>
    ) 
  }
}

const mapState = (state) => ({
  cart: state.cart
})

export default connect(
  mapState,
)(Component);