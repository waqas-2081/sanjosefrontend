import React from 'react';

function Shimmer({ className = '', style }) {
  return <span className={`blog-skeleton__shimmer ${className}`.trim()} style={style} aria-hidden="true" />;
}

export function BlogListSkeleton({ count = 6 }) {
  return (
    <div className="modern-blog-grid" aria-busy="true" aria-label="Loading blog posts">
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="modern-blog-card blog-skeleton-card">
          <div className="image">
            <Shimmer className="blog-skeleton__image" />
          </div>
          <div className="content">
            <Shimmer className="blog-skeleton__title" />
            <Shimmer className="blog-skeleton__line" />
            <Shimmer className="blog-skeleton__line blog-skeleton__line--short" />
            <Shimmer className="blog-skeleton__link" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="blog-detail-page blog-detail-page--no-mobile-section-pad" aria-busy="true" aria-label="Loading article">
      <section className="inner-breadcrumb blog-detail-breadcrumb">
        <div className="container-fluid">
          <div className="inner-breadcrumb-mascot" aria-hidden="true">
            <div className="mascot-ring">
              <img src="/assets/images/inner-banner-icon.png" alt="" />
            </div>
          </div>

          <div className="inner-breadcrumb-content">
            <Shimmer className="blog-skeleton__tag" />
            <Shimmer className="blog-skeleton__detail-title" />
            <div className="inner-breadcrumb-links">
              <Shimmer className="blog-skeleton__crumb" />
            </div>
          </div>

          <div className="inner-breadcrumb-bottom">
            <Shimmer className="blog-skeleton__banner-line" />
          </div>
        </div>
      </section>

      <section className="blog-detail-hero-wrap" aria-hidden="true">
        <figure className="blog-detail-hero">
          <Shimmer className="blog-skeleton__hero" />
        </figure>
      </section>

      <section className="blog-detail-subhero" aria-hidden="true">
        <div className="container-fluid">
          <div className="blog-detail-subhero-inner">
            <div className="blog-detail-meta blog-skeleton__meta">
              <span className="blog-detail-meta-item">
                <Shimmer className="blog-skeleton__meta-icon" />
                <Shimmer className="blog-skeleton__meta-label" />
                <Shimmer className="blog-skeleton__meta-value" />
              </span>
              <span className="blog-detail-meta-divider" />
              <span className="blog-detail-meta-item">
                <Shimmer className="blog-skeleton__meta-icon" />
                <Shimmer className="blog-skeleton__meta-label" />
                <Shimmer className="blog-skeleton__meta-value" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <article className="blog-article blog-article--luxury">
        <div className="container-fluid">
          <div className="blog-article-inner">
            <section className="blog-article-section">
              <Shimmer className="blog-skeleton__paragraph" />
              <Shimmer className="blog-skeleton__paragraph" />
              <Shimmer className="blog-skeleton__paragraph blog-skeleton__paragraph--short" />
              <Shimmer className="blog-skeleton__paragraph" />
              <Shimmer className="blog-skeleton__paragraph blog-skeleton__paragraph--medium" />
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
