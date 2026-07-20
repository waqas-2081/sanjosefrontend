import React from 'react';
import { Helmet } from 'react-helmet';
import ServicePackagesSection from '../components/sections/ServicePackagesSection';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PortfolioGalleryGrid } from '../components/ui/PortfolioGalleryGrid';

const DIGITAL_MARKETING_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#service',
      name: 'Digital Marketing',
      alternateName: [
        'Digital Marketing Agency',
        'SEO Services',
        'Paid Advertising',
        'Social Media Marketing',
        'San Jose Advertising Agency',
      ],
      url: 'https://sanjoselogodesign.com/digital-marketing-services',
      description:
        'Explore digital marketing services from San Jose Logo Design, a digital marketing agency in San Jose serving businesses across San Jose and beyond. Our team includes strategists, copywriters, and paid media specialists, giving us the rare ability to plan a campaign and actually execute it, with no gap between the strategy and what your audience sees. With digital marketing handled end to end, we help your business get found by the people already looking for it.',
      serviceType: 'Digital Marketing',
      category: 'Digital Marketing',
      provider: { '@id': 'https://sanjoselogodesign.com/#professionalservice' },
      brand: { '@id': 'https://sanjoselogodesign.com/#organization' },
      mainEntityOfPage: {
        '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#webpage',
      },
      image: {
        '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#primaryimage',
      },
      keywords: [
        'marketing agency san jose',
        'digital marketing agency san jose',
        'digital marketing san jose',
        'san jose digital marketing agency',
        'san jose digital marketing',
        'digital marketing in san jose',
        'ad agencies san jose',
        'marketing san jose ca',
        'san jose advertising agencies',
      ],
      offers: { '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#offer' },
    },
    {
      '@type': 'Offer',
      '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#offer',
      price: '99.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://sanjoselogodesign.com/#organization' },
      url: 'https://sanjoselogodesign.com/digital-marketing-services',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#webpage',
      url: 'https://sanjoselogodesign.com/digital-marketing-services',
      name: 'Digital Marketing San Jose, CA | San Jose Logo Design',
      headline: 'Digital Marketing',
      description:
        'Digital marketing San Jose businesses trust. SEO, paid ads, and social media strategies built by a full-service marketing agency. Get a free quote today.',
      isPartOf: { '@id': 'https://sanjoselogodesign.com/#website' },
      mainEntity: {
        '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#service',
      },
      primaryImageOfPage: {
        '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#primaryimage',
      },
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#primaryimage',
      contentUrl: 'https://sanjoselogodesign.com/assets/images/marketing1.png',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjoselogodesign.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Digital Marketing',
          item: 'https://sanjoselogodesign.com/digital-marketing-services',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq1',
          name: 'What is digital marketing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Digital marketing is the practice of promoting a business online through channels like SEO, paid advertising, social media, and email, instead of relying only on traditional advertising. As a digital marketing agency, we build each strategy around where your specific audience already spends their time, rather than a one-size-fits-all plan.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq2',
          name: 'Why is digital marketing important for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most customers research a business online before ever making contact. Professional digital marketing builds visibility where people are already searching, builds trust through consistent messaging, and directly impacts whether someone finds you first or finds a competitor instead.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq3',
          name: 'What are the key elements of a good digital marketing strategy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A strong digital marketing strategy combines clear goals, consistent brand messaging across channels, data tracking that shows what's actually working, and campaigns built around the customer's journey rather than a single ad. A skilled san jose digital marketing agency also adjusts the plan based on real performance data instead of running it unchanged for months.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq4',
          name: 'What are the top digital marketing agencies in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'San Jose Logo Design is recognized as one of the leading digital marketing agencies in San Jose, offering SEO, paid advertising, and social media management for businesses of all sizes throughout the Bay Area.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq5',
          name: 'Can I see examples of your past marketing work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, our portfolio showcases completed digital marketing campaigns across multiple industries, giving you a clear sense of our strategy, creative style, and the range of businesses we've worked with.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq6',
          name: 'What services do you offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer full digital marketing services, including SEO, paid search advertising, social media marketing, email marketing, and content marketing, all handled by our in-house team of strategists, writers, and media specialists.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq7',
          name: 'Is digital marketing affordable for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. We offer digital marketing packages starting at an accessible entry point for small businesses, scaling up to advanced, multi-channel campaigns for companies ready to invest more in growth, so there's a plan for nearly every budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq8',
          name: 'What is the best digital marketing package for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The right package depends on your goals, a small business may only need local SEO and social media management, while a growing company may need a full-funnel strategy with paid advertising and email campaigns. Our team can help you choose the right fit during a free consultation.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq9',
          name: 'How do I hire a digital marketing agency in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Getting started is simple: review our digital marketing packages, choose the one that fits your business goals, and our dedicated account manager will guide you through strategy, launch, and ongoing optimization.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq10',
          name: 'Can I get a digital marketing quote in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, San Jose Logo Design offers free, no obligation quotes for digital marketing in San Jose. Contact us with your business goals and we'll recommend the best package for your budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq11',
          name: 'What does digital marketing cost in San Jose, CA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Digital marketing costs vary based on channels and scope, from a single local SEO campaign to a full-service, multi-channel strategy. See our pricing packages above for exact rates, or contact us for a custom quote tailored to your business.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq12',
          name: 'How can I find reviews and ratings for San Jose Logo Design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can find client reviews and ratings for San Jose Logo Design on our website, as well as third-party platforms like Google, TrustPilot, Clutch etc. We encourage prospective clients to review past client feedback before starting a project.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq13',
          name: 'How do I compare digital marketing agencies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When comparing ad agencies in San Jose, look at portfolio quality, client reviews, pricing transparency, and whether the team can execute both strategy and creative in-house, a combination that keeps campaigns consistent from planning to execution.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/digital-marketing-services/#faq14',
          name: 'Do you offer digital marketing for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, small business digital marketing is one of our core services. Our Starter and Local Growth packages are specifically built for small businesses that need a professional marketing presence without unnecessary complexity or cost.',
          },
        },
      ],
    },
  ],
};

export default function DigitalMarketingPage() {
  useDocumentTitle('Digital Marketing San Jose, CA | San Jose Logo Design');
  return (
    <>
      <Helmet>
        <title>Digital Marketing San Jose, CA | San Jose Logo Design</title>
        <meta
          name="description"
          content="Digital marketing San Jose businesses trust. SEO, paid ads, and social media strategies built by a full-service marketing agency. Get a free quote today."
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
          content="marketing agency san jose, digital marketing agency san jose, digital marketing san jose, san jose digital marketing agency, san jose digital marketing, digital marketing in san jose, ad agencies san jose, marketing san jose ca, san jose advertising agencies"
        />
        <link rel="canonical" href="https://sanjoselogodesign.com/digital-marketing-services" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Digital Marketing San Jose, CA | San Jose Logo Design" />
        <meta
          property="og:description"
          content="Digital marketing San Jose businesses trust. SEO, paid ads, and social media strategies built by a full-service marketing agency. Get a free quote today."
        />
        <meta property="og:url" content="https://sanjoselogodesign.com/digital-marketing-services" />
        <meta property="og:site_name" content="Sanjoselogodesign" />
        <meta property="og:publish_date" content="2025-12-10" />
        <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing San Jose, CA | San Jose Logo Design" />
        <meta
          name="twitter:description"
          content="Digital marketing San Jose businesses trust. SEO, paid ads, and social media strategies built by a full-service marketing agency. Get a free quote today."
        />
        <meta property="twitter:url" content="https://sanjoselogodesign.com/digital-marketing-services" />
        <meta name="twitter:image" content="seo_image" />
        <meta name="twitter:creator" content="@Sanjoselogodesign" />
        <meta name="twitter:site" content="@Sanjoselogodesign" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Sanjoselogodesign" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="4 minutes" />
        <meta name="p:domain_verify" content="48e81758daba0e0ed130f38f9d6891a0" />
        <meta name="facebook-domain-verification" content="9vzc2a6cq0sj6fifdg3d9m9609q6d5" />
        <script type="application/ld+json">{JSON.stringify(DIGITAL_MARKETING_PAGE_SCHEMA)}</script>
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
              Digital <span>Marketing</span>
            </h1>
            <div className="inner-breadcrumb-links">
              <a href="/">Home</a>
              <i className="fa-solid fa-angle-right"></i>
              <span>Digital Marketing</span>
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
                <img src="/assets/images/digi1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h2>Top-Notch Digital Marketing Services in San Jose</h2>
                <p>
                  Every business owner has felt it: the launch that should have made noise but landed in silence.
                  Explore{' '}
                  <a href="https://sanjoselogodesign.com/">digital marketing services from San Jose Logo Design</a>, a
                  digital marketing agency in San Jose serving businesses across San Jose and beyond. Our team includes
                  strategists, copywriters, and paid media specialists, giving us the rare ability to plan a campaign and
                  actually execute it, with no gap between the strategy and what your audience sees in their feed. With
                  digital marketing handled end to end, we help your business get found by the people already looking for
                  it.
                </p>
                <p>
                  As a professional marketing agency based in San Jose, we understand that visibility without strategy is
                  just noise, and strategy without visibility never reaches anyone. Every digital marketing campaign we
                  run is built to earn real attention: the right message, in front of the right audience, at the moment
                  they&apos;re most ready to act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioGalleryGrid
        category="Digital Marketing"
        tabId="tab-digital-marketing"
        cardTitle="Digital Marketing"
        fallbackImages={Array.from({ length: 6 }, (_, i) => ({
          src: `/assets/images/portfolio/digital-marketing/${i + 1}.png`,
          alt: 'Digital marketing project',
        }))}
      />

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
                <img src="/assets/images/digi2.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h2>The Importance of Professional Digital Marketing</h2>
                <p>
                  Good digital marketing does more than get clicks, it builds a reputation that shows up before your
                  sales team ever picks up the phone. As an experienced san jose digital marketing agency, we focus on
                  results first: qualified traffic, real engagement, and campaigns that are judged by revenue, not just
                  reach. Whether you need SEO, paid ads, social media management, or a full marketing strategy, our
                  approach is built around what actually grows your business, not vanity metrics that look good in a
                  slide deck.
                </p>
                <p>
                  Every project starts with understanding your business goals, your audience, and where your current
                  marketing is losing people along the way. From there, we build a digital marketing strategy that&apos;s
                  data-driven by design, not just creative for its own sake, but built to turn visibility into revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicePackagesSection
        serviceType="digital_marketing"
        title="Affordable Custom Digital Marketing Packages"
        subtitle="Marketing is rarely a one-time expense, it's an ongoing investment that compounds the longer it runs, which is why choosing the right partner matters. Below are our digital marketing packages, built to match businesses at every stage, from a single campaign to a full, always-on marketing strategy."
      />

      <section className="faq-section py-5">
        <div className="container">
          <div className="faq-header text-center">
            <span className="section-pill">Need Help?</span>
            <h2 className="faq-title">Questions Clients Ask Before Starting</h2>
            <p className="faq-subtitle">
              Quick answers about timelines, process, collaboration, and reporting.
            </p>
          </div>

          <div className="faq-modern-grid">
            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">01</span>
                <h3 className="faq-question">What is digital marketing?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Digital marketing is the practice of promoting a business online through channels like SEO, paid
                  advertising, social media, and email, instead of relying only on traditional advertising. As a digital
                  marketing agency, we build each strategy around where your specific audience already spends their
                  time, rather than a one-size-fits-all plan.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">02</span>
                <h3 className="faq-question">Why is digital marketing important for my business?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Most customers research a business online before ever making contact. Professional digital marketing
                  builds visibility where people are already searching, builds trust through consistent messaging, and
                  directly impacts whether someone finds you first or finds a competitor instead.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">03</span>
                <h3 className="faq-question">What are the key elements of a good digital marketing strategy?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  A strong digital marketing strategy combines clear goals, consistent brand messaging across channels,
                  data tracking that shows what&apos;s actually working, and campaigns built around the customer&apos;s
                  journey rather than a single ad. A skilled san jose digital marketing agency also adjusts the plan
                  based on real performance data instead of running it unchanged for months.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">04</span>
                <h3 className="faq-question">What are the top digital marketing agencies in San Jose?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  San Jose Logo Design is recognized as one of the leading digital marketing agencies in San Jose,
                  offering SEO, paid advertising, and social media management for businesses of all sizes throughout the
                  Bay Area.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">05</span>
                <h3 className="faq-question">Can I see examples of your past marketing work?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, our <a href="https://sanjoselogodesign.com/portfolio">portfolio</a> showcases completed digital
                  marketing campaigns across multiple industries, giving you a clear sense of our strategy, creative
                  style, and the range of businesses we&apos;ve worked with.
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
                  We offer full digital marketing services, including SEO, paid search advertising, social media
                  marketing, email marketing, and content marketing, all handled by our in-house team of strategists,
                  writers, and media specialists.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">07</span>
                <h3 className="faq-question">Is digital marketing affordable for small businesses?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes. We offer digital marketing packages starting at an accessible entry point for small businesses,
                  scaling up to advanced, multi-channel campaigns for companies ready to invest more in growth, so
                  there&apos;s a plan for nearly every budget.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">08</span>
                <h3 className="faq-question">What is the best digital marketing package for my business?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  The right package depends on your goals, a small business may only need local SEO and social media
                  management, while a growing company may need a full-funnel strategy with paid advertising and email
                  campaigns. Our team can help you choose the right fit during a free consultation.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">09</span>
                <h3 className="faq-question">How do I hire a digital marketing agency in San Jose?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Getting started is simple: review our digital marketing packages, choose the one that fits your
                  business goals, and our dedicated account manager will guide you through strategy, launch, and ongoing
                  optimization.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">10</span>
                <h3 className="faq-question">Can I get a digital marketing quote in San Jose?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, San Jose Logo Design offers free, no obligation quotes for digital marketing in San Jose.{' '}
                  <a href="https://sanjoselogodesign.com/contact-us">Contact us</a> with your business goals and
                  we&apos;ll recommend the best package for your budget.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">11</span>
                <h3 className="faq-question">What does digital marketing cost in San Jose, CA?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Digital marketing costs vary based on channels and scope, from a single local SEO campaign to a
                  full-service, multi-channel strategy. See our pricing packages above for exact rates, or contact us for
                  a custom quote tailored to your business.
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
                <h3 className="faq-question">How do I compare digital marketing agencies?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  When comparing ad agencies in San Jose, look at portfolio quality, client reviews, pricing
                  transparency, and whether the team can execute both strategy and creative in-house, a combination that
                  keeps campaigns consistent from planning to execution.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">14</span>
                <h3 className="faq-question">Do you offer digital marketing for small businesses?</h3>
                <i className="fa-solid fa-plus"></i>
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, small business digital marketing is one of our core services. Our Starter and Local Growth
                  packages are specifically built for small businesses that need a professional marketing presence
                  without unnecessary complexity or cost.
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
