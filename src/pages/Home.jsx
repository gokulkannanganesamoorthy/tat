import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ReelsScatter from '../components/ReelsScatter';
import WhyUs from '../components/WhyUs';
import Industries from '../components/Industries';
import Discovery from '../components/Discovery';
import Services from '../components/Services';

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
      <Industries />
      <ReelsScatter />
      <Discovery />
      <Services />
    </>
  );
};

export default Home;
