import React from 'react';
import { Link } from 'react-router-dom';
import { get } from '../services/http';
import { Dropdown, Menu } from 'antd';
import './style.css';

export default class Header extends React.Component {
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
    const menu = <Menu>
      {
        this.state.categories.map(category => <Menu.Item key={category._id}>
          <Link to={`/products?category=${encodeURIComponent(category.title)}`}>
            { category.title }
          </Link>
        </Menu.Item>)
      }
    </Menu>

    return <header className="header">
      <Link to="/">
        <img className="logo" src="logo.jpeg" alt="Logo"/>
      </Link>
      <Dropdown overlay={menu}>
        <span className="menu-indicator">Menu</span>
      </Dropdown>
    </header>;
  }
}