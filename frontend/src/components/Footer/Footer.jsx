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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo pariatur quae dolore. Voluptatum laboriosam fuga aliquam blanditiis dolorem iste quod?</p>
                <div className="footer-social-icons">
                    <Link to="https://linkedin.com/in/arbazzkhann"><img src={assets.linkedin_icon} alt="" /></Link>
                    <Link to="#"><img src={assets.twitter_icon} alt="" /></Link>
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
        <p className="footer-copyright">Copyright 2025 © Bagify.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer