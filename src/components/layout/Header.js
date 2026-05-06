import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StarIcon = () => (
  <svg aria-hidden="true" className="rr--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535 512.06" preserveAspectRatio="xMidYMid meet">
    <g shapeRendering="geometricPrecision" transform="translate(-20.5 0.01)">
      <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
    </g>
  </svg>
);

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeAll = useCallback(() => {
    setNavOpen(false);
    setServicesOpen(false);
    document.body.classList.remove('nav-open');
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) {
        setNavOpen(false);
        setServicesOpen(false);
        document.body.classList.remove('nav-open');
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleNav = () => {
    setNavOpen((o) => {
      const next = !o;
      document.body.classList.toggle('nav-open', next);
      if (!next) setServicesOpen(false);
      return next;
    });
  };

  const onServicesParentClick = (e) => {
    if (window.innerWidth < 992) {
      e.preventDefault();
      setServicesOpen((v) => !v);
    }
  };

  const onNavLinkClick = (e) => {
    if (window.innerWidth < 992 && e.currentTarget.closest('.has-dropdown')) {
      return;
    }
    closeAll();
  };

  return (
    <header className={`main-header${navOpen ? ' nav-open' : ''}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <div className="logo">
              <Link to="/" onClick={closeAll}>
                <img src="/assets/images/logo/logo.png" alt="San Jose Logo Design" />
              </Link>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="nav">
              <ul>
                <li>
                  <Link to="/" onClick={onNavLinkClick}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" onClick={onNavLinkClick}>
                    About Us
                  </Link>
                </li>
                <li className={`has-dropdown${servicesOpen ? ' is-open' : ''}`}>
                  <Link to="#" onClick={onServicesParentClick}>
                    Services
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/logo-design-services" onClick={closeAll}>
                        Logo Design
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/logo-brief" onClick={closeAll}>
                        Logo Brief
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/website-design-development-services" onClick={closeAll}>
                        Website
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/website-brief" onClick={closeAll}>
                        Website Brief
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/video-animation-services" onClick={closeAll}>
                        Animations
                      </Link>
                    </li>
                    <li>
                      <Link to="/mobile-app-development-services" onClick={closeAll}>
                        Mobile Apps
                      </Link>
                    </li>
                    <li>
                      <Link to="/digital-marketing-services" onClick={closeAll}>
                        Digital Marketing
                      </Link>
                    </li>
                    <li>
                      <Link to="/search-engine-optimization-services" onClick={closeAll}>
                        SEO
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/portfolio" onClick={onNavLinkClick}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={onNavLinkClick}>
                    Blogs
                  </Link>
                </li>
                {/* <li>
                  <Link to="/payment-info" onClick={onNavLinkClick}>
                    Payment Info
                  </Link>
                </li> */}
                <li>
                  <Link to="/contact-us" onClick={onNavLinkClick}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="contact-info">
              <div className="reviews">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="star">
                      <StarIcon />
                    </div>
                  ))}
                  
                </div>
                <p>Customer Satisfaction</p>
              </div>
              <Link to="/contact-us" className="btn" onClick={closeAll}>
                <span>Get a Quote</span>
              </Link>
            </div>
            <button
              className="header-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={navOpen}
              onClick={toggleNav}
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
