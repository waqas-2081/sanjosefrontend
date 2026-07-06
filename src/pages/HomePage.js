import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AwesomeProjects } from '../components/sections/AwesomeProjects';
import { BrandPotential } from '../components/sections/BrandPotential';
import { FeaturedStories } from '../components/sections/FeaturedStories';
import { HomeAbout } from '../components/sections/HomeAbout';
import { HomeVipLoader } from '../components/sections/HomeVipLoader';
import { MainBanner } from '../components/sections/MainBanner';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { SolutionsSection } from '../components/sections/SolutionsSection';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';
import { Transforming } from '../components/sections/Transforming';
import { CtaProjects } from '../components/sections/CtaProjects';
import LogoWizard from './LogoWizard';
import { initGlobalScrollMotion } from '../lib/globalScrollMotion';
import { mountLegacyWidgets, teardownLegacyWidgets } from '../lib/legacyWidgets';

const HOME_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://sanjoselogodesign.com/#professionalservice',
      name: 'San Jose Logo Design',
      alternateName: 'Award-Winning San Jose Logo Design Agency',
      url: 'https://sanjoselogodesign.com/',
      description:
        'San Jose Logo Design is a creative full service digital design agency dedicated to helping businesses stand out with unique and impactful designs. We specialize in professional logo design, merchandising, custom website design and development, engaging animations, mobile app design, digital marketing and search engine optimization services.',
      image: { '@id': 'https://sanjoselogodesign.com/#primaryimage' },
      logo: { '@id': 'https://sanjoselogodesign.com/#logo' },
      telephone: '+1-214-449-1305',
      email: 'info@sanjoselogodesign.com',
      foundingDate: '2021-09',
      priceRange: '$$',
      areaServed: [
        { '@type': 'City', name: 'San Jose' },
        { '@type': 'City', name: 'Santa Clara' },
        { '@type': 'State', name: 'California' },
        { '@type': 'Country', name: 'United States' },
      ],
      address: { '@id': 'https://sanjoselogodesign.com/#address' },
      contactPoint: { '@id': 'https://sanjoselogodesign.com/#contactpoint' },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '32',
        bestRating: '5',
        worstRating: '1',
      },
      knowsAbout: [
        'Logo Design',
        'Brand Identity',
        'Brand Development',
        'Graphic Design',
        'Website Design',
        'Website Development',
        'Mobile App Design',
        'Mobile App Development',
        'UI Design',
        'UX Design',
        'Search Engine Optimization',
        'Local SEO',
        'Technical SEO',
        'Digital Marketing',
        'Animation',
        'Video Animation',
        'Merchandising',
      ],
      serviceType: [
        'Logo Design',
        'Merchandising',
        'Website Design and Development',
        'Mobile App Design and Development',
        'Video Animations',
        'SEO',
        'Digital Marketing',
        'Graphic Design',
      ],
      sameAs: [
        'https://www.facebook.com/SanJoselogodesign',
        'https://www.instagram.com/sanjoselogodesign/',
        'https://www.linkedin.com/company/san-jose-logo-design/about/',
        'https://x.com/SJLogoDesigns',
        'https://www.pinterest.com/sanjoselogod/',
        'https://www.tiktok.com/@sanjoselogodesignusa',
        'https://share.google/MOGLGPQc5hsFyZH98',
        'https://clutch.co/profile/san-jose-logo-design',
        'https://www.trustpilot.com/review/sanjoselogodesign.com',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://sanjoselogodesign.com/#organization',
      name: 'San Jose Logo Design',
      url: 'https://sanjoselogodesign.com/',
      logo: { '@id': 'https://sanjoselogodesign.com/#logo' },
      email: 'info@sanjoselogodesign.com',
      telephone: '+1-214-449-1305',
      sameAs: [
        'https://www.facebook.com/SanJoselogodesign',
        'https://www.instagram.com/sanjoselogodesign/',
        'https://www.linkedin.com/company/san-jose-logo-design/about/',
        'https://x.com/SJLogoDesigns',
        'https://www.pinterest.com/sanjoselogod/',
        'https://www.tiktok.com/@sanjoselogodesignusa',
        'https://share.google/MOGLGPQc5hsFyZH98',
        'https://clutch.co/profile/san-jose-logo-design',
        'https://www.trustpilot.com/review/sanjoselogodesign.com',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sanjoselogodesign.com/#website',
      url: 'https://sanjoselogodesign.com/',
      name: 'San Jose Logo Design',
      publisher: { '@id': 'https://sanjoselogodesign.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sanjoselogodesign.com/#homepage',
      url: 'https://sanjoselogodesign.com/',
      name: 'San Jose Logo Design | Award-Winning Logo Design & Branding Agency',
      description:
        'Professional logo design, branding, website design, mobile app design, SEO, digital marketing and animation services for businesses in San Jose and throughout the United States.',
      isPartOf: { '@id': 'https://sanjoselogodesign.com/#website' },
      about: { '@id': 'https://sanjoselogodesign.com/#professionalservice' },
      primaryImageOfPage: { '@id': 'https://sanjoselogodesign.com/#primaryimage' },
      breadcrumb: { '@id': 'https://sanjoselogodesign.com/#breadcrumb' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://sanjoselogodesign.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://sanjoselogodesign.com/',
        },
      ],
    },
    {
      '@type': 'ContactPoint',
      '@id': 'https://sanjoselogodesign.com/#contactpoint',
      contactType: 'customer service',
      telephone: '+1-214-449-1305',
      email: 'info@sanjoselogodesign.com',
      availableLanguage: 'English',
      url: 'https://sanjoselogodesign.com/contact-us',
    },
    {
      '@type': 'PostalAddress',
      '@id': 'https://sanjoselogodesign.com/#address',
      streetAddress: '14A S 1st St',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      postalCode: '95113',
      addressCountry: 'US',
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://sanjoselogodesign.com/#logo',
      url: 'https://sanjoselogodesign.com/assets/images/logo/logo.png',
      contentUrl: 'https://sanjoselogodesign.com/assets/images/logo/logo.png',
      caption: 'San Jose Logo Design',
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://sanjoselogodesign.com/#primaryimage',
      url: 'https://sanjoselogodesign.com/assets/images/banner/main_banner.png',
      contentUrl: 'https://sanjoselogodesign.com/assets/images/banner/main_banner.png',
      caption: 'San Jose Logo Design Digital Agency',
    },
  ],
};

export default function HomePage() {
  useDocumentTitle('Award-Winning San Jose Logo Design & Branding Agency');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return undefined;
    const timers = [];
    let teardownMotion = () => {};

    const remount = () => {
      teardownLegacyWidgets();
      mountLegacyWidgets();
    };

    const frame = window.requestAnimationFrame(remount);
    const motionFrame = window.requestAnimationFrame(() => {
      teardownMotion();
      teardownMotion = initGlobalScrollMotion(document);
    });
    timers.push(window.setTimeout(remount, 250));
    timers.push(window.setTimeout(remount, 900));

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(motionFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      teardownMotion();
    };
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>Award-Winning San Jose Logo Design &amp; Branding Agency</title>
        <meta
          name="description"
          content="Custom logo design, branding, web design & SEO in San Jose. We've helped businesses grow revenue by 255%+ through strategic designs and marketing."
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta
          name="keywords"
          content="San Jose Logo Design, logo design services, branding agency San Jose, website design San Jose, digital marketing agency San Jose, San Jose SEO, logo and branding, creative design agency San Jose"
        />
        <link rel="canonical" href="https://sanjoselogodesign.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Award-Winning San Jose Logo Design &amp; Branding Agency" />
        <meta
          property="og:description"
          content="Custom logo design, branding, web design & SEO in San Jose. We've helped businesses grow revenue by 255%+ through strategic designs and marketing."
        />
        <meta property="og:url" content="https://sanjoselogodesign.com" />
        <meta property="og:site_name" content="Sanjoselogodesign" />
        <meta property="og:publish_date" content="2025-12-10" />
        <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Award-Winning San Jose Logo Design &amp; Branding Agency" />
        <meta
          name="twitter:description"
          content="Custom logo design, branding, web design & SEO in San Jose. We've helped businesses grow revenue by 255%+ through strategic designs and marketing."
        />
        <meta property="twitter:url" content="https://sanjoselogodesign.com" />
        <meta name="twitter:image" content="seo_image" />
        <meta name="twitter:creator" content="@Sanjoselogodesign" />
        <meta name="twitter:site" content="@Sanjoselogodesign" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Sanjoselogodesign" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="4 minutes" />
        <meta name="p:domain_verify" content="48e81758daba0e0ed130f38f9d6891a0" />
        <meta name="facebook-domain-verification" content="9vzc2a6cq0sj6fifdg3d9m9609q6d5" />
        <script type="application/ld+json">{JSON.stringify(HOME_PAGE_SCHEMA)}</script>
      </Helmet>
      {loading ? (
        <HomeVipLoader />
      ) : (
        <>
      <MainBanner />
      <LogoWizard />
      <HomeAbout />
      <FeaturedStories />
      <PortfolioSection />
      <CtaProjects />
      <BrandPotential />
      <SolutionsSection hideOnMobile />
      <AwesomeProjects />
      <Transforming />
      <SuccessStoriesHome />
        </>
      )}
    </>
  );
}
