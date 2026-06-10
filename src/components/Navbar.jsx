import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="global-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
    >
      <div className="navbar-logo">
        <NavLink to="/" className="interactive">TAT.</NavLink>
      </div>
      
      <div className="navbar-links">
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active interactive' : 'nav-item interactive'}>
          ABOUT
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-item active interactive' : 'nav-item interactive'}>
          SERVICES
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active interactive' : 'nav-item interactive'}>
          CONTACT
        </NavLink>
      </div>
    </motion.nav>
  );
};

export default Navbar;
