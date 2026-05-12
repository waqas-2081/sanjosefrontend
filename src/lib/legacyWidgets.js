/* SPA-friendly port of the original site scripts. Pair with teardown on route change. */

let swiperInstances = [];
const teardownFns = [];

function registerTeardown(fn) {
  teardownFns.push(fn);
}

function destroySwipers() {
  swiperInstances.forEach((s) => {
    try {
      s.destroy(true, true);
    } catch {
      /* ignore */
    }
  });
  swiperInstances = [];
}

function destroyOwl() {
  if (typeof window === 'undefined' || !window.jQuery || !window.jQuery.fn || !window.jQuery.fn.owlCarousel) {
    return;
  }
  const $ = window.jQuery;
  $('.stories-carousel-top, .stories-carousel-bottom').each(function handleDestroy() {
    const $el = $(this);
    if ($el.data('owl.carousel')) {
      $el.trigger('destroy.owl.carousel');
    }
  });
}

function resetMarquee() {
  document.querySelectorAll('[data-marquee]').forEach((wrapper) => {
    const tracks = wrapper.querySelectorAll('.awesome-marquee-track');
    tracks.forEach((t, i) => {
      if (i > 0) t.remove();
      else delete t.dataset.cloneAttached;
    });
    wrapper.style.removeProperty('--marquee-duration');
  });
}

function initSwipers() {
  if (typeof window.Swiper === 'undefined') return;

  document.querySelectorAll('.branding-swiper').forEach((el) => {
    const prev = el.querySelector('.branding-prev');
    const next = el.querySelector('.branding-next');
    const instance = new window.Swiper(el, {
      slidesPerView: 4,
      spaceBetween: 18,
      loop: true,
      observer: true,
      observeParents: true,
      navigation: prev && next ? { nextEl: next, prevEl: prev } : undefined,
      breakpoints: {
        0: { slidesPerView: 2.2 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 4 },
      },
    });
    swiperInstances.push(instance);
  });

  document.querySelectorAll('.vehicle-swiper').forEach((veh) => {
    const prev = veh.querySelector('.vehicle-prev');
    const next = veh.querySelector('.vehicle-next');
    const instance = new window.Swiper(veh, {
      slidesPerView: 3,
      spaceBetween: 18,
      loop: true,
      observer: true,
      observeParents: true,
      navigation: prev && next ? { nextEl: next, prevEl: prev } : undefined,
      breakpoints: {
        0: { slidesPerView: 1.2 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      },
    });
    swiperInstances.push(instance);
  });
}

function initOwl() {
  if (typeof window.jQuery === 'undefined' || !window.jQuery.fn || !window.jQuery.fn.owlCarousel) return;

  const $ = window.jQuery;
  const $top = $('.stories-carousel-top');
  const $bottom = $('.stories-carousel-bottom');

  const baseOwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 600,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 4 },
    },
  };

  if ($top.length) {
    $top.owlCarousel({ ...baseOwlOptions, nav: false, navText: ['‹', '›'], rtl: false });
  }
  if ($bottom.length) {
    $bottom.owlCarousel({ ...baseOwlOptions, rtl: true });
  }
}

function initMarquee() {
  document.querySelectorAll('[data-marquee]').forEach((wrapper) => {
    const track = wrapper.querySelector('.awesome-marquee-track');
    if (!track || track.dataset.cloneAttached === 'true') return;

    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(clone);
    track.dataset.cloneAttached = 'true';

    const setDuration = () => {
      const totalWidth = track.scrollWidth;
      const parsed = Number.parseFloat(wrapper.dataset.marqueeSpeed ?? '', 10);
      const speed = Number.isFinite(parsed) && parsed > 0 ? parsed : 120;
      const duration = totalWidth / speed;
      wrapper.style.setProperty('--marquee-duration', `${duration}s`);
    };

    window.addEventListener('resize', setDuration);
    registerTeardown(() => window.removeEventListener('resize', setDuration));
    setDuration();
  });
}

function initSolutionAccordion() {
  const accordionItems = document.querySelectorAll('.solutions-accordion:not([data-react-accordion]) .solution-accordion-item');

  function closeItem(item) {
    const content = item.querySelector('.solution-accordion-content');
    if (!content || !item.classList.contains('is-open')) return;
    content.style.height = `${content.scrollHeight}px`;
    requestAnimationFrame(() => {
      content.style.height = '0px';
    });
    item.classList.remove('is-open');
  }

  function openItem(item) {
    const content = item.querySelector('.solution-accordion-content');
    if (!content) return;
    content.style.height = '0px';
    item.classList.add('is-open');
    requestAnimationFrame(() => {
      content.style.height = `${content.scrollHeight}px`;
    });
  }

  const itemHandlers = [];

  accordionItems.forEach((item) => {
    const header = item.querySelector('.solution-accordion-header');
    const content = item.querySelector('.solution-accordion-content');
    if (!header || !content) return;

    const onTransitionEnd = (e) => {
      if (e.propertyName !== 'height') return;
      if (item.classList.contains('is-open')) {
        content.style.height = 'auto';
      }
    };
    content.addEventListener('transitionend', onTransitionEnd);
    registerTeardown(() => content.removeEventListener('transitionend', onTransitionEnd));

    const onHeaderClick = () => {
      const isOpen = item.classList.contains('is-open');
      accordionItems.forEach((other) => {
        if (other !== item) closeItem(other);
      });
      if (isOpen) closeItem(item);
      else openItem(item);
      window.setTimeout(() => {
        destroySwipers();
        initSwipers();
      }, 380);
    };
    header.addEventListener('click', onHeaderClick);
    itemHandlers.push(() => header.removeEventListener('click', onHeaderClick));
  });

  itemHandlers.forEach((fn) => registerTeardown(fn));

  if (accordionItems.length > 0) {
    const first = accordionItems[0];
    const content = first.querySelector('.solution-accordion-content');
    if (content) {
      content.style.height = 'auto';
      first.classList.add('is-open');
    }
  }
}

function initFaqModern() {
  const faqItems = document.querySelectorAll('.faq-modern-item');
  if (!faqItems.length) return;

  const animateOpenFaq = (item) => {
    const answer = item.querySelector('.faq-answer');
    if (!answer) return;
    item.open = true;
    answer.style.height = '0px';
    requestAnimationFrame(() => {
      answer.style.height = `${answer.scrollHeight}px`;
    });
    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      answer.style.height = 'auto';
      answer.removeEventListener('transitionend', onEnd);
    };
    answer.addEventListener('transitionend', onEnd);
  };

  const animateCloseFaq = (item) => {
    const answer = item.querySelector('.faq-answer');
    if (!answer) return;
    if (!item.open) {
      answer.style.height = '0px';
      return;
    }
    answer.style.height = `${answer.scrollHeight}px`;
    requestAnimationFrame(() => {
      answer.style.height = '0px';
    });
    item.open = false;
  };

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-answer');
    if (!summary || !answer) return;
    if (item.hasAttribute('open')) {
      answer.style.height = 'auto';
    } else {
      answer.style.height = '0px';
    }
    const onSummaryClick = (event) => {
      event.preventDefault();
      const isOpen = item.open;
      faqItems.forEach((other) => {
        if (other !== item) animateCloseFaq(other);
      });
      if (isOpen) animateCloseFaq(item);
      else animateOpenFaq(item);
    };
    summary.addEventListener('click', onSummaryClick);
    registerTeardown(() => summary.removeEventListener('click', onSummaryClick));
  });
}

function initPortfolioTabs() {
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const tabs = document.querySelectorAll('.portfolio-tab');
  if (!tabButtons.length || !tabs.length) return;

  tabButtons.forEach((btn) => {
    const onClick = () => {
      const targetSelector = btn.getAttribute('data-tab-target');
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      if (!target) return;
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      tabs.forEach((tab) => {
        tab.classList.toggle('active', tab === target);
      });
      window.setTimeout(() => {
        destroySwipers();
        initSwipers();
      }, 50);
    };
    btn.addEventListener('click', onClick);
    registerTeardown(() => btn.removeEventListener('click', onClick));
  });
}

function initCompareSlider() {
  const container = document.getElementById('compareContainer');
  if (!container) return;

  const afterImg = container.querySelector('.after-img');
  const handle = document.getElementById('compareHandle');
  if (!afterImg || !handle) return;

  let currentPercent = 50;
  const setPosition = (percent) => {
    const p = Math.min(100, Math.max(0, percent));
    afterImg.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    handle.style.left = `${p}%`;
    currentPercent = p;
  };

  setPosition(currentPercent);

  const updateSplit = (clientX) => {
    const rect = container.getBoundingClientRect();
    let xRel = clientX - rect.left;
    xRel = Math.min(rect.width, Math.max(0, xRel));
    const percent = (xRel / rect.width) * 100;
    setPosition(percent);
  };

  const onMove = (e) => updateSplit(e.clientX);
  const onTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) updateSplit(touch.clientX);
  };
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    if (touch) updateSplit(touch.clientX);
  };

  container.addEventListener('mousemove', onMove);
  container.addEventListener('touchmove', onTouchMove, { passive: false });
  container.addEventListener('touchstart', onTouchStart);

  const onResize = () => setPosition(currentPercent);
  window.addEventListener('resize', onResize);

  registerTeardown(() => {
    container.removeEventListener('mousemove', onMove);
    container.removeEventListener('touchmove', onTouchMove);
    container.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('resize', onResize);
  });
}

export function teardownLegacyWidgets() {
  teardownFns.splice(0).forEach((fn) => fn());
  destroySwipers();
  destroyOwl();
  resetMarquee();
}

export function mountLegacyWidgets() {
  requestAnimationFrame(() => {
    initSolutionAccordion();
    initFaqModern();
    initSwipers();
    initMarquee();
    initPortfolioTabs();
    initCompareSlider();
    initOwl();
  });
}
