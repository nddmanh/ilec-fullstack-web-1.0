import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomePage from '../HomePage/HomePage';
import Product from '../Product/Product';
import Cart from '../Cart/cart';

export default class App extends React.Component {
  render () {
    return <BrowserRouter>
      <Header />

      <main className="home-page-content">
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/products'>
            <Product />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
        </Switch>
      </main>
      
      <Footer />
    </BrowserRouter>
  }
}