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

    <section className="awesome-projects">
        <div className="container">
            <div className="awesome-header text-center">
                <img src="/assets/images/icon/unique-brands.png" alt="" />
                <h2>Awesome Projects</h2>
                <p>Jeremy Ellsworth Designs LLC is a full-service design agency catering to businesses and individuals,
                    with a focus on delivering high-quality, professional design solutions.</p>
            </div>
        </div>
        <div className="awesome-marquee">
            <div className="awesome-marquee-inner" data-marquee>
                <div className="awesome-marquee-track">
                    <div className="awesome-project-card">
                        <img src="/assets/images/portfolio/logo/1.png" alt="Nacho Business project" />
                    </div>
                    <div className="awesome-project-card">
                        <img src="/assets/images/portfolio/logo/2.png" alt="Salty Soft Wash project" />
                    </div>
                    <div className="awesome-project-card">
                        <img src="/assets/images/portfolio/logo/3.png" alt="El Sombrerito project" />
                    </div>
                    <div className="awesome-project-card">
                        <img src="/assets/images/portfolio/logo/4.png" alt="Buddy's Burgers project" />
                    </div>
                    <div className="awesome-project-card">
                        <img src="/assets/images/portfolio/logo/5.png" alt="Fence Pros of Texas project" />
                    </div>
                    <div className="awesome-project-card">
                        <img src="/assets/images/portfolio/logo/3.png" alt="Blue Tiger project" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Transforming />

    <SuccessStoriesHome />
   
    </>
  );
}
