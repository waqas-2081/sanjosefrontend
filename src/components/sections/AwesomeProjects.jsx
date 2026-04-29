import React from 'react';
export function AwesomeProjects() {
  return (
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
  );
}
