import React from 'react';
import { Helmet } from 'react-helmet';
import ServicePackagesSection from '../components/sections/ServicePackagesSection';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PortfolioGalleryGrid } from '../components/ui/PortfolioGalleryGrid';

const WEBSITE_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://sanjoselogodesign.com/website-design-development-services/#service',
      name: 'Website Design',
      alternateName: [
        'Custom Website Design',
        'Custom Web Development',
        'Shopify Website Development',
        'WordPress Website Design',
        'E-commerce Website Design',
        'Landing Page Design',
      ],
      url: 'https://sanjoselogodesign.com/website-design-development-services',
      description:
        'Explore website design and development services from San Jose Logo Design, serving businesses across San Jose and beyond. Our team includes designers and skilled web developers, giving us the rare ability to build sites that look great and function flawlessly, with no gap between design vision and technical execution. With web design expertise, we deliver websites built to attract visitors and drive real business growth.',
      serviceType: 'Web Design and Development',
      category: 'Web Design',
      provider: { '@id': 'https://sanjoselogodesign.com/#professionalservice' },
      brand: { '@id': 'https://sanjoselogodesign.com/#organization' },
      mainEntityOfPage: {
        '@id': 'https://sanjoselogodesign.com/website-design-development-services/#webpage',
      },
      image: {
        '@id': 'https://sanjoselogodesign.com/website-design-development-services/#primaryimage',
      },
      keywords: [
        'website design san jose',
        'website design san jose',
        'custom website design',
        'san jose web design',
        'website designer san jose',
        'san jose website designer',
        'website design san jose ca',
        'web design agency san jose',
      ],
      offers: {
        '@id': 'https://sanjoselogodesign.com/website-design-development-services/#offer',
      },
    },
    {
      '@type': 'Offer',
      '@id': 'https://sanjoselogodesign.com/website-design-development-services/#offer',
      price: '225.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://sanjoselogodesign.com/#organization' },
      url: 'https://sanjoselogodesign.com/website-design-development-services',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sanjoselogodesign.com/website-design-development-services/#webpage',
      url: 'https://sanjoselogodesign.com/website-design-development-services',
      name: 'Website Design San Jose, CA | San Jose Logo Design',
      headline: 'Website Design',
      description:
        'Professional website design San Jose businesses trust. Custom, mobile-responsive sites built by expert designers and developers. Get a free quote today.',
      isPartOf: { '@id': 'https://sanjoselogodesign.com/#website' },
      mainEntity: {
        '@id': 'https://sanjoselogodesign.com/website-design-development-services/#service',
      },
      primaryImageOfPage: {
        '@id': 'https://sanjoselogodesign.com/website-design-development-services/#primaryimage',
      },
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://sanjoselogodesign.com/website-design-development-services/#primaryimage',
      contentUrl: 'https://sanjoselogodesign.com/assets/images/web1.png',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://sanjoselogodesign.com/website-design-development-services/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjoselogodesign.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Website Design',
          item: 'https://sanjoselogodesign.com/website-design-development-services',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq1',
          name: 'What is website design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Website design is the process of planning and building a website's layout, visuals, and user experience. As an expert San Jose website design and development company, we balance aesthetics with functionality, ensuring the site looks professional while guiding visitors toward taking action.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq2',
          name: 'Why is website design important for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Your website is often a customer's first impression of your business. Professional website design builds credibility, keeps visitors engaged longer, and directly impacts whether a visitor becomes a customer or leaves for a competitor's site instead.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq3',
          name: 'What are the key elements of good web design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Good web design combines clean navigation, fast load times, mobile responsiveness, and clear calls to action. A skilled San Jose web design team also considers SEO structure and user experience, not just visual appeal, to make sure the site performs as well as it looks.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq4',
          name: 'What are the top website design companies in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'San Jose Logo Design is a leading web design company in San Jose, offering custom website design, development, and ongoing support for businesses of all sizes throughout the Bay Area.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq5',
          name: 'Can I see examples of your past website design work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, our portfolio showcases completed website design San Jose projects across multiple industries, giving you a clear sense of our design style, functionality, and the range of businesses we've worked with.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq6',
          name: 'What services do you offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer full website design and development services, including custom WordPress builds, e-commerce solutions, web portals, mobile responsive design, and ongoing support, all handled by our in house team of designers and developers.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq7',
          name: 'Is website design affordable for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. We offer website design packages starting at an accessible entry point for small businesses, scaling up to advanced custom builds for companies needing more complex functionality, so there's a plan for nearly every budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq8',
          name: 'What is the best website design package for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The right package depends on your goals, a small business may only need a few pages, while a growing company may need a custom web portal with a custom dashboard along with booking and payment integrations. Our team can help you choose the right fit during a free consultation.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq9',
          name: 'How do I hire a website designer in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Getting started is simple: review our website design packages, choose the one that fits your business needs, and our dedicated project manager will guide you through the entire process from concept to launch.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq10',
          name: 'Can I get a website design quote in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, San Jose Logo Design offers free, no obligation quotes for website design and development. Contact us with your project details and we'll recommend the best package for your goals and budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq11',
          name: 'What does website design cost in San Jose, CA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Website design costs vary based on scope, from simple one page sites to advanced custom web portals. See our pricing packages above for exact rates, or contact us for a custom quote tailored to your business.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq12',
          name: 'How can I find reviews and ratings for San Jose Logo Design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can find client reviews and ratings for San Jose Logo Design on our website, as well as third-party platforms like Google, TrustPilot, Clutch etc. We encourage prospective clients to review past client feedback before starting a project.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq13',
          name: 'How do I compare website design companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When comparing website design companies, look at portfolio quality, client reviews, pricing transparency, and whether the team includes both designers and developers, a combination that ensures smoother execution and fewer handoff issues.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/website-design-development-services/#faq14',
          name: 'Do you offer website design for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, small business website design is one of our core services. Our Basic and Startup Web packages are specifically built for small businesses that need a professional, affordable online presence without unnecessary complexity.',
          },
        },
      ],
    },
  ],
};

export default function WebsitePage() {
  useDocumentTitle('Website Design San Jose, CA | San Jose Logo Design');
  return (
    <>
<Helmet>
    <title>Website Design San Jose, CA | San Jose Logo Design</title>
    <meta
      name="description"
      content="Professional website design San Jose businesses trust. Custom, mobile-responsive sites built by expert designers and developers. Get a free quote today."
    />
    <meta name="robots" content="index,follow" />
    <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
    <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
    <meta
      name="keywords"
      content="web design san jose, website design san jose, san jose web design, website designer san jose, san jose website designer, website design san jose ca"
    />
    <link rel="canonical" href="https://sanjoselogodesign.com/website-design-development-services" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Website Design San Jose, CA | San Jose Logo Design" />
    <meta
      property="og:description"
      content="Professional website design San Jose businesses trust. Custom, mobile-responsive sites built by expert designers and developers. Get a free quote today."
    />
    <meta property="og:url" content="https://sanjoselogodesign.com/website-design-development-services" />
    <meta property="og:site_name" content="Sanjoselogodesign" />
    <meta property="og:publish_date" content="2025-12-10" />
    <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
    <meta property="og:image:width" content="300" />
    <meta property="og:image:height" content="300" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Website Design San Jose, CA | San Jose Logo Design" />
    <meta
      name="twitter:description"
      content="Professional website design San Jose businesses trust. Custom, mobile-responsive sites built by expert designers and developers. Get a free quote today."
    />
    <meta property="twitter:url" content="https://sanjoselogodesign.com/website-design-development-services" />
    <meta name="twitter:image" content="seo_image" />
    <meta name="twitter:creator" content="@Sanjoselogodesign" />
    <meta name="twitter:site" content="@Sanjoselogodesign" />
    <meta name="twitter:label1" content="Written by" />
    <meta name="twitter:data1" content="Sanjoselogodesign" />
    <meta name="twitter:label2" content="Est. reading time" />
    <meta name="twitter:data2" content="4 minutes" />
    <meta name="p:domain_verify" content="48e81758daba0e0ed130f38f9d6891a0" />
    <meta name="facebook-domain-verification" content="9vzc2a6cq0sj6fifdg3d9m9609q6d5" />
    <script type="application/ld+json">{JSON.stringify(WEBSITE_PAGE_SCHEMA)}</script>
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

                <h1>Website <span>Design</span></h1>

               

                <div className="inner-breadcrumb-links">
                    <a href="/">Home</a>
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Website Design</span>
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
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6">
                    <div className="image">
                        <img src="/assets/images/web1.png" alt="" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="content">
                        <h1>
                            Top-Notch Website Design and Development Services in San Jose
                        </h1>
                        <p>Explore website design and development services from San Jose Logo Design, serving businesses across San Jose and beyond. Our team includes designers and skilled web developers, giving us the rare ability to build sites that look great and function flawlessly, with no gap between design vision and technical execution. With web design expertise, we deliver websites built to attract visitors and drive real business growth.</p>
                        <p>As a professional <a href="https://sanjoselogodesign.com/blog/why-professional-website-design-and-development-is-vital-for-san-jose-businesses">web design company based in San Jose</a>, we understand that your website is more than a digital brochure, it&apos;s often a customer&apos;s first real interaction with your business. Every website design and development project we take on is built to earn trust immediately: fast to load, easy to navigate, and clear about what action we want the visitor to take next.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <PortfolioGalleryGrid
      category="Website"
      tabId="tab-website"
      cardTitle="Website"
      fallbackImages={Array.from({ length: 6 }, (_, i) => ({ src: `/assets/images/portfolio/website/${i + 1}.png`, alt: 'Website project' }))}
    />

    <section className="about-sec inner-about-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6">
                    <div className="image">
                        <img src="/assets/images/web2.png" alt="" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="content">
                        <h1>
                            The Importance of Professional Web Design & Development
                        </h1>
                        <p>A well designed website does more than look good, it tells your brand&apos;s story and gives visitors a reason to trust you before you&apos;ve said a word. As an experienced San Jose website designer, we focus on user experience first: intuitive navigation, clear messaging, and design that guides visitors toward action, not just admiration. Whether you need a simple informational site or a full e-commerce platform, our web design and development services are built around what your business actually needs.</p>
                        <p>Every project starts with understanding your business goals, your audience, and your competitive landscape. From there, we develop a custom website design that&apos;s strategic by design, not just decorated, but built to convert visitors into customers.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <ServicePackagesSection
      serviceType="website"
      title="Affordable Custom Website Design Packages"
      subtitle="A website is often a one time investment that carries your whole business online, which is why getting it right matters. Below are our website design packages, built to match businesses at every stage, from a simple one page site to a fully custom web portal."
    />

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

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">01</span>
                        <span className="faq-question">What is website design?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Website design is the process of planning and building a website&apos;s layout, visuals, and user experience. As an expert <a href="https://sanjoselogodesign.com/">San Jose website design and development company</a> we balance aesthetics with functionality, ensuring the site looks professional while guiding visitors toward taking action.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">02</span>
                        <span className="faq-question">Why is website design important for my business?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Your website is often a customer&apos;s first impression of your business. Professional website design builds credibility, keeps visitors engaged longer, and directly impacts whether a visitor becomes a customer or leaves for a competitor&apos;s site instead.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">03</span>
                        <span className="faq-question">What are the key elements of good web design?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Good web design combines clean navigation, fast load times, mobile responsiveness, and clear calls to action. A skilled San Jose web design team also considers SEO structure and user experience, not just visual appeal, to make sure the site performs as well as it looks.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">04</span>
                        <span className="faq-question">What are the top website design companies in San Jose?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        San Jose Logo Design is a leading web design company in San Jose, offering custom website design, development, and ongoing support for businesses of all sizes throughout the Bay Area.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">05</span>
                        <span className="faq-question">Can I see examples of your past website design work?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Yes, our portfolio showcases completed website design San Jose projects across multiple industries, giving you a clear sense of our design style, functionality, and the range of businesses we&apos;ve worked with.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">06</span>
                        <span className="faq-question">What services do you offer?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        We offer full website design and development services, including custom WordPress builds, e-commerce solutions, web portals, mobile responsive design, and ongoing support, all handled by our in house team of designers and developers.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">07</span>
                        <span className="faq-question">Is website design affordable for small businesses?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Yes. We offer website design packages starting at an accessible entry point for small businesses, scaling up to advanced custom builds for companies needing more complex functionality, so there&apos;s a plan for nearly every budget.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">08</span>
                        <span className="faq-question">What is the best website design package for my business?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        The right package depends on your goals, a small business may only need a few pages, while a growing company may need a custom web portal with a custom dashboard along with booking and payment integrations. Our team can help you choose the right fit during a free consultation.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">09</span>
                        <span className="faq-question">How do I hire a website designer in San Jose?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Getting started is simple: review our website design packages, choose the one that fits your business needs, and our dedicated project manager will guide you through the entire process from concept to launch.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">10</span>
                        <span className="faq-question">Can I get a website design quote in San Jose?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Yes, San Jose Logo Design offers free, no obligation quotes for website design and development. Contact us with your project details and we&apos;ll recommend the best package for your goals and budget.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">11</span>
                        <span className="faq-question">What does website design cost in San Jose, CA?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Website design costs vary based on scope, from simple one page sites to advanced custom web portals. See our pricing packages above for exact rates, or contact us for a custom quote tailored to your business.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">12</span>
                        <span className="faq-question">How can I find reviews and ratings for San Jose Logo Design?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        You can find client reviews and ratings for <a href="https://sanjoselogodesign.com">San Jose Logo Design</a> on our website, as well as third-party platforms like Google, TrustPilot, Clutch etc. We encourage prospective clients to review past client feedback before starting a project.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">13</span>
                        <span className="faq-question">How do I compare website design companies?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        When comparing website design companies, look at portfolio quality, client reviews, pricing transparency, and whether the team includes both designers and developers, a combination that ensures smoother execution and fewer handoff issues.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">14</span>
                        <span className="faq-question">Do you offer website design for small businesses?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Yes, small business website design is one of our core services. Our Basic and Startup Web packages are specifically built for small businesses that need a professional, affordable online presence without unnecessary complexity.
                    </div>
                </details>

            </div>
        </div>
    </section>

    
    <SuccessStoriesHome />

    </>
  );
}

