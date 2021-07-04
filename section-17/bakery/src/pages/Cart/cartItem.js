import React from 'react';
import config from '../../config';
import './cart.css';
import { Button } from 'antd';
import { connect } from 'react-redux';

const Component = class CartItem extends React.Component {

  render () {
    return (
      <div className="product-item">
        <img src={`${config.IMAGE_URL}${this.props.product.thumbnail}`}></img>
        <h4>{this.props.product.title}</h4>
        <p>{this.props.product.description}</p>
        <Button type='danger' onClick={() => this.props.deleteProduct(this.props.product)}>Delete</Button>
      </div>
    ) 
  }
}

const mapState = (state) => ({
  cart: state.cart
})

const mapDispatch = (dispatch) => ({
  deleteProduct: dispatch.cart.deleteProduct,
})

export default connect(
  mapState,
  mapDispatch
)(Component);