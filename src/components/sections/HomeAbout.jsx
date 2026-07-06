import React from 'react';
import { Link } from 'react-router-dom';

export function HomeAbout() {  return (
    <section className="about-sec home-about-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7">
                    <div className="image">
                        <video
                            src="/assets/images/about/about.mp4"
                            loop
                            muted
                            autoPlay
                            playsInline
                            aria-label="About San Jose creative agency"
                        />
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="content">
                        <h2 className="home-about-title">
                        EXPERT LOGO AND BRANDING AGENCY SAN JOSE,
                               <div>CALIFORNIA</div>
                        </h2>
                        <p>
                            San Jose Logo Design helps businesses build identities people actually remember. We pair{' '}
                            <Link to="/logo-design-services">logo design</Link> with{' '}
                            <Link to="/logo-design-services">strategic branding</Link> to give your company a visual presence that holds up in competitive markets. Starting from scratch or rebuilding a brand that&apos;s lost its edge? Our designers work directly with clients, not through layers of account managers, so every logo reflects the business behind it.
                        </p>
                        <p className="home-about-hide-sm">
                        We're also a working web design and digital marketing agency, not just a logo design shop. We build websites that look sharp and convert, sites designed to turn visitors into leads and leads into paying customers. If your brand needs both a strong identity and a site that actually performs, that's exactly the gap we fill.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
