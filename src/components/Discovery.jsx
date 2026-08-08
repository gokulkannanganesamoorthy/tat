import React from 'react';
import './Discovery.css';

const Discovery = () => {
  return (
    <section className="discovery-section">
      <div className="discovery-content">
        <h2 className="discovery-heading">How we are gonna work?</h2>
        <p className="discovery-subheading">
          Let’s have your brands understanding and get the free discovery about what your brand needs!
          <br /><br />
          Let’s hop on a call to talk about the brand you want to create or a plan to execute.
          <br /><br />
          We have these services which you can pick what we need for your brand.
        </p>
        <div className="discovery-arrow-container">
          <svg className="discovery-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Discovery;
