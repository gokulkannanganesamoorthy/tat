import React from 'react';
import SEO from '../components/SEO';
import './Page.css';

const Gallery = () => {
  return (
    <>
      <SEO title="Gallery" description="View our creative gallery and visual works." url="/gallery" />
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-title">Gallery</h1>
          <p className="page-desc">Check back soon for our visual gallery.</p>
        </div>
      </div>
    </>
  );
};
export default Gallery;
