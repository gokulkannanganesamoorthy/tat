import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    id: '01',
    title: 'Performance Marketing',
    description: 'We hack the algorithm so your visibility skyrockets overnight. Clicks mean nothing without conversions.',
  },
  {
    id: '02',
    title: 'Digital Branding',
    description: 'Crafting bespoke identities that subordinate the agency ego to your brand narrative.',
  },
  {
    id: '03',
    title: 'Web Engineering',
    description: 'Smart UI. Impactful UX. Scalable growth. That is our code. We build kinetic environments.',
  },
  {
    id: '04',
    title: 'Content Production',
    description: 'Immersive 3D, video, and high-fidelity assets designed for the tactile maximalism era.',
  }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="services-section section">
      <div className="container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">OUR CAPABILITIES</h2>
          <p className="section-subtitle">Full-stack solutions for ambitious enterprises.</p>
        </motion.div>

        <div className="services-list">
          {servicesList.map((service, index) => (
            <motion.div 
              key={service.id}
              className={`service-item ${hoveredIndex === index ? 'active' : ''}`}
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
                <motion.p 
                  className="service-description"
                  initial={false}
                  animate={{ height: hoveredIndex === index ? 'auto' : 0, opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.description}
                </motion.p>
              </div>
              <div className="service-arrow">
                <ArrowRight className="arrow-icon" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
