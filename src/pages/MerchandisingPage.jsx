import React from 'react';
import { PortfolioGalleryGrid } from '../components/ui/PortfolioGalleryGrid';
import { Helmet } from 'react-helmet';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function MerchandisingPage() {
  useDocumentTitle('Merchandising | San Jose Logo Design');
  return (
    <>
      <Helmet>
        <title>Retail Merchandising & Point-of-Sale Design | San Jose Logo Design</title>
        <meta
          name="description"
          content="Merchandising design in San Jose: in-store displays, packaging concepts, retail graphics, and campaign kits that turn browsers into buyers."
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta
          name="keywords"
          content="merchandising design San Jose, retail graphics California, POS display design, packaging design agency, in-store marketing creative"
        />
        <link rel="canonical" href="https://sanjoselogodesign.com/merchandising-services" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Retail Merchandising & Point-of-Sale Design | San Jose Logo Design" />
        <meta
          property="og:description"
          content="Merchandising design in San Jose: in-store displays, packaging concepts, retail graphics, and campaign kits that turn browsers into buyers."
        />
        <meta property="og:url" content="https://sanjoselogodesign.com/merchandising-services" />
        <meta property="og:site_name" content="Sanjoselogodesign" />
        <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Retail Merchandising & Point-of-Sale Design | San Jose Logo Design" />
        <meta
          name="twitter:description"
          content="Merchandising design in San Jose: in-store displays, packaging concepts, retail graphics, and campaign kits that turn browsers into buyers."
        />
        <meta property="twitter:url" content="https://sanjoselogodesign.com/merchandising-services" />
        <meta name="twitter:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta name="twitter:creator" content="@Sanjoselogodesign" />
        <meta name="twitter:site" content="@Sanjoselogodesign" />
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

            <h1>
              Merchandising <span>Services</span>
            </h1>

            <div className="inner-breadcrumb-links">
              <a href="/">Home</a>
              <i className="fa-solid fa-angle-right" />
              <span>Merchandising</span>
            </div>
          </div>

          <div className="inner-breadcrumb-bottom">
            <p>
              Copeland Home Services revenue increased by 200% since rebranding
              <span />
              <a href="/blog">Read Article</a>
            </p>
          </div>
        </div>
      </section>

      <section className="about-sec inner-about-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/mercha1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h1>Merchandising That Sells Your Story In Store and Online</h1>
                <p>
                  Strong merchandising connects your brand identity to the moment a customer decides to buy. We design
                  cohesive retail and campaign assetsΓÇöfrom shelf talkers and window graphics to seasonal kits and
                  digital bannersΓÇöso every touchpoint feels intentional and on-brand.
                </p>
                <p>
                  Our team works with founders, marketing leads, and retail partners to clarify messaging, prioritize
                  offers, and produce files that are ready for print vendors or your e-commerce team. Whether you are
                  launching a new line or refreshing an existing display program, we keep the creative practical and
                  production-friendly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioGalleryGrid
        tabId="tab-merchandising"
        cardTitle="Merchandising"
        fallbackImages={Array.from({ length: 12 }, (_, i) => ({
          src: `/assets/images/merchandising/${i + 1}.png`,
          alt: 'Merchandising project',
        }))}
      />

      <section className="about-sec inner-about-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/mercha2.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h1>What We Deliver</h1>
                <p>
                  Typical merchandising engagements include concept boards, layout templates for fixtures or endcaps,
                  packaging mockups, promotional flyers, and social-ready assets that mirror the in-store story. We can
                  align artwork with your existing brand guidelines or help extend your visual system for new channels.
                </p>
                <p>
                  Tell us about your locations, timelines, and print specsΓÇöwe will propose a scoped roadmap with clear
                  review rounds so your team can approve quickly and move to market with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section py-5">
        <div className="container">
          <div className="faq-header text-center">
            <span className="section-pill">Need Help?</span>
            <h2 className="faq-title">Merchandising Questions</h2>
            <p className="faq-subtitle">Quick answers before we scope your retail or campaign creative.</p>
          </div>

          <div className="faq-modern-grid">
            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">01</span>
                <span className="faq-question">What counts as merchandising design?</span>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                Anything that helps present and sell your product or offer displays, signage, packaging concepts,
                seasonal campaign art, and coordinated digital graphics that support the same promotion.
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">02</span>
                <span className="faq-question">Do you work with our print vendor?</span>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                Yes. We can deliver print-ready PDFs, dielines when available, and organized layered files. Share your
                vendorΓÇÖs specs early so we build to their requirements from the start.
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">03</span>
                <span className="faq-question">How long does a merchandising project take?</span>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                Timelines depend on SKU count, store footprint, and revision rounds. Many focused programs finish in a
                few weeks once direction and assets are confirmed.
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">04</span>
                <span className="faq-question">Can you match our existing brand guidelines?</span>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                Absolutely. Send your brand book, fonts, and color values. We extend the system into merchandising
                formats without diluting recognition.
              </div>
            </details>
          </div>
        </div>
      </section>

      <SuccessStoriesHome />
    </>
  );
}
