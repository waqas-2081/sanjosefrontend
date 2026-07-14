import React, { useCallback, useMemo, useState } from 'react';
import { usePortfolioByCategory } from '../../hooks/usePortfolioByCategory';
import { isVideoUrl } from '../../lib/portfolioApi';
import { GalleryLightboxPortal } from './GalleryLightbox';

function normalizeFallbackImage(img, cardTitle, index) {
  if (typeof img === 'string') {
    return {
      id: `fallback-${index}`,
      kind: isVideoUrl(img) ? 'video' : 'image',
      src: img,
      alt: cardTitle,
    };
  }
  return {
    id: img.id ?? `fallback-${index}`,
    kind: img.kind ?? (isVideoUrl(img.src) ? 'video' : 'image'),
    src: img.src,
    alt: img.alt || cardTitle,
  };
}

export function PortfolioGalleryGrid({
  category,
  cardTitle,
  tabId = 'tab-portfolio',
  fallbackImages = [],
}) {
  const { items, loading, error } = usePortfolioByCategory(category);
  const [lightbox, setLightbox] = useState(null);

  const galleryItems = useMemo(() => {
    const fromApi = items.map((item) => ({
      id: String(item.id),
      kind: isVideoUrl(item.image) ? 'video' : 'image',
      src: item.image,
      alt: `${cardTitle} project`,
    }));

    if (fromApi.length > 0) return fromApi;

    return fallbackImages.map((img, index) => normalizeFallbackImage(img, cardTitle, index));
  }, [items, fallbackImages, cardTitle]);

  const openGallery = useCallback(
    (index) => {
      setLightbox({ items: galleryItems, index });
    },
    [galleryItems]
  );

  const onCardKeyDown = useCallback(
    (e, index) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGallery(index);
      }
    },
    [openGallery]
  );

  return (
    <>
      <section className="portfolio-sec inner-portfolio-sec">
        <div className="container-fluid">
          <div className="portfolio-tabs mt-0">
            <div className={`portfolio-tab active`} id={tabId}>
              {loading && (
                <p className="text-muted text-center py-4 mb-0">Loading portfolio…</p>
              )}

              {!loading && error && galleryItems.length === 0 && (
                <div className="alert alert-danger d-inline-block mt-2 mb-3" role="alert">
                  {error}
                </div>
              )}

              {!loading && !error && galleryItems.length === 0 && (
                <p className="text-muted text-center py-4 mb-0">
                  No portfolio items in this category yet.
                </p>
              )}

              {!loading && galleryItems.length > 0 && (
                <div className="portfolio-grid row g-4">
                  {galleryItems.map((item, index) => (
                    <div key={item.id} className="col-lg-4">
                      <div
                        className="portfolio-card portfolio-card--gallery"
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${item.alt} in gallery`}
                        onClick={() => openGallery(index)}
                        onKeyDown={(e) => onCardKeyDown(e, index)}
                      >
                        {item.kind === 'video' ? (
                          <video src={item.src} loop muted autoPlay playsInline preload="metadata" />
                        ) : (
                          <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                        )}
                        <div className="content">
                          <h3>Services</h3>
                          <h1>{cardTitle}</h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <GalleryLightboxPortal
        lightbox={lightbox}
        setLightbox={setLightbox}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}
