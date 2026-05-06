import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServicePackagesSection from '../components/sections/ServicePackagesSection';
import { AwesomeProjects } from '../components/sections/AwesomeProjects';
import { CtaProjects } from '../components/sections/CtaProjects';
import { SuccessStoriesHome } from '../components/sections/SuccessStoriesHome';

const benefits = [
  {
    number: '01',
    title: 'Revamp Your Brand Front',
    text: 'A strategic logo refresh helps your business look modern, credible, and ready to scale in competitive markets.',
  },
  {
    number: '02',
    title: 'Improve Brand Recall',
    text: 'Professional logo systems make your business instantly recognizable across social media, ads, and websites.',
  },
  {
    number: '03',
    title: 'Look Premium & Trusted',
    text: 'Your audience decides in seconds. A polished identity builds trust and drives higher conversion intent.',
  },
  {
    number: '04',
    title: 'Ahead of Competition',
    text: 'We craft trend-aware but timeless logos so your brand stands out without losing long-term value.',
  },
];

const homePortfolioItems = [
  { id: '01', wrapperClass: 'bg-01', title: 'Sauce Viande Maison', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-01.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/01.png' },
  { id: '02', wrapperClass: 'bg-02', title: 'Soup Fix', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-02.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/02.png' },
  { id: '03', wrapperClass: 'bg-03', title: 'Gin & Tonic', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-03.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/03.png' },
  { id: '04', wrapperClass: 'bg-04', title: 'Loon CBD Chips', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-04.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/04.png' },
  { id: '05', wrapperClass: 'bg-05', title: 'Paper Pouch', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-05.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/05.png' },
  { id: '06', wrapperClass: 'bg-06', title: 'Bag with Oranges', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-06.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/06.png' },
  { id: '07', wrapperClass: 'bg-07', title: 'Energy Food', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-07.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/07.png' },
  { id: '08', wrapperClass: 'bg-08', title: 'Skin Care Cream', bg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/bg-08.jpg', fg: 'https://www.designspedia.com/promotions/getlogo/assets/images/home-portfolio/08.png' },
];

const logoShots = ['Alpha', 'Vista', 'Orion', 'Spark', 'Noble', 'Nova', 'Vector', 'Monarch'];

const processSteps = [
  { title: 'Discover', text: 'We understand your brand, target audience, and positioning goals.' },
  { title: 'Concept', text: 'Our designers create strategic logo directions backed by market research.' },
  { title: 'Refine', text: 'You share feedback and we iterate until every detail feels right.' },
  { title: 'Deliver', text: 'Final files are provided in all required formats for digital and print use.' },
];

const faqs = [
  {
    q: 'How long does logo delivery take?',
    a: 'Most logo packages are delivered within 24 to 72 hours depending on package scope and revisions.',
  },
  {
    q: 'Do I get source files?',
    a: 'Yes. Startup and above include editable source files so you can scale your brand assets confidently.',
  },
  {
    q: 'Can you redesign an existing logo?',
    a: 'Absolutely. We can modernize your current identity while preserving your brand recognition.',
  },
  {
    q: 'Is this landing page fully mobile responsive?',
    a: 'Yes. The layout uses Bootstrap grid + flexbox and is optimized for phones, tablets, and desktops.',
  },
];

export default function LogoOfferPage() {
  const navigate = useNavigate();
  const [heroBusinessName, setHeroBusinessName] = useState('');

  const handleHeroStart = (event) => {
    event.preventDefault();
    const name = heroBusinessName.trim();
    if (!name) return;
    navigate('/logo-creator', { state: { businessName: name } });
  };

  return (
    <div className="logo-offer-page">
      <style>{`
        .logo-offer-page {
          --lo-bg: #0b0b10;
          --lo-surface: #11131d;
          --lo-surface-2: #171a27;
          --lo-text: #f5f7ff;
          --lo-muted: #c0c4d6;
          --lo-accent: #f7d046;
          --lo-accent-2: #ffbf00;
          color: var(--lo-text);
          background: radial-gradient(circle at 10% 10%, #1a1f34 0%, #090a10 40%, #06070b 100%);
          overflow: hidden;
        }
        .logo-offer-page .lo-section {
          padding: 84px 0;
        }
        .logo-offer-page .lo-kicker {
          color: #ff5e2c;
          letter-spacing: 0.08em;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.78rem;
          margin-bottom: 12px;
        }
        .logo-offer-page .lo-heading {
          font-size: clamp(1.4rem, 3.5vw, 3.2rem);
          line-height: 1.16;
          font-weight: 800;
          margin-bottom: 14px;
        }
        .logo-offer-page .lo-subtext {
          color: #373b4b;
          max-width: 720px;
        }
        .lo-hero {
          min-height: 88vh;
          display: flex;
          align-items: center;
            background: linear-gradient(180deg, rgb(8 9 14 / 56%), rgba(8, 9, 14, 0.56)), url(/assets/images/banner_bg.png);
          background-size: cover;
          background-position: center;
        }
        .lo-hero-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.26);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-radius: 20px;
          padding: clamp(20px, 4vw, 42px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          animation: loFloat 5s ease-in-out infinite;
        }
        .logo-offer-page .lo-hero-lead {
          color: #ffffff;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }
        .lo-trust-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin: 20px 0;
          color: #fff;
          font-weight: 600;
        }
        .lo-btn {
          border-radius: 12px;
          padding: 12px 22px;
          font-weight: 700;
          transition: all .25s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .lo-btn-primary {
          background: var(--lo-accent);
          color: #131313;
        }
        .lo-btn-primary:hover {
          transform: translateY(-3px);
          background: var(--lo-accent-2);
          color: #000;
        }
        .lo-btn-outline {
          border: 1px solid rgba(255,255,255,.45);
          color: #fff;
          background: rgba(255,255,255,.04);
        }
        .lo-btn-outline:hover {
          border-color: var(--lo-accent);
          color: var(--lo-accent);
        }
        .lo-benefits {
          background: #fff;
          color: #111522;
          position: relative;
          overflow: hidden;
        }
        .lo-benefits .lo-kicker {
          color: #FF5E2C;
          margin-bottom: 8px;
        }
        .lo-benefits .lo-heading {
          color: #0c101b;
          font-size: clamp(2rem, 4.5vw, 4.1rem);
          font-weight: 900;
          line-height: 1.02;
          margin-bottom: 8px;
          max-width: 760px;
          position: relative;
          z-index: 1;
        }
        .lo-benefits .lo-subtext {
          color: #707688;
          max-width: none;
          position: relative;
          z-index: 1;
        }
        .lo-benefits-watermark {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 45px;
          font-size: clamp(4rem, 14vw, 12rem);
          font-weight: 900;
          text-transform: uppercase;
          color: rgba(16, 20, 32, 0.05);
          line-height: 1;
          letter-spacing: .02em;
          pointer-events: none;
          user-select: none;
        }
        .lo-benefit-card {
          background: #fff;
          border: 1px solid #eff1f6;
          border-radius: 0;
          padding: 24px 20px;
          text-align: center;
          min-height: 100%;
          box-shadow: 0 10px 25px rgba(23, 26, 36, 0.05);
          transition: transform .25s ease, box-shadow .25s ease;
          position: relative;
          z-index: 1;
        }
        .lo-benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 35px rgba(23, 26, 36, 0.1);
        }
        .lo-benefit-number {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 3rem;
          color: #8b909d;
          margin-bottom: 6px;
          line-height: 1;
        }
        .lo-benefit-line {
          width: 74px;
          height: 2px;
          margin: 0 auto 14px;
          background: #FF5E2C;
        }
        .lo-benefit-card h3 {
          color: #0f1421;
          font-size: 30px;
          font-weight: 100;
          line-height: 1;
          margin-bottom: 10px;
        }
        .lo-benefit-card p {
          color: #737a8e !important;
          font-size: 1.03rem;
          line-height: 1.48;
        }
        .lo-hero-form {
          margin-top: 18px;
          width: min(760px, 100%);
          margin-left: auto;
          margin-right: auto;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.34);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border-radius: 12px;
          padding: 8px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .lo-hero-input {
          flex: 1;
          min-width: 0;
          border: 0;
          border-radius: 8px;
          padding: 14px 16px;
          outline: none;
          background: rgba(255,255,255,0.95);
          color: #111;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .lo-hero-input::placeholder {
          color: #7a7f95;
          text-transform: uppercase;
          font-size: .84rem;
          letter-spacing: 0.09em;
        }
        .lo-hero-go {
          border: 0;
          border-radius: 8px;
          padding: 14px 24px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #ff8b1f, #ff5f10);
          color: #fff;
          transition: transform .25s ease, filter .25s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .lo-hero-go:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
          color: #fff;
        }
        .lo-grid-card {
          background: linear-gradient(160deg, var(--lo-surface), var(--lo-surface-2));
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 24px;
          height: 100%;
          transition: transform .28s ease, border-color .28s ease;
        }
        .lo-grid-card:hover {
          transform: translateY(-8px);
          border-color: rgba(247, 208, 70, .55);
        }
        .lo-number {
          font-size: 1.2rem;
          color: var(--lo-accent);
          font-weight: 800;
          margin-bottom: 10px;
        }
        .lo-package-price {
          font-size: 2rem;
          font-weight: 900;
        }
        .lo-package-old {
          text-decoration: line-through;
          color: #999fb8;
          margin-left: 10px;
        }
        .lo-popular {
          border-color: rgba(247, 208, 70, .7);
          box-shadow: 0 16px 36px rgba(247, 208, 70, .14);
        }
        .lo-tag {
          display: inline-block;
          font-size: .75rem;
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(247, 208, 70, .2);
          color: var(--lo-accent);
          margin-bottom: 12px;
          font-weight: 700;
        }
        .lo-list {
          list-style: none;
          padding-left: 0;
          margin: 14px 0 24px;
        }
        .lo-list li {
          margin-bottom: 9px;
          color: #d9deee;
          font-size: .95rem;
          display: flex;
          gap: 8px;
        }
        .lo-list li::before {
          content: "✓";
          color: var(--lo-accent);
          font-weight: 700;
        }
        .lo-packages {
          background: #fff;
          color: #121625;
          position: relative;
          overflow: hidden;
        }
        .lo-packages .lo-kicker {
          color: #FF5E2C;
        }
        .lo-packages .lo-heading {
          color: #101421;
          max-width: 780px;
          margin-bottom: 8px;
        }
        .lo-packages .lo-subtext {
          color: #71788e;
          max-width: 520px;
        }
        .lo-packages-watermark {
          position: absolute;
          left: 0;
          width: 100%;
          text-align: center;
          top: 42px;
          font-size: clamp(4rem, 14vw, 12rem);
          font-weight: 900;
          text-transform: uppercase;
          color: rgba(16, 20, 32, 0.05);
          line-height: 1;
          letter-spacing: .02em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .logo-offer-page .packages-section {
          background: linear-gradient(145deg, #0c3a2f 0%, #0f172a 52%, #2e1a12 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .logo-offer-page .packages-section::before {
          content: "Package";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 42px;
          font-size: clamp(4rem, 14vw, 12rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: .02em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.06);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .logo-offer-page .packages-section .packages-header {
          position: relative;
          z-index: 1;
        }
        .logo-offer-page .packages-section .section-pill {
          color: #FF5E2C;
          background: #fff;
          padding: 6px 16px;
          border-radius: 999px;
          letter-spacing: 0.03em;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1.1rem;
          margin-bottom: 14px;
          display: inline-block;
        }
        .logo-offer-page .packages-section .packages-title {
          color: #fff;
          font-size: clamp(2rem, 4.5vw, 4.1rem);
          font-weight: 900;
          line-height: 1.02;
          margin-bottom: 8px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }
        .logo-offer-page .packages-section .packages-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.15rem;
          max-width: 680px;
          margin: 0 auto 12px;
          opacity: 0.92;
        }
        .lo-package-switch {
          display: inline-flex;
          gap: 12px;
          background: #f3f5fa;
          border-radius: 999px;
          padding: 6px;
          margin: 12px 0 18px;
        }
        .lo-switch-pill {
          border: 0;
          border-radius: 999px;
          padding: 10px 24px;
          font-weight: 700;
          font-size: .95rem;
          color: #1d2335;
          background: transparent;
        }
        .lo-switch-pill.active {
          background: linear-gradient(135deg, #ff7a3c, #FF5E2C);
          color: #fff;
          box-shadow: 0 8px 18px rgba(255, 94, 44, .28);
        }
        .lo-package-card {
          background: #fff;
          border: 1px solid #eceff6;
          border-radius: 0;
          box-shadow: 0 8px 25px rgba(16, 19, 30, .08);
          padding: 18px 18px 16px;
          min-height: 100%;
          position: relative;
          overflow: hidden;
        }
        .lo-package-card h3 {
          color: #0f1422;
          font-weight: 900;
          letter-spacing: .01em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .lo-package-card .lo-package-price {
          color: #FF5E2C;
          font-size: 3rem;
          line-height: .95;
        }
        .lo-package-card .lo-package-old {
          color: #272d3f;
          font-weight: 700;
          margin-left: 6px;
        }
        .lo-package-off {
          color: #101522;
          font-weight: 800;
          font-size: 1.35rem;
          margin: 2px 0 10px;
        }
        .lo-package-card .lo-list {
          border-top: 1px solid #eef1f7;
          padding-top: 12px;
          margin-bottom: 16px;
        }
        .lo-package-card .lo-list li {
          color: #2a3044;
          font-size: .98rem;
        }
        .lo-package-card .lo-list li::before {
          content: "●";
          color: #151a27;
          font-size: .7rem;
          margin-top: 7px;
        }
        .lo-package-card .lo-btn-primary {
          background: linear-gradient(135deg, #ff7a3c, #FF5E2C);
          color: #fff;
          border-radius: 999px;
          box-shadow: 0 9px 18px rgba(255, 94, 44, .27);
          padding-top: 11px;
          padding-bottom: 11px;
        }
        .lo-package-card .lo-btn-primary:hover {
          color: #fff;
          filter: brightness(1.04);
        }
        .lo-package-card.lo-popular {
          background: linear-gradient(160deg, #ff8e57 0%, #FF5E2C 100%);
          border-color: #ff8e57;
          box-shadow: 0 18px 38px rgba(255, 94, 44, .3);
        }
        .lo-package-card.lo-popular h3,
        .lo-package-card.lo-popular .lo-package-price,
        .lo-package-card.lo-popular .lo-package-old,
        .lo-package-card.lo-popular .lo-package-off,
        .lo-package-card.lo-popular .lo-list li {
          color: #fff;
        }
        .lo-package-card.lo-popular .lo-list {
          border-top-color: rgba(255,255,255,.34);
        }
        .lo-package-card.lo-popular .lo-list li::before {
          color: #fff;
        }
        .lo-package-card.lo-popular .lo-btn-primary {
          background: #fff;
          color: #FF5E2C;
          box-shadow: none;
        }
        .lo-package-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: .72rem;
          font-weight: 800;
          color: #fff;
          background: #101522;
          border-radius: 999px;
          padding: 5px 10px;
        }
        .lo-portfolio-more-wrap {
          margin-top: 8px;
          text-align: center;
        }
        .lo-portfolio-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #151515;
          color: #0f1523;
          background: #fff;
          font-weight: 500;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 0;
          transition: all .2s ease;
        }
        .lo-portfolio-more-btn:hover {
          color: #20edc1;
          border-color: #20edc1;
        }
        .lo-home-portfolio {
          background: #fff;
          color: #151515;
          overflow: hidden;
        }
        .lo-home-portfolio .p-rel {
          position: relative;
          padding-top: 28px;
        }
        .lo-home-portfolio .mn-hd3 {
          font-size: clamp(1.8rem, 4.2vw, 3.2rem);
          color: #151515;
          margin: 0 0 15px;
          font-weight: 800;
          line-height: 1.08;
          position: relative;
          z-index: 1;
        }
        .lo-home-portfolio .mn-hd3 span {
          color: #FF5E2C;
        }
        .lo-home-portfolio .bg-txt {
          font-size: clamp(5.5rem, 16vw, 15rem);
          font-weight: 800;
          position: absolute;
          left: 50%;
          top: -60px;
          transform: translateX(-50%);
          z-index: 0;
          line-height: .9;
          color: rgba(16, 20, 32, 0.05);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .lo-home-portfolio .p-rel > p {
          position: relative;
          z-index: 1;
          font-size: 25px;
          color: #858585;
          line-height: 35px;
          font-weight: 500;
          margin: 0 0 15px;
        }
        .lo-home-portfolio .spacebr {
          display: block;
        }
        .lo-home-portfolio ul.home-portf {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .lo-home-portfolio ul.home-portf > li {
          display: inline-block;
          width: 49%;
          vertical-align: top;
          margin-bottom: 70px;
        }
        .lo-home-portfolio ul.home-portf > li:nth-child(even) {
          margin-top: -90px;
        }
        .lo-home-portfolio ul.home-portf li > div {
          width: 424px;
          max-width: 100%;
          display: inline-block;
          text-align: left;
          background: #fff;
          box-shadow: 0 0 40px 2px rgba(0, 0, 0, 0.35);
        }
        .lo-home-portfolio ul.home-portf figure {
          margin: 0;
          position: relative;
        }
        .lo-home-portfolio ul.home-portf figure > img {
          width: 100%;
          display: block;
        }
        .lo-home-portfolio ul.home-portf .img1 {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          top: 0;
          transition: all .4s ease-in;
        }
        .lo-home-portfolio ul.home-portf li.bg-02 .img1,
        .lo-home-portfolio ul.home-portf li.bg-03 .img1 {
          top: auto;
          bottom: -20px;
        }
        .lo-home-portfolio ul.home-portf li.bg-04 .img1 {
          right: -90px;
          left: auto;
          top: -25px;
        }
        .lo-home-portfolio ul.home-portf li.bg-05 .img1 {
          left: -20px;
          right: auto;
          top: -55px;
        }
        .lo-home-portfolio ul.home-portf li.bg-07 .img1 {
          right: 0;
          left: 0;
          top: -30px;
        }
        .lo-home-portfolio ul.home-portf li.bg-08 .img1 {
          right: -70px;
          left: auto;
          top: -40px;
        }
        .lo-home-portfolio ul.home-portf li:hover .img1 img {
          animation: loScale 3s infinite;
        }
        @media (hover: none) {
          .lo-home-portfolio ul.home-portf li:hover .img1 img {
            animation: none;
          }
        }
        .lo-home-portfolio .portf-content {
          padding: 25px;
        }
        .lo-home-portfolio .portf-content h5 {
          font-size: 36px;
          color: #151515;
          font-weight: 800;
          margin: 0 0 14px;
          line-height: .98;
        }
        .lo-home-portfolio .portf-content h5 span {
          color: #20edc1;
        }
        .lo-home-portfolio .portf-content ul {
          min-height: 50px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .lo-home-portfolio .portf-content ul li {
          display: inline-block;
          color: #858585;
          font-size: 18px;
          text-transform: uppercase;
        }
        .lo-home-portfolio .portf-content ul li::before {
          content: "";
          width: 5px;
          height: 5px;
          background: #FF5E2C;
          display: inline-block;
          margin: 0 5px;
        }
        .lo-home-portfolio .portf-content ul li:first-child::before {
          display: none;
        }
        .lo-home-portfolio .portf-content hr {
          margin: 12px 0 10px;
          border-color: #e7e7e7;
          opacity: 1;
        }
        .lo-home-portfolio .portf-btn {
          font-size: 18px;
          color: #151515;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .lo-home-portfolio .portf-btn:hover {
          color: #20edc1;
        }
        .lo-logo-box {
          height: 140px;
          border-radius: 14px;
          background: linear-gradient(145deg, #1a1f31, #0d0f18);
          border: 1px solid rgba(255,255,255,.09);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: 800;
          color: #d6dcf3;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .lo-process-section {
          position: relative;
          overflow: hidden;
          padding: 56px 0 72px;
          background-color: #f6f7fb;
          background-image:
            linear-gradient(180deg, rgba(246, 247, 251, 0.94) 0%, rgba(246, 247, 251, 0.88) 100%),
            url(/assets/images/icon/static-effect-dirty-white.jpg);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .lo-process-section .container {
          position: relative;
        }
        .lo-process-watermark {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -50px;
          font-size: clamp(4rem, 14vw, 12rem);
          font-weight: 900;
          text-transform: uppercase;
          color: rgba(16, 20, 32, 0.06);
          line-height: 1;
          letter-spacing: 0.02em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .lo-process-section .text-center-head {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin-bottom: 8px;
        }
        .lo-process-section .text-center-head .lo-kicker {
          color: #FF5E2C;
        }
        .lo-process-section .text-center-head .lo-heading {
          color: #000000;
        }
        .lo-process-section .text-center-head .lo-subtext {
          color: #5c6378;
        }
        .lo-process-flow {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          justify-content: center;
          gap: 0;
          margin-top: 28px;
          position: relative;
          z-index: 1;
        }
        .lo-process-flow::before {
          content: "";
          position: absolute;
          left: 8%;
          right: 8%;
          top: 52px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 94, 44, 0.35), rgba(247, 208, 70, 0.35), rgba(255, 94, 44, 0.35), transparent);
          z-index: 0;
          pointer-events: none;
        }
        .lo-process-item {
          flex: 1 1 0;
          min-width: 0;
          position: relative;
          z-index: 1;
          background: linear-gradient(165deg, rgba(26, 31, 49, 0.98), rgba(12, 14, 22, 0.96));
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px;
          padding: 22px 20px 22px;
          min-height: 220px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        }
        .lo-process-item:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 94, 44, 0.45);
          box-shadow: 0 22px 48px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 94, 44, 0.15);
        }
        .lo-process-num {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
          color: #0d0f14;
          background: linear-gradient(135deg, #FF5E2C, #ff8a5c);
          margin-bottom: 14px;
          box-shadow: 0 8px 20px rgba(255, 94, 44, 0.35);
        }
        .lo-process-step {
          color: var(--lo-accent);
          font-size: .72rem;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 8px;
          font-weight: 800;
        }
        .lo-process-item h3 {
          color: #f5f7ff;
          font-weight: 800;
          font-size: 1.15rem;
          margin-bottom: 10px;
          letter-spacing: .02em;
        }
        .lo-process-item .lo-subtext {
          font-size: .94rem;
          line-height: 1.55;
          color: #ffffff;
        }
        .lo-process-arrow {
          flex: 0 0 auto;
          width: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          color: rgba(255, 94, 44, 0.85);
          z-index: 2;
        }
        .lo-process-arrow svg {
          filter: drop-shadow(0 2px 6px rgba(255, 94, 44, 0.35));
        }

        /* SuccessStoriesHome on logo-offer only: dark text + watermark like stories sections */
        .logo-offer-page .lo-logo-offer-success-stories {
          color: #151515;
        }
        .logo-offer-page .lo-logo-offer-success-stories .success-stories-react.stories-sec.stories-sec2::before {
          content: "SUCCESS" !important;
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
          font-family: "Bebas Neue", "Impact", sans-serif;
          font-size: clamp(64px, 12vw, 180px);
          letter-spacing: 6px;
          text-transform: uppercase;
          color: #000000;
          opacity: 0.06;
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
        }
        .logo-offer-page .lo-logo-offer-success-stories .success-stories-react .container-fluid {
          position: relative;
          z-index: 1;
        }
        .logo-offer-page .lo-logo-offer-success-stories .section-heading {
          position: relative;
          z-index: 1;
        }
        .logo-offer-page .lo-logo-offer-success-stories .section-heading h2 {
          color: #000000 !important;
        }
        .logo-offer-page .lo-logo-offer-success-stories .section-heading p {
          color: #5c6378 !important;
        }
        .logo-offer-page .lo-logo-offer-success-stories .story-card-header .meta h5 {
          color: #111324 !important;
        }
        .logo-offer-page .lo-logo-offer-success-stories .success-stories-review-text {
          color: #3d4457 !important;
        }
        .logo-offer-page .lo-logo-offer-success-stories .story-card-footer .score {
          color: #111324 !important;
        }
        .logo-offer-page .lo-logo-offer-success-stories .success-stories-footer .stars i {
          color: #ff9f1c !important;
        }

        .lo-cta-band {
          background: linear-gradient(120deg, #1f2437, #121526);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 18px;
          padding: clamp(24px, 4vw, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .lo-review {
          background: rgba(20, 23, 36, .92);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 22px;
          height: 100%;
        }
        .lo-stars {
          color: var(--lo-accent);
          letter-spacing: 0.06em;
          margin-bottom: 12px;
          font-size: .9rem;
        }
        .lo-faq details {
          background: #101320;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px;
          margin-bottom: 12px;
          padding: 13px 16px;
        }
        .lo-faq summary {
          list-style: none;
          cursor: pointer;
          font-weight: 700;
        }
        .lo-faq summary::-webkit-details-marker {
          display: none;
        }
        .lo-faq p {
          color: #ced4ea;
          margin: 10px 0 4px;
        }
        .lo-footer {
          padding: 44px 0;
          border-top: 1px solid rgba(255,255,255,.1);
          color: #adb4cd;
          font-size: .95rem;
        }
        @keyframes loFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes loScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @media (max-width: 991.98px) {
          .logo-offer-page .lo-section {
            padding: 64px 0;
          }
          .lo-process-flow {
            flex-direction: column;
            align-items: center;
            gap: 0;
          }
          .lo-process-flow::before {
            display: none;
          }
          .lo-process-flow .lo-process-item {
            flex: none;
            width: 100%;
            max-width: 520px;
            min-height: 0;
          }
          .lo-process-flow .lo-process-arrow {
            width: auto;
            height: 32px;
            margin-top: 0;
            margin-bottom: 0;
            transform: rotate(90deg);
          }

          /* Portfolio grid: desktop stagger (-90px even items + 49% cols) breaks tablets — stack cards + reset offsets */
          .lo-home-portfolio {
            overflow: visible;
          }
          .lo-home-portfolio .bg-txt {
            font-size: clamp(3rem, 11vw, 5rem);
            top: 4px;
          }
          .lo-home-portfolio .mn-hd3 {
            font-size: clamp(1.45rem, 4.5vw, 2rem);
            line-height: 1.12;
          }
          .lo-home-portfolio .mn-hd3 br {
            display: none;
          }
          .lo-home-portfolio .spacebr {
            display: none;
          }
          .lo-home-portfolio ul.home-portf > li {
            width: 100%;
            display: block;
            margin-bottom: 26px;
          }
          .lo-home-portfolio ul.home-portf > li:nth-child(even) {
            margin-top: 0 !important;
          }
          .lo-home-portfolio ul.home-portf li > div {
            width: 100%;
            max-width: 460px;
            margin-left: auto;
            margin-right: auto;
          }
          .lo-home-portfolio ul.home-portf figure {
            position: relative;
            overflow: hidden;
          }
          .lo-home-portfolio ul.home-portf .img1 {
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .lo-home-portfolio ul.home-portf li.bg-02 .img1,
          .lo-home-portfolio ul.home-portf li.bg-03 .img1 {
            top: 0 !important;
            bottom: 0 !important;
          }
          .lo-home-portfolio ul.home-portf li.bg-04 .img1,
          .lo-home-portfolio ul.home-portf li.bg-05 .img1,
          .lo-home-portfolio ul.home-portf li.bg-07 .img1,
          .lo-home-portfolio ul.home-portf li.bg-08 .img1 {
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
          }
          .lo-home-portfolio ul.home-portf .img1 img {
            width: min(220px, 58vw);
            height: auto;
          }
          .lo-home-portfolio .portf-content {
            padding: 22px 14px;
          }
          .lo-home-portfolio .portf-content h5 {
            font-size: clamp(1.5rem, 5vw, 1.9rem);
          }
          .lo-home-portfolio .portf-content ul {
            min-height: 20px;
          }
          .lo-home-portfolio .portf-content ul li {
            font-size: 15px;
          }
        }
        @media (max-width: 575.98px) {
          .logo-offer-page .lo-logo-offer-success-stories .success-stories-react.stories-sec.stories-sec2::before {
            top: 78px;
          }
          .lo-process-watermark {
            top: -10px;
            font-size: 4.3rem;
          }
          .lo-process-flow .lo-process-item {
            max-width: 420px;
          }
          .lo-process-flow .lo-process-arrow {
            height: 28px;
          }
          .lo-hero {
            min-height: 76vh;
          }
          .lo-hero-form {
            flex-direction: column;
            align-items: stretch;
          }
          .lo-hero-go {
            text-align: center;
            width: 100%;
          }
          .lo-btn {
            width: 100%;
          }
          .lo-benefits-watermark {
            top: 35px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 4.3rem;
          }
          .lo-benefit-card h3 {
            font-size: 1.65rem;
          }
          .lo-package-card .lo-package-price {
            font-size: 2.6rem;
          }
          .lo-packages-watermark {
            top: 35px;
            font-size: 4.3rem;
            left: 0;
            width: 100%;
            text-align: center;
          }
          .logo-offer-page .packages-section::before {
            top: 35px;
            font-size: 4.3rem;
          }
          .lo-home-portfolio .bg-txt {
            font-size: clamp(2.75rem, 14vw, 4.25rem);
            top: 2px;
          }
          .lo-home-portfolio .mn-hd3 {
            font-size: clamp(1.25rem, 5.5vw, 1.65rem);
          }
          .lo-home-portfolio ul.home-portf .img1 img {
            width: min(200px, 52vw);
          }
          .lo-home-portfolio .portf-content {
            padding: 20px 12px;
          }
          .logo-offer-page .faq-section .lo-faq-watermark {
            top: 4px;
            font-size: clamp(3.25rem, 16vw, 4.5rem);
          }
          .logo-offer-page .lo-offer-footer-social a {
            width: 32px;
            height: 32px;
            font-size: 0.82rem;
          }
          .logo-offer-page .lo-offer-footer-icon-box {
            width: 28px;
            height: 28px;
            font-size: 0.7rem;
          }
        }

        /* FAQ on logo-offer: watermark behind heading (like Benefits / Process) + black headings + full answers */
        .logo-offer-page .faq-section {
          position: relative;
          overflow: hidden;
          color: #111827;
        }
        .logo-offer-page .faq-section > .container {
          position: relative;
        }
        .logo-offer-page .faq-section .lo-faq-watermark {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 8px;
          font-size: clamp(4rem, 14vw, 11rem);
          font-weight: 900;
          text-transform: uppercase;
          color: rgba(16, 20, 32, 0.06);
          line-height: 1;
          letter-spacing: 0.06em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          width: max-content;
          max-width: 100%;
          text-align: center;
          white-space: nowrap;
        }
        .logo-offer-page .faq-section .faq-header {
          position: relative;
          z-index: 1;
        }
        .logo-offer-page .faq-section .faq-modern-grid {
          position: relative;
          z-index: 1;
        }
        .logo-offer-page .faq-section .section-pill {
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }
        .logo-offer-page .faq-section .faq-title {
          color: #000000 !important;
        }
        .logo-offer-page .faq-section .faq-subtitle {
          color: #5b6474 !important;
        }
        .logo-offer-page .faq-section .faq-modern-item .faq-question {
          color: #000000 !important;
        }
        .logo-offer-page .faq-section .faq-modern-item[open] {
          overflow: visible;
        }
        .logo-offer-page .faq-section .faq-modern-item .faq-answer {
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          transition: none;
        }

        /* Logo-offer only: footer (dark grid + brand orange #FF5E2C) */
        .logo-offer-page .lo-offer-footer {
          --lo-footer-accent: #ff5e2c;
          --lo-footer-muted: #c8c8c8;
          background-color: #09090b;
          background-image:
            linear-gradient(rgba(255, 94, 44, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 94, 44, 0.06) 1px, transparent 1px);
          background-size: 26px 26px;
          padding: clamp(48px, 8vw, 72px) 0 42px;
          color: var(--lo-footer-muted);
        }
        .logo-offer-page .lo-offer-footer-inner {
          max-width: min(1100px, 100%);
          margin: 0 auto;
          text-align: center;
          padding-left: 12px;
          padding-right: 12px;
        }
        .logo-offer-page .lo-offer-footer-logo-wrap {
          display: inline-block;
          margin-bottom: 26px;
        }
        .logo-offer-page .lo-offer-footer-logo {
          display: block;
          max-width: min(280px, 78vw);
          height: auto;
          margin: 0 auto;
        }
        .logo-offer-page .lo-offer-footer-social {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 34px;
        }
        .logo-offer-page .lo-offer-footer-social a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--lo-footer-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--lo-footer-accent);
          font-size: 0.92rem;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .logo-offer-page .lo-offer-footer-social a:hover {
          background: rgba(255, 94, 44, 0.14);
          color: #ffb899;
          border-color: #ffb899;
        }
        .logo-offer-page .lo-offer-footer-contact {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          gap: clamp(8px, 2vw, 28px);
        }
        .logo-offer-page .lo-offer-footer-contact li {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0;
          flex: 0 1 auto;
          min-width: 0;
        }
        .logo-offer-page .lo-offer-footer-contact li:last-child {
          margin-bottom: 0;
        }
        .logo-offer-page .lo-offer-footer-icon-box {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--lo-footer-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--lo-footer-accent);
          font-size: 0.78rem;
        }
        .logo-offer-page .lo-offer-footer-contact a {
          flex: 0 1 auto;
          min-width: 0;
          text-align: left;
          color: var(--lo-footer-muted);
          text-decoration: none;
          font-size: 0.88rem;
          line-height: 1.35;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .logo-offer-page .lo-offer-footer-contact a:hover {
          color: #ffb899;
        }
        .logo-offer-page .lo-offer-footer-contact-line {
          flex: 0 1 auto;
          min-width: 0;
          font-size: 0.88rem;
          line-height: 1.35;
          color: var(--lo-footer-muted);
          text-align: left;
          white-space: nowrap;
        }
        .logo-offer-page .lo-offer-footer-rule {
          height: 1px;
          margin: 32px 0 22px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 94, 44, 0.42),
            transparent
          );
        }
        .logo-offer-page .lo-offer-footer-legal {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 0.9rem;
        }
        .logo-offer-page .lo-offer-footer-legal a {
          color: var(--lo-footer-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .logo-offer-page .lo-offer-footer-legal a:hover {
          color: var(--lo-footer-accent);
        }
        .logo-offer-page .lo-offer-footer-sep {
          color: var(--lo-footer-accent);
          font-weight: 700;
        }
        @media (max-width: 767.98px) {
          .logo-offer-page .lo-offer-footer-contact {
            justify-content: flex-start;
            gap: 10px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 6px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .logo-offer-page .lo-offer-footer-contact::-webkit-scrollbar {
            display: none;
          }
          .logo-offer-page .lo-offer-footer-contact li {
            flex: 0 0 auto;
          }
          .logo-offer-page .lo-offer-footer-contact a,
          .logo-offer-page .lo-offer-footer-contact-line {
            font-size: 0.76rem;
          }
        }
        .logo-offer-page .lo-offer-footer-copy {
          margin: 14px 0 0;
          font-size: 0.84rem;
          color: #8a8a8a;
          line-height: 1.5;
        }
      `}</style>

      <section className="lo-hero">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="lo-hero-card text-center">
                <p className="lo-kicker">Custom Logo & Branding Agency</p>
                <h1 className="lo-heading">Building Brands That Empower Growth</h1>
                <p className="lo-hero-lead mx-auto">
                  We design premium logos and visual identities that help your business look credible, convert better,
                  and lead your niche with confidence.
                </p>
               
                <form className="lo-hero-form" onSubmit={handleHeroStart}>
                  <input
                    className="lo-hero-input"
                    type="text"
                    placeholder="Enter Your Business Name"
                    aria-label="Business name"
                    value={heroBusinessName}
                    onChange={(event) => setHeroBusinessName(event.target.value)}
                  />
                  <button type="submit" className="lo-hero-go">Get Started →</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lo-section lo-benefits">
        <div className="container">
          <span className="lo-benefits-watermark" aria-hidden="true">Benefits</span>
          <div className="text-center">
            <p className="lo-kicker">Benefits</p>
            <h2 className="lo-heading mx-auto">Logo Design We Are Proud Of.</h2>
            <p className="lo-subtext">Get inspired by the stories we've helped writing.</p>
          </div>
          <div className="row g-4 mt-2">
            {benefits.map((item) => (
              <div className="col-md-6 col-xl-3" key={item.number}>
                <div className="lo-benefit-card">
                  <div className="lo-benefit-number">{item.number}</div>
                  <div className="lo-benefit-line"></div>
                  <h3 className="h5 mb-2">{item.title}</h3>
                  <p className="mb-0 lo-subtext">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="packages">
        <ServicePackagesSection
          serviceType="logo"
          title="Carefully Crafted Packages."
          subtitle="We offer experienced designers and more hands-on support, that too in your budget."
          pill="Packages"
        />
      </div>

      <section className="lo-section pt-30 pb-0 lo-home-portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="p-rel text-center">
                <div className="bg-txt">Portfolio</div>
                <h4 className="mn-hd3">We've Done Lots Of Work,Check Some Here</h4>
              </div>
              <div className="spacebr"><br /><br /><br /><br /></div>
              <ul className="home-portf text-center">
                {homePortfolioItems.map((item) => (
                  <li className={item.wrapperClass} key={item.id}>
                    <div>
                      <figure>
                        <img loading="lazy" src={item.bg} alt={item.title} />
                        <figcaption>
                          <div className="img1">
                            <img loading="lazy" src={item.fg} alt={item.title} />
                          </div>
                        </figcaption>
                      </figure>
                      <div className="portf-content">
                        <h5>{item.title}</h5>
                        <ul>
                          <li>Platform</li>
                          <li>Logo Design</li>
                          <li>Branding</li>
                        </ul>
                        <hr />
                        <div className="text-end">
                          <a href="#packages" className="portf-btn">View more <span aria-hidden="true">→</span></a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      <AwesomeProjects />
      </section>

      <section className="lo-section lo-process-section">
        <div className="container">
          <span className="lo-process-watermark" aria-hidden="true">Process</span>
          <div className="text-center mx-auto text-center-head">
            <p className="lo-kicker">Process</p>
            <h2 className="lo-heading mx-auto">How We Craft Winning Identities</h2>
            <p className="lo-subtext mx-auto mb-0">Four clear stages—from discovery to delivery—with your feedback shaping every move.</p>
          </div>
          <div className="lo-process-flow">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.title}>
                <article className="lo-process-item">
                  <div className="lo-process-num">{index + 1}</div>
                  <p className="lo-process-step">Step {index + 1}</p>
                  <h3>{step.title}</h3>
                  <p className="mb-0 lo-subtext">{step.text}</p>
                </article>
                {index < processSteps.length - 1 ? (
                  <div className="lo-process-arrow" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>



      <CtaProjects />

      <div className="lo-logo-offer-success-stories">
        <SuccessStoriesHome />
      </div>

      <section className="faq-section py-5">
        <div className="container">
            <span className="lo-faq-watermark" aria-hidden="true">FAQ</span>
            <div className="faq-header text-center">
                <span className="section-pill">FAQ</span>
                <h2 className="faq-title">Questions Clients Ask Before Starting</h2>
                <p className="faq-subtitle">
                    Quick answers about timelines, process, collaboration, and post-launch support.
                </p>
            </div>

            <div className="faq-modern-grid">

                <details className="faq-modern-item" open>
                    <summary>
                        <span className="faq-index">01</span>
                        <span className="faq-question">What is a logo design agency?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        A logo design agency is a company that specializes in creating logos for other businesses or
                        organizations. As the best logo design agency in San Jose we offer custom design made from
                        scratch for our clients.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">02</span>
                        <span className="faq-question">What is the process of creating a logo design?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        The process of creating a logo design typically involves research, sketching and
                        conceptualization, design development, and finalization.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">03</span>
                        <span className="faq-question">What makes a good logo design?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        A good logo design should be simple, memorable, timeless, versatile, and appropriate for the
                        brand or business it represents.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">04</span>
                        <span className="faq-question">What are some logo design agencies in San Jose?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        San Jose Logo Design is the best local designing agency in San Jose. Our experts know how to
                        design a logo as per the requirement of our clients.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">05</span>
                        <span className="faq-question">How do I get to a logo design agency in San Jose?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Call us directly or fill out a contact form for so one of our representative will call you to
                        assist you.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">06</span>
                        <span className="faq-question">What is the website for San Jose Logo Design?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        The website for San Jose Logo Design is www.sanjoselogodesign.com
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">07</span>
                        <span className="faq-question">What services does a logo design agency provide?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        San Jose Logo Design provides all kinds of Designing services. Expertise in logo designing, web
                        designing as well as branding and identity design, print and packaging design, and many more.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">08</span>
                        <span className="faq-question">How much does it cost to hire a logo design agency?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        The cost of hiring a logo design agency can vary widely depending on the agency's experience,
                        location, and services offered. Prices may range from a few hundred to several thousand dollars.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">09</span>
                        <span className="faq-question">How Long Does It Take To Get A Logo Design From An Agency?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        The timeline for getting a logo design from an agency can vary, but it generally takes several
                        days to a few weeks to complete the entire design process.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">10</span>
                        <span className="faq-question">How do I hire a logo design agency in San Jose?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        To hire experts in San Jose, Visit www.sanjoselogodesign.com or directly call at our number or
                        fill out contact us form.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">11</span>
                        <span className="faq-question">What is the process for working with a logo design agency?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        The process for working with a logo design agency typically involves initial consultation,
                        contract signing, payment of a deposit, design development, revisions, finalization, and
                        delivery of final files.
                    </div>
                </details>

                <details className="faq-modern-item">
                    <summary>
                        <span className="faq-index">12</span>
                        <span className="faq-question">Can I see examples of work done by a logo design agency?</span>
                        <i className="fa-solid fa-plus"></i>
                    </summary>
                    <div className="faq-answer">
                        Yes, most logo design agencies have portfolios of their work available on their website, or they
                        may be able to provide examples upon request.
                    </div>
                </details>

            </div>
        </div>
    </section>

      <footer className="lo-offer-footer">
        <div className="container">
          <div className="lo-offer-footer-inner">
            <Link to="/" className="lo-offer-footer-logo-wrap">
              <img
                className="lo-offer-footer-logo"
                src="/assets/images/logo/logo-white.png"
                alt="San Jose Logo Design"
              />
            </Link>

            <div className="lo-offer-footer-social" role="navigation" aria-label="Social media">
              <a
                href="https://www.facebook.com/SanJoselogodesign"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a href="https://wa.me/12144491305" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/sanjoselogodesign/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/san-jose-logo-design"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
              </a>
            </div>

            <ul className="lo-offer-footer-contact">
              <li>
                <span className="lo-offer-footer-icon-box" aria-hidden="true">
                  <i className="fa-solid fa-phone" />
                </span>
                <a href="tel:+12144491305">(214) 449-1305</a>
              </li>
              <li>
                <span className="lo-offer-footer-icon-box" aria-hidden="true">
                  <i className="fa-solid fa-envelope" />
                </span>
                <a href="mailto:info@sanjoselogodesign.com">info@sanjoselogodesign.com</a>
              </li>
              <li>
                <span className="lo-offer-footer-icon-box" aria-hidden="true">
                  <i className="fa-solid fa-location-dot" />
                </span>
                <span className="lo-offer-footer-contact-line">14A S 1st St, San Jose, CA 95113, USA</span>
              </li>
            </ul>

            <div className="lo-offer-footer-rule" aria-hidden="true" />

            <div className="lo-offer-footer-bottom">
              <div className="lo-offer-footer-legal">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <span className="lo-offer-footer-sep" aria-hidden="true">
                  •
                </span>
                <Link to="/terms-condition">Terms &amp; Conditions</Link>
              </div>
              <p className="lo-offer-footer-copy">
                © {new Date().getFullYear()} San Jose Logo Design. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
