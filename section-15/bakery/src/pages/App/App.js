import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Banner from './components/Banner';
import FeatureProduct from './components/FeatureProduct';
import { get } from '../../services/http';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import RouterURL from '../../router/router';

export default class App extends React.Component {
  state = {
    products: [],
    cakes: [],
    breads: [],
    beverages: [],
  }
  
  async componentDidMount() {
    // Get Id Category cake
    const cakeCate = await get('/categories?category=Cake');
    const idCake = cakeCate.data[0]._id ;

    // Get Id Category bread
    const breadCate = await get('/categories?category=Bread');
    const idBread = breadCate.data[0]._id ;

    // Get Id Category beverages
    const beverageCate = await get('/categories?category=Beverages');
    const idBeverage = beverageCate.data[0]._id ;

    // Get data
    const productResponse = await get('/products?limit=6');
    const cake = await get(`/products?limit=12&category=${idCake}`);
    const bread = await get(`/products?limit=12&category=${idBread}`);
    const beverage = await get(`/products?limit=12&category=${idBeverage}`);

    // Set State
    this.setState({
      products: productResponse.data,
      cakes: cake.data,
      breads: bread.data,
      beverages: beverage.data,
    });
  }

  render () {
    return(
    <Router>
      <div className="web">
        <Header />
        <main className="home-page-content">
          <Banner />
          
          <Switch>
            <Route exact path="/">
              <FeatureProduct title={"Feature Product"} products={this.state.products} />
            </Route>
            <Route path="/cake">
              <FeatureProduct title={"Cake"} products={this.state.cakes} />
            </Route>
            <Route path="/bread">
              <FeatureProduct title={"Bread & Pastry"}products={this.state.breads} />
            </Route>
            <Route path="/beverage">
              <FeatureProduct title={"Beverages"} products={this.state.beverages} />
            </Route>
          </Switch>

        </main>
        <Footer />
      </div>
    </Router>
      
    ) 
  }
}