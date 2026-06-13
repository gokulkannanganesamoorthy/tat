import React from 'react';
import './Services.css';

const servicesList = [
  { id: "01", title: "SPATIAL DESIGN" },
  { id: "02", title: "CREATIVE ENGINEERING" },
  { id: "03", title: "VIRTUAL PRODUCTION" },
  { id: "04", title: "SYSTEM ARCHITECTURE" }
];

const Services = () => {
  return (
    <section className="services-elegant-container">
      
      <div className="services-elegant-header">
        <p className="services-elegant-meta">CAPABILITIES // INVENTORY</p>
      </div>

      <div className="services-elegant-list">
        {servicesList.map((service) => (
          <div key={service.id} className="service-elegant-row interactive">
            <span className="service-elegant-id">{service.id}</span>
            <h2 className="service-elegant-title">{service.title}</h2>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Services;
