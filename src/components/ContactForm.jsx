import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = () => {
  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate async submission
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section className="contact-section section">
      <div className="container contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-title">WANNA FLY WITH US?</h2>
          <p className="contact-subtitle">Let's build the engine driving your brand forward.</p>
          
          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <a href="mailto:hello@tat.digital" className="detail-link">hello@tat.digital</a>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <a href="tel:+919999999999" className="detail-link">+91 99999 99999</a>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location</span>
              <p className="detail-text">Coimbatore, India</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-wrapper glass-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {formState === 'success' ? (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Thank you!</h3>
              <p>Your transmission has been received. Our engine is revving up to respond.</p>
              <button className="btn btn-primary" onClick={() => setFormState('idle')}>Send Another</button>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" required placeholder="Name (Who are we talking to?)" />
              </div>
              
              <div className="form-group">
                <input type="email" id="email" required placeholder="Email (How do we reach you?)" />
              </div>

              <div className="form-group">
                <input type="tel" id="phone" required placeholder="Phone (Let's talk business)" />
              </div>

              <div className="form-group">
                <textarea id="message" required placeholder="Your Challenge in One Sentence..." rows="4"></textarea>
              </div>

              <div className="form-group attribution">
                <label>How did you hear about us?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="source" value="social" /> Social Media
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="source" value="search" /> Google Search
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="source" value="referral" /> Referral
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Transmitting...' : "Let's Dominate"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
