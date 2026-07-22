/**
 * Convert CRA-injected /static/css/*.css links to non-render-blocking.
 * Styles are unchanged — only load timing changes (PageSpeed "Render-blocking requests").
 */
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build');
const indexPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('build/index.html not found. Run react-scripts build first.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

const stylesheetRe =
  /<link([^>]*?)href=(["'])([^"']*\/static\/css\/[^"']+\.css)\2([^>]*?)\/?>/gi;

const deferredHrefs = [];
let converted = 0;

html = html.replace(stylesheetRe, (full, before, quote, href, after) => {
  const attrs = `${before || ''} ${after || ''}`;
  if (/\bmedia\s*=\s*["']print["']/i.test(attrs)) {
    return full;
  }
  if (/\brel\s*=\s*["']preload["']/i.test(attrs)) {
    return full;
  }
  if (!/\brel\s*=\s*["']stylesheet["']/i.test(`${before || ''}${after || ''}`)) {
    return full;
  }

  converted += 1;
  if (!deferredHrefs.includes(href)) deferredHrefs.push(href);
  return (
    `<link rel="preload" as="style" href=${quote}${href}${quote} />` +
    `<link rel="stylesheet" href=${quote}${href}${quote} media="print" onload="this.media='all'" />`
  );
});

if (deferredHrefs.length > 0) {
  const noscriptLinks = deferredHrefs
    .map((href) => `      <link rel="stylesheet" href="${href}" />`)
    .join('\n');
  const noscriptBlock = `<noscript>\n${noscriptLinks}\n    </noscript>`;

  if (html.includes('</head>')) {
    html = html.replace('</head>', `    ${noscriptBlock}\n  </head>`);
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log(
  converted
    ? `Deferred ${converted} CRA stylesheet(s) (non-render-blocking).`
    : 'No CRA stylesheets needed deferral.'
);
