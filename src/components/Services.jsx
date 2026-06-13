import { useState } from 'react';
import './Services.css';

const servicesList = [
  { id: "01", title: "SPATIAL DESIGN", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=2000&auto=format&fit=crop" },
  { id: "02", title: "CREATIVE ENGINEERING", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
  { id: "03", title: "VIRTUAL PRODUCTION", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
  { id: "04", title: "SYSTEM ARCHITECTURE", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0); // Default to first image

  return (
    <section className="services-focus-container">
      
      {/* Background Cinematic Images */}
      <div className="services-focus-bg-layer">
        {servicesList.map((service, index) => (
          <img 
            key={`bg-${service.id}`}
            src={service.img} 
            alt={service.title} 
            className={`services-focus-img ${hoveredIndex === index ? 'active' : ''}`}
          />
        ))}
        {/* Dark overlay to ensure text is always readable */}
        <div className="services-focus-overlay"></div>
      </div>

      <div className="services-focus-content">
        <p className="services-meta">02 // CAPABILITIES</p>
        
        <div className="services-focus-list">
          {servicesList.map((service, index) => (
            <div 
              key={service.id}
              className={`services-focus-item ${hoveredIndex === index ? 'active-item' : 'dimmed-item'}`}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <span className="services-focus-id">{service.id}</span>
              <h2 className="services-focus-title">{service.title}</h2>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Services;
