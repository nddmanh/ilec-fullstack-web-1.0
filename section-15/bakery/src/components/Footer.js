import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return <footer className="footer">
      <div className="footer-info">
        <div className="footer-info__menu">
          <h3>Menu</h3>
          <nav>
            <span> <Link to="/cake">Cake</Link> </span>
            <span> <Link to="/bread">Bread & Panstry</Link> </span>
            <span> <Link to="/beverage">Beverages</Link> </span>
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