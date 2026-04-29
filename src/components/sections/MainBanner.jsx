import React from 'react';
export function MainBanner() {
  return (
    <section className="main-banner">
        <div className="banner-images">
            <div className="bg-image">
                <img src="/assets/images/banner/banner.png" alt="" />
            </div>
            <div className="main-banner-image">
                <img src="/assets/images/banner/main_banner.png" alt="" />
            </div>
        </div>
        <div className="banner-content">
            <div className="top-area">
                <h1>Best Logo<span>Agency</span> <br /> <span>in </span> Silicon Valley</h1>
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
                <a
                  href="https://x.com/SJLogoDesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                    <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/san-jose-logo-design"
                  target="_blank"
               
                  aria-label="LinkedIn"
                >
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>
            </div>
        </div>
        <div className="bottom-area">
            
        </div>
    </section>
  );
}
