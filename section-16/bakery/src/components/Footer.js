import React from 'react';
import { get } from '../services/http';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  state = {
    categories: []
  };

  async componentDidMount() {
    try {
      const categoryResponse = await get('/categories');

      this.setState({ 
        categories: categoryResponse.data
      });
    } catch (err) {
      //
    }
  }

  render() {
    return <footer className="footer">
      <div className="footer-info">
        <div className="footer-info__menu">
          <h3>Menu</h3>
          <nav>
            {
              this.state.categories.map(category => <Link key={category._id} to={`/products?category=${encodeURIComponent(category.title)}`}>
                <span>{category.title}</span>
              </Link>)
            }
          </nav>
        </div>
        <div className="footer-info__contact">
          <div>Address: No.1 Nguyen Trai, Thanh Xuan, Ha Noi</div>
          <div>Tel: +84 0506070809</div>
          <div>Mail: bakery@gmail.com</div>
        </div>
      </div>
      <div className="copyright">
        <span>Copyright 2021. All rights reserved by someone</span>
      </div>
    </footer>;
  }
}