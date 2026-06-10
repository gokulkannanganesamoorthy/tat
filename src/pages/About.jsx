import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="page-section" style={{ paddingTop: '25vh', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <div className="container" style={{ padding: '0 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.h1 
          style={{ fontSize: 'var(--text-h1)', color: 'var(--text-primary)', marginBottom: '2rem', fontFamily: 'var(--font-display)', lineHeight: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          WE ARE TAT.
        </motion.h1>
        <motion.p 
          style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A spatial design and creative engineering agency built for the unseen. We craft digital and physical experiences that challenge the status quo, utilizing relentless creativity and technical mastery to drive unapologetic growth for visionary brands.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
