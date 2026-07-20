import React from 'react';
import { PortfolioGalleryGrid } from '../components/ui/PortfolioGalleryGrid';
import { Helmet } from 'react-helmet';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const MERCHANDISING_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://sanjoselogodesign.com/merchandising-services/#service',
      name: 'Branded Merchandise',
      alternateName: [
        'Company Merchandise',
        'Company Merch',
        'Company Logo Merchandise',
        'Premium Merchandising Company',
        'Custom Branded Products',
      ],
      url: 'https://sanjoselogodesign.com/merchandising-services',
      description:
        'Explore branded merchandise services from San Jose Logo Design, a premium merchandising company serving businesses across San Jose and beyond. Our team handles sourcing, design, and production under one roof, giving us the rare ability to turn your logo into company merchandise people actually want to keep, wear, and use. With company logo merchandise built around your brand guidelines, we help your business show up in places digital marketing never reaches.',
      serviceType: 'Branded Merchandise',
      category: 'Merchandising',
      provider: { '@id': 'https://sanjoselogodesign.com/#professionalservice' },
      brand: { '@id': 'https://sanjoselogodesign.com/#organization' },
      mainEntityOfPage: {
        '@id': 'https://sanjoselogodesign.com/merchandising-services/#webpage',
      },
      image: {
        '@id': 'https://sanjoselogodesign.com/merchandising-services/#primaryimage',
      },
      keywords: [
        'branded merchandise',
        'company merchandise',
        'visual merchandising',
        'company merch',
        'premium merchandising company',
        'company logo merchandise',
      ],
      offers: { '@id': 'https://sanjoselogodesign.com/merchandising-services/#offer' },
    },
    {
      '@type': 'Offer',
      '@id': 'https://sanjoselogodesign.com/merchandising-services/#offer',
      price: '150.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://sanjoselogodesign.com/#organization' },
      url: 'https://sanjoselogodesign.com/merchandising-services',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sanjoselogodesign.com/merchandising-services/#webpage',
      url: 'https://sanjoselogodesign.com/merchandising-services',
      name: 'Branded Merchandise San Jose, CA | San Jose Logo Design',
      headline: 'Branded Merchandise',
      description:
        'Branded merchandise San Jose businesses trust. Custom company merch, from apparel to drinkware, designed and produced in-house. Get a free quote today.',
      isPartOf: { '@id': 'https://sanjoselogodesign.com/#website' },
      mainEntity: {
        '@id': 'https://sanjoselogodesign.com/merchandising-services/#service',
      },
      primaryImageOfPage: {
        '@id': 'https://sanjoselogodesign.com/merchandising-services/#primaryimage',
      },
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://sanjoselogodesign.com/merchandising-services/#primaryimage',
      contentUrl: 'https://sanjoselogodesign.com/assets/images/merch1.png',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://sanjoselogodesign.com/merchandising-services/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjoselogodesign.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Branded Merchandise',
          item: 'https://sanjoselogodesign.com/merchandising-services',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq1',
          name: 'What is branded merchandise?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Branded merchandise is any physical product, like apparel, drinkware, or bags, produced with your company's logo, colors, or messaging. As a premium merchandising company, we treat each item as a small extension of your brand, not just a giveaway, so the quality matches how your business wants to be perceived.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq2',
          name: 'Why is branded merchandise important for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A customer or employee who receives company merchandise carries your brand into rooms your ads never reach. Branded merchandise builds recognition over time, reinforces loyalty among employees and customers, and often outlasts nearly every other form of marketing you invest in.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq3',
          name: 'What are the key elements of good company merchandise?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Good company merchandise combines quality materials, accurate brand colors, a design that still works at the item's actual size, and a product people will genuinely use rather than set aside. A skilled merchandising company also considers how the item fits into your broader visual merchandising, so branded products feel consistent with your storefront, packaging, and website.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq4',
          name: 'What are the top merchandising companies in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'San Jose Logo Design is a leading merchandising company in San Jose, offering branded merchandise, company logo merchandise, and custom product lines for businesses of all sizes throughout the Bay Area.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq5',
          name: 'Can I see examples of your past merchandise work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, our portfolio showcases completed branded merchandise projects across multiple industries, giving you a clear sense of our product quality, design style, and the range of businesses we've worked with.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq6',
          name: 'What services do you offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer full branded merchandise services, including custom apparel, drinkware, bags, office and desk items, event giveaways, and retail-ready product lines, all handled by our in-house design and production team.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq7',
          name: 'Is branded merchandise affordable for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. We offer branded merchandise packages starting at an accessible entry point for small businesses, scaling up to larger, multi-product orders for companies ready to build a full merchandise line, so there's a plan for nearly every budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq8',
          name: 'What is the best merchandise package for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The right package depends on your goals, a small business may only need a batch of apparel for a single event, while a growing company may need an ongoing supply of company merch for onboarding, trade shows, and client gifts. Our team can help you choose the right fit during a free consultation.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq9',
          name: 'How do I hire a merchandising company in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Getting started is simple: review our branded merchandise packages, choose the one that fits your business needs, and our dedicated project manager will guide you through design, production, and delivery.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq10',
          name: 'Can I get a branded merchandise quote in San Jose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, San Jose Logo Design offers free, no obligation quotes for branded merchandise. Contact us with your project details and we'll recommend the best package for your goals and budget.",
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq11',
          name: 'What does company merchandise cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Company merchandise costs vary based on product type, order quantity, and customization method, from a small batch of branded apparel to a full retail-ready product line. See our pricing packages above for exact rates, or contact us for a custom quote tailored to your project.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq12',
          name: 'How can I find reviews and ratings for San Jose Logo Design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can find client reviews and ratings for San Jose Logo Design on our website, as well as third-party platforms like Google, TrustPilot, Clutch etc. We encourage prospective clients to review past client feedback before starting a project.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq13',
          name: 'How do I compare merchandising companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When comparing merchandising companies, look at product quality, turnaround time, minimum order requirements, and whether the team can handle both design and production in-house, a combination that keeps your company merch consistent from concept to delivery.',
          },
        },
        {
          '@type': 'Question',
          '@id': 'https://sanjoselogodesign.com/merchandising-services/#faq14',
          name: 'Do you offer merchandise for small businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, small business merchandise is one of our core services. Our Starter and Event Kit packages are specifically built for small businesses that need professional branded merchandise without unnecessary complexity or cost.',
          },
        },
      ],
    },
  ],
};

export default function MerchandisingPage() {
  useDocumentTitle('Branded Merchandise San Jose, CA | San Jose Logo Design');
  return (
    <>
      <Helmet>
        <title>Branded Merchandise San Jose, CA | San Jose Logo Design</title>
        <meta
          name="description"
          content="Branded merchandise San Jose businesses trust. Custom company merch, from apparel to drinkware, designed and produced in-house. Get a free quote today."
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
          content="branded merchandise, company merchandise, visual merchandising, company merch, premium merchandising company, company logo merchandise"
        />
        <link rel="canonical" href="https://sanjoselogodesign.com/merchandising-services" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Branded Merchandise San Jose, CA | San Jose Logo Design" />
        <meta
          property="og:description"
          content="Branded merchandise San Jose businesses trust. Custom company merch, from apparel to drinkware, designed and produced in-house. Get a free quote today."
        />
        <meta property="og:url" content="https://sanjoselogodesign.com/merchandising-services" />
        <meta property="og:site_name" content="Sanjoselogodesign" />
        <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Branded Merchandise San Jose, CA | San Jose Logo Design" />
        <meta
          name="twitter:description"
          content="Branded merchandise San Jose businesses trust. Custom company merch, from apparel to drinkware, designed and produced in-house. Get a free quote today."
        />
        <meta property="twitter:url" content="https://sanjoselogodesign.com/merchandising-services" />
        <meta name="twitter:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta name="twitter:creator" content="@Sanjoselogodesign" />
        <meta name="twitter:site" content="@Sanjoselogodesign" />
        <script type="application/ld+json">{JSON.stringify(MERCHANDISING_PAGE_SCHEMA)}</script>
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
        <img
          src="/assets/images/icon/section_bottom_shape.svg"
          alt=""
          className="section_top_shape"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/mercha1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h2>Top-Notch Branded Merchandise Services in San Jose</h2>
                <p>
                  A logo on a screen disappears the moment someone closes the tab, a logo on a hoodie walks around for
                  years. Explore branded merchandise services from San Jose Logo Design, a premium merchandising company
                  serving businesses across San Jose and beyond. Our team handles sourcing, design, and production under
                  one roof, giving us the rare ability to turn your{' '}
                  <a href="https://sanjoselogodesign.com/logo-design-services">logo and branding</a> into company
                  merchandise people actually want to keep, wear, and use, not toss in a drawer after one event. With
                  company logo merchandise built around your brand guidelines, we help your business show up in places
                  digital marketing never reaches.
                </p>
                <p>
                  As a professional <a href="https://sanjoselogodesign.com/">merchandising company</a> based in San Jose,
                  we understand that company merchandise is often the most physical touchpoint a customer or employee has
                  with your brand. Every piece of merchandise we produce is built to represent your brand well: quality
                  materials, accurate colors, and branding that looks intentional, not like an afterthought ordered the
                  week before an event.
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
        <img
          src="/assets/images/icon/section_bottom_shape.svg"
          alt=""
          className="section_top_shape"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="image">
                <img src="/assets/images/mercha2.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h2>The Importance of Professional Branded Merchandise</h2>
                <p>
                  Well made branded merchandise does more than carry a logo, it turns customers and employees into
                  walking reminders of your business, long after the interaction that earned them the item. As an
                  experienced premium merchandising company, we focus on quality first: materials people actually want to
                  use, designs that hold up in production, and merchandise that reflects the same brand standard as your
                  website or storefront. Whether you need onboarding kits for new hires, trade show giveaways, or
                  retail-ready product lines, our company merchandise is built around what actually gets used, not just
                  what fits the budget.
                </p>
                <p>
                  Every project starts with understanding your brand guidelines, your audience, and where the
                  merchandise will actually be worn or used, whether that&apos;s an office, a trade show floor, or as
                  part of your visual merchandising in a retail space. From there, we develop company logo merchandise
                  that&apos;s strategic by design, not just printed, but built to represent your brand everywhere it
                  goes.
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
            <h2 className="faq-title">Questions Clients Ask Before Starting</h2>
            <p className="faq-subtitle">
              Quick answers about products, timelines, minimums, and production.
            </p>
          </div>

          <div className="faq-modern-grid">
            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">01</span>
                <h3 className="faq-question">What is branded merchandise?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Branded merchandise is any physical product, like apparel, drinkware, or bags, produced with your
                  company&apos;s logo, colors, or messaging. As a premium merchandising company, we treat each item as a
                  small extension of your brand, not just a giveaway, so the quality matches how your business wants to
                  be perceived.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">02</span>
                <h3 className="faq-question">Why is branded merchandise important for my business?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  A customer or employee who receives company merchandise carries your brand into rooms your ads never
                  reach. Branded merchandise builds recognition over time, reinforces loyalty among employees and
                  customers, and often outlasts nearly every other form of marketing you invest in.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">03</span>
                <h3 className="faq-question">What are the key elements of good company merchandise?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Good company merchandise combines quality materials, accurate brand colors, a design that still works
                  at the item&apos;s actual size, and a product people will genuinely use rather than set aside. A skilled
                  merchandising company also considers how the item fits into your broader visual merchandising, so
                  branded products feel consistent with your storefront, packaging, and website.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">04</span>
                <h3 className="faq-question">What are the top merchandising companies in San Jose?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  San Jose Logo Design is a leading merchandising company in San Jose, offering branded merchandise,
                  company logo merchandise, and custom product lines for businesses of all sizes throughout the Bay
                  Area.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">05</span>
                <h3 className="faq-question">Can I see examples of your past merchandise work?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, our <a href="https://sanjoselogodesign.com/portfolio">portfolio</a> showcases completed branded
                  merchandise projects across multiple industries, giving you a clear sense of our product quality,
                  design style, and the range of businesses we&apos;ve worked with.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">06</span>
                <h3 className="faq-question">What services do you offer?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  We offer full branded merchandise services, including custom apparel, drinkware, bags, office and desk
                  items, event giveaways, and retail-ready product lines, all handled by our in-house design and
                  production team.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">07</span>
                <h3 className="faq-question">Is branded merchandise affordable for small businesses?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Yes. We offer branded merchandise packages starting at an accessible entry point for small businesses,
                  scaling up to larger, multi-product orders for companies ready to build a full merchandise line, so
                  there&apos;s a plan for nearly every budget.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">08</span>
                <h3 className="faq-question">What is the best merchandise package for my business?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  The right package depends on your goals, a small business may only need a batch of apparel for a single
                  event, while a growing company may need an ongoing supply of company merch for onboarding, trade shows,
                  and client gifts. Our team can help you choose the right fit during a free consultation.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">09</span>
                <h3 className="faq-question">How do I hire a merchandising company in San Jose?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Getting started is simple: review our branded merchandise packages, choose the one that fits your
                  business needs, and our dedicated project manager will guide you through design, production, and
                  delivery.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">10</span>
                <h3 className="faq-question">Can I get a branded merchandise quote in San Jose?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, San Jose Logo Design offers free, no obligation quotes for branded merchandise.{' '}
                  <a href="https://sanjoselogodesign.com/contact-us">Contact us</a> with your project details and
                  we&apos;ll recommend the best package for your goals and budget.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">11</span>
                <h3 className="faq-question">What does company merchandise cost?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Company merchandise costs vary based on product type, order quantity, and customization method, from a
                  small batch of branded apparel to a full retail-ready product line. See our pricing packages above for
                  exact rates, or contact us for a custom quote tailored to your project.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">12</span>
                <h3 className="faq-question">How can I find reviews and ratings for San Jose Logo Design?</h3>
                <i className="fa-solid fa-plus" />
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
                <h3 className="faq-question">How do I compare merchandising companies?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  When comparing merchandising companies, look at product quality, turnaround time, minimum order
                  requirements, and whether the team can handle both design and production in-house, a combination that
                  keeps your company merch consistent from concept to delivery.
                </p>
              </div>
            </details>

            <details className="faq-modern-item">
              <summary>
                <span className="faq-index">14</span>
                <h3 className="faq-question">Do you offer merchandise for small businesses?</h3>
                <i className="fa-solid fa-plus" />
              </summary>
              <div className="faq-answer">
                <p>
                  Yes, small business merchandise is one of our core services. Our Starter and Event Kit packages are
                  specifically built for small businesses that need professional branded merchandise without unnecessary
                  complexity or cost.
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
