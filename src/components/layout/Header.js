import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GOOGLE_REVIEWS_URL = 'https://tinyurl.com/3f2txtxc';

const GoogleLogoIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const GoldStarIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FFB400"
      d="M12 2.5l2.95 6.5 7.05.6-5.4 4.7 1.7 6.9L12 17.3 5.7 21.2l1.7-6.9-5.4-4.7 7.05-.6L12 2.5z"
    />
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
              <a
                className="google-rating-badge"
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Rating 5.0 out of 5 from 32 reviews. Opens in a new tab."
              >
                <span className="google-rating-badge__icon">
                  <GoogleLogoIcon />
                </span>
                <span className="google-rating-badge__copy">
                  <span className="google-rating-badge__title">
                    Google Rating<span className="google-rating-badge__count">(32)</span>
                  </span>
                  <span className="google-rating-badge__score">
                    <span className="google-rating-badge__score-num">5.0</span>
                    <span className="google-rating-badge__stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <GoldStarIcon key={i} />
                      ))}
                    </span>
                  </span>
                </span>
              </a>
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
