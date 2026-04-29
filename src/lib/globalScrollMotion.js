const TARGET_SELECTOR = [
  'section',
  '.portfolio-sec',
  '.logo-wizard-section',
  '.cta-projects',
].join(', ');

const ITEM_SELECTOR = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'small',
  'strong',
  'li',
  'button',
  '.btn',
  '.nav-btn',
  '.cta-btn',
  '.submit-btn',
  '.field-group',
  '.content',
  '.hero-text',
  '.hero-title',
  '.hero-sub',
].join(', ');

const CARD_SELECTOR = [
  '.card',
  '.portfolio-card',
  '.service-card',
  '.feature-card',
  '.solution-card',
  '.done-card',
  '[class*="card"]',
].join(', ');

const MEDIA_SELECTOR = [
  'img',
  'video',
  '.main-banner-image',
  '.bg-image',
  '.banner-images',
  '[class*="image"]',
  '[class*="media"]',
].join(', ');

const ICON_SELECTOR = [
  'i',
  'svg',
  '[class*="icon"]',
  '.fa-solid',
  '.fa-brands',
  '.fa-regular',
].join(', ');

const BUTTON_SELECTOR = [
  'button',
  'a.btn',
  '.btn',
  '.nav-btn',
  '.cta-btn',
  '.submit-btn',
  '.cta-projects__button',
].join(', ');

function isElementVisibleForInitialState(rect, viewportHeight) {
  return rect.top < viewportHeight * 0.84 && rect.bottom > viewportHeight * 0.12;
}

export function initGlobalScrollMotion(root = document) {
  if (typeof window === 'undefined' || !root?.querySelectorAll) return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const targets = [...root.querySelectorAll(TARGET_SELECTOR)];
  if (targets.length === 0) return () => {};

  const seen = new Set();
  const uniqueTargets = targets.filter((el) => {
    if (el.classList?.contains('main-banner')) return false;
    if (seen.has(el)) return false;
    seen.add(el);
    return true;
  });

  uniqueTargets.forEach((el, index) => {
    el.classList.add('section-motion-target');
    el.style.setProperty('--section-motion-delay', `${Math.min(index * 80, 360)}ms`);

    const motionItems = [...el.querySelectorAll(ITEM_SELECTOR)].filter(
      (item) => item.closest('.section-motion-target') === el
    );

    motionItems.forEach((item, itemIndex) => {
      item.classList.add('section-motion-item');
      item.style.setProperty('--item-motion-delay', `${Math.min(itemIndex * 95, 760)}ms`);
    });

    const cards = [...el.querySelectorAll(CARD_SELECTOR)].filter(
      (item) => item.closest('.section-motion-target') === el
    );
    cards.forEach((card, cardIndex) => {
      card.classList.add('section-motion-card');
      card.style.setProperty('--card-motion-delay', `${Math.min(cardIndex * 110, 840)}ms`);
    });

    const media = [...el.querySelectorAll(MEDIA_SELECTOR)].filter((item) => {
      if (item.closest('.main-banner')) return false;
      return item.closest('.section-motion-target') === el;
    });
    media.forEach((node, mediaIndex) => {
      node.classList.add('section-motion-media');
      node.style.setProperty('--media-motion-delay', `${Math.min(mediaIndex * 120, 900)}ms`);
    });

    const icons = [...el.querySelectorAll(ICON_SELECTOR)].filter(
      (item) => item.closest('.section-motion-target') === el
    );
    icons.forEach((icon) => {
      icon.classList.add('section-motion-icon');
    });

    const buttons = [...el.querySelectorAll(BUTTON_SELECTOR)].filter(
      (item) => item.closest('.section-motion-target') === el
    );
    buttons.forEach((button) => {
      button.classList.add('section-motion-button');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 900;
  uniqueTargets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (isElementVisibleForInitialState(rect, viewportHeight)) {
      el.classList.add('is-revealed');
    }
    observer.observe(el);
  });

  return () => {
    observer.disconnect();
    uniqueTargets.forEach((el) => {
      el.classList.remove('section-motion-target', 'is-revealed');
      el.style.removeProperty('--section-motion-delay');

      const motionItems = el.querySelectorAll('.section-motion-item');
      motionItems.forEach((item) => {
        item.classList.remove('section-motion-item');
        item.style.removeProperty('--item-motion-delay');
      });

      const cards = el.querySelectorAll('.section-motion-card');
      cards.forEach((card) => {
        card.classList.remove('section-motion-card');
        card.style.removeProperty('--card-motion-delay');
      });

      const media = el.querySelectorAll('.section-motion-media');
      media.forEach((node) => {
        node.classList.remove('section-motion-media');
        node.style.removeProperty('--media-motion-delay');
      });

      const icons = el.querySelectorAll('.section-motion-icon');
      icons.forEach((icon) => {
        icon.classList.remove('section-motion-icon');
      });

      const buttons = el.querySelectorAll('.section-motion-button');
      buttons.forEach((button) => {
        button.classList.remove('section-motion-button');
      });
    });
  };
}
