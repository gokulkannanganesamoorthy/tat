import React from 'react';
import SEO from '../components/SEO';
import './Page.css';

const TatTech = () => {
  return (
    <>
      <SEO title="TAT TECH" description="Websites that convert and convince. CRM s that make your work easier." url="/tat-tech" />
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-title">TAT TECH</h1>
          <p className="page-desc">Websites that convert and convince.</p>
          <p className="page-desc">CRM's that make your work easier.</p>
          <p className="page-desc">Manage your data at the best secured way.</p>
        </div>
      </div>
    </>
  );
};
export default TatTech;
