import React from 'react';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact" 
        description="Get in touch with THE ADS TAG. Let's engineer your digital environment." 
        url="/contact" 
      />
      <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#F7F4ED' }}>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
