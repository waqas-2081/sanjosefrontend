import React from 'react';
import { Transforming } from '../components/sections/Transforming';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
export default function PortfolioPage() {
  useDocumentTitle('Portfolio | San Jose Logo Design');
  return (
    <>
<section className="inner-breadcrumb">
        <div className="container-fluid">

            <div className="inner-breadcrumb-mascot" aria-hidden="true">
                <div className="mascot-ring">
                    <img src="/assets/images/inner-banner-icon.png" alt="" />
                </div>
            </div>

            <div className="inner-breadcrumb-content">
                <span className="inner-breadcrumb-tag">Creative Design Studio</span>

                <h1>Our <span>Portfolio</span></h1>

             
                <div className="inner-breadcrumb-links">
                    <a href="/">Home</a>
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Our Portfolio</span>
                </div>
            </div>

            <div className="inner-breadcrumb-bottom">
                <p>
                    Copeland Home Services revenue increased by 200% since rebranding
                    <span></span>
                    <a href="/blogs">Read Article</a>
                </p>
            </div>

        </div>
    </section>

    <PortfolioSection />

   
    </>
  );
}
