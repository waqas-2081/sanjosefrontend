import React from 'react';

export function AwesomeProjects({ variant } = {}) {
  const logoOffer = variant === 'logo-offer';
  return (
    <section className={`awesome-projects${logoOffer ? ' awesome-projects--logo-offer' : ''}`}>
        <div className="container">
            <div className="awesome-header text-center">
                <img src="/assets/images/icon/unique-brands.png" alt="" />
                <h3>AWESOME PROJECTS</h3>
                <p>Custom logos. Real businesses. See the branding work behind San Jose Logo Design's reputation.</p>
            </div>
        </div>
        <div className="awesome-marquee">
            <div
              className="awesome-marquee-inner"
              data-marquee
              data-marquee-speed={logoOffer ? '200' : undefined}
            >
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
  );
}
