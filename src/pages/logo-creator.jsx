import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { resetViewportForSpaNavigation } from '../lib/resetViewportForSpaNavigation';
import LogoWizard from './LogoWizard';

const BG = `${process.env.PUBLIC_URL || ''}/assets/images/banner_bg.png`;

export default function LogoCreatorPage() {
  useDocumentTitle('Logo Creator | San Jose Logo Design');
  const location = useLocation();

  // Home/offer Get Started → state.businessName; URL se direct aao to nahi
  const isDirectVisit = !(
    typeof location.state?.businessName === 'string' &&
    location.state.businessName.trim().length > 0
  );

  useLayoutEffect(() => {
    resetViewportForSpaNavigation();
  }, []);

  return (
    <div
      className={`logo-creator-page${isDirectVisit ? ' logo-creator-page--direct' : ' logo-creator-page--from-home'}`}
    >
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
      <div className="logo-creator-page__scrim" aria-hidden />

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
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #0d0d0d;
        }
        .logo-creator-page__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .logo-creator-page__scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        /* Home se aao — halka overlay */
        .logo-creator-page--from-home .logo-creator-page__scrim {
          background:
            linear-gradient(180deg, rgba(8, 8, 8, 0.45) 0%, rgba(8, 8, 8, 0.22) 28%, rgba(8, 8, 8, 0.28) 55%, rgba(8, 8, 8, 0.5) 100%),
            radial-gradient(ellipse at 50% 42%, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.08) 52%, transparent 72%);
        }
        /* Direct /logo-creator — light-medium overlay (bg logos readable) */
        .logo-creator-page--direct .logo-creator-page__scrim {
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.4) 28%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0.6) 100%),
            radial-gradient(ellipse at 50% 42%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.18) 45%, rgba(0, 0, 0, 0.1) 70%);
        }
        .logo-creator-page__content {
          position: relative;
          z-index: 2;
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .logo-creator-page__content .logo-wizard-section,
        .logo-creator-page__content .logo-wizard-section--creator,
        .logo-creator-page__content .lw-root,
        .logo-creator-page__content .lw-root--creator {
          flex: 1 1 auto;
          min-height: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
