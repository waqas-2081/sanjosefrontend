import React from 'react';
export function HomeAbout() {
  return (
    <section className="about-sec home-about-sec">
        <img src="/assets/images/icon/section_bottom_shape.svg" alt="" className="section_top_shape" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7">
                    <div className="image">
                        <img src="/assets/images/about/about.jpg" alt="" />
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="content">
                        <h1>
                        Expert Brand Strategy & Creative Agency
                               <div>San Jose</div>
                        </h1>
                        <p>Our creative agency in San Jose also offers comprehensive brand development services. We understand the importance of a strong brand presence, and our expert team works closely with you to develop a brand strategy that aligns with your business goals. Whether you need a new logo, website design, or overall brand strategy in San Jose, we are here to help.</p>
                        <p>Speaking of websites, our web agency in San Jose excels in creating visually appealing and user-friendly websites. We understand that a well-designed website is crucial for capturing the attention of your target audience and driving conversions. Our team combines creativity and technical expertise to deliver exceptional website design and development solutions tailored to your specific needs.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
