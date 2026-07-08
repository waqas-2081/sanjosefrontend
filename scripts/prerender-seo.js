const fs = require('fs');
const path = require('path');

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seo-routes.json'), 'utf8')
);

const buildDir = path.join(__dirname, '../build');
const templatePath = path.join(buildDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('build/index.html not found. Run react-scripts build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectRouteMeta(html, route) {
  const canonical = `${config.siteUrl}${route.path === '/' ? '' : route.path}`;
  const robots = route.robots || 'index,follow';
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonicalEscaped = escapeHtml(canonical);
  const ogImage = escapeHtml(config.defaultOgImage);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta\s+name="robots"[\s\S]*?\/>/,
      `<meta name="robots" content="${robots}" />`
    )
    .replace(
      /<link\s+rel="canonical"[\s\S]*?\/>/,
      `<link rel="canonical" href="${canonicalEscaped}" />`
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:url"[\s\S]*?\/>/,
      `<meta property="og:url" content="${canonicalEscaped}" />`
    )
    .replace(
      /<meta\s+property="og:image"[\s\S]*?\/>/,
      `<meta property="og:image" content="${ogImage}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${description}" />`
    );
}

config.routes.forEach((route) => {
  const html = injectRouteMeta(template, route);

  if (route.path === '/') {
    fs.writeFileSync(templatePath, html, 'utf8');
    return;
  }

  const routeDir = path.join(buildDir, route.path.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
});

console.log(`Prerendered SEO HTML for ${config.routes.length} routes.`);
