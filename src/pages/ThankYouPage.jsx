import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ThankYouPage() {
  useDocumentTitle('Thank You | San Jose Logo Design');

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
              <div
                style={{
                  width: '78px',
                  height: '78px',
                  borderRadius: '999px',
                  margin: '0 auto 18px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '30px',
                  fontWeight: 700,
                }}
              >
                ✓
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)', marginBottom: '12px' }}>
                Thank You! We Received Your Submission
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                Our team will review your details and get back to you shortly.
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
                  Go to Home
                </Link>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
