import { useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="monolith-hero">
      {/* Background Video */}
      <motion.div 
        className="hero-video-bg"
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <video 
          src="https://cdn.pixabay.com/video/2020/05/11/38747-418659187_large.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        />
      </motion.div>

      {/* Massive Typography */}
      <div className="hero-typography">
        <h1 
          className="interactive" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="line">WE SHAPE</span>
          <span className="line indent">THE UNSEEN</span>
        </h1>
      </div>

      <div className="hero-scroll-prompt">
        <p>SCROLL TO EXPLORE</p>
      </div>
    </section>
  );
};

export default Hero;
