import { useLayoutEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { resetViewportForSpaNavigation } from '../lib/resetViewportForSpaNavigation';
import LogoWizard from './LogoWizard';

const BG = `${process.env.PUBLIC_URL || ''}/assets/images/banner_bg.png`;

export default function LogoCreatorPage() {
  useDocumentTitle('Logo Creator | San Jose Logo Design');

  useLayoutEffect(() => {
    resetViewportForSpaNavigation();
  }, []);

  return (
    <div className="logo-creator-page">
      <div
        className="logo-creator-page__bg"
        style={{
          backgroundImage: `url("${BG}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden
      />
      <div className="logo-creator-page__content">
        <LogoWizard />
      </div>
      <style>{`
        .logo-creator-page {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
        }
        .logo-creator-page__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .logo-creator-page__content {
          position: relative;
          z-index: 1;
          min-height: inherit;
        }
      `}</style>
    </div>
  );
}
