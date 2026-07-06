import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
function CompareSlider() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const pendingPercentRef = useRef(50);
  const [percent, setPercent] = useState(50);

  const schedulePercent = useCallback((nextPercent) => {
    pendingPercentRef.current = Math.min(100, Math.max(0, nextPercent));
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setPercent(pendingPercentRef.current);
    });
  }, []);

  const updateFromClientX = useCallback(
    (clientX) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = Math.min(rect.width, Math.max(0, clientX - rect.left));
      schedulePercent((x / rect.width) * 100);
    },
    [schedulePercent]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const onMove = (e) => updateFromClientX(e.clientX);
    const onTouch = (e) => {
      const touch = e.touches[0];
      if (touch) updateFromClientX(touch.clientX);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('touchstart', onTouch);
      el.removeEventListener('touchmove', onTouch);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="image compare-container"
      data-compare-slider="react"
      aria-label="Before and after design comparison"
    >
      <img src="/assets/images/before-after/image2.png" alt="Before image" className="before-img" />
      <img
        src="/assets/images/before-after/image1.png"
        alt="After image"
        className="after-img"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      />
      <div className="compare-handle" style={{ left: `${percent}%` }} aria-hidden="true" />
    </div>
  );
}

export function Transforming() {
  return (
    <section className="transforming-sec" data-no-motion="true">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7">
            <div className="content">
              <h2>
              TOP BRAND <span>DEVELOPMENT</span> & SEO COMPANY<span> SAN JOSE</span>
              </h2>
              <p>
                Most businesses don&apos;t fail because the product is wrong. They fail because nobody remembers them long enough to buy.
              </p>
              <p>
                That&apos;s the gap we close. As a branding agency in San Jose, we build the identity, the logo, the voice, the visual language that makes a business impossible to forget. Then, as a digital marketing agency in San Jose, we make sure that identity actually gets seen: through our{' '}
                <Link to="/search-engine-optimization-services">SEO services</Link> that puts you in front of people already searching for what you do, and advertising services that turn attention into action.
              </p>
              <p>
                We&apos;ve watched too many companies invest in one half of this equation. A beautiful brand nobody finds. Or heavy ad spend propping up an identity that doesn&apos;t stick. San Jose Logo Design exists for the businesses who want both, a brand worth remembering, and SEO and marketing strategy that gets it in front of the right people, consistently.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <CompareSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
