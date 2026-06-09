import React, { useCallback, useEffect, useRef, useState } from 'react';

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
              <h1>
                Top Brand <span>Development</span> & SEO Company<span> San Jose</span>
              </h1>
              <p>
                As a leading branding and digital marketing agency in San Jose, we offer a wide range of services to
                help your business thrive. Our team of professionals specializes in social media marketing, brand
                marketing, and digital advertising. We develop customized strategies to enhance your online presence
                and effectively engage with your target audience.
              </p>
              <p>
                Partner with our top creative marketing agency in San Jose, and you'll have the support of a
                professional logo design agency that understands the intricacies of the digital landscape. Our dedicated
                team is committed to delivering outstanding results, and we take pride in being a trusted design
                company in San Jose. We combine our expertise, creativity, and brand strategy to provide you with a
                comprehensive solution that drives your business forward.
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
