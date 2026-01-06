import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} height="60px" alt="" />
                <p>Bagify is your trusted destination for stylish, durable bags designed to meet everyday needs with quality and comfort.</p>
                <div className="footer-social-icons">
                    <a href="https://linkedin.com/in/arbazzkhann" target='_blank'><img src={assets.linkedin_icon} alt="" /></a>
                    <a href="https://github.com/arbazzkhann" target='_blank'><img src={assets.github_icon} alt="" /></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to=""><li>About us</li></Link>
                    {/* <Link to=""><li>Delivery</li></Link> */}
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-123-456-7890</li>
                    <li>arbazkha78az@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2026 © Bagify.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer