import React from 'react';
import SEO from '../components/SEO';
import './Page.css';

const Projects = () => {
  return (
    <>
      <SEO title="Projects" description="Explore our recent projects and case studies." url="/projects" />
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-title">Projects</h1>
          <p className="page-desc">Check back soon for our latest case studies.</p>
        </div>
      </div>
    </>
  );
};
export default Projects;
