import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-monolith-container">
      
      <div className="footer-top-row">
        <div className="footer-nav">
          <Link to="/about" className="footer-link">ABOUT</Link>
          <Link to="/works" className="footer-link">WORKS</Link>
          <Link to="/services" className="footer-link">CAPABILITIES</Link>
          <Link to="/contact" className="footer-link">CONTACT</Link>
        </div>
        
        <div className="footer-social">
          <a href="#" className="footer-link">INSTAGRAM</a>
          <a href="#" className="footer-link">LINKEDIN</a>
          <a href="#" className="footer-link">TWITTER</a>
        </div>
      </div>

      <div className="footer-massive-text-wrapper">
        <h1 className="footer-monolith-title">TAT STUDIO</h1>
      </div>

      <div className="footer-bottom-row">
        <p>© {new Date().getFullYear()} TAT STUDIO. ALL RIGHTS RESERVED.</p>
        <p>ENGINEERED IN INDIA</p>
      </div>
      
    </footer>
  );
};

export default Footer;
