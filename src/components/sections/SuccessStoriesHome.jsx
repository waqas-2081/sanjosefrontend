import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const AUToplay_MS = 1600;
const DRAG_COMMIT_PX = 42;

const REVIEWS = [
  {
    name: 'Raven Brevard',
    text:
      'The entire process for my New logo was fast and simple. The communication was great and all of my concerns were addressed professionally and in a timely fashion. I would recommend to anyone looking for a great listener for a logo design.',
  },
  {
    name: 'Christopher Lindsay',
    text:
      'Amazing service, Jared is amazing with letting me know everything included in my orders and following along the way, will definitely be ordering more from him and Robert designed my website. I was expecting something short and basic and he far exceeded that. Made all changes requested and responded quick with answers and changes, they have both been great and made my business an amazing site I will have forever.',
  },
  {
    name: 'Crystal Thomas',
    text:
      '10/10 service!! I received multiple options for my bakery logo and it was honestly hard to choose between them all. They were very attentive, and any time I gave a suggestion, they listened and adjusted until the logo was exactly to my liking. I would most definitely recommend them to anyone.',
  },
  {
    name: 'Princess Beasley',
    text:
      'Truly an awesome company! They work with you and create amazing product for your business! I truly recommend going through them. You will not be disappointed.',
  },
  {
    name: 'Cynthia Fuller',
    text:
      'Quick and easy to work with, the designs came out great. I had a few to choose from but they all were beautiful. Reasonable price.',
  },
  {
    name: 'Zachary Pippens',
    text:
      'Working with Jared was a great experience. He was patient and did not rush me, even when I was considering other options. The services they offered were excellent, and I am happy with my new logo and business cards. I will definitely work with them again for my website needs.',
  },
];

function slidesPerViewFromWidth(w) {
  if (w < 576) return 1;
  if (w < 992) return 2;
  return 4;
}

export function SuccessStoriesHome() {
  const viewportRef = useRef(null);
  const dragActiveRef = useRef(false);
  const dragStartXRef = useRef(0);
  const hoverRef = useRef(false);

  const [viewportW, setViewportW] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(() =>
    typeof window !== 'undefined' ? slidesPerViewFromWidth(window.innerWidth) : 4
  );
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const gapPx = 16;

  useEffect(() => {
    const onResize = () => setSlidesPerView(slidesPerViewFromWidth(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    setViewportW(el.getBoundingClientRect().width);
  }, [slidesPerView]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => {
      setViewportW(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxSlideIndex = useMemo(
    () => Math.max(0, REVIEWS.length - slidesPerView),
    [slidesPerView]
  );

  useEffect(() => {
    setSlideIndex((i) => Math.min(i, maxSlideIndex));
  }, [maxSlideIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion || paused || maxSlideIndex <= 0) return undefined;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i >= maxSlideIndex ? 0 : i + 1));
    }, AUToplay_MS);
    return () => window.clearInterval(id);
  }, [paused, maxSlideIndex]);

  const slideW = useMemo(() => {
    if (viewportW <= 0) return 0;
    const inner = viewportW - gapPx * (slidesPerView - 1);
    return inner > 0 ? inner / slidesPerView : 0;
  }, [viewportW, slidesPerView, gapPx]);

  const stepPx = slideW + gapPx;
  const baseOffsetPx = slideIndex * stepPx;
  const transformPx = dragDelta - baseOffsetPx;

  const endDrag = (clientX, pointerId) => {
    if (!dragActiveRef.current) return;
    dragActiveRef.current = false;
    setIsDragging(false);

    const delta = clientX - dragStartXRef.current;
    setDragDelta(0);

    try {
      viewportRef.current?.releasePointerCapture(pointerId);
    } catch {
      /* ignore */
    }

    if (maxSlideIndex <= 0 || slideW <= 0) {
      if (!hoverRef.current) setPaused(false);
      return;
    }

    if (delta < -DRAG_COMMIT_PX) {
      setSlideIndex((i) => Math.min(maxSlideIndex, i + 1));
    } else if (delta > DRAG_COMMIT_PX) {
      setSlideIndex((i) => Math.max(0, i - 1));
    }

    if (!hoverRef.current) setPaused(false);
  };

  const onPointerDown = (e) => {
    if (maxSlideIndex <= 0 || slideW <= 0) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    dragActiveRef.current = true;
    dragStartXRef.current = e.clientX;
    setDragDelta(0);
    setIsDragging(true);
    setPaused(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e) => {
    if (!dragActiveRef.current) return;
    setDragDelta(e.clientX - dragStartXRef.current);
  };

  const onPointerUp = (e) => {
    endDrag(e.clientX, e.pointerId);
  };

  const onPointerCancel = (e) => {
    endDrag(e.clientX, e.pointerId);
  };

  return (
    <section className="stories-sec stories-sec2 success-stories-react">
      <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
      <div className="container-fluid px-3 px-md-4">
        <div className="section-heading text-center">
          <img src="/assets/images/icon/your-industry-peers.webp" alt="" className="success-stories-heading-img" />
          <h2>SUCCESS STORIES</h2>
          <p>
            Mastering the art of design and marketing services, SanJose Logo Design is a digital agency providing a
            vast range of other services as well.
          </p>
        </div>

        <div className="success-stories-viewport-outer">
          <div
            ref={viewportRef}
            className={`success-stories-viewport${isDragging ? ' success-stories-viewport--dragging' : ''}`}
            onMouseEnter={() => {
              hoverRef.current = true;
              setPaused(true);
            }}
            onMouseLeave={() => {
              hoverRef.current = false;
              if (!dragActiveRef.current) setPaused(false);
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <div
              className="success-stories-track"
              style={{
                gap: `${gapPx}px`,
                transform: slideW > 0 ? `translateX(${transformPx}px)` : undefined,
                transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {REVIEWS.map((review) => (
                <article
                  key={review.name}
                  className="story-card success-stories-card"
                  style={{
                    flex: `0 0 ${slideW > 0 ? `${slideW}px` : `${100 / slidesPerView}%`}`,
                    minWidth: slideW > 0 ? `${slideW}px` : undefined,
                  }}
                >
                  <div className="story-card-header">
                    <div className="meta">
                      <h5>{review.name}</h5>
                    </div>
                  </div>
                  <div className="story-card-body">
                    <p
                      className="success-stories-review-text"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      {review.text}
                    </p>
                  </div>
                  <div className="story-card-footer success-stories-footer">
                    <div className="rating">
                      <ul className="stars">
                        <li><i className="fa-solid fa-star" /></li>
                        <li><i className="fa-solid fa-star" /></li>
                        <li><i className="fa-solid fa-star" /></li>
                        <li><i className="fa-solid fa-star" /></li>
                        <li><i className="fa-solid fa-star" /></li>
                      </ul>
                      <span className="score">5/5</span>
                    </div>
                    <img src="/assets/images/badge.png" alt="Google Reviews" className="success-stories-google-badge" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .success-stories-react {
          overflow-x: clip;
        }

        .success-stories-react .success-stories-heading-img {
          width: min(290px, 82vw);
          height: auto;
        }

        .success-stories-viewport-outer {
          width: 100%;
          max-width: 100%;
        }

        .success-stories-viewport {
          overflow: hidden;
          width: 100%;
          touch-action: pan-y pinch-zoom;
          cursor: grab;
        }

        .success-stories-viewport.success-stories-viewport--dragging {
          cursor: grabbing;
          user-select: none;
        }

        .success-stories-viewport.success-stories-viewport--dragging * {
          cursor: grabbing !important;
        }

        .success-stories-track {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          width: max-content;
          min-height: 1px;
        }

        .success-stories-card.story-card {
          box-sizing: border-box;
          height: auto;
          align-self: flex-start;
          display: flex;
          flex-direction: column;
          margin: 0 !important;
        }

        .success-stories-card .story-card-body {
          flex: 0 0 auto;
          overflow: hidden;
          min-height: 0;
        }

        /* Desktop-style scroll band + orange scrollbar */
        .success-stories-review-text {
          height: 90px !important;
          margin-bottom: 16px !important;
          overflow-y: auto !important;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          word-break: break-word;
          overflow-wrap: anywhere;
          scrollbar-width: thin;
          scrollbar-color: #ff5e2c #f1f1f1;
        }

        .success-stories-review-text::-webkit-scrollbar {
          width: 5px;
        }

        .success-stories-review-text::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .success-stories-review-text::-webkit-scrollbar-thumb {
          background: #ff5e2c;
          border-radius: 4px;
        }

        .success-stories-review-text::-webkit-scrollbar-thumb:hover {
          background: #e85528;
        }

        .success-stories-footer.story-card-footer {
          display: flex !important;
          flex-direction: row !important;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
          margin-top: 0;
        }

        .success-stories-footer .rating {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1 1 auto;
          min-width: 0;
        }

        .success-stories-footer .stars {
          display: flex;
          flex-wrap: nowrap;
          gap: 3px;
          flex-shrink: 0;
          padding-left: 0;
          margin: 0;
        }

        .success-stories-footer .score {
          flex-shrink: 0;
        }

        .success-stories-google-badge {
          flex: 0 0 auto;
          margin-left: auto;
          width: auto !important;
          max-width: 92px;
          max-height: 40px;
          height: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 767.98px) {
          .success-stories-react .section-heading h2 {
            font-size: clamp(26px, 9vw, 38px) !important;
            line-height: 1.1;
          }

          .success-stories-react .section-heading p {
            font-size: 14px;
            line-height: 1.55;
          }

          .success-stories-card.story-card {
            padding: 18px 14px !important;
          }

          .success-stories-footer .stars i {
            font-size: 12px;
          }

          .success-stories-google-badge {
            max-width: min(88px, 28vw);
            max-height: 36px;
          }
        }
      `}</style>
    </section>
  );
}
