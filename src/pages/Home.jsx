import SEO from '../components/SEO';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Works from '../components/Works';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="THE ADS TAG | We go BEYOND ADS. Premium digital experiences and marketing solutions." 
        url="/" 
      />
      <Hero />
      <WhyUs />
      <Services />
      <Works />
    </>
  );
};

export default Home;
