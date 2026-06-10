import { useEffect } from 'react';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Works from './components/Works';
import './App.css';

function App() {
  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
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
      <Cursor />
      <Preloader />
      
      <main>
        <Hero />
        <Works />
        
        {/* Massive brutalist footer */}
        <footer className="footer-monolith">
          <h1 className="footer-title">THE UNSEEN</h1>
          <div className="footer-links">
            <a href="#" className="interactive">HELLO@THEUNSEEN.COM</a>
            <span>&copy; 2026</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
