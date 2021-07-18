import React from 'react';
import config from '../config';
import './style.css';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { checkProductExists } from '../helpers';

const Component = function ProductItem (props){
  return <div className="product-item">
    <img src={`${config.IMAGE_URL}${props.product.thumbnail}`}></img>
    <h4>{props.product.title}</h4>
    <p>{props.product.description}</p>

    {
      checkProductExists(props.cart.products, props.product) ?
        <Button type='danger' onClick={() => props.removeProduct(props.product._id)}>Remove</Button> :
        <Button type='primary' onClick={() => props.addProduct(props.product)}>Add to cart</Button>
    }
  </div>
}

const mapState = (state) => ({
  cart: state.cart
});

const mapDispatch = (dispatch) => ({
  addProduct: dispatch.cart.addProduct,
  removeProduct: dispatch.cart.removeProduct
});

export default connect(
  mapState,
  mapDispatch
)(Component);