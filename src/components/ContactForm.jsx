import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactForm.css';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formState, setFormState] = useState('idle');
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);

  useEffect(() => {
    // Pin the left panel while the right panel (the form) scrolls up naturally
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftPanelRef.current,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section className="contact-section" ref={containerRef}>
      <div className="contact-container">
        <motion.div 
          className="contact-info-panel"
          ref={leftPanelRef}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-header">
            <h2 className="contact-main-title">LET'S BUILD</h2>
            <p className="contact-subtitle">Transmit your vision. Our engineers are ready.</p>
          </div>
          
          <div className="contact-details-list">
            <div className="detail-item">
              <span className="detail-label">EMAIL</span>
              <a href="mailto:hello@tatstudio.com" className="detail-link interactive">HELLO@TATSTUDIO.COM</a>
            </div>
            <div className="detail-item">
              <span className="detail-label">PHONE</span>
              <a href="tel:+919999999999" className="detail-link interactive">+91 99999 99999</a>
            </div>
            <div className="detail-item">
              <span className="detail-label">LOCATION</span>
              <p className="detail-text">COIMBATORE, INDIA</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {formState === 'success' ? (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="success-title">TRANSMISSION RECEIVED</h3>
              <p className="success-desc">We will respond within 24 hours.</p>
              <button className="btn-submit interactive" onClick={() => setFormState('idle')}>SEND ANOTHER</button>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input className="interactive" type="text" id="name" required placeholder="NAME / ORGANIZATION" />
              </div>
              
              <div className="form-group">
                <input className="interactive" type="email" id="email" required placeholder="EMAIL ADDRESS" />
              </div>

              <div className="form-group">
                <input className="interactive" type="text" id="budget" required placeholder="ESTIMATED BUDGET" />
              </div>

              <div className="form-group">
                <textarea className="interactive" id="message" required placeholder="TELL US ABOUT YOUR CHALLENGE..." rows="4"></textarea>
              </div>

              <div className="form-submit-wrapper">
                <button 
                  type="submit" 
                  className="btn-submit interactive"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? 'TRANSMITTING...' : "INITIALIZE PROJECT"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
