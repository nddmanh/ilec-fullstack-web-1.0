import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import useCategories from '../hooks/useCategories';
import './style.css';

export default function Header() {
  const categories = useCategories();

  const menu = <Menu>
    {
      categories.map(category => <Menu.Item key={category._id}>
        <Link to={`/products?category=${encodeURIComponent(category.title)}`}>
          { category.title }
        </Link>
      </Menu.Item>)
    }
  </Menu>

  return <header className="header">
    <div>
      <Link to="/">
        <img className="logo" src="logo.jpeg" alt="Logo"/>
      </Link>
      <Dropdown overlay={menu}>
        <span className="menu-indicator">Menu</span>
      </Dropdown>
    </div>
    <div className="cart-container">
      <Link to='/cart'>
        <ShoppingCartOutlined className="cart-icon"/>
      </Link>
    </div>
  </header>;
}