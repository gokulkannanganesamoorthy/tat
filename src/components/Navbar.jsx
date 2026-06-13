import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [sessionTime, setSessionTime] = useState("00:00:00:000");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      
      const ms = (elapsed % 1000).toString().padStart(3, '0');
      const seconds = Math.floor((elapsed / 1000) % 60).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed / (1000 * 60)) % 60).toString().padStart(2, '0');
      
      setSessionTime(`00:${minutes}:${seconds}:${ms}`);
      requestAnimationFrame(updateTimer);
    };

    const animFrame = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <>
      <motion.nav 
        className="global-navbar"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
      >
        {/* The entire brand group is now a massive clickable home button */}
        <div 
          className="navbar-brand-group interactive" 
          onClick={(e) => handleNavigate(e, '/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="navbar-logo">
            <img src="/logo.png" alt="THE ADS TAG Logo" className="navbar-logo-img" />
          </div>
          
          <div className="navbar-text-branding">
            <span className="navbar-title">THE ADS TAG</span>
            <span className="navbar-subtitle">BEYOND ADS</span>
          </div>
        </div>
        
        <div className="navbar-links">
          <a 
            href="/about"
            onClick={(e) => handleNavigate(e, '/about')}
            className={location.pathname === '/about' ? 'nav-item active interactive' : 'nav-item interactive'}
          >
            ABOUT
          </a>
          <a 
            href="/services"
            onClick={(e) => handleNavigate(e, '/services')}
            className={location.pathname === '/services' ? 'nav-item active interactive' : 'nav-item interactive'}
          >
            SERVICES
          </a>
          <a 
            href="/contact"
            onClick={(e) => handleNavigate(e, '/contact')}
            className={location.pathname === '/contact' ? 'nav-item active interactive' : 'nav-item interactive'}
          >
            CONTACT
          </a>
        </div>
      </motion.nav>

      {/* Global Bottom-Right Chronometer */}
      <div className="global-chronometer">
        T: {sessionTime}
      </div>
    </>
  );
};

export default Navbar;
