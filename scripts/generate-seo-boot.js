const fs = require('fs');
const path = require('path');

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seo-routes.json'), 'utf8')
);

const routeMap = {};
config.routes.forEach((route) => {
  routeMap[route.path] = {
    title: route.title,
    description: route.description,
    robots: route.robots || 'index,follow',
    canonical: `${config.siteUrl}${route.path === '/' ? '' : route.path}`,
    ogImage: config.defaultOgImage,
  };
});

const bootScript = `/* Auto-generated from scripts/seo-routes.json — do not edit manually */
(function () {
  var SITE_URL = ${JSON.stringify(config.siteUrl)};
  var ROUTES = ${JSON.stringify(routeMap, null, 2)};

  function normalizePath(pathname) {
    if (!pathname || pathname === '/') return '/';
    return pathname.replace(/\\/$/, '') || '/';
  }

  function upsertMeta(selector, attr, attrValue, content) {
    var el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function upsertCanonical(href) {
    var el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  var route = ROUTES[normalizePath(window.location.pathname)];
  if (!route) return;

  document.title = route.title;
  upsertMeta('meta[name="description"]', 'name', 'description', route.description);
  upsertMeta('meta[name="robots"]', 'name', 'robots', route.robots);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', route.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', route.description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', route.canonical);
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', route.ogImage);
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', route.title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', route.description);
  upsertCanonical(route.canonical);
})();
`;

const outputPath = path.join(__dirname, '../public/seo-boot.js');
fs.writeFileSync(outputPath, bootScript, 'utf8');
console.log('Generated public/seo-boot.js');
