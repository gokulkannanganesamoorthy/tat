import React from 'react';
import SEO from '../components/SEO';
import './Page.css';

const Products = () => {
  return (
    <>
      <SEO title="Products" description="Discover our premium product offerings." url="/products" />
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-title">Products</h1>
          <p className="page-desc">Check back soon for our latest offerings.</p>
        </div>
      </div>
    </>
  );
};
export default Products;
