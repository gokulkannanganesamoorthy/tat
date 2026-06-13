import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="footer-container">
        
        {/* Massive End Title */}
        <div className="footer-massive-text interactive">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            TAT STUDIO
          </motion.h1>
        </div>

        {/* Footer Metadata Grid */}
        <div className="footer-grid">
          
          <div className="footer-col">
            <h4 className="footer-heading">OPERATIONS</h4>
            <ul className="footer-links">
              <li><a href="/about" className="interactive">THE MANIFESTO</a></li>
              <li><a href="/services" className="interactive">CAPABILITIES</a></li>
              <li><a href="/" className="interactive">ARCHIVE</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">TRANSMIT</h4>
            <ul className="footer-links">
              <li><a href="mailto:hello@tatstudio.com" className="interactive">HELLO@TATSTUDIO.COM</a></li>
              <li><a href="tel:+919999999999" className="interactive">+91 99999 99999</a></li>
              <li><a href="/contact" className="interactive">INITIALIZE PROJECT</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">COORDINATES</h4>
            <p className="footer-text">
              11.0168° N, 76.9558° E<br/>
              COIMBATORE, INDIA
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TAT STUDIO. ALL RIGHTS RESERVED.</p>
          <p>BUILT FOR THE UNSEEN.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
