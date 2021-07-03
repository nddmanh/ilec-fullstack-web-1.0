import React from 'react';
import Banner from './components/Banner';
import FeatureProduct from '../../components/FeatureProduct';
import { get } from '../../services/http';

export default class HomePage extends React.Component {
  state = {
    products: []
  }

  async componentDidMount() {
    const productResponse = await get('/products?limit=6');
    this.setState({
      products: productResponse.data
    });
  }

  render () {
    return <div>
      <Banner />
      <FeatureProduct products={this.state.products}/>
    </div>
  }
}