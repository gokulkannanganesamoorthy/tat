import { useState } from 'react';
import './Services.css';

const servicesList = [
  { id: "01", title: "SPATIAL", desc: "Crafting immersive physical environments.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" },
  { id: "02", title: "CREATIVE", desc: "Engineering the impossible.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
  { id: "03", title: "VIRTUAL", desc: "High-fidelity unreal production.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
  { id: "04", title: "SYSTEMS", desc: "Architecting the invisible foundation.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" }
];

const Services = () => {
  // We default to the first slice being expanded
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section className="services-slices-container">
      
      <p className="services-slices-meta">02 // CAPABILITIES</p>
      
      <div className="services-slices-wrapper">
        {servicesList.map((service, index) => (
          <div 
            key={service.id}
            className={`services-slice ${hoveredIndex === index ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => setHoveredIndex(index)}
          >
            
            {/* The Background Image of the slice */}
            <div className="services-slice-bg">
              <img src={service.img} alt={service.title} />
              <div className="services-slice-overlay"></div>
            </div>

            {/* The Content inside the slice */}
            <div className="services-slice-content">
              <div className="services-slice-header">
                <span className="services-slice-id">{service.id}</span>
                {/* Notice we rotate the title for a more premium editorial feel */}
                <h2 className="services-slice-title">{service.title}</h2>
              </div>
              <p className="services-slice-desc">{service.desc}</p>
              <button className="services-cta interactive">EXPLORE CAPABILITY &rarr;</button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default Services;
