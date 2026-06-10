import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Works from './components/Works';
import './App.css';

function App() {
  const [time, setTime] = useState('');

  // Local clock update logic (IST timezone)
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      {/* Macro Element: Cinematic Noise Overlay */}
      <div className="noise-overlay"></div>
      
      <Cursor />
      <Preloader />
      
      {/* Scrollable sections wrapped in a z-indexed container */}
      <div className="scrollable-content">
        <Hero />
        <Works />
      </div>

      {/* Sticky Reveal Footer sitting behind the scrollable content */}
      <footer className="footer-reveal-container">
        <div className="footer-marquee-section">
          <div className="footer-marquee-track">
            <span>TAT STUDIO • COLLABORATE • TAT STUDIO • COLLABORATE • TAT STUDIO • COLLABORATE • TAT STUDIO • COLLABORATE • </span>
            <span>TAT STUDIO • COLLABORATE • TAT STUDIO • COLLABORATE • TAT STUDIO • COLLABORATE • TAT STUDIO • COLLABORATE • </span>
          </div>
        </div>

        <div className="footer-main-content">
          <div className="footer-cta-container">
            <span className="cta-label">HAVE A CONCEPT?</span>
            <a href="mailto:hello@tatstudio.com" className="footer-email-link interactive">
              HELLO@TATSTUDIO.COM
            </a>
          </div>

          <div className="footer-details-grid">
            <div className="footer-detail-col">
              <h4>LOCAL TIME</h4>
              <p className="footer-clock">{time} IST</p>
            </div>
            <div className="footer-detail-col">
              <h4>SOCIALS</h4>
              <div className="social-links">
                <a href="#" className="interactive">INSTAGRAM</a>
                <a href="#" className="interactive">TWITTER</a>
                <a href="#" className="interactive">LINKEDIN</a>
              </div>
            </div>
            <div className="footer-detail-col align-right">
              <h4>TAT STUDIO</h4>
              <p>&copy; {new Date().getFullYear()} — COIMBATORE, IN</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
