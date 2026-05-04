import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <img src="/assets/images/icon/section_bottom_shape_black.svg" alt="" className="section_top_shape" />
      <div className="container-fluid">
        <div className="footer-cta">
          <div className="image">
            <img src="/assets/images/cta.png" alt="" />
          </div>
          <div className="cta-content">
            <h1>
            TURN IDEAS INTO <span>PROFITABLE</span> RESULTS
            </h1>
            <p>
           
            We craft high-performing digital solutions backed by strategy, creativity, and data to grow your business faster.

            </p>
            <div className="footer-cta-actions">
              <Link to="/blog" className="btn btn2">
                <span>HOW IT WORKS</span>
              </Link>
              <Link to="/contact-us" className="btn">
                <span>GET A QUOTE</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-top row">
          <div className="col-lg-5">
            <div className="footer-brand">
              <div className="footer-logo">
                <Link to="/">
                  <img src="/assets/images/logo/logo-white.png" alt="" />
                </Link>
              </div>
              <p>
              SanJose Logo Design is the united states primarily based totally advertising business enterprise this is providing a complete variety of advertising offerings and answers to numerous purpose-pushed industries.
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
               
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link to="/blog">Blogs</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link to="/logo-design-services">Logo Design</Link>
                </li>
                <li>
                  <Link to="/website-design-development-services">Website</Link>
                </li>
                <li>
                  <Link to="/mobile-app-development-services">Mobile Apps</Link>
                </li>
                <li>
                  <Link to="/digital-marketing-services">Digital Marketing</Link>
                </li>
                <li>
                  <Link to="/search-engine-optimization-services">SEO</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="footer-column footer-contact">
              <h4>Contact Info</h4>
              <ul className="footer-contact-list">
              <li>
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                  <a href="tel:+12144491305">(214) 449-1305</a>
                </li>
              <li>
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                  <a href="mailto:info@sanjoselogodesign.com">info@sanjoselogodesign.com</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  <span>14A S 1st St, San Jose, CA 95113, USA</span>
                </li>                 
              </ul>
              <div className="footer-social-links">
                <a href="https://www.facebook.com/SanJoselogodesign" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="https://www.instagram.com/sanjoselogodesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" />
                </a>
                <a href="https://x.com/SJLogoDesigns" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fa-brands fa-x-twitter" />
                </a>
                  <a href="https://www.linkedin.com/company/san-jose-logo-design" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin" />
                  </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© Copyright 2026 | All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms-condition">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
