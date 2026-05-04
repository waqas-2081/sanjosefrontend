import React from 'react';
import { Helmet } from 'react-helmet';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { BrandPotential } from '../components/sections/BrandPotential';
export default function AboutPage() {
  useDocumentTitle('About Us | San Jose Logo Design');
  return (
    <>
<Helmet>
  <title>About Us | San Jose Logo Design</title>
  <meta
    name="description"
    content="San Jose Logo Design creates custom logos and branding solutions for businesses of all sizes. Contact us today to elevate your brand Online Presence!"
  />
  <meta name="robots" content="index,follow" />
  <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
  <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
  <meta
    name="keywords"
    content="Logo Designing, SEO Company, SMM Company, Logo Design, Website Design, Website Development, Affordable Packages Logo Design, Affordable Packages Website Design, Affordable Packages Digital Design"
  />
  <link rel="canonical" href="https://sanjoselogodesign.com/about-us" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="About Us | San Jose Logo Design" />
  <meta
    property="og:description"
    content="Logo Designing, SEO Company, SMM Company, Logo Design, Website Design, Website Development, Affordable Packages Logo Design, Affordable Packages Website Design, Affordable Packages Digital Design"
  />
  <meta property="og:url" content="https://sanjoselogodesign.com/about-us" />
  <meta property="og:site_name" content="Sanjoselogodesign" />
  <meta property="og:publish_date" content="2025-12-10" />
  <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
  <meta property="og:image:width" content="300" />
  <meta property="og:image:height" content="300" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About Us | San Jose Logo Design" />
  <meta
    name="twitter:description"
    content="Logo Designing, SEO Company, SMM Company, Logo Design, Website Design, Website Development, Affordable Packages Logo Design, Affordable Packages Website Design, Affordable Packages Digital Design"
  />
  <meta property="twitter:url" content="https://sanjoselogodesign.com/about-us" />
  <meta name="twitter:image" content="seo_image" />
  <meta name="twitter:creator" content="@Sanjoselogodesign" />
  <meta name="twitter:site" content="@Sanjoselogodesign" />
  <meta name="twitter:label1" content="Written by" />
  <meta name="twitter:data1" content="Sanjoselogodesign" />
  <meta name="twitter:label2" content="Est. reading time" />
  <meta name="twitter:data2" content="4 minutes" />
  <meta name="p:domain_verify" content="48e81758daba0e0ed130f38f9d6891a0" />
  <meta name="facebook-domain-verification" content="9vzc2a6cq0sj6fifdg3d9m9609q6d5" />
</Helmet>
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
