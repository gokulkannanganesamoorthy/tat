import { useLocation, useNavigate, Link } from 'react-router-dom';
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
        <a
          href="https://wa.me/918681049696"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-bottom-right interactive"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <span>[ WHATSAPP: 8681049696 ]</span>
        </a>
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
                <Link to="/" onClick={() => setMenuOpen(false)} className={location.pathname === '/' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">01</span> HOME
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)} className={location.pathname === '/about' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">02</span> ABOUT
                </Link>
                <Link to="/services" onClick={() => setMenuOpen(false)} className={location.pathname === '/services' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">03</span> SERVICES
                </Link>
                <Link to="/products" onClick={() => setMenuOpen(false)} className={location.pathname === '/products' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">04</span> PRODUCTS
                </Link>
                <Link to="/projects" onClick={() => setMenuOpen(false)} className={location.pathname === '/projects' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">05</span> PROJECTS
                </Link>
                <Link to="/gallery" onClick={() => setMenuOpen(false)} className={location.pathname === '/gallery' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">06</span> GALLERY
                </Link>
                <Link to="/tat-tech" onClick={() => setMenuOpen(false)} className={location.pathname === '/tat-tech' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">07</span> TAT TECH
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)} className={location.pathname === '/contact' ? 'active interactive' : 'interactive'}>
                  <span className="hud-nav-num">08</span> CONTACT
                </Link>
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

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/918681049696"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-button"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
};

export default Navbar;
