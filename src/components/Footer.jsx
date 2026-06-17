import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const navRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Manual word split — wraps each word in an overflow:hidden mask span
      const el = titleRef.current;
      if (!el) return;
      const text = el.innerText;
      el.innerHTML = text
        .split(' ')
        .map((w) => `<span class="footer-word-mask"><span class="footer-word">${w}</span></span>`)
        .join(' ');
      const words = el.querySelectorAll('.footer-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // The massive title rises from below its mask — the cinematic "studio card" reveal
      tl.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.4,
          stagger: 0.06,
          ease: 'power4.out',
        }
      );

      // Tagline glows in
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.6'
      );

      // Nav links rise in with stagger
      tl.fromTo(
        navRef.current.querySelectorAll('a'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // Bottom bar rises in
      tl.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-finale-container" ref={footerRef}>
      {/* Animated Film grain */}
      <div className="footer-grain" />

      {/* Subtle radial glow behind title */}
      <div className="footer-glow-orb" />

      {/* The cinematic title card */}
      <div className="footer-title-block">
        <h1 className="footer-massive-title" ref={titleRef}>THE ADS TAG</h1>
        <p className="footer-tagline" ref={taglineRef}>BEYOND ADS</p>
      </div>

      {/* The thin glowing divider */}
      <div className="footer-glow-rule" />

      {/* Navigation & Socials */}
      <nav className="footer-nav-grid" ref={navRef}>
        <div className="footer-nav-col">
          <p className="footer-nav-label">NAVIGATION</p>
          <Link to="/about" className="footer-nav-link">About</Link>
          <Link to="/services" className="footer-nav-link">Services</Link>
          <Link to="/works" className="footer-nav-link">Works</Link>
          <Link to="/contact" className="footer-nav-link">Contact</Link>
        </div>
        <div className="footer-nav-col">
          <p className="footer-nav-label">CONNECT</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-nav-link">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-nav-link">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-nav-link">Twitter</a>
        </div>
        <div className="footer-nav-col">
          <p className="footer-nav-label">CONTACT</p>
          <a href="mailto:hello@theadstag.com" className="footer-nav-link">hello@theadstag.com</a>
        </div>
      </nav>

      {/* Bottom copyright bar */}
      <div className="footer-bottom-bar" ref={bottomRef}>
        <p>© {new Date().getFullYear()} THE ADS TAG. ALL RIGHTS RESERVED.</p>
        <p>ENGINEERED IN INDIA</p>
      </div>
    </footer>
  );
};

export default Footer;
