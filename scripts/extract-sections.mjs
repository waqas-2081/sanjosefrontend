import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sanjosePhp = 'c:/Users/xc/Documents/sanjose';
const phpPath = path.join(sanjosePhp, 'index.php');
const php = fs.readFileSync(phpPath, 'utf8');

export function toJsx(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<h5>Jessica lemauk<<\s*\/h5>/g, '<h5>Jessica lemauk</h5>');
  s = s.replace(/class=/g, 'className=');
  s = s.replace(/\sautoplay>/g, ' autoPlay>');
  s = s.replace(/<img([^>]*?)>/g, (_, a) => '<img' + a + ' />');
  s = s.replace(/<br>/g, '<br />');
  s = s.replace(/src="assets\//g, 'src="/assets/');
  s = s.replace(/src='assets\//g, "src='/assets/");
  s = s.replace(/src="assets\/images\/portfolio\/video-animations\//g, 'src="/assets/images/portfolio/video-animations/');
  const hrefs = [
    ['href="index.php"', 'href="/"'],
    ['href="about.php"', 'href="/about"'],
    ['href="contact.php"', 'href="/contact"'],
    ['href="portfolio.php"', 'href="/portfolio"'],
    ['href="blogs.php"', 'href="/blogs"'],
    ['href="services.php"', 'href="/services"'],
    ['href="logo-design.php"', 'href="/logo-design"'],
    ['href="website.php"', 'href="/website"'],
    ['href="animations.php"', 'href="/animations"'],
    ['href="mobile-apps.php"', 'href="/mobile-apps"'],
    ['href="digital-marketing.php"', 'href="/digital-marketing"'],
    ['href="seo.php"', 'href="/seo"'],
  ];
  for (const [a, b] of hrefs) {
    s = s.split(a).join(b);
  }
  s = s.replace(/<input([^>]*?)(?<!\/)\s*>/gi, (_, a) => '<input' + a + ' />');
  s = s.replace(/<hr>/gi, '<hr />');
  s = s.replace(/<source([^>]*?)>/gi, (_, a) => '<source' + a + ' />');
  return s;
}

export function stripPhpIncludes(fragment) {
  return fragment.replace(/<\?php include\([^)]+\)\s*\?>\s*/g, '');
}

function sliceSection(html, className, occurrence = 0) {
  const needle = `<section class="${className}"`;
  let idx = -1;
  for (let i = 0; i <= occurrence; i++) {
    idx = html.indexOf(needle, idx + 1);
    if (idx === -1) return null;
  }
  const start = idx;
  const end = html.indexOf('</section>', start) + '</section>'.length;
  return html.slice(start, end);
}

const pStart = php.indexOf('<section class="portfolio-sec">');
const pEnd = php.indexOf('</section>', pStart) + '</section>'.length;
const portfolio = php.slice(pStart, pEnd);

const sStart = php.indexOf('<section class="solutions-sec">');
const sEnd = php.indexOf('</section>', sStart) + '</section>'.length;
const solutions = php.slice(sStart, sEnd);

const outDir = path.join(__dirname, '..', 'src', 'components', 'sections', 'generated');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'PortfolioSectionRaw.jsx'),
  `import React from 'react';\nexport function PortfolioSectionRaw() {\n  return (\n    ${toJsx(portfolio).trim()}\n  );\n}\n`
);

fs.writeFileSync(
  path.join(outDir, 'SolutionsSectionRaw.jsx'),
  `import React from 'react';\nexport function SolutionsSectionRaw() {\n  return (\n    ${toJsx(solutions).trim()}\n  );\n}\n`
);

const homeParts = [
  ['MainBannerRaw', sliceSection(php, 'main-banner', 0)],
  ['HomeAboutRaw', sliceSection(php, 'about-sec home-about-sec', 0)],
  ['FeaturedStoriesRaw', sliceSection(php, 'stories-sec', 0)],
  ['BrandPotentialRaw', sliceSection(php, 'brand-potential', 0)],
  ['AwesomeProjectsRaw', sliceSection(php, 'awesome-projects', 0)],
  ['TransformingRaw', sliceSection(php, 'transforming-sec', 0)],
  ['SuccessStoriesHomeRaw', sliceSection(php, 'stories-sec stories-sec2', 0)],
];

for (const [name, frag] of homeParts) {
  if (!frag) {
    console.warn('missing', name);
    continue;
  }
  fs.writeFileSync(
    path.join(outDir, `${name}.jsx`),
    `import React from 'react';\nexport function ${name}() {\n  return (\n    ${toJsx(frag).trim()}\n  );\n}\n`
  );
}

function phpBodyToComponent(file, exportName) {
  const raw = fs.readFileSync(path.join(sanjosePhp, file), 'utf8');
  const b0 = raw.indexOf('<body');
  const b1 = raw.indexOf('>', b0) + 1;
  const bEnd = raw.lastIndexOf('</body>');
  let inner = raw.slice(b1, bEnd);
  inner = stripPhpIncludes(inner);
  inner = inner.trim();
  return `import React from 'react';\nexport function ${exportName}() {\n  return (\n    <>\n${toJsx(inner)}\n    </>\n  );\n}\n`;
}

const pages = [
  ['about.php', 'AboutPageBody'],
  ['contact.php', 'ContactPageBody'],
  ['blogs.php', 'BlogsPageBody'],
  ['services.php', 'ServicesPageBody'],
  ['portfolio.php', 'PortfolioPageBody'],
  ['logo-design.php', 'LogoDesignPageBody'],
  ['website.php', 'WebsitePageBody'],
  ['animations.php', 'AnimationsPageBody'],
  ['mobile-apps.php', 'MobileAppsPageBody'],
  ['digital-marketing.php', 'DigitalMarketingPageBody'],
  ['seo.php', 'SeoPageBody'],
];

const pagesDir = path.join(__dirname, '..', 'src', 'pages', 'generated');
fs.mkdirSync(pagesDir, { recursive: true });
for (const [file, exportName] of pages) {
  fs.writeFileSync(path.join(pagesDir, `${exportName}.jsx`), phpBodyToComponent(file, exportName));
}

console.log('OK', portfolio.length, solutions.length, 'pages', pages.length);
