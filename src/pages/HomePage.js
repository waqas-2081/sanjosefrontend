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

export default function HomePage() {
  useDocumentTitle('San Jose Logo Design');
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
    timers.push(
      window.setTimeout(() => {
        teardownMotion();
        teardownMotion = initGlobalScrollMotion(document);
      }, 300)
    );

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(motionFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      teardownMotion();
    };
  }, [loading]);

  if (loading) return <HomeVipLoader />;

  return (
    <>
      <Helmet>
        <title>Award Winning Logo Design Services San Jose</title>
        <meta
          name="description"
          content="We are a Creative Digital Agency that offers all kinds of Graphic Design, Digital Marketing & IT Consulting Services in San Jose, CA."
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta
          name="keywords"
          content="Digital Design Services, Digital Design Agency, Logo Design, Digital Design Company, Website Development, Website Design, Web Design, Web Development, SEO, Search Engine Optimization, Web Design company in California USA, Logo Designing Services in California USA"
        />
        <link rel="canonical" href="https://sanjoselogodesign.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Award Winning Logo Design Services San Jose" />
        <meta
          property="og:description"
          content="We are a Creative Digital Agency that offers all kinds of Graphic Design, Digital Marketing & IT Consulting Services in San Jose, CA."
        />
        <meta property="og:url" content="https://sanjoselogodesign.com" />
        <meta property="og:site_name" content="Sanjoselogodesign" />
        <meta property="og:publish_date" content="2025-12-10" />
        <meta property="og:image" content="https://sanjoselogodesign.com/images/sanjoseog.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Award Winning Logo Design Services San Jose" />
        <meta
          name="twitter:description"
          content="We are a Creative Digital Agency that offers all kinds of Graphic Design, Digital Marketing & IT Consulting Services in San Jose, CA."
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
      </Helmet>
      <MainBanner />
      <LogoWizard />
      <HomeAbout />
      <FeaturedStories />
      <PortfolioSection />
      <CtaProjects />
      <BrandPotential />
      <SolutionsSection />  
      <AwesomeProjects />
      <Transforming />
      <SuccessStoriesHome />
    </>
  );
}
