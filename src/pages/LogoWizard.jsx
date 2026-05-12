import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postLogoCreatorStart, postLogoCreatorStep } from "../api/logoCreatorApi";
import { resetViewportForSpaNavigation } from "../lib/resetViewportForSpaNavigation";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education",
  "Food & Beverage", "Fashion & Apparel", "Real Estate",
  "Fitness & Wellness", "Beauty & Cosmetics", "Entertainment",
  "Automotive", "Sports", "Photography", "Music", "Other"
];

function PanelLogos() {
  const logos = [
    `${process.env.PUBLIC_URL || ""}/assets/images/steplogo1.png`,
    `${process.env.PUBLIC_URL || ""}/assets/images/steplogo2.png`,
    `${process.env.PUBLIC_URL || ""}/assets/images/steplogo3.png`,
    `${process.env.PUBLIC_URL || ""}/assets/images/steplogo4.png`,
  ];

  return (
    <div className="panel-logos" aria-hidden>
      <span className="panel-logo panel-logo--left panel-logo--left-1">
        <img src={logos[0]} alt="" />
      </span>

      <span className="panel-logo panel-logo--left panel-logo--left-2">
        <img src={logos[1]} alt="" />
      </span>

      <span className="panel-logo panel-logo--right panel-logo--right-1">
        <img src={logos[2]} alt="" />
      </span>

      <span className="panel-logo panel-logo--right panel-logo--right-2">
        <img src={logos[3]} alt="" />
      </span>
    </div>
  );
}

// Floating particle background
function Particles() {
  return (
    <div className="particles">
      {[...Array(18)].map((_, i) => (
        <span key={i} className={`particle p${i % 6}`} style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${6 + Math.random() * 6}s`,
        }} />
      ))}
    </div>
  );
}

// Step 1: Business Name
function Step1({ data, onChange, onNext, pending, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="step-content animate-in">
      <div className="hero-text">
        <h1 className="hero-title">Create Your <span className="accent">Dream Logo</span></h1>
        <p className="hero-sub">Professional logos crafted for your brand identity</p>
      </div>
      {error ? <p className="hero-inline-error" role="alert">{error}</p> : null}

      <div className="input-row">
        <div className={`input-wrap ${focused ? "focused" : ""}`}>
          <input
            type="text"
            placeholder="ENTER YOUR BUSINESS NAME"
            value={data.businessName}
            onChange={e => onChange("businessName", e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="main-input"
          />
        </div>
        <button
          type="button"
          className="cta-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onNext();
          }}
          disabled={!data.businessName.trim() || Boolean(pending)}
        >
          {pending ? "PLEASE WAIT…" : "GET STARTED"}
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// Step 2: Slogan
function Step2({ data, onChange, onNext, isSaving }) {
  return (
    <div className="step-content animate-in modal-step">
      <div className="step-badge">Step 1 of 3</div>
      <h2 className="modal-title">Add a catchy <span className="accent">SLOGAN</span></h2>
      <p className="modal-sub">This is optional but can make your logo more memorable</p>

      <div className="field-group">
        <label className="field-label">SLOGAN (OPTIONAL)</label>
        <input
          type="text"
          placeholder="Enter your slogan or tagline"
          value={data.slogan}
          onChange={e => onChange("slogan", e.target.value)}
          className="field-input"
        />
      </div>

      <div className="step-nav">
        <button type="button" className="nav-btn next-btn" onClick={onNext} disabled={Boolean(isSaving)}>
          {isSaving ? "SAVING…" : "NEXT →"}
        </button>
      </div>
    </div>
  );
}

// Step 3: Industry
function Step3({ data, onChange, onNext, onPrev, isSaving }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="step-content animate-in modal-step">
      <div className="step-badge">Step 2 of 3</div>
      <h2 className="modal-title">What's your <span className="accent">industry?</span></h2>
      <p className="modal-sub">This helps us suggest the perfect design style</p>

      <div className="field-group">
        <label className="field-label">INDUSTRY (OPTIONAL)</label>
        <div className={`custom-select ${open ? "open" : ""}`}>
          <div
            className="select-display"
            onClick={() => setOpen((o) => !o)}
            role="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }}
          >
            {data.industry || "Select your industry"}
            <span className="select-arrow">{open ? "▲" : "▼"}</span>
          </div>
          {open && (
            <div className="select-dropdown" onClick={(e) => e.stopPropagation()}>
              <div
                className="select-opt bold-opt"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("industry", "");
                  setOpen(false);
                }}
              >
                Select your industry
              </div>
              {INDUSTRIES.map((ind, i) => (
                <div
                  key={i}
                  className={`select-opt ${data.industry === ind ? "selected" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange("industry", ind);
                    setOpen(false);
                  }}
                >
                  {ind}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="step-nav">
        <button type="button" className="nav-btn prev-btn" onClick={onPrev} disabled={Boolean(isSaving)}>
          ← PREVIOUS
        </button>
        <button type="button" className="nav-btn next-btn" onClick={onNext} disabled={Boolean(isSaving)}>
          {isSaving ? "SAVING…" : "NEXT →"}
        </button>
      </div>
    </div>
  );
}

// Step 4: Contact
function Step4({ data, onChange, onSubmit, onPrev, isSaving }) {
  const handleSubmit = () => {
    if (!data.email.trim() || isSaving) return;
    onSubmit();
  };

  return (
    <div className="step-content animate-in modal-step">
      <div className="step-badge">Step 3 of 3</div>
      <h2 className="modal-title">Almost done! Let's get your <span className="accent">contact info</span></h2>
      <p className="modal-sub">We'll send your logo files to your email</p>

      <div className="field-group">
        <label className="field-label">EMAIL ADDRESS <span className="required">*</span></label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={data.email}
          onChange={e => onChange("email", e.target.value)}
          className="field-input"
        />
      </div>

      <div className="field-group">
        <label className="field-label">PHONE NUMBER (OPTIONAL)</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={data.phone}
          onChange={e => onChange("phone", e.target.value)}
          className="field-input"
        />
      </div>

      <div className="modal-step-footer">
        <button
          type="button"
          className={`submit-btn ${isSaving ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={!data.email.trim() || Boolean(isSaving)}
        >
          {isSaving ? (
            <span className="loader-dots"><span/><span/><span/></span>
          ) : (
            <><span className="pencil-icon">✏</span> CREATE MY LOGO</>
          )}
        </button>
        <button
          type="button"
          className="nav-btn prev-btn modal-step-footer-prev"
          onClick={onPrev}
          disabled={Boolean(isSaving)}
        >
          ← PREVIOUS
        </button>
      </div>
    </div>
  );
}

// Step 5: Thank You
function StepDone({ data }) {
  const navigate = useNavigate();

  return (
    <div className="step-content animate-in modal-step done-step">
      <div className="done-icon">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" stroke="#FF6B1A" strokeWidth="3"/>
          <path d="M22 40L34 52L58 28" stroke="#FF6B1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="modal-title">🎉 Thanks for <span className="accent">Submitting!</span></h2>
      <p className="modal-sub">Your logo request has been received.</p>
      <div className="done-card">
        <div className="done-row"><span>Business</span><strong>{data.businessName}</strong></div>
        {data.slogan && <div className="done-row"><span>Slogan</span><strong>{data.slogan}</strong></div>}
        {data.industry && <div className="done-row"><span>Industry</span><strong>{data.industry}</strong></div>}
        <div className="done-row"><span>Email</span><strong>{data.email}</strong></div>
      </div>
     
      <button type="button" className="nav-btn next-btn done-back-home" onClick={() => navigate("/")}>
        BACK TO HOME
      </button>
    </div>
  );
}

// Main Component
export default function LogoWizard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "", slogan: "", industry: "", email: "", phone: ""
  });
  const [sessionToken, setSessionToken] = useState(null);
  const [sessionStarting, setSessionStarting] = useState(false);
  const [stepSaving, setStepSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const isLogoCreatorPage = location.pathname === "/logo-creator";

  const handleGetStarted = async () => {
    const name = formData.businessName.trim();
    if (!name) return;
    if (!isLogoCreatorPage) {
      resetViewportForSpaNavigation();
      navigate("/logo-creator", { state: { businessName: name } });
      return;
    }
    setApiError("");
    setShowModal(true);
    setStep(1);
    setSessionStarting(true);
    try {
      const data = await postLogoCreatorStart(name);
      setSessionToken(data.session_token);
    } catch (e) {
      setApiError(e?.message || "Could not start. Please try again.");
    } finally {
      setSessionStarting(false);
    }
  };

  // When navigating from home, router passes { businessName } in location.state.
  useEffect(() => {
    if (!isLogoCreatorPage) return;
    const biz = location.state?.businessName;
    if (!biz || typeof biz !== "string" || !biz.trim()) return;
    const cleaned = biz.trim();
    setFormData((prev) => ({ ...prev, businessName: cleaned }));
    const ac = new AbortController();
    setApiError("");
    setShowModal(true);
    setStep(1);
    setSessionStarting(true);
    (async () => {
      try {
        const data = await postLogoCreatorStart(cleaned, { signal: ac.signal });
        if (ac.signal.aborted) return;
        setSessionToken(data.session_token);
      } catch (e) {
        if (e?.name === "AbortError") return;
        setApiError(e?.message || "Could not start. Please try again.");
      } finally {
        if (!ac.signal.aborted) setSessionStarting(false);
      }
    })();
    return () => ac.abort();
  }, [isLogoCreatorPage, location.state?.businessName]);

  const handleSloganNext = async () => {
    if (!isLogoCreatorPage) {
      setStep(2);
      return;
    }
    if (!sessionToken) {
      setApiError("Session missing. Please close and enter your business name again.");
      return;
    }
    setApiError("");
    setStepSaving(true);
    try {
      await postLogoCreatorStep({
        session_token: sessionToken,
        step: 1,
        slogan: formData.slogan?.trim() || "",
      });
      setStep(2);
    } catch (e) {
      setApiError(e?.message || "Could not save slogan.");
    } finally {
      setStepSaving(false);
    }
  };

  const handleIndustryNext = async () => {
    if (!isLogoCreatorPage) {
      setStep(3);
      return;
    }
    if (!sessionToken) {
      setApiError("Session missing. Please close and enter your business name again.");
      return;
    }
    setApiError("");
    setStepSaving(true);
    try {
      await postLogoCreatorStep({
        session_token: sessionToken,
        step: 2,
        industry: formData.industry?.trim() || "",
      });
      setStep(3);
    } catch (e) {
      setApiError(e?.message || "Could not save industry.");
    } finally {
      setStepSaving(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!isLogoCreatorPage) {
      setStep(4);
      return;
    }
    if (!sessionToken) {
      setApiError("Session missing. Please close and enter your business name again.");
      return;
    }
    const email = formData.email.trim();
    if (!email) return;
    setApiError("");
    setStepSaving(true);
    try {
      await postLogoCreatorStep({
        session_token: sessionToken,
        step: 3,
        email,
        phone: formData.phone?.trim() || "",
      });
      setStep(4);
      window.setTimeout(() => {
        navigate('/thankyou');
      }, 900);
    } catch (e) {
      setApiError(e?.message || "Could not submit.");
    } finally {
      setStepSaving(false);
    }
  };

  useEffect(() => {
    if (!showModal) return;

    const html = document.documentElement;
    const scrollY = window.scrollY;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [showModal]);

  // If this instance unmounts while scroll-lock is active (e.g. mid-navigation), restore the page.
  useEffect(() => {
    return () => {
      const top = document.body.style.top;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      if (top && /^-\d+px$/.test(top)) {
        const parsed = parseInt(top, 10);
        if (!Number.isNaN(parsed)) window.scrollTo(0, -parsed);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .logo-wizard-section {
          margin: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 10px !important;
        }
        .logo-wizard-section--creator {
          padding-top: 32px !important;
          padding-bottom: 32px !important;
        }

        .lw-root {
          font-family: 'Barlow', sans-serif;
          padding-top: 60px;
          padding-bottom: 60px;
          background: #0d0d0d;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lw-root--creator {
          background: transparent;
          overflow: visible;
        }

        /* BG Slideshow */
        .bg-slides {
          position: absolute; inset: 0; z-index: 0;
        }
        .bg-slide {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .bg-slide.active { opacity: 1; }
        .bg-slide::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(13,13,13,0.82) 0%, rgba(20,10,0,0.72) 100%);
        }


        /* Particles */
        .particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .particle {
          position: absolute; border-radius: 50%;
          animation: floatUp linear infinite;
          opacity: 0.15;
        }
        .p0 { width:6px;height:6px;background:#FF6B1A; }
        .p1 { width:4px;height:4px;background:#fff; }
        .p2 { width:8px;height:8px;background:#FF6B1A;opacity:0.08; }
        .p3 { width:3px;height:3px;background:#ffb347; }
        .p4 { width:5px;height:5px;background:#fff;opacity:0.1; }
        .p5 { width:7px;height:7px;background:#FF6B1A;opacity:0.06; }

        @keyframes floatUp {
          0% { transform: translateY(110vh) scale(0.5); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }

        /* Hero CTA */
        .hero-section {
          position: relative; z-index: 2;
          width: 100%; max-width: 900px;
          padding: 0 24px;
          text-align: center;
        }
        .hero-text { margin-bottom: 40px; }
        .hero-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(3rem, 8vw, 6rem);
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
          animation: fadeDown 0.8s ease both;
        }
        .hero-sub {
          font-size: 1.1rem; color: rgba(255,255,255,0.6);
          margin-top: 10px; font-weight: 400;
          animation: fadeDown 0.8s 0.15s ease both;
        }
        .hero-inline-error {
          color: #ffb4a6;
          font-size: 0.95rem;
          margin: 14px auto 0;
          max-width: 48ch;
          text-align: center;
          line-height: 1.45;
        }
        .accent { color: #FF6B1A; }

        .input-row {
          display: flex; gap: 0;
          max-width: 750px; margin: 0 auto;
          animation: fadeUp 0.8s 0.25s ease both;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,26,0.15);
          overflow: visible;
          position: relative;
        }

        .input-wrap {
          flex: 1; position: relative;
        }
        .main-input {
          width: 100%; height: 64px;
          padding: 0 24px;
          font-family: 'Barlow', sans-serif;
          font-size: 1rem; font-weight: 700;
          letter-spacing: 0.1em; color: #333;
          background: #fff;
          border: none; outline: none;
          border-radius: 8px 0 0 8px;
          transition: box-shadow 0.2s;
        }
        .input-wrap.focused .main-input {
          box-shadow: inset 0 0 0 2px #FF6B1A;
        }
        .main-input::placeholder { color: #aaa; font-weight: 600; }

        .cta-btn {
          height: 64px; padding: 0 32px;
          background: #FF6B1A;
          color: #fff;
          font-family: 'Bebas Neue', cursive;
          font-size: 1.4rem; letter-spacing: 0.08em;
          border: none; cursor: pointer;
          border-radius: 0 8px 8px 0;
          display: flex; align-items: center; gap: 10px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
          position: relative; overflow: hidden;
        }
        .cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .cta-btn:hover:not(:disabled)::before { opacity: 1; }
        .cta-btn:hover:not(:disabled) {
          background: #e85a0a;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255,107,26,0.45);
        }
        .cta-btn:active:not(:disabled) { transform: translateY(1px); }
        .cta-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-arrow {
          font-size: 1.2rem;
          transition: transform 0.2s;
          display: inline-block;
        }
        .cta-btn:hover:not(:disabled) .btn-arrow { transform: translateX(4px); }

        /* Modal Overlay (outside .lw-root so overflow:hidden does not clip fixed layer) */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 11000;
          min-height: 100vh;
          min-height: 100dvh;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(5px);
          display: flex; align-items: center; justify-content: center;
          padding: max(20px, env(safe-area-inset-top, 0px)) max(20px, env(safe-area-inset-right, 0px)) max(20px, env(safe-area-inset-bottom, 0px)) max(20px, env(safe-area-inset-left, 0px));
          animation: overlayIn 0.3s ease;
          overscroll-behavior: none;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-api-error {
          margin: 0 0 16px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 80, 80, 0.12);
          border: 1px solid rgba(255, 140, 120, 0.35);
          color: #ffc9c9;
          font-size: 0.88rem;
          line-height: 1.45;
        }

        .modal-box {
          background: linear-gradient(145deg, #4a2c1f 0%, #2f1c16 46%, #1e1414 100%);
          border: 1px solid rgba(255,146,82,0.28);
          border-radius: 16px;
          padding: 52px 44px 56px;
          width: 100%; max-width: 580px;
          position: relative;
          z-index: 1;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
          overflow: visible;
          isolation: isolate;
          margin: auto 0;
          display: flex;
          flex-direction: column;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          /* Fixed shell like sanjoselogodesign.com/logo-creator — same size every step; dropdown does not grow it */
          height: clamp(600px, min(54vh, 100dvh - 56px), 600px);
          max-height: min(600px, calc(100dvh - 48px));
          box-sizing: border-box;
        }
        .modal-box--done {
          height: auto;
          min-height: clamp(520px, 54vh, 600px);
          max-height: calc(100dvh - 40px);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .modal-box.modal-box--done > .step-content.modal-step {
          flex: 0 1 auto;
          min-height: auto;
        }

        .modal-box > .step-content.modal-step {
          display: flex;
          flex-direction: column;
          /* flex-basis 0 so this column fills the fixed modal height — then margin-top:auto on .step-nav hits the real bottom */
          flex: 1 1 0;
          min-height: 0;
          align-self: stretch;
          overflow: visible;
        }
        .modal-box::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #FF6B1A, #ff9a4a, #FF6B1A);
          background-size: 200%;
          animation: shimmer 2s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        /* Modal blur BG */
        .modal-bg {
          position: absolute; inset: 0; z-index: -1;
          background:
            radial-gradient(ellipse at 10% 12%, rgba(255, 162, 98, 0.18) 0%, transparent 56%),
            radial-gradient(ellipse at 90% 88%, rgba(194, 112, 61, 0.13) 0%, transparent 54%),
            linear-gradient(142deg, rgba(74, 44, 31, 0.92), rgba(28, 18, 18, 0.92));
        }
        .modal-box::after {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          border: 1px solid rgba(255,255,255,0.08);
          pointer-events: none;
          z-index: 0;
        }

        .step-badge {
          display: inline-block;
          background: rgba(255,107,26,0.15);
          color: #FF6B1A;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em; padding: 4px 12px;
          border-radius: 20px; border: 1px solid rgba(255,107,26,0.3);
          margin-bottom: 20px;
        }

        .modal-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(1.8rem, 5vw, 2.4rem);
          color: #fff; letter-spacing: 0.03em;
          line-height: 1.1; margin-bottom: 10px;
        }
        .modal-sub {
          color: rgba(255,255,255,0.5); font-size: 0.95rem;
          margin-bottom: 32px; line-height: 1.5;
        }

        .field-group { margin-bottom: 20px; }
        .modal-step .field-group {
          position: relative;
          z-index: 2;
        }
        .panel-logos {
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(100% + 160px);
          height: calc(100% - 80px);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: -2;
        }
        .panel-logo {
          position: absolute;
          width: 252px;
          height: 252px;
          border-radius: 22px;
          transform: translate(0, -50%) scale(0.84) rotate(0deg);
          opacity: 0;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, filter 0.4s ease;
          filter: blur(4px);
          background: rgba(22, 14, 12, 0.38);
          border: 1px solid rgba(255, 170, 116, 0.32);
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }
        .panel-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .panel-logo--left { left: -6px; }
        .panel-logo--right { right: -0px; }
        .panel-logo--left-1 { top: 30%; }
        .panel-logo--left-2 { top: 72%; left: 40px; }
        .panel-logo--right-1 { top: 29%; }
        .panel-logo--right-2 { top: 72%; right: 47px; }
        .panel-logo--left-1 { transform: translate(0, -50%) scale(0.84) rotate(-18deg); }
        .panel-logo--left-2 { transform: translate(0, -50%) scale(0.84) rotate(-10deg); }
        .panel-logo--right-1 { transform: translate(0, -50%) scale(0.84) rotate(18deg); }
        .panel-logo--right-2 { transform: translate(0, -50%) scale(0.84) rotate(10deg); }
        .modal-box:focus-within .panel-logo--left-1 {
      transform: translate(-115px, -50%) scale(1) rotate(-22deg);
    opacity: 1;
    filter: blur(0);
        }
        .modal-box:focus-within .panel-logo--left-2 {
          transform: translate(-136px, -50%) scale(0.98) rotate(-24deg);
          opacity: 1;
         filter: blur(0);
        }
        .modal-box:focus-within .panel-logo--right-1 {
          transform: translate(114px, -50%) scale(1) rotate(24deg);
          opacity: 0.95;
          filter: blur(0);
        }
        .modal-box:focus-within .panel-logo--right-2 {
          transform: translate(136px, -50%) scale(0.98) rotate(23deg);
          opacity: 1;
          filter: blur(0);
        }
        .modal-step .step-nav {
          position: relative;
          z-index: 1;
        }
        .field-label {
          display: block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.5);
          margin-bottom: 8px;
        }
        .required { color: #FF6B1A; }
        .field-input {
          width: 100%; height: 52px;
          padding: 0 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 8px;
          color: #fff; font-size: 0.95rem;
          font-family: 'Barlow', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.25); }
        .field-input:focus {
          border-color: #FF6B1A;
          background: rgba(255,145,72,0.14);
          box-shadow: 0 0 0 3px rgba(255,145,72,0.18);
        }

        /* Custom Select — dropdown absolute so fixed modal height does not change when open */
        .custom-select {
          position: relative;
          user-select: none;
          z-index: 1;
        }
        .custom-select.open {
          z-index: 40;
        }
        .select-display {
          height: 52px; padding: 0 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: #fff;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.95rem;
          transition: border-color 0.2s;
          cursor: pointer;
        }
        .custom-select.open .select-display {
          border-color: #FF6B1A;
          border-radius: 8px 8px 0 0;
          border-bottom-color: transparent;
        }
        .select-arrow { color: rgba(255,255,255,0.4); font-size: 0.8rem; }
        .select-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0;
          background: #1a1a1a;
          border: 1px solid rgba(255,107,26,0.3);
          border-top: none;
          border-radius: 0 0 8px 8px;
          max-height: 220px;
          overflow-y: auto;
          z-index: 50;
          box-shadow: 0 16px 40px rgba(0,0,0,0.55);
        }
        .select-dropdown::-webkit-scrollbar { width: 4px; }
        .select-dropdown::-webkit-scrollbar-track { background: #111; }
        .select-dropdown::-webkit-scrollbar-thumb { background: #FF6B1A; border-radius: 2px; }
        .select-opt {
          padding: 12px 18px; color: rgba(255,255,255,0.7);
          font-size: 0.9rem; cursor: pointer;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s, color 0.15s;
        }
        .select-opt:hover { background: rgba(255,107,26,0.12); color: #FF6B1A; }
        .select-opt.selected { color: #FF6B1A; background: rgba(255,107,26,0.08); }
        .bold-opt { font-weight: 700; color: rgba(255,255,255,0.3); }

        /* Step Nav — pin to bottom of fixed-height modal */
        .step-nav {
          display: flex; justify-content: center; align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .modal-step > .step-nav,
        .modal-step > .step-nav.single {
          margin-top: auto;
          padding-top: 20px;
          flex-shrink: 0;
        }
        .step-nav.single { justify-content: center; }

        /* Contact step: PREVIOUS then CREATE MY LOGO — pinned to bottom, never shrink away */
        .modal-step-footer {
          margin-top: auto;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 14px;
          flex-shrink: 0;
        }
        .modal-step-footer .submit-btn {
          margin-top: 0;
        }
        .modal-step-footer-prev {
          align-self: center;
        }
        .nav-btn {
          height: 48px; padding: 0 24px;
          border-radius: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          letter-spacing: 0.08em; cursor: pointer;
          transition: all 0.2s;
        }
        .nav-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          pointer-events: none;
        }
        .prev-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.6);
        }
        .prev-btn:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
        .next-btn {
          background: #FF6B1A; border: none; color: #fff;
          box-shadow: 0 4px 16px rgba(255,107,26,0.3);
        }
        .next-btn:hover { background: #e85a0a; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,26,0.45); }

        /* Submit Button */
        .submit-btn {
          width: 100%; height: 56px;
          background: linear-gradient(135deg, #FF6B1A, #ff8c3a);
          border: none; border-radius: 10px;
          color: #fff;
          font-family: 'Bebas Neue', cursive;
          font-size: 1.4rem; letter-spacing: 0.1em;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 24px;
          transition: all 0.2s;
          box-shadow: 0 6px 24px rgba(255,107,26,0.4);
          position: relative; overflow: hidden;
        }
        .submit-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,107,26,0.5); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .pencil-icon { font-size: 1.1rem; }

        .loader-dots { display: flex; gap: 6px; align-items: center; }
        .loader-dots span {
          width: 8px; height: 8px;
          background: #fff; border-radius: 50%;
          animation: bounce 0.6s ease infinite;
        }
        .loader-dots span:nth-child(2) { animation-delay: 0.15s; }
        .loader-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* Done Step */
        .done-step { text-align: center; }
        .modal-step.done-step .done-back-home {
          margin-top: auto;
          margin-bottom: 0;
        }
        .done-icon {
          width: 80px; height: 80px; margin: 0 auto 24px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .done-icon svg { width: 100%; height: 100%; }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .done-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 20px;
          margin: 24px 0; text-align: left;
        }
        .done-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
        }
        .done-row:last-child { border-bottom: none; }
        .done-row span { color: rgba(255,255,255,0.4); }
        .done-row strong { color: #fff; max-width: 60%; text-align: right; }
        .done-msg {
          color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.6;
        }
        .done-msg strong { color: #FF6B1A; }

        .modal-box button.nav-btn.next-btn.done-back-home {
          display: block;
          margin-left: auto;
          margin-right: auto;
          min-width: 200px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          -webkit-appearance: none;
          appearance: none;
        }

        /* Close (X) button — solid orange square */
        .modal-close-btn {
          position: absolute;
          top: 12px;
          right: 22px;
          z-index: 5;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 0;
          background: linear-gradient(135deg, #ff7d2c 0%, #ff6b1a 100%);
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          box-shadow: 0 6px 16px rgba(255, 107, 26, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .modal-close-btn:hover,
        .modal-close-btn:focus-visible {
          transform: scale(1.06);
          box-shadow: 0 10px 22px rgba(255, 107, 26, 0.55);
          filter: brightness(1.05);
          outline: none;
        }
        .modal-close-btn:active {
          transform: scale(0.98);
        }

        /* Animations */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeUp 0.4s ease both; }

        /* Bottom Badge */
        .bottom-badge {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          z-index: 2;
          animation: fadeUp 1s 0.6s ease both;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B1A; }
        .badge-text {
          font-size: 0.78rem; letter-spacing: 0.15em;
          color: rgba(255,255,255,0.35); font-weight: 700;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .logo-wizard-section { padding-top: 0 !important; padding-bottom: 0px !important; }
          .logo-wizard-section--creator { padding-top: 24px !important; padding-bottom: 24px !important; }
          .lw-root { padding-top: 40px; padding-bottom: 40px; }
          .hero-section { padding: 0 16px; }
          .hero-text { margin-bottom: 28px; }
          .hero-title { font-size: clamp(2.25rem, 10vw, 4rem); }
          .hero-sub { font-size: 1rem; }
        }

        

        @media (max-width: 600px) {
          .input-row {
            flex-direction: column;
            border-radius: 10px;
            max-width: 100%;
          }
          .main-input {
            border-radius: 10px 10px 0 0;
            min-height: 52px;
            height: auto;
            padding: 14px 16px;
            font-size: 16px;
            letter-spacing: 0.06em;
          }
          .cta-btn {
            width: 100%;
            border-radius: 0 0 10px 10px;
            justify-content: center;
            min-height: 52px;
            height: auto;
            padding: 14px 20px;
            font-size: 1.25rem;
          }

          .modal-overlay {
            align-items: flex-start;
            padding: max(80px, env(safe-area-inset-top, 0px)) max(10px, env(safe-area-inset-right, 0px)) max(10px, env(safe-area-inset-bottom, 0px)) max(10px, env(safe-area-inset-left, 0px));
          }

          .modal-box {
            padding: 36px 16px 40px;
            max-width: 100%;
            width: calc(100% - 8px);
            border-radius: 14px;
            height: clamp(420px, min(76dvh, 100dvh - 80px), 560px);
            max-height: calc(100dvh - 24px);
            margin-top: max(0px, env(safe-area-inset-top, 0px));
          }
          .modal-box--done {
            min-height: auto;
            height: auto;
            max-height: calc(100dvh - 20px);
          }
          .modal-box.modal-box--done > .step-content.modal-step {
            min-height: 0;
          }

          .modal-title {
            font-size: clamp(1.45rem, 6.5vw, 2rem);
            margin-bottom: 8px;
          }
          .modal-sub {
            font-size: 0.88rem;
            margin-bottom: 20px;
          }
          .step-badge {
            font-size: 0.68rem;
            padding: 3px 10px;
            margin-bottom: 14px;
          }
          .modal-close-btn {
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            font-size: 17px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(255, 107, 26, 0.4);
          }
          .step-badge {
            margin-right: 42px;
          }

          .field-group { margin-bottom: 14px; }
          .panel-logos { display: none; }
          .field-label { font-size: 0.65rem; }
          .field-input {
            height: 50px;
            min-height: 48px;
            padding: 0 14px;
            font-size: 16px;
          }

          .select-display {
            height: 50px;
            min-height: 48px;
            padding: 0 14px;
            font-size: 16px;
          }
          .select-dropdown {
            max-height: min(200px, 38dvh);
          }
          .select-opt { padding: 12px 14px; font-size: 0.88rem; }

          .step-nav { gap: 10px; }
          .modal-step > .step-nav,
          .modal-step > .step-nav.single {
            padding-top: 14px;
          }
          .nav-btn {
            min-height: 48px;
            height: auto;
            padding: 12px 18px;
            font-size: 0.85rem;
          }
          .modal-step-footer {
            padding-top: 14px;
            gap: 12px;
          }
          .submit-btn {
            font-size: clamp(1.05rem, 4.2vw, 1.25rem);
            min-height: 52px;
            height: auto;
            padding: 12px 16px;
          }

          .done-icon { width: 64px; height: 64px; margin-bottom: 16px; }
          .done-card { padding: 14px; margin: 16px 0; }
          .done-row {
            flex-wrap: wrap;
            gap: 4px 8px;
            font-size: 0.82rem;
          }
          .done-row strong { max-width: 100%; text-align: left; }
          .done-msg { font-size: 0.85rem; }
          .modal-box button.nav-btn.next-btn.done-back-home {
            min-width: 0;
            width: 100%;
            max-width: 280px;
          }
        }

        @media (max-width: 380px) {
          .modal-box {
            padding: 28px 12px 32px;
            border-radius: 12px;
          }
          .hero-section { padding: 0 12px; }
          .modal-title { font-size: clamp(1.3rem, 7vw, 1.75rem); }
        }
      `}</style>
      <section className={`logo-wizard-section${isLogoCreatorPage ? " logo-wizard-section--creator" : ""}`}>
        <div className={`lw-root${isLogoCreatorPage ? " lw-root--creator" : ""}`}>
          {!isLogoCreatorPage && <BgSlides />}
          {!isLogoCreatorPage && <Particles />}

          {!(isLogoCreatorPage && showModal) && (
            <div className="hero-section">
              <Step1
                data={formData}
                onChange={update}
                onNext={handleGetStarted}
                pending={isLogoCreatorPage && sessionStarting && !showModal}
                error={isLogoCreatorPage && !showModal ? apiError : ""}
              />
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className={`modal-box${step === 4 ? " modal-box--done" : ""}`}>
              <div className="modal-bg" />
              <PanelLogos />
              {apiError ? (
                <div className="modal-api-error" role="alert">
                  {apiError}
                </div>
              ) : null}
              <button
                type="button"
                className="modal-close-btn"
                aria-label="Close and go home"
                onClick={() => navigate('/')}
              >
                ×
              </button>

              {step === 1 && (
                <Step2
                  data={formData}
                  onChange={update}
                  onNext={handleSloganNext}
                  isSaving={stepSaving || sessionStarting}
                />
              )}
              {step === 2 && (
                <Step3
                  data={formData}
                  onChange={update}
                  onNext={handleIndustryNext}
                  onPrev={() => setStep(1)}
                  isSaving={stepSaving || sessionStarting}
                />
              )}
              {step === 3 && (
                <Step4
                  data={formData}
                  onChange={update}
                  onSubmit={handleContactSubmit}
                  onPrev={() => setStep(2)}
                  isSaving={stepSaving || sessionStarting}
                />
              )}
              {step === 4 && <StepDone data={formData} />}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// BG Slideshow Component
function BgSlides() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-slides">
      {[0, 1, 2].map(i => (
        <div key={i} className={`bg-slide bg-${i + 1} ${active === i ? "active" : ""}`} />
      ))}
    </div>
  );
}