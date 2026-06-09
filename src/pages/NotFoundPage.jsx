import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('404 Not Found | San Jose Logo Design');

  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              style={{
                background: 'linear-gradient(135deg, #101827 0%, #17233a 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '42px 28px',
                color: '#fff',
                textAlign: 'center',
                boxShadow: '0 24px 55px rgba(0, 0, 0, 0.28)',
              }}
            >
              <p style={{ color: '#f59e0b', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                ERROR 404
              </p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)', marginBottom: '12px' }}>Page Not Found</h1>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', marginBottom: '1.4rem' }}>
                The page you are looking for does not exist or may have been moved.
              </p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <Link
                  to="/"
                  className="px-4"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '46px',
                    borderRadius: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                    color: '#ffffff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.35)',
                  }}
                >
                  Back to Home
                </Link>
                <Link
                  to="/contact-us"
                  className="px-4"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '46px',
                    borderRadius: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    background: 'transparent',
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
