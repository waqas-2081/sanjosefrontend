/**
 * Ensure build/ carries cache header configs from public/.
 * CRA copies .htaccess; _headers is also copied as a static file for CF Pages/Netlify.
 * This script only verifies they exist after build (and can re-copy if needed).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pub = path.join(root, 'public');
const build = path.join(root, 'build');

const files = ['_headers', '.htaccess'];

if (!fs.existsSync(build)) {
  console.error('build/ missing — run react-scripts build first');
  process.exit(1);
}

files.forEach((name) => {
  const src = path.join(pub, name);
  const dest = path.join(build, name);
  if (!fs.existsSync(src)) {
    console.warn(`skip missing ${name}`);
    return;
  }
  fs.copyFileSync(src, dest);
  console.log(`Ensured build/${name}`);
});
