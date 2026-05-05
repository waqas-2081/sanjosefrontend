import React from 'react';
export function Transforming() {
  return (
    <section className="transforming-sec">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7">
                    <div className="content">
                        <h1>Top Brand <span>Development</span> & SEO Company<span> San Jose</span></h1>
                        <p>As a leading branding and digital marketing agency in San Jose, we offer a wide range of services to help your business thrive. Our team of professionals specializes in social media marketing, brand marketing, and digital advertising. We develop customized strategies to enhance your online presence and effectively engage with your target audience.</p>
                        <p>Partner with our top creative marketing agency in San Jose, and you'll have the support of a professional logo design agency that understands the intricacies of the digital landscape. Our dedicated team is committed to delivering outstanding results, and we take pride in being a trusted design company in San Jose. We combine our expertise, creativity, and brand strategy to provide you with a comprehensive solution that drives your business forward.</p>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="image compare-container" id="compareContainer">
                        <img src="/assets/images/before-after/image2.png" alt="Before image" className="before-img" />
                        <img src="/assets/images/before-after/image1.png" alt="After image" className="after-img" />
                        <div className="compare-handle" id="compareHandle"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
