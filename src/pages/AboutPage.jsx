import React from 'react';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { BrandPotential } from '../components/sections/BrandPotential';
export default function AboutPage() {
  useDocumentTitle('About Us | San Jose Logo Design');
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

                <h1>About <span>Us</span></h1>


                <div className="inner-breadcrumb-links">
                    <a href="/">Home</a>
                    <i className="fa-solid fa-angle-right"></i>
                    <span>About Us</span>
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

    <section className="about-sec inner-about-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7">
                    <div className="image">
                        <img src="/assets/images/about/about.jpg" alt="" />
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="content">
                        <h1>
                            Innovating
                            <div>Beyond</div>
                            Boundaries
                        </h1>
                        <p>Watch as we transform brands with cutting-edge design, bringing bold ideas to life. See why
                            we're the top choice for standout visual branding in today's market.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

  <BrandPotential />

    <SuccessStoriesHome />

    
    </>
  );
}
