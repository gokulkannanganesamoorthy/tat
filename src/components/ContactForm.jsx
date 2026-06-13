import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactForm.css';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    project: '',
    budget: '',
    email: ''
  });
  const [status, setStatus] = useState('idle');
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animation for the form
      gsap.fromTo(".contact-sentence-wrapper",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', company: '', project: '', budget: '', email: '' });
    }, 1500);
  };

  return (
    <section className="contact-terminal-container" ref={containerRef}>
      
      <div className="contact-meta-header">
        <span>[ TRANSMIT DIRECTIVE ]</span>
      </div>

      {status === 'success' ? (
        <div className="contact-success-message interactive">
          <h2>TRANSMISSION RECEIVED.</h2>
          <p>OUR SYSTEMS ARE ANALYZING YOUR COORDINATES. WE WILL INITIATE CONTACT SHORTLY.</p>
          <button className="reset-btn interactive" onClick={() => setStatus('idle')}>
            INITIALIZE NEW DIRECTIVE
          </button>
        </div>
      ) : (
        <form className="contact-sentence-form interactive" onSubmit={handleSubmit}>
          <div className="contact-sentence-wrapper">
            <span>HI, I AM </span>
            <input 
              type="text" 
              name="name" 
              placeholder="[YOUR NAME]" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="blank-input"
            />
            <span> FROM </span>
            <input 
              type="text" 
              name="company" 
              placeholder="[COMPANY]" 
              value={formData.company} 
              onChange={handleChange} 
              required 
              className="blank-input"
            />
            <span>. I WANT TO BUILD </span>
            <input 
              type="text" 
              name="project" 
              placeholder="[A PLATFORM / AN EXPERIENCE]" 
              value={formData.project} 
              onChange={handleChange} 
              required 
              className="blank-input long-input"
            />
            <span> WITH A BUDGET OF </span>
            <input 
              type="text" 
              name="budget" 
              placeholder="[BUDGET]" 
              value={formData.budget} 
              onChange={handleChange} 
              required 
              className="blank-input"
            />
            <span>. YOU CAN REACH ME AT </span>
            <input 
              type="email" 
              name="email" 
              placeholder="[EMAIL ADDRESS]" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="blank-input long-input"
            />
            <span>.</span>
          </div>

          <button type="submit" className="terminal-submit-btn interactive" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'TRANSMITTING...' : 'EXECUTE DIRECTIVE'}
          </button>
        </form>
      )}

    </section>
  );
};

export default ContactForm;
