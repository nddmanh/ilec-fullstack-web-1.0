import React from 'react';
import './style.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return <header className="header">
      <Link to="/"><img className="logo" src="logo.jpeg" /></Link>
      <nav className="navigator">
        <span>Menu</span>
        <span>Our story</span>
        <span>News & events</span>
      </nav>
    </header>;
  }
}