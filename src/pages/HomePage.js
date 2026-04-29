import { useEffect, useState } from 'react';
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
