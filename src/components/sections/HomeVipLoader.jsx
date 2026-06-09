import React from 'react';

export function HomeVipLoader() {
  const logo = `${process.env.PUBLIC_URL || ''}/assets/images/logo/logo-white.png`;
  return (
    <>
      <div className="hvl" role="status" aria-live="polite" aria-label="Loading">
        <div className="hvl__orb hvl__orb--1" />
        <div className="hvl__orb hvl__orb--2" />
        <div className="hvl__grid" />

        <svg className="hvl__corners" viewBox="0 0 300 300" fill="none">
          <line x1="0" y1="30" x2="0" y2="0" stroke="rgba(255,107,26,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(255,107,26,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="300" y1="270" x2="300" y2="300" stroke="rgba(56,182,123,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="300" y1="300" x2="270" y2="300" stroke="rgba(56,182,123,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="270" y1="0" x2="300" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="300" y1="0" x2="300" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="30" y1="300" x2="0" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="0" y1="300" x2="0" y2="270" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round"/>
        </svg>

        <div className="hvl__stage">
          <div className="hvl__ring-outer" />

          <div className="hvl__ring-mid">
            <svg viewBox="0 0 220 220" fill="none">
              <defs>
                <linearGradient id="hvlArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6b1a" stopOpacity="0"/>
                  <stop offset="40%" stopColor="#ff6b1a" stopOpacity="1"/>
                  <stop offset="75%" stopColor="#38b67b" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#38b67b" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r="106" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <path d="M 110 4 A 106 106 0 1 1 4 110" stroke="url(#hvlArc)" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <div className="hvl__ring-inner" />

          <div className="hvl__core">
            {/* ✅ Real logo — "S" gone */}
            <img src={logo} alt="San Jose Logo Design" className="hvl__logo" />
            <div className="hvl__dots">
              <span className="hvl__dot" style={{ '--d': '0s' }} />
              <span className="hvl__dot" style={{ '--d': '.3s' }} />
              <span className="hvl__dot" style={{ '--d': '.6s' }} />
              <span className="hvl__dot" style={{ '--d': '.9s' }} />
            </div>
            <span className="hvl__label">Loading</span>
          </div>
        </div>

        <div className="hvl__progress-wrap">
          <div className="hvl__progress-track">
            <div className="hvl__progress-fill" />
          </div>
          <div className="hvl__progress-text">Sanjose Logo Designn</div>
        </div>
      </div>

      <style>{`
        .hvl {
          position: fixed; inset: 0; z-index: 12000;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; font-family: 'Inter', system-ui, sans-serif;
          background:
            radial-gradient(circle at 20% 20%, rgba(255,107,26,0.18) 0%, transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(38,183,122,0.14) 0%, transparent 45%),
            linear-gradient(145deg, #070a10 0%, #0d1520 55%, #0a1018 100%);
        }
        .hvl__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .hvl__orb { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .hvl__orb--1 {
          width: 340px; height: 340px; top: -80px; left: -80px;
          background: radial-gradient(circle, rgba(255,90,20,0.22), transparent 70%);
          animation: hvlOrb1 7s ease-in-out infinite;
        }
        .hvl__orb--2 {
          width: 280px; height: 280px; bottom: -60px; right: -60px;
          background: radial-gradient(circle, rgba(30,180,110,0.18), transparent 70%);
          animation: hvlOrb2 9s ease-in-out infinite;
        }
        .hvl__corners {
          position: absolute; width: 300px; height: 300px;
          top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }
        .hvl__stage { position: relative; display: flex; align-items: center; justify-content: center; }
        .hvl__ring-outer {
          position: absolute; width: 280px; height: 280px;
          border-radius: 50%; border: 1px dashed rgba(255,255,255,0.07);
          animation: hvlSpinSlow 18s linear infinite;
        }
        .hvl__ring-outer::before {
          content: ''; position: absolute; width: 6px; height: 6px;
          background: #ff6b1a; border-radius: 50%; top: 0; left: 50%;
          transform: translateX(-50%); box-shadow: 0 0 10px 3px rgba(255,107,26,0.7);
        }
        .hvl__ring-mid { position: absolute; width: 220px; height: 220px; }
        .hvl__ring-mid svg { width: 100%; height: 100%; animation: hvlSpinFast 1.8s linear infinite; }
        .hvl__ring-inner {
          position: absolute; width: 160px; height: 160px;
          border-radius: 50%; border: 1px solid rgba(255,255,255,0.06);
          animation: hvlPulseBorder 2.4s ease-in-out infinite;
        }
        .hvl__core {
          position: relative; z-index: 10; width: 210px; height: 210px;
          border-radius: 50%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px;
          background: rgba(255,255,255,0.032); border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        }
        .hvl__logo {
          width: 130px; height: auto; object-fit: contain;
          animation: hvlBreath 2.4s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(255,107,26,0.45));
        }
        .hvl__dots { display: flex; gap: 6px; align-items: center; }
        .hvl__dot {
          display: block; width: 5px; height: 5px; border-radius: 50%;
          animation: hvlDot 1.8s ease-in-out infinite var(--d, 0s);
        }
        .hvl__label {
          font-size: 9px; letter-spacing: 0.22em; font-weight: 600;
          color: rgba(255,255,255,0.3); text-transform: uppercase;
        }
        .hvl__progress-wrap {
          position: absolute; bottom: 48px; left: 50%; transform: translateX(-50%); width: 160px;
        }
        .hvl__progress-track { height: 2px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
        .hvl__progress-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #ff6b1a, #38b67b);
          animation: hvlProgress 2.6s ease-in-out infinite;
        }
        .hvl__progress-text {
          text-align: center; margin-top: 8px; font-size: 9px;
          letter-spacing: 0.18em; color: rgba(255,255,255,0.22);
          font-weight: 500; text-transform: uppercase;
        }
        @keyframes hvlOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,20px) scale(1.08)} }
        @keyframes hvlOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,-25px) scale(1.06)} }
        @keyframes hvlSpinSlow { to { transform: rotate(360deg); } }
        @keyframes hvlSpinFast { to { transform: rotate(360deg); } }
        @keyframes hvlPulseBorder {
          0%,100%{transform:scale(0.96);opacity:0.5} 50%{transform:scale(1.04);opacity:1}
        }
        @keyframes hvlBreath {
          0%,100%{opacity:0.88;transform:scale(0.97)}
          50%{opacity:1;transform:scale(1.04);filter:drop-shadow(0 0 18px rgba(255,107,26,0.65))}
        }
        @keyframes hvlDot {
          0%,100%{background:rgba(255,255,255,0.18);transform:scale(1)}
          40%{background:#ff6b1a;box-shadow:0 0 7px 2px rgba(255,107,26,0.6);transform:scale(1.35)}
        }
        @keyframes hvlProgress {
          0%{width:0%;opacity:1} 70%{width:100%;opacity:1}
          85%{width:100%;opacity:0} 86%{width:0%;opacity:0} 100%{width:0%;opacity:1}
        }
      `}</style>
    </>
  );
}