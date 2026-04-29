import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const iconVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -2,
    scale: 1.05,
    transition: { type: 'spring', stiffness: 380, damping: 20 },
  },
};

function ContactItem({ icon, label, value, href, accentClass }) {
  const content = (
    <motion.div
      className={`cta-projects__contact-item ${accentClass || ''}`}
      initial="rest"
      whileHover="hover"
      animate={{
        boxShadow: [
          '0 0 0 rgba(0, 0, 0, 0)',
          '0 0 0 rgba(0, 0, 0, 0)',
          '0 0 0 rgba(0, 0, 0, 0)',
        ],
      }}
      transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop' }}
    >
      <motion.span
        className="cta-projects__contact-icon"
        variants={iconVariants}
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        {icon}
      </motion.span>
      <span className="cta-projects__contact-copy">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </motion.div>
  );

  if (!href) return content;

  return (
    <a className="cta-projects__contact-link" href={href}>
      {content}
    </a>
  );
}

export function CtaProjects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: '-15% 0px -15% 0px', amount: 0.25 });
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [controls, inView]);

  return (
    <section className="cta-projects" ref={sectionRef} aria-label="Call to action">
      <motion.div
        className="cta-projects__ambient"
        aria-hidden
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="cta-projects__shell"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.p className="cta-projects__eyebrow" variants={itemVariants}>
          Premium Growth Partner
        </motion.p>
        <motion.h2 className="cta-projects__title" variants={itemVariants}>
          Take the First Step Toward Success
        </motion.h2>

        <motion.div className="cta-projects__contact-list" variants={itemVariants}>
          <ContactItem
            icon={<i className="fa-solid fa-phone" aria-hidden />}
            label="Phone Number"
            value="(214) 449-1305"
            href="tel:+214449-1305"
          />
          <ContactItem
            icon={<i className="fa-solid fa-envelope" aria-hidden />}
            label="Email Address"
            value="info@sanjoselogodesign.com"
            href="mailto:info@sanjoselogodesign.com"
          />
          <ContactItem
            icon={<i className="fa-solid fa-comments" aria-hidden />}
            label="Live Chat"
            value="Talk to us now"
              href="/contact-us"
            accentClass="is-chat"
          />
        </motion.div>

        <motion.a
          href="/contact-us"
          className="cta-projects__button"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Get in Touch</span>
          <motion.i
            className="fa-solid fa-arrow-right"
            aria-hidden
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.a>
      </motion.div>

      <style>{`
        .cta-projects {
          position: relative;
          overflow: hidden;
          padding: 82px 18px;
          background:
            radial-gradient(900px circle at -10% -20%, rgba(255, 138, 40, 0.17), transparent 55%),
            radial-gradient(760px circle at 110% 120%, rgba(43, 160, 110, 0.18), transparent 58%),
            linear-gradient(150deg, #07131f 0%, #092329 60%, #0b1f2e 100%);
        }

        .cta-projects__ambient {
          position: absolute;
          inset: -35%;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(255, 107, 26, 0.08),
            rgba(255, 255, 255, 0.03),
            rgba(32, 157, 98, 0.09),
            rgba(255, 107, 26, 0.08)
          );
          background-size: 250% 250%;
          filter: blur(24px);
        }

        .cta-projects__shell {
          position: relative;
          z-index: 1;
          margin: 0 auto;
          max-width: 1180px;
          border-radius: 28px;
          padding: 44px;
          display: grid;
          gap: 14px;
          align-items: center;
          justify-items: center;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: linear-gradient(
            130deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.03)
          );
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow:
            0 28px 70px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.24);
          font-family: Inter, Poppins, 'Segoe UI', Arial, sans-serif;
        }

        .cta-projects__eyebrow {
          margin: 0 0 12px;
          color: #ffab66;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .cta-projects__title {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.12;
          font-weight: 700;
          max-width: 30ch;
        }

        .cta-projects__text {
          margin: 0;
          max-width: 72ch;
          color: rgba(255, 255, 255, 0.85);
          font-size: 1rem;
          line-height: 1.72;
        }

        .cta-projects__contact-list {
          margin-top: 0px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .cta-projects__contact-link {
          color: inherit;
          text-decoration: none;
          display: block;
        }

        .cta-projects__contact-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
        }

        .cta-projects__contact-link:hover .cta-projects__contact-item {
          border-color: rgba(255, 145, 62, 0.55);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .cta-projects__contact-item.is-chat {
          border-color: rgba(68, 192, 128, 0.42);
          background: rgba(68, 192, 128, 0.1);
        }

        .cta-projects__contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #ff7d2c;
          background: rgba(255, 125, 44, 0.18);
          font-size: 0.95rem;
          flex: 0 0 auto;
        }

        .cta-projects__contact-item.is-chat .cta-projects__contact-icon {
          color: #4fe0a2;
          background: rgba(79, 224, 162, 0.18);
        }

        .cta-projects__contact-copy {
          display: grid;
          gap: 3px;
          min-width: 0;
          text-align: left;
        }

        .cta-projects__contact-copy small {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .cta-projects__contact-copy strong {
          color: #fff;
          font-size: 0.95rem;
          overflow-wrap: anywhere;
        }

        .cta-projects__button {
          margin-top: 14px;
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #ffffff;
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          border-radius: 999px;
          padding: 14px 28px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: linear-gradient(135deg, #ff6b1a, #ff8c3a 55%, #f36f1f);
          box-shadow:
            0 15px 34px rgba(255, 107, 26, 0.4),
            0 0 34px rgba(255, 107, 26, 0.25);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          min-height: 52px;
        }

        .cta-projects__button::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: inherit;
          z-index: -1;
          background: linear-gradient(120deg, rgba(255, 107, 26, 0.45), rgba(255, 188, 132, 0.2));
          filter: blur(12px);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .cta-projects__button:hover {
          box-shadow:
            0 18px 40px rgba(255, 107, 26, 0.48),
            0 0 42px rgba(255, 132, 62, 0.34);
        }

        .cta-projects__button:hover::before {
          opacity: 1;
        }

        .cta-projects__button i {
          font-size: 0.95rem;
        }

        @media (max-width: 991px) {
          .cta-projects {
            padding: 64px 16px;
          }

          .cta-projects__shell {
            padding: 32px 24px;
            gap: 24px;
          }

          .cta-projects__contact-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .cta-projects {
            padding: 50px 12px;
          }

          .cta-projects__shell {
            border-radius: 20px;
            padding: 24px 16px;
            gap: 20px;
          }

          .cta-projects__title {
            font-size: clamp(1.6rem, 8vw, 2.1rem);
          }

          .cta-projects__text {
            font-size: 0.94rem;
            line-height: 1.6;
          }

          .cta-projects__button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
