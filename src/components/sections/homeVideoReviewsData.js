/**
 * Home video testimonials — swap each `videoSrc` when real clips are ready.
 * Files live in: public/assets/videos/testimonials/
 */
const PLACEHOLDER_VIDEO = `${process.env.PUBLIC_URL || ''}/assets/videos/testimonials/review-placeholder.mp4`;

export const HOME_VIDEO_REVIEWS = [
  {
    id: 'review-1',
    name: 'Marcus Bennett',
    role: 'Founder, Apex Studio',
    rating: 5,
    text: 'They captured our brand voice in one round. The logo feels premium and the process was effortless from brief to final files.',
    videoSrc: PLACEHOLDER_VIDEO,
  },
  {
    id: 'review-2',
    name: 'Priya Shah',
    role: 'Owner, Bloom Café',
    rating: 5,
    text: 'Clear communication, fast revisions, and a design that looks stunning on packaging and our storefront. Highly recommend.',
    videoSrc: PLACEHOLDER_VIDEO,
  },
  {
    id: 'review-3',
    name: 'Jordan Ellis',
    role: 'CEO, Northline Co.',
    rating: 5,
    text: 'Professional team that actually listens. Our rebrand launched on time and the identity system is ready for every channel.',
    videoSrc: PLACEHOLDER_VIDEO,
  },
  {
    id: 'review-4',
    name: 'Alicia Moreno',
    role: 'Creative Director',
    rating: 5,
    text: 'From first concepts to delivery, every detail felt intentional. Clients notice the difference — this is real craftsmanship.',
    videoSrc: PLACEHOLDER_VIDEO,
  },
];
