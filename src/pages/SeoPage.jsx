import React from 'react';
import { Helmet } from 'react-helmet';
import ServicePackagesSection from '../components/sections/ServicePackagesSection';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { BrandPotential } from '../components/sections/BrandPotential';

const SEO_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#service',
      name: 'SEO Services',
      alternateName: [
        'Search Engine Optimization',
        'SEO Agency',
        'SEO Company',
        'Local SEO',
        'Technical SEO',
      ],
      url: 'https://sanjoselogodesign.com/search-engine-optimization-services',
      description:
        "Explore SEO services from San Jose Logo Design, an SEO agency in San Jose serving businesses across San Jose and beyond. Our team includes technical SEO specialists, content strategists, and link builders, giving us the rare ability to fix what's broken on your site and build what's missing, without treating SEO like a one-time checklist. With SEO services built for the long term, we help your business get found by people already searching for what you offer.",
      serviceType: 'Search Engine Optimization',
      category: 'SEO',
      provider: { '@id': 'https://sanjoselogodesign.com/#professionalservice' },
      brand: { '@id': 'https://sanjoselogodesign.com/#organization' },
      mainEntityOfPage: {
        '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#webpage',
      },
      image: {
        '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#primaryimage',
      },
      keywords: [
        'san jose seo services',
        'san jose seo company',
        'seo agency san jose',
        'seo services san jose',
        'seo company in san jose',
        'san jose seo agency',
      ],
      offers: {
        '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#offer',
      },
    },
    {
      '@type': 'Offer',
      '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#offer',
      price: '499.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://sanjoselogodesign.com/#organization' },
      url: 'https://sanjoselogodesign.com/search-engine-optimization-services',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#webpage',
      url: 'https://sanjoselogodesign.com/search-engine-optimization-services',
      name: 'SEO Services San Jose, CA | San Jose Logo Design',
      headline: 'SEO Services',
      description:
        'SEO services San Jose businesses trust. Technical SEO, local SEO, and content strategy from an experienced SEO agency. Get a free quote today.',
      isPartOf: { '@id': 'https://sanjoselogodesign.com/#website' },
      mainEntity: {
        '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#service',
      },
      primaryImageOfPage: {
        '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#primaryimage',
      },
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#primaryimage',
      contentUrl: 'https://sanjoselogodesign.com/assets/images/seo1.png',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjoselogodesign.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'SEO Services',
          item: 'https://sanjoselogodesign.com/search-engine-optimization-services',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq1',
          name: 'What is SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEO, or search engine optimization, is the process of improving a website so it ranks higher in search results for the terms your customers are actually searching. As an SEO company in San Jose, we work on both the technical side of a site and the content itself, since either one alone rarely moves rankings by itself.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq2',
          name: 'Why is SEO important for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Most customers start their search on Google before ever visiting a website directly. Professional SEO services put your business in front of that search, build long-term visibility that doesn't disappear when an ad budget runs out, and directly impacts whether someone finds you first or finds a competitor instead.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq3',
          name: 'What are the key elements of a good SEO strategy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A strong SEO strategy combines technical site health, keyword research based on real search intent, quality content, and a link profile that signals trust to Google. A skilled seo agency san jose businesses can rely on also tracks rankings and traffic monthly, adjusting the strategy instead of running the same plan unchanged for a year.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq4',
          name: 'What are the top SEO companies in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'San Jose Logo Design is a leading seo company in San Jose, offering seo services san jose businesses trust, alongside content strategy and technical audits for companies throughout the Bay Area.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq5',
          name: 'Can I see examples of your past SEO work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, our portfolio showcases completed SEO campaigns across multiple industries, giving you a clear sense of our strategy, reporting style, and the range of businesses we've worked with.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq6',
          name: 'What services do you offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer full SEO services, including technical SEO audits, on-page optimization, local SEO, content strategy, and link building, all handled by our in-house team of SEO specialists and writers.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq7',
          name: 'Is SEO affordable for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. We offer SEO packages starting at an accessible entry point for small businesses, scaling up to advanced, multi-location strategies for companies ready to invest more in organic growth, so there's a plan for nearly every budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq8',
          name: 'What is the best SEO package for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The right package depends on your goals, a small business may only need local SEO to rank in nearby searches, while a growing company may need a full content and link building strategy to compete nationally. Our team can help you choose the right fit during a free consultation.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq9',
          name: 'How do I hire an SEO agency in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Getting started is simple: review our SEO packages, choose the one that fits your business goals, and our dedicated account manager will guide you through the audit, strategy, and ongoing reporting.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq10',
          name: 'Can I get an SEO services quote in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, San Jose Logo Design offers free, no obligation quotes for san jose seo services. Contact us with your website and goals and we'll recommend the best package for your budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq11',
          name: 'What does SEO cost in San Jose, CA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEO costs vary based on competition, scope, and how much technical work a site needs, from a single local SEO campaign to a full, multi-channel organic strategy. See our pricing packages above for exact rates, or contact us for a custom quote tailored to your business.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq12',
          name: 'How can I find reviews and ratings for San Jose Logo Design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can find client reviews and ratings for San Jose Logo Design on our website, as well as third-party platforms like Google, TrustPilot, Clutch etc. We encourage prospective clients to review past client feedback before starting a project.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq13',
          name: 'How do I compare SEO companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When comparing san jose seo companies, look at case studies, client reviews, reporting transparency, and whether the team handles both technical SEO and content in-house, a combination that keeps your rankings improving instead of stalling.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/search-engine-optimization-services/#faq14',
          name: 'Do you offer SEO for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, small business SEO is one of our core services. Our Starter and Local Growth packages are specifically built for small businesses that need professional SEO without unnecessary complexity or cost.',
          },
        },
      ],
    },
  ],
};

export default function SeoPage() {
  useDocumentTitle('SEO Services San Jose, CA | San Jose Logo Design');
  return (
    <>
      <Helmet>
        <title>SEO Services San Jose, CA | San Jose Logo Design</title>
        <meta
          name="description"
          content="SEO services San Jose businesses trust. Technical SEO, local SEO, and content strategy from an experienced SEO agency. Get a free quote today."
        />
        <meta name="robots" content="index,follow" />
        <meta
          name="googlebot"
          content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
        />
        <meta
          name="keywords"
          content="san jose seo services, san jose seo company, seo agency san jose, seo services san jose, seo company in san jose, san jose seo agency"
        />
        <link
          rel="canonical"
          href="https://sanjoselogodesign.com/search-engine-optimization-services"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEO Services San Jose, CA | San Jose Logo Design" />
        <meta
          property="og:description"
          content="SEO services San Jose businesses trust. Technical SEO, local SEO, and content strategy from an experienced SEO agency. Get a free quote today."
        />
        <meta
          property="og:url"
          content="https://sanjoselogodesign.com/search-engine-optimization-services"
        />
        <meta property="og:site_name" content="Sanjoselogodesign" />
        <meta property="og:publish_date" content="2025-12-10" />
        <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Services San Jose, CA | San Jose Logo Design" />
        <meta
          name="twitter:description"
          content="SEO services San Jose businesses trust. Technical SEO, local SEO, and content strategy from an experienced SEO agency. Get a free quote today."
        />
        <meta
          property="twitter:url"
          content="https://sanjoselogodesign.com/search-engine-optimization-services"
        />
        <meta name="twitter:image" content="seo_image" />
        <meta name="twitter:creator" content="@Sanjoselogodesign" />
        <meta name="twitter:site" content="@Sanjoselogodesign" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Sanjoselogodesign" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="4 minutes" />
        <meta name="p:domain_verify" content="48e81758daba0e0ed130f38f9d6891a0" />
        <meta name="facebook-domain-verification" content="9vzc2a6cq0sj6fifdg3d9m9609q6d5" />
        <script type="application/ld+json">{JSON.stringify(SEO_PAGE_SCHEMA)}</script>
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
              SEO <span>Services</span>
            </h1>
            <div className="inner-breadcrumb-links">
              <a href="/">Home</a>
              <i className="fa-solid fa-angle-right"></i>
              <span>SEO Services</span>
            </div>
          </div>

          <div className="inner-breadcrumb-bottom">
            <p>
              Copeland Home Services revenue increased by 200% since rebranding
              <span></span>
              <a href="/blog">Read Article</a>
            </p>
          </div>
        </div>
      </section>

      <section className="about-sec inner-about-sec">
        <img
          src="/assets/images/icon/section_bottom_shape.svg"
          alt=""
          className="section_top_shape"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/seo1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h2>Top-Notch SEO Services in San Jose</h2>
                <p>
                  The best business in San Jose can still lose to a worse one that simply ranks higher on Google.
                  Explore <a href="https://sanjoselogodesign.com/">SEO services</a> from San Jose Logo Design, an SEO
                  agency in San Jose serving businesses across San Jose and beyond. Our team includes technical SEO
                  specialists, content strategists, and link builders, giving us the rare ability to fix what&apos;s
                  broken on your site and build what&apos;s missing, without treating SEO like a one-time checklist.
                  With SEO services built for the long term, we help your business get found by people already searching
                  for what you offer.
                </p>
                <p>
                  As a professional SEO company based in San Jose, we understand that rankings without strategy don&apos;t
                  last, and strategy without technical execution never shows up in search results at all. Every SEO
                  campaign we run is built to earn a permanent place on page one: the right keywords, a site Google can
                  actually crawl, and content that answers what your customers are searching for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandPotential />

      <section className="about-sec inner-about-sec">
        <img
          src="/assets/images/icon/section_bottom_shape.svg"
          alt=""
          className="section_top_shape"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/seo2.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h2>The Importance of Professional SEO</h2>
                <p>
                  Good SEO does more than move you up a results page, it puts your business in front of someone at the
                  exact moment they&apos;re ready to buy. As an experienced san jose seo agency, we focus on rankings that
                  convert, not just traffic that inflates a report: qualified visitors, a better site experience, and
                  content built around real search intent. Whether you need local SEO, technical SEO, or a full content
                  strategy, our approach is built around what actually grows your business, not rankings for keywords
                  nobody searches.
                </p>
                <p>
                  Every project starts with a full audit of your current site, your competitors, and the keywords your
                  customers are actually typing into Google. From there, we build an SEO strategy that&apos;s data-driven
                  by design, not just a checklist, but built to compound results over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicePackagesSection
        serviceType="seo"
        pill="Pricing"
        title="Affordable Custom SEO Packages"
        subtitle="SEO is rarely an overnight win, it's an investment that compounds the longer it runs, which is why choosing a partner who plays the long game matters. Below are our SEO packages, built to match businesses at every stage, from a single local SEO campaign to a full, ongoing SEO strategy."
      />

      <section className="faq-section py-5">
        <div className="container">
          <div className="faq-header text-center">
            <span className="section-pill">Need Help?</span>
            <h2 className="faq-title">Questions Clients Ask Before Starting</h2>
            <p className="faq-subtitle">
              Quick answers about timelines, process, reporting, and results.
            </p>
          </div>

          <div className="faq-modern-grid">
            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">01</span>
                <h3 className="faq-question">What is SEO?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  SEO, or search engine optimization, is the process of improving a website so it ranks higher in search
                  results for the terms your customers are actually searching. As an SEO company in San Jose, we work on
                  both the technical side of a site and the content itself, since either one alone rarely moves rankings
                  by itself.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">02</span>
                <h3 className="faq-question">Why is SEO important for my business?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Most customers start their search on Google before ever visiting a website directly. Professional SEO
                  services put your business in front of that search, build long-term visibility that doesn&apos;t
                  disappear when an ad budget runs out, and directly impact whether someone finds you first or finds a
                  competitor instead.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">03</span>
                <h3 className="faq-question">What are the key elements of a good SEO strategy?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  A strong SEO strategy combines technical site health, keyword research based on real search intent,
                  quality content, and a link profile that signals trust to Google. A skilled seo agency san jose
                  businesses can rely on also tracks rankings and traffic monthly, adjusting the strategy instead of
                  running the same plan unchanged for a year.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">04</span>
                <h3 className="faq-question">What are the top SEO companies in San Jose?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  <a href="https://sanjoselogodesign.com/">San Jose Logo Design</a> is a leading seo company in San Jose,
                  offering seo services san jose businesses trust, alongside content strategy and technical audits for
                  companies throughout the Bay Area.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">05</span>
                <h3 className="faq-question">Can I see examples of your past SEO work?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, our <a href="https://sanjoselogodesign.com/portfolio">portfolio</a> showcases completed SEO
                  campaigns across multiple industries, giving you a clear sense of our strategy, reporting style, and
                  the range of businesses we&apos;ve worked with.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">06</span>
                <h3 className="faq-question">What services do you offer?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  We offer full SEO services, including technical SEO audits, on-page optimization, local SEO, content
                  strategy, and link building, all handled by our in-house team of SEO specialists and writers.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">07</span>
                <h3 className="faq-question">Is SEO affordable for small businesses?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes. We offer SEO packages starting at an accessible entry point for small businesses, scaling up to
                  advanced, multi-location strategies for companies ready to invest more in organic growth, so
                  there&apos;s a plan for nearly every budget.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">08</span>
                <h3 className="faq-question">What is the best SEO package for my business?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  The right package depends on your goals, a small business may only need local SEO to rank in nearby
                  searches, while a growing company may need a full content and link building strategy to compete
                  nationally. Our team can help you choose the right fit during a free consultation.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">09</span>
                <h3 className="faq-question">How do I hire an SEO agency in San Jose?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Getting started is simple: review our SEO packages, choose the one that fits your business goals, and
                  our dedicated account manager will guide you through the audit, strategy, and ongoing reporting.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">10</span>
                <h3 className="faq-question">Can I get an SEO services quote in San Jose?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, San Jose Logo Design offers free, no obligation quotes for san jose seo services. Contact us with
                  your website and goals and we&apos;ll recommend the best package for your budget.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">11</span>
                <h3 className="faq-question">What does SEO cost in San Jose, CA?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  SEO costs vary based on competition, scope, and how much technical work a site needs, from a single
                  local SEO campaign to a full, multi-channel organic strategy. See our pricing packages above for exact
                  rates, or <a href="https://sanjoselogodesign.com/contact-us">contact us</a> for a custom quote tailored
                  to your business.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">12</span>
                <h3 className="faq-question">How can I find reviews and ratings for San Jose Logo Design?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  You can find client reviews and ratings for San Jose Logo Design on our website, as well as
                  third-party platforms like Google, TrustPilot, Clutch etc. We encourage prospective clients to review
                  past client feedback before starting a project.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">13</span>
                <h3 className="faq-question">How do I compare SEO companies?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  When comparing san jose seo companies, look at case studies, client reviews, reporting transparency,
                  and whether the team handles both technical SEO and content in-house, a combination that keeps your
                  rankings improving instead of stalling.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">14</span>
                <h3 className="faq-question">Do you offer SEO for small businesses?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, small business SEO is one of our core services. Our Starter and Local Growth packages are
                  specifically built for small businesses that need professional SEO without unnecessary complexity or
                  cost.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <SuccessStoriesHome />
    </>
  );
}
