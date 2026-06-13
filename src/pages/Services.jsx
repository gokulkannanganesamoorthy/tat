import SEO from '../components/SEO';
import ServicesComponent from '../components/Services';

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Services" 
        description="Our premium services include UI/UX Design, Web Engineering, Brand Identity, and Motion Graphics." 
        url="/services" 
      />
      <div style={{ paddingTop: '10vh' }}>
        <ServicesComponent />
      </div>
    </>
  );
};

export default ServicesPage;
