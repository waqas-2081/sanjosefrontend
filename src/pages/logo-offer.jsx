import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServicePackagesSection from '../components/sections/ServicePackagesSection';
import { AwesomeProjects } from '../components/sections/AwesomeProjects';

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
          color: var(--lo-accent);
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
          color: var(--lo-muted);
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
          color: #3386ff;
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
        .lo-process-wrap {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .lo-process-item {
          background: rgba(16, 19, 30, .9);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          padding: 20px;
          min-height: 190px;
        }
        .lo-process-step {
          color: var(--lo-accent);
          font-size: .78rem;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 10px;
          font-weight: 800;
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
          .lo-process-wrap {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 575.98px) {
          .lo-process-wrap {
            grid-template-columns: 1fr;
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
            font-size: 5rem;
            top: 6px;
          }
          .lo-home-portfolio .mn-hd3 {
            font-size: 32px;
            line-height: 1;
          }
          .lo-home-portfolio .mn-hd3 br {
            display: none;
          }
          .lo-home-portfolio .p-rel > p {
            font-size: 20px;
            line-height: 24px;
          }
          .lo-home-portfolio ul.home-portf > li {
            width: 100%;
            display: block;
            margin-bottom: 24px;
          }
          .lo-home-portfolio ul.home-portf > li:nth-child(even) {
            margin-top: 0;
          }
          .lo-home-portfolio ul.home-portf li > div {
            width: 100%;
          }
          .lo-home-portfolio ul.home-portf .img1 {
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0;
            margin: auto;
            display: flex;
            align-items: center;
          }
          .lo-home-portfolio ul.home-portf .img1 img {
            width: 210px;
          }
          .lo-home-portfolio .portf-content {
            padding: 25px 10px;
          }
          .lo-home-portfolio .portf-content h5 {
            font-size: 30px;
          }
          .lo-home-portfolio .portf-content ul {
            min-height: 20px;
          }
          .lo-home-portfolio .portf-content ul li {
            font-size: 15px;
          }
          .lo-home-portfolio .spacebr {
            display: none;
          }
        }
      `}</style>

      <section className="lo-hero">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="lo-hero-card text-center">
                <p className="lo-kicker">Custom Logo & Branding Agency</p>
                <h1 className="lo-heading">Building Brands That Empower Growth</h1>
                <p className="lo-subtext mx-auto">
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

      <section className="lo-section">
        <div className="container">
          <p className="lo-kicker">Process</p>
          <h2 className="lo-heading">How We Craft Winning Identities</h2>
          <div className="lo-process-wrap mt-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="lo-process-item">
                <p className="lo-process-step">Step {index + 1}</p>
                <h3 className="h5">{step.title}</h3>
                <p className="mb-0 lo-subtext">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lo-section pt-0">
        <div className="container">
          <div className="lo-cta-band">
            <div>
              <p className="lo-kicker mb-2">CTA</p>
              <h2 className="h3 mb-1">Let us shape your next iconic logo</h2>
              <p className="mb-0 lo-subtext">Talk to our team and get your first concepts quickly.</p>
            </div>
            <Link to="/contact-us" className="lo-btn lo-btn-primary">Start Your Project</Link>
          </div>
        </div>
      </section>

      <section className="lo-section">
        <div className="container">
          <p className="lo-kicker">Testimonials</p>
          <h2 className="lo-heading">Clients Love Working With Us</h2>
          <div className="row g-4 mt-2">
            <div className="col-lg-4">
              <div className="lo-review">
                <div className="lo-stars">★★★★★</div>
                <p className="mb-2">"They turned our rough idea into a high-end identity that increased trust instantly."</p>
                <small className="text-light">- Maria, Dental Clinic Owner</small>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lo-review">
                <div className="lo-stars">★★★★★</div>
                <p className="mb-2">"Fast, creative, and very professional. Our rebrand finally looks like a real brand."</p>
                <small className="text-light">- Jason, Ecommerce Founder</small>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lo-review">
                <div className="lo-stars">★★★★★</div>
                <p className="mb-2">"Smooth process from brief to final files. Team communication was excellent."</p>
                <small className="text-light">- Selena, Startup CEO</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lo-section pt-0 lo-faq">
        <div className="container">
          <p className="lo-kicker">FAQs</p>
          <h2 className="lo-heading">Common Questions</h2>
          <div className="row mt-3">
            <div className="col-lg-10">
              {faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="lo-footer">
        <div className="container d-flex flex-wrap justify-content-between gap-3">
          <p className="mb-0">Footer - San Jose Logo Design</p>
          <p className="mb-0">Email: support@sanjoselogodesign.com | Phone: (872) 266-2866</p>
        </div>
      </footer>
    </div>
  );
}
