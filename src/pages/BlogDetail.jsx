import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
const BLOG_DETAIL_ENDPOINT_BASE = 'http://127.0.0.1:8000/api/v1/blogs';

/** Fixed line under breadcrumbs (not article `short_description`) */
const BLOG_DETAIL_HERO_TAGLINE =
  'Copeland Home Services revenue increased by 200% since rebranding';

function hasHtml(content) {
  return typeof content === 'string' && /<\/?[a-z][\s\S]*>/i.test(content);
}

/** Plain text / simple markdown-style lines: group `- ` / `* ` / `• ` / `1. ` into real lists */
function parsePlainBlogContent(text) {
  if (!text || typeof text !== 'string') return [];
  const lines = text.split(/\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      i += 1;
      continue;
    }

    const bulletMatch = trimmed.match(/^([-*•]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      const isOrdered = /^\d+\.$/.test(bulletMatch[1]);
      const items = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) break;
        const m = t.match(/^([-*•]|\d+\.)\s+(.+)$/);
        if (!m) break;
        const lineOrdered = /^\d+\.$/.test(m[1]);
        if (lineOrdered !== isOrdered) break;
        items.push(m[2]);
        i += 1;
      }
      const ListTag = isOrdered ? 'ol' : 'ul';
      blocks.push(
        <ListTag key={`list-${blocks.length}`} className="blog-content-plain-list">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    const paraLines = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t) break;
      if (/^([-*•]|\d+\.)\s+/.test(t)) break;
      paraLines.push(lines[i].trim());
      i += 1;
    }
    const para = paraLines.join(' ').trim();
    if (para) blocks.push(<p key={`p-${blocks.length}`}>{para}</p>);
  }

  return blocks;
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

  const head = useMemo(() => {
    if (!blog) {
      return {
        title: 'Blog Detail | San Jose Logo Design',
        description: '',
        keywords: '',
      };
    }
    const metaTitle = typeof blog.meta_title === 'string' ? blog.meta_title.trim() : '';
    const title = metaTitle || `${blog.title} | San Jose Logo Design`;
    const metaDesc = typeof blog.meta_description === 'string' ? blog.meta_description.trim() : '';
    const short = typeof blog.short_description === 'string' ? blog.short_description.trim() : '';
    const description = metaDesc || short || '';
    const keywords =
      typeof blog.meta_keywords === 'string' ? blog.meta_keywords.trim() : '';
    return { title, description, keywords };
  }, [blog]);

  useEffect(() => {
    let cancelled = false;

    async function loadBlog() {
      setLoading(true);
      setError('');
      setBlog(null);

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
      <Helmet>
        <title>{head.title}</title>
        {head.description ? <meta name="description" content={head.description} /> : null}
        {head.keywords ? <meta name="keywords" content={head.keywords} /> : null}
      </Helmet>

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
              {BLOG_DETAIL_HERO_TAGLINE}
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
                  <div className="blog-content-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <div className="blog-content-body">{parsePlainBlogContent(blog.content || '')}</div>
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
