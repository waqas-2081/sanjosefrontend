import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const BLOGS_ENDPOINT = 'http://127.0.0.1:8000/api/v1/blogs';
const BLOGS_PER_PAGE = 12;

function getApiErrorMessage(result) {
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to load blog posts right now.';
}

export default function BlogsPage() {
  useDocumentTitle('Blogs | San Jose Logo Design');
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentPage = Number.parseInt(searchParams.get('page') || '1', 10) || 1;
  const search = (searchParams.get('search') || '').trim();

  useEffect(() => {
    let cancelled = false;

    async function loadBlogs() {
      setLoading(true);
      setError('');

      try {
        const qs = new URLSearchParams({
          page: String(currentPage),
          per_page: String(BLOGS_PER_PAGE),
        });
        if (search) qs.set('search', search);

        const response = await fetch(`${BLOGS_ENDPOINT}?${qs.toString()}`, {
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
          setBlogs(Array.isArray(result.data) ? result.data : []);
          setMeta(result.meta || { current_page: 1, last_page: 1, total: 0 });
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Unable to load blog posts right now.');
          setBlogs([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBlogs();
    return () => {
      cancelled = true;
    };
  }, [currentPage, search]);

  const setPage = (page) => {
    const next = Math.max(1, page);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(next));
    setSearchParams(nextParams);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get('search')?.toString().trim() || '';
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('search', value);
    } else {
      next.delete('search');
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  return (
    <>
<section className="inner-breadcrumb">
        <div className="container-fluid">

            <div className="inner-breadcrumb-mascot" aria-hidden="true">
                <div className="mascot-ring">
                    <img src="/assets/images/inner-banner-icon.png" alt="" />
                </div>
            </div>

            <div className="inner-breadcrumb-content">
                <span className="inner-breadcrumb-tag">Creative Design Studio</span>

                <h1>Blogs <span>Posts</span></h1>

               
                <div className="inner-breadcrumb-links">
                    <Link to="/">Home</Link>
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Blogs Posts</span>
                </div>
            </div>

            <div className="inner-breadcrumb-bottom">
                <p>
                    Copeland Home Services revenue increased by 200% since rebranding
                    <span></span>
                    <Link to="/blog">Read Article</Link>
                </p>
            </div>

        </div>
    </section>

    <section className="modern-blog-sec">
        <div className="container-fluid">
            <div className="modern-blog-grid">
                {loading && <p className="text-center text-muted">Loading blogs...</p>}
                {!loading && error && <p className="text-center text-danger">{error}</p>}

                {!loading && !error && blogs.map((blog) => (
                  <article key={blog.id} className="modern-blog-card">
                    <div className="image">
                      <img src={blog.thumbnail || '/assets/images/portfolio/logo/1.png'} alt={blog.title} />
                    </div>
                    <div className="content">
                      <span className="tag">{blog.is_featured ? 'Featured' : 'Article'}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.short_description}</p>
                      <Link to={`/blog/${blog.slug}`} className="read-link">
                        Read More <i className="fa-solid fa-arrow-right" />
                      </Link>
                    </div>
                  </article>
                ))}

                {!loading && !error && blogs.length === 0 && (
                  <p className="text-center text-muted">No blogs found.</p>
                )}
            </div>

            {!loading && !error && meta.last_page > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPage(meta.current_page - 1)}
                  disabled={meta.current_page <= 1}
                >
                  Previous
                </button>
                <span className="text-muted">
                  Page {meta.current_page} of {meta.last_page}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPage(meta.current_page + 1)}
                  disabled={meta.current_page >= meta.last_page}
                >
                  Next
                </button>
              </div>
            )}
        </div>
    </section>
    </>
  );
}
