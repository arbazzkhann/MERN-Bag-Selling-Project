import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <div className='header-contents'>
            <h2>Grab your favourite bags here</h2>
            <p>Explore a curated collection of stylish, durable bags designed for work, travel, and everyday use - all in one place.</p>
            <Link to="/products"><button>View Products</button></Link>
        </div>
    </div>
  )
}

export default Header