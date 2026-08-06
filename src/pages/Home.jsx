import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ReelsScatter from '../components/ReelsScatter';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Process from '../components/Process';
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
      <ReelsScatter />
      <WhyUs />
      <Services />
      <Process />
      <Works />
    </>
  );
};

export default Home;
