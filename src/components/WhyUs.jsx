import { motion } from 'framer-motion';
import './WhyUs.css';

const WhyUs = () => {
  return (
    <section className="why-us-section section">
      <div className="container">
        <motion.div 
          className="why-us-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">WHY US</h2>
          <p className="section-subtitle" style={{ color: 'var(--text-secondary)' }}>
            We're not just an agency. We're your strategic partner.
          </p>
        </motion.div>

        <div className="why-us-grid">
          <motion.div 
            className="why-card glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="why-icon" style={{ backgroundColor: 'var(--accent-color)' }}>01</div>
            <h3 className="why-title">Lavish Creativity</h3>
            <p className="why-desc">
              We subordinate the agency ego to your brand narrative. Every design choice is bespoke, elegant, and perfectly aligned with your market position.
            </p>
          </motion.div>

          <motion.div 
            className="why-card glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="why-icon" style={{ backgroundColor: 'var(--secondary-accent)' }}>02</div>
            <h3 className="why-title">Unapologetic Growth</h3>
            <p className="why-desc">
              Clicks mean nothing without conversions. We engineer our marketing campaigns to act as relentless engines of ROI and scaling.
            </p>
          </motion.div>

          <motion.div 
            className="why-card glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="why-icon" style={{ backgroundColor: 'var(--text-primary)' }}>03</div>
            <h3 className="why-title">Technical Mastery</h3>
            <p className="why-desc">
              From kinetic micro-interactions to complex GSAP animations, our frontend engineering signals undeniable technical superiority.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
