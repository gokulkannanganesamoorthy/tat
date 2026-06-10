import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './CaseStudies.css';

const projects = [
  {
    id: 1,
    title: 'Wondr Diamonds',
    metric: '53x Revenue Explosion',
    description: 'Transforming a lab-grown diamond brand into a worldwide leader through aggressive omnichannel scaling.',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Anandhaas',
    metric: 'Nationwide Expansion',
    description: 'From a local name to a national sensation. Performance marketing that drives real footfall and digital dominance.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'MicroSkin',
    metric: 'Precision SEO Dominance',
    description: 'Breaking through a crowded market to establish absolute leadership in the premium skincare industry.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800'
  }
];

const CaseStudies = () => {
  return (
    <section className="cases-section section">
      <div className="container">
        <motion.div 
          className="cases-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">RESULTS SPEAK LOUDER</h2>
          <p className="section-subtitle">Metric-driven narratives.</p>
        </motion.div>

        <div className="cases-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="case-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="case-image-wrapper">
                <img src={project.image} alt={project.title} className="case-image" />
                <div className="case-overlay">
                  <div className="case-icon">
                    <ArrowUpRight size={32} />
                  </div>
                </div>
              </div>
              <div className="case-content">
                <div className="case-metric text-gradient">{project.metric}</div>
                <h3 className="case-title">{project.title}</h3>
                <p className="case-description">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
