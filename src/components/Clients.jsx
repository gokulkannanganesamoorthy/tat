import { motion } from 'framer-motion';
import './Clients.css';

const clientLogos = [
  "FLOLAPO", "THE RUSH REPUBLIC", "DESERT HAWK", "WONDR", "ANANDHAAS", "MICROSKIN", "GUSTOVITA"
];

const Clients = () => {
  return (
    <section className="clients-section section">
      <div className="container">
        <motion.div 
          className="clients-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">TRUSTED BY VISIONARIES</h2>
        </motion.div>

        {/* Ticker marquee for clients */}
        <div className="clients-ticker-wrapper">
          <div className="clients-ticker">
            {/* Double the list to create a seamless loop */}
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div className="client-logo-item" key={index}>
                <span className="client-logo-text">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
