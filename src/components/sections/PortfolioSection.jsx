import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { refreshPortfolioTabSwipers } from '../../lib/legacyWidgets';
import { GalleryLightboxPortal } from '../ui/GalleryLightbox';
import { SuccessStoriesHome } from './SuccessStoriesHome';
const PORTFOLIOS_ENDPOINT = 'https://admin.sanjoselogodesign.com/api/v1/portfolios';
const PORTFOLIO_CATEGORIES_ENDPOINT = 'https://admin.sanjoselogodesign.com/api/v1/portfolio-categories';

function getApiErrorMessage(result) {
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to load portfolio right now.';
}

const CATEGORY_TO_TAB_ID = {
  Logo: 'tab-logo',
  Website: 'tab-website',
  'Mobile App': 'tab-mobile-app',
  Print: 'tab-print',
  Animation: 'tab-animation',
  'Digital Marketing': 'tab-digital-marketing',
};

/** Categories still returned by the API but hidden from the tab bar for now. */
const HIDDEN_PORTFOLIO_TAB_CATEGORIES = new Set(['Animation']);

function tabIdForCategory(category) {
  return CATEGORY_TO_TAB_ID[category] ?? 'tab-logo';
}

function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function mediaFromPortfolioCard(card) {
  const img = card.querySelector('img');
  if (img) {
    return {
      kind: 'image',
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || '',
    };
  }
  const video = card.querySelector('video');
  if (video) {
    return {
      kind: 'video',
      src: video.getAttribute('src') || '',
      alt: 'Animation preview',
    };
  }
  return null;
}

function PortfolioCategoryTab({ categoryName, tabId, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`portfolio-tab-btn${isActive ? ' active' : ''}`}
      data-tab-target={`#${tabId}`}
      onClick={() => onSelect(tabId)}
    >
      {categoryName}
    </button>
  );
}

export function PortfolioSection() {
  const [lightbox, setLightbox] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTabId, setActiveTabId] = useState('tab-logo');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const [catRes, listRes] = await Promise.all([
          fetch(PORTFOLIO_CATEGORIES_ENDPOINT, {
            headers: {
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          }),
          fetch(PORTFOLIOS_ENDPOINT, {
            headers: {
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          }),
        ]);

        const catContentType = catRes.headers.get('content-type') || '';
        const listContentType = listRes.headers.get('content-type') || '';
        const catJson = catContentType.includes('application/json')
          ? await catRes.json().catch(() => null)
          : null;
        const listJson = listContentType.includes('application/json')
          ? await listRes.json().catch(() => null)
          : null;

        if (!catRes.ok || !catJson || catJson.success !== true) {
          throw new Error(getApiErrorMessage(catJson));
        }
        if (!listRes.ok || !listJson || listJson.success !== true) {
          throw new Error(getApiErrorMessage(listJson));
        }

        if (cancelled) return;
        const cats = Array.isArray(catJson.data) ? catJson.data : [];
        const list = Array.isArray(listJson.data) ? listJson.data : [];
        setCategories(cats);
        setItems(list);
        const visibleCats = cats.filter((c) => !HIDDEN_PORTFOLIO_TAB_CATEGORIES.has(c));
        if (visibleCats.length > 0) {
          setActiveTabId(tabIdForCategory(visibleCats[0]));
        } else if (cats.length > 0) {
          setActiveTabId(tabIdForCategory(cats[0]));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Unable to load portfolio right now.');
          setCategories([]);
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleCategories = useMemo(
    () => categories.filter((c) => !HIDDEN_PORTFOLIO_TAB_CATEGORIES.has(c)),
    [categories]
  );

  const byCategory = useMemo(() => {
    const map = {};
    for (const item of items) {
      const cat = item.category;
      if (!cat) continue;
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    }
    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    }
    return map;
  }, [items]);

  useEffect(() => {
    if (loading || error) return;
    const t = window.setTimeout(() => {
      refreshPortfolioTabSwipers();
    }, 80);
    return () => window.clearTimeout(t);
  }, [loading, error, visibleCategories.length, items.length]);

  useEffect(() => {
    if (loading || error) return;
    const id = window.requestAnimationFrame(() => {
      document.querySelectorAll('.portfolio-tab-swiper.swiper-initialized').forEach((el) => {
        el.swiper?.update?.();
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [activeTabId, loading, error]);

  const openFromCard = useCallback((e) => {
    const card = e.currentTarget;
    const grid = card.closest('.portfolio-grid, .portfolio-tab-swiper');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.portfolio-card')];
    const pairs = cards.map((c) => [c, mediaFromPortfolioCard(c)]).filter(([, m]) => m);
    const itemsForLb = pairs.map(([, m]) => m);
    const pairIndex = pairs.findIndex(([c]) => c === card);
    if (pairIndex < 0 || itemsForLb.length === 0) return;
    setLightbox({ items: itemsForLb, index: pairIndex });
  }, []);

  const onCardKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromCard(e);
      }
    },
    [openFromCard]
  );

  return (
    <>
      <section className="portfolio-sec">
        <div className="container-fluid">
          <div className="portfolio-header text-center">
            <h2>
            WE'VE DONE A LOT OF WORK, LET'S EXPLORE 
              <br />
              SOME OF OUR BEST PROJECTS
            </h2>
            <div className="stories-bottom text-center">
            <p>What makes one business unforgettable while another fades into the background? Take a look at our work and see how San Jose Logo Design has made that difference for real clients.</p>
            </div>
            {loading && <p className="text-muted mb-0">Loading portfolio…</p>}

            {!loading && error && (
              <div className="alert alert-danger d-inline-block mt-3 mb-0" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && visibleCategories.length > 0 && (
              <div className="portfolio-tabs-nav">
                {visibleCategories.map((category) => {
                  const tabId = tabIdForCategory(category);
                  return (
                    <PortfolioCategoryTab
                      key={category}
                      categoryName={category}
                      tabId={tabId}
                      isActive={activeTabId === tabId}
                      onSelect={setActiveTabId}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {!loading && !error && (
            <div className="portfolio-tabs">
              {visibleCategories.map((category) => {
                const tabId = tabIdForCategory(category);
                const list = (byCategory[category] || []).filter((it) => it.image);
                const isActive = activeTabId === tabId;
                return (
                  <div
                    key={category}
                    className={`portfolio-tab${isActive ? ' active' : ''}`}
                    id={tabId}
                  >
                    {list.length === 0 ? (
                      <div className="col-12 text-center text-muted py-4">
                        No portfolio items in this category yet.
                      </div>
                    ) : (
                      <div className="portfolio-tab-swiper portfolio-grid swiper">
                        <div className="swiper-wrapper">
                          {list.map((item) => (
                            <div className="swiper-slide" key={item.id}>
                              <div
                                className="portfolio-card portfolio-card--gallery"
                                role="button"
                                tabIndex={0}
                                aria-label="Open in gallery"
                                onClick={openFromCard}
                                onKeyDown={onCardKeyDown}
                              >
                                {isVideoUrl(item.image) ? (
                                  <video src={item.image} loop muted autoPlay playsInline />
                                ) : (
                                  <img
                                    src={item.image}
                                    alt={`${category} portfolio project`}
                                  />
                                )}
                                <div className="content">
                                  <h3>Services</h3>
                                  <h1>{category}</h1>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <GalleryLightboxPortal
        lightbox={lightbox}
        setLightbox={setLightbox}
        onClose={() => setLightbox(null)}
      />
      {/* <SuccessStoriesHome /> */}
    </>
  );
}
