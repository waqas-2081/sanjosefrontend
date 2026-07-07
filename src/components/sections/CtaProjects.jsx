import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { onScrollTopReplay } from "../../lib/scrollMotionReplay";

const CONTACTS = [
  {
    icon: "fa-phone",
    label: "24/7 Support",
    value: "(214) 449-1305",
    href: "tel:+12144491305",
  },
  {
    icon: "fa-comments",
    label: "Talk to Us",
    value: "Live Chat",
    href: "/contact-us",
  },
  {
    icon: "fa-envelope",
    label: "Email us at",
    value: "info@sanjoselogodesign.com",
    href: "mailto:info@sanjoselogodesign.com",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function useSectionReplay(sectionRef, controls) {
  const inView = useInView(sectionRef, {
    amount: 0.2,
    margin: "0px 0px -4% 0px",
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    return onScrollTopReplay(() => {
      controls.set("hidden");
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < vh * 0.92 && rect.bottom > vh * 0.08)
          controls.start("visible");
      });
    });
  }, [controls, sectionRef]);
}

function ContactItem({ icon, label, value, href }) {
  return (
    <a href={href} className="cta-projects__contact">
      <span className="cta-projects__contact-icon">
        <i className={`fa-solid ${icon}`} aria-hidden />
      </span>
      <span className="cta-projects__contact-text">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </a>
  );
}

export function CtaProjects() {
  const sectionRef = useRef(null);
  const controls = useAnimationControls();
  useSectionReplay(sectionRef, controls);

  return (
    <section
      className="cta-projects"
      ref={sectionRef}
      aria-label="Call to action"
      data-no-motion="true"
    >
      <motion.div
        className="cta-projects__glow cta-projects__glow--left"
        aria-hidden
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="cta-projects__glow cta-projects__glow--right"
        aria-hidden
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="cta-projects__wrap"
        variants={stagger}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="cta-projects__card" variants={rise}>
          <div className="cta-projects__head">
            <motion.div className="cta-projects__copy" variants={rise}>
              <h3 className="cta-projects__eyebrow">
                AWARD-WINNING LOGO DESIGN & BRANDING AGENCY
              </h3>
              <h2 className="cta-projects__title">
                LET’S BUILD A BRAND{" "}YOU’RE PROUD TO PUT YOUR NAME ON.
              </h2>
              <p className="cta-projects__text">
              Tell us about your business and your goals. We'll design a custom logo and brand identity that builds trust, grabs attention, and scales as you grow.
              </p>
            </motion.div>

            <a href="/contact-us" className="cta-projects__btn">
              <span className="cta-projects__btn-label">
                Let&apos;s Get Started
              </span>
              <span className="cta-projects__btn-icon">
                <i className="fa-solid fa-arrow-right" aria-hidden />
              </span>
            </a>
          </div>

          <motion.div className="cta-projects__bar" variants={rise}>
            {CONTACTS.map((item) => (
              <ContactItem key={item.href} {...item} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        .cta-projects {
          position: relative;
          z-index: 10;
          isolation: isolate;
          overflow: hidden;
          padding: 40px clamp(16px, 4vw, 40px) !important;
          background: linear-gradient(180deg, #0c0e18 0%, #101322 100%);
        }

        .cta-projects__glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(70px);
        }

        .cta-projects__glow--left {
          width: 360px;
          height: 360px;
          top: -40%;
          left: -5%;
          background: rgba(255, 107, 26, 0.22);
        }

        .cta-projects__glow--right {
          width: 320px;
          height: 320px;
          bottom: -50%;
          right: -3%;
          background: rgba(70, 100, 220, 0.15);
        }

        .cta-projects__wrap {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
        }

        .cta-projects__card {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(18, 20, 34, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          font-family: Inter, Poppins, 'Segoe UI', Arial, sans-serif;
        }

        .cta-projects__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(20px, 4vw, 40px);
          padding: 28px clamp(22px, 4vw, 36px) 24px;
        }

        .cta-projects__copy {
          min-width: 0;
          flex: 1;
        }

        .cta-projects__eyebrow {
          margin: 0 0 6px;
          color: #ff8c3a;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .cta-projects__title {
            margin: 0 0 8px;
    color: #fff;
    font-size: clamp(1.2rem, 2.4vw, 1.6rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 0.05em;
        }

        .cta-projects__title span {
          color: #ff8c3a;
        }

        .cta-projects__text {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: clamp(0.84rem, 1.4vw, 0.95rem);
          line-height: 1.6;
          max-width: 62ch;
        }

        .cta-projects__btn {
          position: relative;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 15px 18px 15px 28px;
          border-radius: 999px;
          text-decoration: none;
          color: #fff;
          font-size: 0.84rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          white-space: nowrap;
          background: linear-gradient(180deg, #ff9a57 0%, #ff6b1a 48%, #e85510 100%);
          border: 1px solid rgba(255, 180, 120, 0.35);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.42),
            inset 0 -1px 0 rgba(180, 60, 0, 0.25),
            0 14px 32px rgba(255, 107, 26, 0.42),
            0 5px 0 #c44a08;
          transition: box-shadow 0.25s ease, filter 0.25s ease;
        }

        .cta-projects__btn::before {
          content: '';
          position: absolute;
          inset: -8px -12px;
          border-radius: inherit;
          background: radial-gradient(ellipse at center, rgba(255, 107, 26, 0.35) 0%, transparent 70%);
          z-index: -1;
          opacity: 0.7;
          pointer-events: none;
        }

        .cta-projects__btn:hover {
          filter: brightness(1.06);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.48),
            inset 0 -1px 0 rgba(180, 60, 0, 0.25),
            0 18px 40px rgba(255, 107, 26, 0.5),
            0 5px 0 #c44a08;
        }

        .cta-projects__btn-label {
          position: relative;
          z-index: 1;
        }

        .cta-projects__btn-icon {
          position: relative;
          z-index: 1;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.14);
          font-size: 0.78rem;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .cta-projects__btn:hover .cta-projects__btn-icon {
          background: rgba(0, 0, 0, 0.2);
          transform: translateX(3px);
        }

        .cta-projects__bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.2);
        }

        .cta-projects__contact {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px clamp(16px, 3vw, 28px);
          text-decoration: none;
          color: inherit;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          transition: background-color 0.25s ease, border-color 0.25s ease;
        }

        .cta-projects__contact:last-child {
          border-right: none;
        }

        .cta-projects__contact:hover {
          background: rgba(255, 107, 26, 0.08);
        }

        .cta-projects__contact-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          color: #ff8c3a;
          background: rgba(255, 107, 26, 0.12);
          font-size: 0.82rem;
        }

        .cta-projects__contact-text {
          display: grid;
          gap: 2px;
          min-width: 0;
        }

        .cta-projects__contact-text small {
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        .cta-projects__contact-text strong {
          color: #fff;
          font-size: 0.84rem;
          font-weight: 600;
          overflow-wrap: anywhere;
        }

        @media (max-width: 900px) {
          .cta-projects {
            padding: 32px 16px !important;
          }

          .cta-projects__head {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px 20px 20px;
            gap: 18px;
          }

          .cta-projects__btn {
            width: auto;
            max-width: 100%;
            align-self: center;
            gap: 12px;
            padding: 11px 14px 11px 20px;
            font-size: 0.72rem;
            letter-spacing: 0.05em;
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.42),
              inset 0 -1px 0 rgba(180, 60, 0, 0.25),
              0 10px 22px rgba(255, 107, 26, 0.35),
              0 3px 0 #c44a08;
          }

          .cta-projects__btn::before {
            inset: -6px -8px;
          }

          .cta-projects__btn-icon {
            width: 28px;
            height: 28px;
            font-size: 0.65rem;
          }

          .cta-projects__bar {
            grid-template-columns: 1fr;
          }

          .cta-projects__contact {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .cta-projects__contact:last-child {
            border-bottom: none;
          }
        }

        @media (max-width: 480px) {
          .cta-projects__btn {
            gap: 10px;
            padding: 10px 12px 10px 16px;
            font-size: 0.66rem;
          }

          .cta-projects__btn-icon {
            width: 26px;
            height: 26px;
            font-size: 0.6rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-projects__glow {
            animation: none !important;
          }
        }

        .cta-projects + .brand-potential > .section_top_shape {
          top: 0;
          z-index: 1;
        }

        @media (max-width: 767px) {
        .cta-projects__eyebrow {
        font-size: 12px; 
    }

    .cta-projects__title {
    font-size: 14px;

}
}

      `}</style>
    </section>
  );
}
