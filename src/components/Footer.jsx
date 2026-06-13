import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Footer.css';

const Footer = () => {
  const dialRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Infinite slow counter-rotation for the footer dial
      gsap.to(dialRef.current, {
        rotation: -360,
        duration: 90, // Extremely slow, massive weight feeling
        ease: "none",
        repeat: -1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-monolith-container">
      
      {/* Massive Echo Dial (Bleeds off the bottom) */}
      <div className="footer-echo-dial" ref={dialRef}>
        <svg viewBox="0 0 100 100" className="footer-dial-svg">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(247, 244, 237, 0.1)" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(247, 244, 237, 0.05)" strokeWidth="0.1" strokeDasharray="1 3" />
          {/* 24-hour tick marks */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line 
              key={i} 
              x1="50" y1="2" 
              x2="50" y2="6" 
              stroke="rgba(247, 244, 237, 0.2)" 
              strokeWidth="0.3" 
              transform={`rotate(${i * 15} 50 50)`} 
            />
          ))}
        </svg>
      </div>

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
