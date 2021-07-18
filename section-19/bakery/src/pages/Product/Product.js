import React from 'react';
import FeatureProduct from '../../components/FeatureProduct';
import { get } from '../../services/http';

export default class Product extends React.Component {
  state = {
    products: []
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate(oldProp) {
    if (oldProp.location.search !== this.props.location.search) {
      await this.fetchData();
    }
  }

  async fetchData() {
    try {
      const params = new URLSearchParams(this.props.location.search);
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
      <FeatureProduct title='Products' products={this.state.products}/>
    </div>
  }
}