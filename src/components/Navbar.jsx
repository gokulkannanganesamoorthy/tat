import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [sessionTime, setSessionTime] = useState('00:00:00:000');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ms = now.getMilliseconds().toString().padStart(3, '0');

      setSessionTime(`${hours}:${minutes}:${seconds}:${ms}`);
      requestAnimationFrame(updateTimer);
    };

    const animFrame = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* HUD Corners */}
      <motion.div
        className="hud-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Top Left: Branding */}
        <div
          className="hud-top-left interactive"
          onClick={(e) => handleNavigate(e, '/')}
        >
          <div className="hud-logo">
            <img src="/logo.png" alt="TAT Logo" className="hud-logo-img" />
          </div>
          <div className="hud-branding">
            <span>THE ADS TAG</span>
            <span className="hud-sub">BEYOND ADS</span>
          </div>
        </div>

        {/* Top Right: Menu Button */}
        <div
          className="hud-top-right interactive"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>{menuOpen ? '[ CLOSE ]' : '[ MENU ]'}</span>
        </div>

        {/* Bottom Left: Chronometer */}
        <div className="hud-bottom-left">
          <span>T: {sessionTime}</span>
        </div>

        {/* Bottom Right: Contact */}
        <div
          className="hud-bottom-right interactive"
          onClick={(e) => handleNavigate(e, '/contact')}
        >
          <span>[ CONTACT US ]</span>
        </div>
      </motion.div>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="hud-overlay-menu"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="hud-menu-inner">
              <nav className="hud-nav-list">
                <a
                  href="/"
                  onClick={(e) => handleNavigate(e, '/')}
                  className={
                    location.pathname === '/'
                      ? 'active interactive'
                      : 'interactive'
                  }
                >
                  <span className="hud-nav-num">01</span> HOME
                </a>
                <a
                  href="/about"
                  onClick={(e) => handleNavigate(e, '/about')}
                  className={
                    location.pathname === '/about'
                      ? 'active interactive'
                      : 'interactive'
                  }
                >
                  <span className="hud-nav-num">02</span> ABOUT
                </a>
                <a
                  href="/services"
                  onClick={(e) => handleNavigate(e, '/services')}
                  className={
                    location.pathname === '/services'
                      ? 'active interactive'
                      : 'interactive'
                  }
                >
                  <span className="hud-nav-num">03</span> SERVICES
                </a>
                <a
                  href="/contact"
                  onClick={(e) => handleNavigate(e, '/contact')}
                  className={
                    location.pathname === '/contact'
                      ? 'active interactive'
                      : 'interactive'
                  }
                >
                  <span className="hud-nav-num">04</span> CONTACT
                </a>
              </nav>

              <div className="hud-menu-meta">
                <p>THE ADS TAG STUDIO</p>
                <p>BASED IN WORLDWIDE</p>
                <p>EST. 2024</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
