import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
const BLOG_DETAIL_ENDPOINT_BASE = 'http://127.0.0.1:8000/api/v1/blogs';

function hasHtml(content) {
  return typeof content === 'string' && /<\/?[a-z][\s\S]*>/i.test(content);
}

function getApiErrorMessage(result) {
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to load this article.';
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const title = useMemo(
    () => (blog?.title ? `${blog.title} | San Jose Logo Design` : 'Blog Detail | San Jose Logo Design'),
    [blog?.title]
  );
  useDocumentTitle(title);

  useEffect(() => {
    let cancelled = false;

    async function loadBlog() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${BLOG_DETAIL_ENDPOINT_BASE}/${encodeURIComponent(slug)}`, {
          headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');
        const result = isJson ? await response.json().catch(() => null) : null;

        if (!response.ok || !result || result.success !== true) {
          throw new Error(getApiErrorMessage(result));
        }

        if (!cancelled) {
          setBlog(result.data || null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Unable to load this article.');
          setBlog(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (slug) loadBlog();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const heroSrc = blog?.thumbnail || '/assets/images/portfolio/logo/1.png';

  return (
    <div className="blog-detail-page blog-detail-page--no-mobile-section-pad">
      <section className="inner-breadcrumb blog-detail-breadcrumb">
        <div className="container-fluid">
          <div className="inner-breadcrumb-mascot" aria-hidden="true">
            <div className="mascot-ring">
              <img src="/assets/images/inner-banner-icon.png" alt="" />
            </div>
          </div>

          <div className="inner-breadcrumb-content">
            <span className="inner-breadcrumb-tag">{blog?.is_featured ? 'Featured' : 'Blog Article'}</span>
            <h1>
              {blog?.title || 'Blog'}
            </h1>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <Link to="/blog">Blogs</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Article</span>
            </div>
          </div>

          <div className="inner-breadcrumb-bottom">
            <p>
              {blog?.short_description || 'Read the full article and insights.'}
              <span />
              <Link to="/contact-us">Talk to our team</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="blog-detail-hero-wrap" aria-label="Article hero">
        <div className="">
          <figure className="blog-detail-hero">
            <img src={heroSrc} alt={blog?.title || 'Blog article'} />
          </figure>
        </div>
      </section>

      <section className="blog-detail-subhero" aria-label="Article meta">
        <div className="container-fluid">
          <div className="blog-detail-subhero-inner">
            <div className="blog-detail-meta">
              <span className="blog-detail-meta-item">
                <i className="fa-solid fa-user" aria-hidden="true" />
                <span className="blog-detail-meta-label">Author</span>
                <span className="blog-detail-meta-value">{blog?.author_name || 'San Jose Team'}</span>
              </span>
              <span className="blog-detail-meta-divider" aria-hidden="true" />
              <span className="blog-detail-meta-item">
                <i className="fa-solid fa-calendar-days" aria-hidden="true" />
                <span className="blog-detail-meta-label">Published</span>
                <span className="blog-detail-meta-value">{blog?.formatted_date || '-'}</span>
              </span>
            </div>
          
          </div>
        </div>
      </section>

      <article className="blog-article blog-article--luxury">
        <div className="container-fluid">
          <div className="blog-article-inner">
            {loading && <p className="text-muted">Loading article...</p>}
            {!loading && error && <p className="text-danger">{error}</p>}
            {!loading && !error && blog && (
              <section className="blog-article-section" id="content">
                {hasHtml(blog.content) ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  blog.content
                    ?.split('\n')
                    .filter(Boolean)
                    .map((line, i) => <p key={i}>{line}</p>)
                )}
              </section>
            )}

         
            <div className="blog-article-footer-nav">
              <Link to="/blog" className="blog-back-link">
                <i className="fa-solid fa-arrow-left" /> Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
