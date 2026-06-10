import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    id: '01',
    title: 'Performance Marketing',
    description: 'We hack the algorithm so your visibility skyrockets overnight. Clicks mean nothing without conversions. Our campaigns are designed for unapologetic scaling.',
  },
  {
    id: '02',
    title: 'Digital Branding',
    description: 'Crafting bespoke identities that subordinate the agency ego to your brand narrative. We create visual systems that command attention and define categories.',
  },
  {
    id: '03',
    title: 'Web Engineering',
    description: 'Smart UI. Impactful UX. Scalable growth. That is our code. We build kinetic, highly-optimized environments that convert visitors into loyal clientele.',
  },
  {
    id: '04',
    title: 'Content Production',
    description: 'Immersive 3D, cinematic video, and high-fidelity assets designed for the tactile maximalism era. Visuals that refuse to be ignored.',
  }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="services-section">
      <div className="services-container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="services-main-title">OUR CAPABILITIES</h2>
          <p className="services-subtitle">Full-stack spatial and digital solutions for ambitious enterprises.</p>
        </motion.div>

        <div className="services-list">
          {servicesList.map((service, index) => (
            <motion.div 
              key={service.id}
              className={`service-item interactive ${hoveredIndex === index ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-number">{service.id}</div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <motion.div 
                  className="service-description-wrapper"
                  initial={false}
                  animate={{ 
                    height: hoveredIndex === index ? 'auto' : 0, 
                    opacity: hoveredIndex === index ? 1 : 0,
                    marginTop: hoveredIndex === index ? '1.5rem' : '0'
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="service-description">{service.description}</p>
                </motion.div>
              </div>

              <div className="service-arrow-wrapper">
                <div className="service-arrow">
                  <ArrowRight className="arrow-icon" size={32} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
