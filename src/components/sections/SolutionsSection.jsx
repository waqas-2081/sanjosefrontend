import React, { useCallback, useState } from 'react';
import { GalleryLightboxPortal } from '../ui/GalleryLightbox';

export function SolutionsSection() {
  const [lightbox, setLightbox] = useState(null);
  const [openSolution, setOpenSolution] = useState('branding');

  const toggleSolution = useCallback((solutionId) => {
    setOpenSolution((current) => (current === solutionId ? null : solutionId));
  }, []);

  const openFromSlide = useCallback((e) => {
    const slide = e.currentTarget;
    const swiperEl = slide.closest('.solution-slider');
    if (!swiperEl) return;
    const imgs = [...swiperEl.querySelectorAll('.solution-slide img')];
    const imgEl = slide.querySelector('img');
    if (!imgEl || imgs.length === 0) return;
    const index = imgs.indexOf(imgEl);
    setLightbox({
      items: imgs.map((img) => ({
        kind: 'image',
        src: img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || '',
      })),
      index: Math.max(0, index),
    });
  }, []);

  const onGalleryKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromSlide(e);
      }
    },
    [openFromSlide]
  );

  return (
    <>
    <section className="solutions-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
            <div className="solutions-header">
                <h1>Our <span>Solutions</span></h1>
                <p>We are your full-stack, five-star creative design agency ready to tackle any job you have for us.</p>
            </div>

            <div className="solutions-accordion" data-react-accordion="true">
                <div className={`solution-accordion-item${openSolution === 'branding' ? ' is-open' : ''}`} data-solution="branding">
                    <button
                        className="solution-accordion-header"
                        type="button"
                        aria-expanded={openSolution === 'branding'}
                        onClick={() => toggleSolution('branding')}
                    >
                        <div className="solution-accordion-title">
                            <h3>Branding/Logo</h3>
                        </div>
                        <div className="solution-accordion-summary">
                            <span>Your logo is the heart of your brand and the face of your business.</span>
                            <span className="solution-toggle-icon" aria-hidden="true">
                                <span className="line horizontal"></span>
                                <span className="line vertical"></span>
                            </span>
                        </div>
                    </button>
                    <div className="solution-accordion-content" style={{ height: openSolution === 'branding' ? 'auto' : '0px' }}>
                        <div className="solution-accordion-inner">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="solution-slider swiper branding-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/1.jpg" alt="The Wrap Ninjas logo" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/1.jpg" alt="Big Kahuna logo" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/1.jpg" alt="Boss Hawgs logo" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/1.jpg" alt="Nacho Business logo" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/1.jpg" alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/1.jpg" alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="solution-slider-nav prev branding-prev" type="button"
                                            aria-label="Previous">
                                            <span>&lsaquo;</span>
                                        </button>
                                        <button className="solution-slider-nav next branding-next" type="button"
                                            aria-label="Next">
                                            <span>&rsaquo;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="solution-cta">
                                        <p>Ready to elevate your brand? Click <span>“Request a Quote”</span> now and
                                            let's create a logo that makes your business impossible to ignore.</p>
                                        <a href="#" className="btn btn-yellow">
                                            <span>Request a Quote</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`solution-accordion-item${openSolution === 'vehicle' ? ' is-open' : ''}`} data-solution="vehicle">
                    <button
                        className="solution-accordion-header"
                        type="button"
                        aria-expanded={openSolution === 'vehicle'}
                        onClick={() => toggleSolution('vehicle')}
                    >
                        <div className="solution-accordion-title">
                            <h3>Vehicle Wrap Design</h3>
                        </div>
                        <div className="solution-accordion-summary">
                            <span>Our unique vehicle wrap designs turn your fleet into mobile billboards, ensuring your
                                brand stays in view long after you've driven away.</span>
                            <span className="solution-toggle-icon" aria-hidden="true">
                                <span className="line horizontal"></span>
                                <span className="line vertical"></span>
                            </span>
                        </div>
                    </button>
                    <div className="solution-accordion-content" style={{ height: openSolution === 'vehicle' ? 'auto' : '0px' }}>
                        <div className="solution-accordion-inner">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="solution-slider swiper branding-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/vehicle-wrap-design/1.png"
                                                        alt="Premium fleet wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/vehicle-wrap-design/2.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/vehicle-wrap-design/3.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/vehicle-wrap-design/4.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/vehicle-wrap-design/5.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="solution-slider-nav prev branding-prev" type="button"
                                            aria-label="Previous">
                                            <span>&lsaquo;</span>
                                        </button>
                                        <button className="solution-slider-nav next branding-next" type="button"
                                            aria-label="Next">
                                            <span>&rsaquo;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="solution-cta">
                                        <p>Ready to turn your vehicle into a moving billboard? Click<span>“Request a Quote”</span> now and let’s design a wrap that grabs attention everywhere you go.                                        </p>
                                        <a href="#" className="btn btn-yellow">
                                            <span>Request a Quote</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`solution-accordion-item${openSolution === 'website' ? ' is-open' : ''}`} data-solution="website">
                    <button
                        className="solution-accordion-header"
                        type="button"
                        aria-expanded={openSolution === 'website'}
                        onClick={() => toggleSolution('website')}
                    >
                        <div className="solution-accordion-title">
                            <h3>Website Design</h3>
                        </div>
                        <div className="solution-accordion-summary">
                            <span>High-performing, conversion-focused websites that look great on every device.</span>
                            <span className="solution-toggle-icon" aria-hidden="true">
                                <span className="line horizontal"></span>
                                <span className="line vertical"></span>
                            </span>
                        </div>
                    </button>
                    <div className="solution-accordion-content" style={{ height: openSolution === 'website' ? 'auto' : '0px' }}>
                        <div className="solution-accordion-inner">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="solution-slider swiper branding-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/website/1.png"
                                                        alt="Premium fleet wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/website/2.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/website/3.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/website/4.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/website/5.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="solution-slider-nav prev branding-prev" type="button"
                                            aria-label="Previous">
                                            <span>&lsaquo;</span>
                                        </button>
                                        <button className="solution-slider-nav next branding-next" type="button"
                                            aria-label="Next">
                                            <span>&rsaquo;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="solution-cta">
                                        <p>Ready to upgrade your online presence? Click <span>“Request a Quote”</span> now and let’s build a website that converts visitors into customers.                                        </p>
                                        <a href="#" className="btn btn-yellow">
                                            <span>Request a Quote</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`solution-accordion-item${openSolution === 'mobile-apps' ? ' is-open' : ''}`} data-solution="mobile-apps">
                    <button
                        className="solution-accordion-header"
                        type="button"
                        aria-expanded={openSolution === 'mobile-apps'}
                        onClick={() => toggleSolution('mobile-apps')}
                    >
                        <div className="solution-accordion-title">
                            <h3>Mobile App Design</h3>
                        </div>
                        <div className="solution-accordion-summary">
                            <span>App interfaces that feel intuitive, on-brand, and built for engagement.</span>
                            <span className="solution-toggle-icon" aria-hidden="true">
                                <span className="line horizontal"></span>
                                <span className="line vertical"></span>
                            </span>
                        </div>
                    </button>
                    <div className="solution-accordion-content" style={{ height: openSolution === 'mobile-apps' ? 'auto' : '0px' }}>
                        <div className="solution-accordion-inner">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="solution-slider swiper branding-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/mobile-app-design/1.png"
                                                        alt="Premium fleet wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/mobile-app-design/2.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/mobile-app-design/3.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/mobile-app-design/4.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/mobile-app-design/5.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="solution-slider-nav prev branding-prev" type="button"
                                            aria-label="Previous">
                                            <span>&lsaquo;</span>
                                        </button>
                                        <button className="solution-slider-nav next branding-next" type="button"
                                            aria-label="Next">
                                            <span>&rsaquo;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="solution-cta">
                                        <p>Ready to bring your app idea to life? Click <span>“Request a Quote”</span> now and let’s design an experience your users will love.</p>
                                        <a href="#" className="btn btn-yellow">
                                            <span>Request a Quote</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`solution-accordion-item${openSolution === 'digital-marketing' ? ' is-open' : ''}`} data-solution="digital-marketing">
                    <button
                        className="solution-accordion-header"
                        type="button"
                        aria-expanded={openSolution === 'digital-marketing'}
                        onClick={() => toggleSolution('digital-marketing')}
                    >
                        <div className="solution-accordion-title">
                            <h3>Digital Marketing</h3>
                        </div>
                        <div className="solution-accordion-summary">
                            <span>Campaign visuals and creative that help your message cut through the noise.</span>
                            <span className="solution-toggle-icon" aria-hidden="true">
                                <span className="line horizontal"></span>
                                <span className="line vertical"></span>
                            </span>
                        </div>
                    </button>
                    <div className="solution-accordion-content" style={{ height: openSolution === 'digital-marketing' ? 'auto' : '0px' }}>
                        <div className="solution-accordion-inner">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="solution-slider swiper branding-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/marketing/1.png"
                                                        alt="Premium fleet wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/marketing/2.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/marketing/3.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/marketing/4.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/marketing/5.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="solution-slider-nav prev branding-prev" type="button"
                                            aria-label="Previous">
                                            <span>&lsaquo;</span>
                                        </button>
                                        <button className="solution-slider-nav next branding-next" type="button"
                                            aria-label="Next">
                                            <span>&rsaquo;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="solution-cta">
                                        <p>Ready to grow your business faster? Click <span>“Request a Quote”</span> now and let’s launch campaigns that drive real results.</p>
                                        <a href="#" className="btn btn-yellow">
                                            <span>Request a Quote</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`solution-accordion-item${openSolution === 'seo' ? ' is-open' : ''}`} data-solution="seo">
                    <button
                        className="solution-accordion-header"
                        type="button"
                        aria-expanded={openSolution === 'seo'}
                        onClick={() => toggleSolution('seo')}
                    >
                        <div className="solution-accordion-title">
                            <h3>SEO & Content</h3>
                        </div>
                        <div className="solution-accordion-summary">
                            <span>On-brand content and visuals that help you rank better and convert better.</span>
                            <span className="solution-toggle-icon" aria-hidden="true">
                                <span className="line horizontal"></span>
                                <span className="line vertical"></span>
                            </span>
                        </div>
                    </button>
                    <div className="solution-accordion-content" style={{ height: openSolution === 'seo' ? 'auto' : '0px' }}>
                        <div className="solution-accordion-inner">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="solution-slider swiper branding-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/seo-and-content/1.png"
                                                        alt="Premium fleet wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/seo-and-content/2.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/seo-and-content/3.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/seo-and-content/4.png"
                                                        alt="City delivery van wrap" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="solution-slide solution-slide--gallery"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Open image gallery"
                                                    onClick={openFromSlide}
                                                    onKeyDown={onGalleryKeyDown}
                                                >
                                                    <img src="/assets/images/our-solutions/seo-and-content/5.png"
                                                        alt="High-impact bus wrap design" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="solution-slider-nav prev branding-prev" type="button"
                                            aria-label="Previous">
                                            <span>&lsaquo;</span>
                                        </button>
                                        <button className="solution-slider-nav next branding-next" type="button"
                                            aria-label="Next">
                                            <span>&rsaquo;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="solution-cta">
                                        <p>Ready to rank higher and get more traffic? Click<span>“Request a Quote”</span>now and let’s optimize your business for maximum visibility.                                        </p>
                                        <a href="#" className="btn btn-yellow">
                                            <span>Request a Quote</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
