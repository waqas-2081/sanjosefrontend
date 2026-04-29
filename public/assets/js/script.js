document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.solution-accordion-item');

    function closeItem(item) {
        const content = item.querySelector('.solution-accordion-content');
        if (!content) return;

        if (!item.classList.contains('is-open')) return;

        // From auto to fixed height, then animate to 0
        content.style.height = content.scrollHeight + 'px';
        requestAnimationFrame(() => {
            content.style.height = '0px';
        });
        item.classList.remove('is-open');
    }

    function openItem(item) {
        const content = item.querySelector('.solution-accordion-content');
        if (!content) return;

        // Start from 0 then grow to scrollHeight
        content.style.height = '0px';
        item.classList.add('is-open');
        requestAnimationFrame(() => {
            const targetHeight = content.scrollHeight;
            content.style.height = targetHeight + 'px';
        });
    }

    accordionItems.forEach((item) => {
        const header = item.querySelector('.solution-accordion-header');
        const content = item.querySelector('.solution-accordion-content');

        if (!header || !content) return;

        content.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'height') return;
            if (item.classList.contains('is-open')) {
                content.style.height = 'auto';
            }
        });

        header.addEventListener('click', function () {
            const isOpen = item.classList.contains('is-open');

            accordionItems.forEach((other) => {
                if (other !== item) {
                    closeItem(other);
                }
            });

            if (isOpen) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });
    });

    // Open the first solution by default
    if (accordionItems.length > 0) {
        openItem(accordionItems[0]);
    }

    // FAQ (single-open + smooth height animation)
    const faqItems = document.querySelectorAll('.faq-modern-item');

    if (faqItems.length) {
        const animateOpenFaq = (item) => {
            const answer = item.querySelector('.faq-answer');
            if (!answer) return;

            item.open = true;
            answer.style.height = '0px';
            requestAnimationFrame(() => {
                answer.style.height = answer.scrollHeight + 'px';
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

            // If height is auto, set explicit pixel height first.
            answer.style.height = answer.scrollHeight + 'px';
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

            summary.addEventListener('click', (event) => {
                event.preventDefault();
                const isOpen = item.open;

                faqItems.forEach((other) => {
                    if (other !== item) {
                        animateCloseFaq(other);
                    }
                });

                if (isOpen) {
                    animateCloseFaq(item);
                } else {
                    animateOpenFaq(item);
                }
            });
        });
    }

    // Swiper sliders
    let brandingSwiper = null;
    let vehicleSwiper = null;

    if (typeof Swiper !== 'undefined') {
        brandingSwiper = new Swiper('.branding-swiper', {
            slidesPerView: 4,
            spaceBetween: 18,
            loop: true,
            navigation: {
                nextEl: '.branding-next',
                prevEl: '.branding-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2.2,
                },
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 4,
                },
            },
        });

        vehicleSwiper = new Swiper('.vehicle-swiper', {
            slidesPerView: 3,
            spaceBetween: 18,
            loop: true,
            navigation: {
                nextEl: '.vehicle-next',
                prevEl: '.vehicle-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                },
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            },
        });

    }

    // Awesome projects marquee
    const marquees = document.querySelectorAll('[data-marquee]');

    marquees.forEach((wrapper) => {
        const track = wrapper.querySelector('.awesome-marquee-track');
        if (!track) return;

        // Duplicate track content for seamless loop
        const clone = track.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        wrapper.appendChild(clone);

        const setDuration = () => {
            const totalWidth = track.scrollWidth;
            const speed = 120; // pixels per second
            const duration = totalWidth / speed;
            wrapper.style.setProperty('--marquee-duration', `${duration}s`);
        };

        window.addEventListener('resize', setDuration);
        setDuration();
    });

    // Portfolio tabs
    const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
    const tabs = document.querySelectorAll('.portfolio-tab');

    if (tabButtons.length && tabs.length) {
        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetSelector = btn.getAttribute('data-tab-target');
                const target = targetSelector ? document.querySelector(targetSelector) : null;

                if (!target) return;

                tabButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                tabs.forEach((tab) => {
                    tab.classList.toggle('active', tab === target);
                });
            });
        });
    }

    // Mobile / responsive header nav toggle + Services dropdown toggle
    const header = document.querySelector('.main-header');
    const navToggle = document.querySelector('.header-toggle');
    const headerNavLinks = document.querySelectorAll('.main-header .nav a');
    const dropdownParents = document.querySelectorAll('.main-header .nav .has-dropdown');

    if (header && navToggle) {
        const closeNav = () => {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            dropdownParents.forEach((item) => item.classList.remove('is-open'));
        };

        navToggle.addEventListener('click', () => {
            const isOpen = header.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('nav-open', isOpen);

            if (!isOpen) {
                dropdownParents.forEach((item) => item.classList.remove('is-open'));
            }
        });

        // Toggle Services dropdown on click in mobile / tablet view
        dropdownParents.forEach((item) => {
            const triggerLink = item.querySelector('a');
            if (!triggerLink) return;

            triggerLink.addEventListener('click', (event) => {
                if (window.innerWidth < 992) {
                    event.preventDefault();
                    const isOpen = item.classList.contains('is-open');

                    dropdownParents.forEach((other) => {
                        if (other !== item) {
                            other.classList.remove('is-open');
                        }
                    });

                    if (!isOpen) {
                        item.classList.add('is-open');
                    } else {
                        item.classList.remove('is-open');
                    }
                }
            });
        });

        headerNavLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                // Don't close the nav when tapping the Services trigger on mobile
                if (window.innerWidth < 992 && link.closest('.has-dropdown')) {
                    return;
                }
                closeNav();
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                closeNav();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('compareContainer');
    if (!container) return;

    const afterImg = container.querySelector('.after-img');
    const handle = document.getElementById('compareHandle');

    if (!afterImg || !handle) return;

    // Start centered
    let currentPercent = 50;
    setPosition(currentPercent);

    function setPosition(percent) {
        percent = Math.min(100, Math.max(0, percent));
        afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        handle.style.left = `${percent}%`;
        currentPercent = percent;
    }

    function updateSplit(clientX) {
        const rect = container.getBoundingClientRect();
        let xRel = clientX - rect.left;
        xRel = Math.min(rect.width, Math.max(0, xRel));
        const percent = (xRel / rect.width) * 100;
        setPosition(percent);
    }

    // Mouse move
    container.addEventListener('mousemove', (e) => {
        updateSplit(e.clientX);
    });

    // Touch move
    container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) updateSplit(touch.clientX);
    }, { passive: false });

    container.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch) updateSplit(touch.clientX);
    });

    // Keep position on resize
    window.addEventListener('resize', () => {
        setPosition(currentPercent);
    });
});

// Success stories - Owl Carousel (two rows)
if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
    const $top = jQuery('.stories-carousel-top');
    const $bottom = jQuery('.stories-carousel-bottom');

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
            992: { items: 4 }
        }
    };

    if ($top.length) {
        $top.owlCarousel({
            ...baseOwlOptions,
            nav: false,
            navText: ['‹', '›'],
            rtl: false
        });
    }

    if ($bottom.length) {
        $bottom.owlCarousel({
            ...baseOwlOptions,
            rtl: true
        });
    }
}