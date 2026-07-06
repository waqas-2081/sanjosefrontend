import React from 'react';
import { Link } from 'react-router-dom';
export function BrandPotential() {
  return (
    <section className="brand-potential">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="content">
                        <h2>WHERE <span>DESIGN,</span> DEVELOPMENT, AND MARKETING MEET</h2>
                        <p>Logo design and branding are just the start. We build complete digital systems, create website designs, conduct SEO, create landing pages, and curate marketing funnels, engineered to do one thing: turn traffic into customers and customers into revenue.

                        </p>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="brand-content">
                                    <div className="image">
                                        <img src="/assets/images/1.png" alt="" />
                                    </div>
                                    <div className="brand-text">
                                    <h3>TNT PIZZA</h3>
                                        <p>A full rebrand gave TNT Pizza a fresh, appetite-driving identity. The new design and advertising strategy helped fuel a 190% increase in revenue.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="brand-content">
                                    <div className="image">
                                        <img src="/assets/images/2.png" alt="" />
                                    </div>
                                    <div className="brand-text">
                                    <h3>PREMIER MOBILE DETAILING</h3>
                                        <p>A sleek, premium identity repositioned Premier Mobile Detailing as a top tier option in its market, driving a 174% increase in revenue.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row row2">
                        <div className="col-lg-12">
                            <div className="brand-content">
                                <div className="image">
                                    <img src="/assets/images/3.png" alt="" />
                                </div>
                                <div className="brand-text">
                                <h3>2 SONS OF GUNS PRESSURE WASHING</h3>
                                        <p>From a new logo to custom vehicle wraps, this brand refresh gave 2 Sons of Guns Pressure Washing a bolder presence on the road and a 215% jump in revenue.
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="brand-content">
                                <div className="image">
                                    <img src="/assets/images/4.png" alt="" />
                                </div>
                                <div className="brand-text">
                                <h3>LOADMASTER</h3>
                                    <p>A high impact rebrand positioned LoadMaster as a serious player in the hauling industry, contributing to a 255% increase in revenue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bottom-content">
                        <img src="/assets/images/icon/action-arrow.png" alt="" className="side-img" />
                        <img src="/assets/images/icon/dont-wait.webp" alt="" />
                        <h3>HERE&apos;S HOW WE GET YOU THERE</h3>
                        <p>
                            Strong brands don&apos;t happen by accident, they follow a process. We start with logo design and brand strategy, then build out into{' '}
                            <Link to="/website-design-development-services">website design</Link>, SEO, and digital marketing, backed by data at every step. Our team stays transparent, hits deadlines, and refines the details that matter, so the end result isn&apos;t just a brand you like, it&apos;s one that brings in customers and drives long term growth.
                        </p>
                        <Link to="/contact-us" className="btn">
                            <span>Contact Us Now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
