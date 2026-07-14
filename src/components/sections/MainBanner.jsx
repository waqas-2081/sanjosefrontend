import React from 'react';
export function MainBanner() {
  return (
    <section className="main-banner">
        <div className="banner-images">
            <div className="bg-image">
                <img
                  src="/assets/images/banner/banner.webp"
                  alt=""
                  width={1903}
                  height={1140}
                  fetchPriority="high"
                  decoding="async"
                />
            </div>
            <div className="main-banner-image">
                <img
                  src="/assets/images/banner/main_banner.webp"
                  alt=""
                  width={1504}
                  height={648}
                  decoding="async"
                />
            </div>
        </div>
        <div className="banner-content">
            <div className="top-area">
                <h1>AWARD-WINNING<span> SAN JOSE  <br /> LOGO DESIGN </span>AGENCY</h1>
            </div>
        </div>
        <div className="right-side">
            <h3>Connect</h3>
            <span></span>
            <div className="social-links">
                <a
                  href="https://www.facebook.com/SanJoselogodesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/sanjoselogodesign/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                    <i className="fa-brands fa-instagram"></i>
                </a>
               
                
            </div>
        </div>
        <div className="bottom-area">
            
        </div>
    </section>
  );
}
