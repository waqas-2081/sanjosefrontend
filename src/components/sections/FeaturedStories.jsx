import React from 'react';

const FEATURED_STORIES = [
  {
    id: 'tereva-king',
    name: 'Tereva King',
    role: 'Customer',
    text: 'I told them my vision and they brought it to life. Awesome job communicating with me about my logo…. I definitely will use them in the future',
  },
  {
    id: 'tilysha-hailey',
    name: 'Tilysha Hailey',
    role: 'Customer',
    text: 'The company was very attentive to my needs. They were very professional quick with responding and overall pleasant to work with. I feel so confident on my journey knowing I have them by my side. I will definitely recommend them!',
  },
  {
    id: 'shantina-clark',
    name: 'Shantina Clark',
    role: 'Customer',
    text: "I just love my logo! It's everything I ask for and more! I love how the Team took direction on how I wanted my logo. They are very professional and the turnaround time was unmatched. Not to mention the price was affordable and I appreciate that! Thanks again San Jose Logo Design, you get 5 stars hands down!",
  },
];

function StoryCard({ name, role, text }) {
  return (
    <div className="story-card">
      <div className="story-card-header">
        <div className="meta">
          <h5>{name}</h5>
          <p>{role}</p>
        </div>
      </div>
      <div className="story-card-body">
        <p>{text}</p>
      </div>
      <div className="story-card-footer">
        <div className="rating">
          <ul className="stars">
            <li><i className="fa-solid fa-star" /></li>
            <li><i className="fa-solid fa-star" /></li>
            <li><i className="fa-solid fa-star" /></li>
            <li><i className="fa-solid fa-star" /></li>
            <li><i className="fa-solid fa-star" /></li>
          </ul>
          <span className="score">5/5</span>
        </div>
      </div>
    </div>
  );
}

export function FeaturedStories() {
  return (
    <section className="stories-sec stories-sec--featured">
      <div className="container-fluid">
        <div className="section-heading text-center">
          <img src="/assets/images/icon/experience-the-same.webp" alt="" />
          <h2>Featured Stories</h2>
        </div>

        <div className="featured-stories-swiper swiper">
          <div className="swiper-wrapper">
            {FEATURED_STORIES.map((story) => (
              <div className="swiper-slide" key={story.id}>
                <StoryCard name={story.name} role={story.role} text={story.text} />
              </div>
            ))}
          </div>
        </div>

        <div className="stories-bottom text-center">
          <p>
            Mastering the art of design and marketing services, SanJose Logo Design is a digital agency providing a
            vast range of other services as well.
          </p>
        </div>
      </div>
    </section>
  );
}
