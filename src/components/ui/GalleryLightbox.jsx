import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Full-screen media lightbox (portal). Reuses .solution-lightbox* styles.
 * @param {{ items: Array<{ kind: 'image'|'video', src: string, alt?: string }>, index: number } | null} lightbox
 * @param {React.Dispatch<React.SetStateAction<typeof lightbox>>} setLightbox
 */
export function GalleryLightboxPortal({ lightbox, setLightbox, onClose }) {
  const closeLightbox = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightbox((lb) => {
          if (!lb || lb.items.length < 2) return lb;
          return {
            ...lb,
            index: (lb.index - 1 + lb.items.length) % lb.items.length,
          };
        });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightbox((lb) => {
          if (!lb || lb.items.length < 2) return lb;
          return {
            ...lb,
            index: (lb.index + 1) % lb.items.length,
          };
        });
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, closeLightbox, setLightbox]);

  const goPrev = useCallback(
    (e) => {
      e.stopPropagation();
      setLightbox((lb) => {
        if (!lb || lb.items.length < 2) return lb;
        return {
          ...lb,
          index: (lb.index - 1 + lb.items.length) % lb.items.length,
        };
      });
    },
    [setLightbox]
  );

  const goNext = useCallback(
    (e) => {
      e.stopPropagation();
      setLightbox((lb) => {
        if (!lb || lb.items.length < 2) return lb;
        return {
          ...lb,
          index: (lb.index + 1) % lb.items.length,
        };
      });
    },
    [setLightbox]
  );

  const current = lightbox?.items?.[lightbox.index];
  const showNav = (lightbox?.items?.length ?? 0) > 1;

  if (!lightbox || !current) return null;

  return createPortal(
    <div className="solution-lightbox" role="dialog" aria-modal="true" aria-label="Media gallery">
      <button
        type="button"
        className="solution-lightbox-backdrop"
        aria-label="Close gallery"
        onClick={closeLightbox}
      />
      <button type="button" className="solution-lightbox-close" aria-label="Close" onClick={closeLightbox}>
        ×
      </button>
      {showNav && (
        <button
          type="button"
          className="solution-lightbox-nav solution-lightbox-nav--prev"
          aria-label="Previous"
          onClick={goPrev}
        >
          <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        </button>
      )}
      <div className="solution-lightbox-stage">
        {current.kind === 'video' ? (
          <video
            key={`${current.src}-${lightbox.index}`}
            className="solution-lightbox-video"
            src={current.src}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            key={`${current.src}-${lightbox.index}`}
            src={current.src}
            alt={current.alt || ''}
          />
        )}
      </div>
      {showNav && (
        <button
          type="button"
          className="solution-lightbox-nav solution-lightbox-nav--next"
          aria-label="Next"
          onClick={goNext}
        >
          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body
  );
}
