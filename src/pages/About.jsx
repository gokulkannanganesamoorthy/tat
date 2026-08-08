import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageInnerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const text = textRef.current;

      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power3.out', duration: 1.5, delay: 0.2 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page-safe-wrapper">
      <SEO
        title="About Us"
        description="Learn more about THE ADS TAG. We build beyond the grid, architecting fluid digital environments."
        url="/about"
      />
      <section className="about-premium-container" ref={containerRef}>
        {/* The Typography Layer */}
        <div className="about-premium-text-layer" ref={textRef}>
          <div className="about-text-content">
            <h2 className="about-premium-title">
              <span className="serif-italic">ABOUT TAT</span>
            </h2>
            <div className="about-premium-subtitle">
              <p>Young. Energetic. A little obsessed with good stories. 🎬</p>
              <br />
              <p>
                We’re The Ads Tag (TAT) a creative team that believes great
                content should make people stop, watch, feel something and go,
                “Wait… this is actually good.”
              </p>
              <br />
              <p>
                We don’t copy references.
                <br />
                We don’t recreate someone else’s idea with a different logo.
                <br />
                And we definitely don’t turn a movie scene into a brand
                strategy.
              </p>
              <br />
              <p>
                We create from the brand itself.
                <br />
                The people. The personality. The purpose. The chaos.
              </p>
              <br />
              <p>
                From the first idea to the final frame, we create content that
                feels fresh, intentional and unmistakably the brand.
              </p>
              <br />
              <p>
                Because branding isn’t about making a brand look like everyone
                else.
              </p>
              <br />
              <p>It’s about creating something people remember.</p>
              <br />
              <p>So, here we go.</p>
              <br />
              <p>
                Meet the team behind the tag.
                <br />
                <strong>THE TEAM TAT. 🫡</strong>
              </p>
              <br />
              <p>
                <strong>THE ADS TAG</strong>
                <br />
                Choose us when the goal is to brand right, not just brand loud.
              </p>
            </div>
          </div>
        </div>

        {/* Edge Typography (Fixed to the screen edges) */}
        <div className="about-edge-text left-edge">
          [ T - A - T : STRUCTURAL ]
        </div>
        <div className="about-edge-text right-edge">[ 00:00:24:00 - REC ]</div>
      </section>
    </div>
  );
};

export default About;
