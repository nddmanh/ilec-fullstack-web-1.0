import React from 'react';
import FeatureProduct from '../../components/FeatureProduct';
import { get } from '../../services/http';

export default class HomePage extends React.Component {
  state = {
    products: []
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate() {
    await this.fetchData();
  }

  async fetchData() {
    try {
      const params = new URLSearchParams(window.location.search);
      const categoryQuery = params.get('category');

      const categoryResponse = await get(`/categories?title=${encodeURIComponent(categoryQuery)}`);

      if (categoryResponse && categoryResponse.data && categoryResponse.data[0]) {
        const category = categoryResponse.data[0];

        const productResponse = await get(`/products?category=${category._id}&limit=6`);
        this.setState({
          products: productResponse.data
        });
      }
    } catch (err) {
      //
    }
  }

  render () {
    return <div>
      <FeatureProduct products={this.state.products}/>
    </div>
  }
}