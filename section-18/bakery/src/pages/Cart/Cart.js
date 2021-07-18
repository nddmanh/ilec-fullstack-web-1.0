import React from 'react';
import FeatureProduct from '../../components/FeatureProduct';
import { connect } from 'react-redux';

const Component = function Cart(props) {
    return  (
      <div>
        <FeatureProduct title='Your shopping list' products={props.cart.products}/>
      </div>
    )
}

const mapState = (state) => ({
  cart: state.cart
})

const mapDispatch = (dispatch) => ({
  addProduct: dispatch.cart.addProduct,
})

export default connect(
  mapState,
  mapDispatch
)(Component);