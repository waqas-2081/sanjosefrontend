/**
 * Home video testimonials.
 * Files live in: public/assets/videos/testimonials/
 */
const videoUrl = (file) =>
  `${process.env.PUBLIC_URL || ''}/assets/videos/testimonials/${file}`;

export const HOME_VIDEO_REVIEWS = [
  {
    id: 'review-1',
    name: 'Marcus Whitfield',
    role: 'Founder, Cobalt & Pine Design Co.',
    rating: 5,
    text: 'San Jose Logo Design talked me out of it, thank god, and what we ended up with, it\'s just... it\'s actually us. People bring it up unprompted. Clients, vendors, randomly. That\'s never happened before.',
    videoSrc: videoUrl('review-1.mp4'),
  },
  {
    id: 'review-2',
    name: 'Hannah Brooks',
    role: 'Creative Director, Harlow Creative Studio',
    rating: 5,
    text: 'Our website used to just sit there. Nobody found it, nobody clicked on it, it was basically decorative. Now I\'ll have a client go, \'oh yeah, I found you guys online first\' that legitimately never happened before. Not once.',
    videoSrc: videoUrl('review-4.mp4'),
  },
  {
    id: 'review-3',
    name: 'Devon Castellano',
    role: 'Owner, Redwood Grove Roasters',
    rating: 5,
    text: 'San Jose Logo Design redid our merch, our packaging, all of it. And people just... bring the bags back in. To show me pictures. Of the bag. I did not expect that to be a thing. But it\'s a thing.',
    videoSrc: videoUrl('review-2.mp4'),
  },
  {
    id: 'review-4',
    name: 'Sofia Marchetti',
    role: 'Principal Designer, Ember & Oak Interiors',
    rating: 5,
    text: 'So when San Jose Logo Design team took over our SEO and ads, and our numbers actually moved, I was honestly suspicious at first. I kept waiting for it to stop working. Now people call already knowing what we do.',
    videoSrc: videoUrl('review-3.mp4'),
  },
];
