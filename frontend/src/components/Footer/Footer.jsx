import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-content-left">
          <img src={assets.logo} height="60px" alt="" />
          <p>
            Bagify is your trusted destination for stylish, durable bags designed 
            to meet everyday needs with quality and comfort.
          </p>

          <div className="footer-social-icons">
            <a href="https://linkedin.com/in/arbazzkhann" target="_blank">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>

            <a href="https://github.com/arbazzkhann" target="_blank">
              <img src={assets.github_icon} alt="GitHub" />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About Us</li></Link>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-123-456-7890</li>
            <li>arbazkha78az@gmail.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        © 2026 Bagify.com — All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
