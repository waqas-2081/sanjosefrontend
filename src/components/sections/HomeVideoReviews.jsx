import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { onScrollTopReplay } from '../../lib/scrollMotionReplay';
import { HOME_VIDEO_REVIEWS } from './homeVideoReviewsData';
import styles from './HomeVideoReviews.module.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function useSectionReplay(sectionRef, controls) {
  const inView = useInView(sectionRef, {
    amount: 0.18,
    margin: '0px 0px -6% 0px',
  });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    return onScrollTopReplay(() => {
      controls.set('hidden');
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < vh * 0.92 && rect.bottom > vh * 0.08) {
          controls.start('visible');
        }
      });
    });
  }, [controls, sectionRef]);
}

function Stars({ rating = 5 }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i
          key={i}
          className={`fa-solid fa-star${i < rating ? '' : ` ${styles.starDim}`}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isPlaying, onTogglePlay, videoRef, className = '' }) {
  return (
    <motion.article className={`${styles.card}${className ? ` ${className}` : ''}`} variants={rise}>
      <div className={styles.videoFrame}>
        <div className={styles.videoGlow} aria-hidden="true" />
        <button
          type="button"
          className={`${styles.videoBtn}${isPlaying ? ` ${styles.videoBtnPlaying}` : ''}`}
          onClick={() => onTogglePlay(review.id)}
          aria-label={isPlaying ? `Pause review by ${review.name}` : `Play review by ${review.name}`}
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={review.videoSrc}
            playsInline
            preload="metadata"
            loop
            muted={!isPlaying}
          />
          <span className={styles.playOverlay} aria-hidden="true">
            <span className={styles.playIcon}>
              {isPlaying ? (
                <i className="fa-solid fa-pause" />
              ) : (
                <i className="fa-solid fa-play" />
              )}
            </span>
          </span>
        </button>
      </div>

      <div className={styles.body}>
        <Stars rating={review.rating} />
        <p className={styles.quote}>{review.text}</p>
        <div className={styles.meta}>
          <p className={styles.name}>{review.name}</p>
          {review.role ? <p className={styles.role}>{review.role}</p> : null}
        </div>
      </div>
    </motion.article>
  );
}

export function HomeVideoReviews() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefs = useRef({});
  const controls = useAnimationControls();
  const [playingId, setPlayingId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useSectionReplay(sectionRef, controls);

  const setVideoRef = useCallback((id, node) => {
    if (node) videoRefs.current[id] = node;
    else delete videoRefs.current[id];
  }, []);

  const pauseAllVideos = useCallback(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;
      video.pause();
      video.muted = true;
    });
    setPlayingId(null);
  }, []);

  const onTogglePlay = useCallback(
    async (id) => {
      const entries = Object.entries(videoRefs.current);

      if (playingId === id) {
        const current = videoRefs.current[id];
        if (current) {
          current.pause();
          current.muted = true;
        }
        setPlayingId(null);
        return;
      }

      await Promise.all(
        entries.map(async ([key, video]) => {
          if (!video) return;
          if (key === id) {
            video.muted = false;
            video.currentTime = video.currentTime || 0;
            try {
              await video.play();
            } catch {
              video.muted = true;
              try {
                await video.play();
              } catch {
                /* ignore autoplay block */
              }
            }
          } else {
            video.pause();
            video.muted = true;
          }
        }),
      );
      setPlayingId(id);
    },
    [playingId],
  );

  const scrollToIndex = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, Math.min(HOME_VIDEO_REVIEWS.length - 1, index));
      const slide = track.children[next];
      if (!slide) return;
      pauseAllVideos();
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveIndex(next);
    },
    [pauseAllVideos],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const onScroll = () => {
      const slides = Array.from(track.children);
      if (!slides.length) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - trackCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex((prev) => {
        if (prev !== best) {
          queueMicrotask(pauseAllVideos);
        }
        return best;
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [pauseAllVideos]);

  useEffect(() => {
    const videos = videoRefs.current;
    return () => {
      Object.values(videos).forEach((video) => {
        if (video) {
          video.pause();
          video.muted = true;
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-no-motion="true"
      aria-labelledby="home-video-reviews-title"
    >
      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          variants={stagger}
          initial="hidden"
          animate={controls}
        >
          <motion.span className={styles.eyebrow} variants={rise}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Client Reviews
          </motion.span>
          <motion.h2 id="home-video-reviews-title" className={styles.title} variants={rise}>
            Real Voices. <span className={styles.titleAccent}>Real Results.</span>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={rise}>
            Watch how founders and brands describe working with San Jose Logo Design craft,
            clarity, and delivery that feels personal.
          </motion.p>
        </motion.header>

        <motion.div
          className={styles.sliderWrap}
          variants={stagger}
          initial="hidden"
          animate={controls}
        >
          <div
            ref={trackRef}
            className={styles.track}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client video reviews"
          >
            {HOME_VIDEO_REVIEWS.map((review) => (
              <div key={review.id} className={styles.slide}>
                <ReviewCard
                  review={review}
                  isPlaying={playingId === review.id}
                  onTogglePlay={onTogglePlay}
                  videoRef={(node) => setVideoRef(review.id, node)}
                />
              </div>
            ))}
          </div>

          <div className={styles.sliderControls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous review"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>

            <div className={styles.dots} role="tablist" aria-label="Review slides">
              {HOME_VIDEO_REVIEWS.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Go to review ${i + 1}`}
                  className={`${styles.dot}${activeIndex === i ? ` ${styles.dotActive}` : ''}`}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === HOME_VIDEO_REVIEWS.length - 1}
              aria-label="Next review"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
