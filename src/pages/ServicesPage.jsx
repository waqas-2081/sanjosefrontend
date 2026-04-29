import React from 'react';
import { Transforming } from '../components/sections/Transforming';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SolutionsSection } from '../components/sections/SolutionsSection';
export default function ServicesPage() {
  useDocumentTitle('Services | San Jose Logo Design');
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

                <h1>Our <span>Services</span></h1>

               

                <div className="inner-breadcrumb-links">
                    <a href="/">Home</a>
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Our Services</span>
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

    
    <SolutionsSection />

    <Transforming />

    <section className="faq-section py-5">
        <div className="container">
            <div className="faq-header text-center">
                <span className="section-pill">Need Help?</span>
                <h2 className="faq-title">Questions Clients Ask Before Starting</h2>
                <p className="faq-subtitle">
                    Quick answers about timelines, process, collaboration, and post-launch support.
                </p>
            </div>

            <div className="faq-modern-grid">
                <details className="faq-modern-item" open>
                    <summary>
                        <span className="faq-index">01</span>
                        <span className="faq-question">What services does your agency offer?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        We offer brand strategy, identity design, website design and development, digital marketing
                        assets, SEO support, and ongoing creative retainers.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">02</span>
                        <span className="faq-question">How long does a project usually take?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Most projects run between 2 and 8 weeks depending on scope. We share a clear milestone timeline
                        before production starts.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">03</span>
                        <span className="faq-question">Do you work with startups and small teams?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Yes. We regularly partner with startups, founders, and small teams to create scalable brand and
                        website systems from the ground up.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">04</span>
                        <span className="faq-question">What is included after launch?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        We provide handoff files, quality checks, launch support, and optional maintenance packages so
                        your team stays confident post-launch.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <section className="packages-section py-5">
        <div className="container">
            <div className="packages-header text-center">
                <span className="section-pill">Pricing</span>
                <h2 className="packages-title">Choose The Right Growth Package</h2>
                <p className="packages-subtitle">
                    Modern plans designed for different business stages, from launch to full-scale growth.
                </p>
            </div>

            <div className="packages-modern-grid">
                <article className="package-card">
                    <span className="plan-badge">Starter</span>
                    <h3>Brand Kickoff</h3>
                    <h2>$499 <small>/one time</small></h2>
                    <ul>
                        <li><i className="fa-solid fa-check"></i> 2 Logo Concepts</li>
                        <li><i className="fa-solid fa-check"></i> Color & Typography Guide</li>
                        <li><i className="fa-solid fa-check"></i> 1 Landing Page Design</li>
                        <li><i className="fa-solid fa-check"></i> 7 Days Email Support</li>
                    </ul>
                    <a href="/contact" className="package-btn">Start Starter Plan</a>
                </article>

                <article className="package-card featured">
                    <span className="plan-badge">Most Popular</span>
                    <h3>Growth Suite</h3>
                    <h2>$999 <small>/project</small></h2>
                    <ul>
                        <li><i className="fa-solid fa-check"></i> Complete Brand Identity</li>
                        <li><i className="fa-solid fa-check"></i> 5 Page Website</li>
                        <li><i className="fa-solid fa-check"></i> UI Components System</li>
                        <li><i className="fa-solid fa-check"></i> Priority Revisions</li>
                    </ul>
                    <a href="/contact" className="package-btn">Choose Growth Suite</a>
                </article>

                <article className="package-card">
                    <span className="plan-badge">Premium</span>
                    <h3>Scale Partner</h3>
                    <h2>$1999 <small>/project</small></h2>
                    <ul>
                        <li><i className="fa-solid fa-check"></i> Strategy + Positioning</li>
                        <li><i className="fa-solid fa-check"></i> Custom Conversion Website</li>
                        <li><i className="fa-solid fa-check"></i> Campaign Creative Kit</li>
                        <li><i className="fa-solid fa-check"></i> Dedicated Account Support</li>
                    </ul>
                    <a href="/contact" className="package-btn">Talk To Strategy Team</a>
                </article>
            </div>
        </div>
    </section>

  <SuccessStoriesHome />

    </>
  );
}
