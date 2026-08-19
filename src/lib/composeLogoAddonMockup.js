import { LOGO_CREATOR_ADDONS } from './logoAddonCatalog';

const DEFAULT_THEME = {
  primary: '#1b3a4b',
  secondary: '#2a9d8f',
  background: '#f7f4ef',
  text: '#0f172a',
  textOnPrimary: '#ffffff',
};

const FONT_SANS = 'Arial, Helvetica, sans-serif';

function loadImage(url, crossOrigin) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (crossOrigin) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image: ${url}`));
    img.src = url;
  });
}

function toHex(r, g, b) {
  const h = (n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function parseHex(hex) {
  const n = String(hex || '').replace('#', '');
  if (n.length !== 6) return { r: 15, g: 23, b: 42 };
  return {
    r: Number.parseInt(n.slice(0, 2), 16),
    g: Number.parseInt(n.slice(2, 4), 16),
    b: Number.parseInt(n.slice(4, 6), 16),
  };
}

function luminance(hex) {
  const { r, g, b } = parseHex(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function lighten(hex, amount) {
  const { r, g, b } = parseHex(hex);
  return toHex(
    Math.round(r + (255 - r) * amount),
    Math.round(g + (255 - g) * amount),
    Math.round(b + (255 - b) * amount),
  );
}

export function extractTheme(logoImage) {
  try {
    const sample = document.createElement('canvas');
    sample.width = 80;
    sample.height = 80;
    const ctx = sample.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(logoImage, 0, 0, 80, 80);
    const { data } = ctx.getImageData(0, 0, 80, 80);
    const counts = new Map();

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 128) continue;
      if (r > 245 && g > 245 && b > 245) continue;
      const key = `${r >> 4},${g >> 4},${b >> 4}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return { ...DEFAULT_THEME };

    const [pr, pg, pb] = sorted[0][0].split(',').map((n) => (Number(n) << 4) + 8);
    const primary = toHex(pr, pg, pb);
    let secondary = primary;
    for (let i = 1; i < sorted.length; i += 1) {
      const [sr, sg, sb] = sorted[i][0].split(',').map((n) => (Number(n) << 4) + 8);
      const dist = Math.abs(sr - pr) + Math.abs(sg - pg) + Math.abs(sb - pb);
      if (dist > 48) {
        secondary = toHex(sr, sg, sb);
        break;
      }
    }

    const dark = luminance(primary) < 0.45;
    return {
      primary,
      secondary,
      background: dark ? '#f7f4ef' : lighten(primary, 0.92),
      text: dark ? '#0f172a' : '#ffffff',
      textOnPrimary: luminance(primary) < 0.55 ? '#ffffff' : '#0f172a',
    };
  } catch {
    return { ...DEFAULT_THEME };
  }
}

function colorDist(r1, g1, b1, r2, g2, b2) {
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
}

function isNearWhite(r, g, b) {
  return r > 236 && g > 236 && b > 236;
}

function isLightSeed(r, g, b) {
  return (r + g + b) / 3 > 200;
}

/** Low-saturation light pixels — typically white lettering, not a colored mark. */
function isLightInk(r, g, b, a = 255) {
  if (a < 40) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const sat = max === 0 ? 0 : (max - min) / max;
  return lum >= 0.7 && sat <= 0.18;
}

/**
 * If leftover logo pixels include a real amount of white/light ink, invert that
 * ink to dark so wordmarks stay visible on white products. Colored marks are
 * left alone; dark text is not touched.
 */
function recolorLightInkIfNeeded(d, w, h) {
  let opaque = 0;
  let light = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 40) continue;
    opaque += 1;
    if (isLightInk(d[i], d[i + 1], d[i + 2], d[i + 3])) light += 1;
  }
  if (opaque < 80 || light / opaque < 0.04) return;

  const coverage = opaque / Math.max(1, w * h);
  // A leftover light square (failed knockout) should not become a black plate.
  if (coverage > 0.7 && light / opaque > 0.8) return;

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 40) continue;
    if (!isLightInk(d[i], d[i + 1], d[i + 2], d[i + 3])) continue;
    d[i] = 255 - d[i];
    d[i + 1] = 255 - d[i + 1];
    d[i + 2] = 255 - d[i + 2];
  }
}

/**
 * Remove the typical AI-logo square (flat or gradient) by flooding from the edges.
 * Only pixels connected to the border and similar to the edge color are knocked out,
 * so the actual mark stays. Interior white lettering is kept, then darkened when needed.
 */
function floodRemoveBackground(d, w, h) {
  const n = w * h;
  const seen = new Uint8Array(n);
  const qx = new Int32Array(n);
  const qy = new Int32Array(n);
  const sr = new Uint8Array(n);
  const sg = new Uint8Array(n);
  const sb = new Uint8Array(n);
  let head = 0;
  let tail = 0;
  const localTol = 34;
  const seedTol = 110;

  const tryPush = (x, y, seedR, seedG, seedB, fromR, fromG, fromB) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (seen[p]) return;
    const i = p * 4;
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const a = d[i + 3];
    if (a < 12) {
      seen[p] = 1;
      d[i + 3] = 0;
      return;
    }
    const toSeed = colorDist(r, g, b, seedR, seedG, seedB);
    const toFrom = colorDist(r, g, b, fromR, fromG, fromB);
    const lightBgWhite = isNearWhite(r, g, b) && isLightSeed(seedR, seedG, seedB);
    if (!lightBgWhite && (toSeed > seedTol || toFrom > localTol)) return;
    seen[p] = 1;
    qx[tail] = x;
    qy[tail] = y;
    sr[tail] = seedR;
    sg[tail] = seedG;
    sb[tail] = seedB;
    tail += 1;
  };

  const seedEdge = (x, y) => {
    const i = (y * w + x) * 4;
    tryPush(x, y, d[i], d[i + 1], d[i + 2], d[i], d[i + 1], d[i + 2]);
  };

  for (let x = 0; x < w; x += 1) {
    seedEdge(x, 0);
    seedEdge(x, h - 1);
  }
  for (let y = 0; y < h; y += 1) {
    seedEdge(0, y);
    seedEdge(w - 1, y);
  }

  while (head < tail) {
    const x = qx[head];
    const y = qy[head];
    const seedR = sr[head];
    const seedG = sg[head];
    const seedB = sb[head];
    head += 1;
    const i = (y * w + x) * 4;
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    d[i + 3] = 0;
    tryPush(x + 1, y, seedR, seedG, seedB, r, g, b);
    tryPush(x - 1, y, seedR, seedG, seedB, r, g, b);
    tryPush(x, y + 1, seedR, seedG, seedB, r, g, b);
    tryPush(x, y - 1, seedR, seedG, seedB, r, g, b);
  }

  recolorLightInkIfNeeded(d, w, h);
}

function removeLogoBackground(logoImage) {
  const canvas = document.createElement('canvas');
  canvas.width = logoImage.naturalWidth || logoImage.width;
  canvas.height = logoImage.naturalHeight || logoImage.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(logoImage, 0, 0);
  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    floodRemoveBackground(imageData.data, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  } catch {
    // Cross-origin taint — use the original image as-is.
  }
  return canvas;
}

function cropLogoBounds(canvas) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  try {
    const { data } = ctx.getImageData(0, 0, w, h);
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        const a = data[(y * w + x) * 4 + 3];
        if (a < 40) continue;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
    if (maxX <= minX || maxY <= minY) {
      return { x: 0, y: 0, w, h };
    }
    const pad = Math.round(Math.max(w, h) * 0.02);
    const x = Math.max(0, minX - pad);
    const y = Math.max(0, minY - pad);
    return {
      x,
      y,
      w: Math.min(w - x, maxX - minX + pad * 2),
      h: Math.min(h - y, maxY - minY + pad * 2),
    };
  } catch {
    return { x: 0, y: 0, w, h };
  }
}

function px(rect, width, height) {
  return {
    x: rect.x * width,
    y: rect.y * height,
    w: rect.w * width,
    h: rect.h * height,
    rotate: rect.rotate || 0,
  };
}

function clipRoundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
  ctx.clip();
}

function drawContainedLogo(ctx, logo, bounds, dx, dy, dw, dh, padRatio = 0.02) {
  const padX = dw * padRatio;
  const padY = dh * padRatio;
  const boxW = Math.max(1, dw - padX * 2);
  const boxH = Math.max(1, dh - padY * 2);
  const scale = Math.min(boxW / bounds.w, boxH / bounds.h);
  const w = bounds.w * scale;
  const h = bounds.h * scale;
  const x = dx + (dw - w) / 2;
  const y = dy + (dh - h) / 2;
  ctx.drawImage(logo, bounds.x, bounds.y, bounds.w, bounds.h, x, y, w, h);
}

function fitText(ctx, text, maxWidth, fontFamily, maxSize, minSize, weight = '700') {
  let size = maxSize;
  const value = String(text || '');
  while (size >= minSize) {
    ctx.font = `${weight} ${size}px ${fontFamily}`;
    if (ctx.measureText(value).width <= maxWidth) return size;
    size -= 1;
  }
  return minSize;
}

function fillFittedText(ctx, text, x, y, maxWidth, fontFamily, maxSize, minSize, weight, color) {
  const value = String(text || '').trim();
  if (!value) return;
  const size = fitText(ctx, value, maxWidth, fontFamily, maxSize, minSize, weight);
  ctx.font = `${weight} ${size}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  let output = value;
  if (ctx.measureText(output).width > maxWidth) {
    while (output.length > 1 && ctx.measureText(`${output}…`).width > maxWidth) {
      output = output.slice(0, -1);
    }
    output = `${output}…`;
  }
  ctx.fillText(output, x, y);
}

function drawLogoSlot(ctx, slot, logo, bounds) {
  const cx = slot.x + slot.w / 2;
  const cy = slot.y + slot.h / 2;
  const radians = ((slot.rotate || 0) * Math.PI) / 180;

  ctx.save();
  ctx.translate(cx, cy);
  if (radians) ctx.rotate(radians);
  drawContainedLogo(ctx, logo, bounds, -slot.w / 2, -slot.h / 2, slot.w, slot.h, 0.02);
  ctx.restore();
}

function drawBusinessCard(ctx, slot, logo, bounds, theme, businessName, slogan, email, phone) {
  const { x, y, w, h } = slot;
  ctx.save();
  clipRoundRect(ctx, x, y, w, h, Math.min(w, h) * 0.025);

  const padLeft = w * 0.065;
  const padRight = w * 0.055;
  const logoW = w * 0.3;
  drawContainedLogo(ctx, logo, bounds, x + padLeft, y + h * 0.12, logoW, h * 0.76, 0.04);

  const gap = w * 0.035;
  const rightX = x + padLeft + logoW + gap;
  const rightW = Math.max(8, x + w - padRight - rightX);
  const ink = theme.text || '#0f172a';
  const muted = theme.primary || '#334155';

  const name = String(businessName || 'Your Brand').trim();
  const tag = String(slogan || '').trim();
  const mail = String(email || '').trim();
  const tel = String(phone || '').trim();

  const nameSize = fitText(ctx, name, rightW, FONT_SANS, h * 0.08, h * 0.038, '800');
  const tagSize = tag ? fitText(ctx, tag, rightW, FONT_SANS, h * 0.04, h * 0.026, '600') : 0;
  const mailSize = mail ? fitText(ctx, mail, rightW, FONT_SANS, h * 0.036, h * 0.024, '600') : 0;
  const telSize = tel ? fitText(ctx, tel, rightW, FONT_SANS, h * 0.036, h * 0.024, '600') : 0;

  const nameH = nameSize * 1.12;
  const tagH = tag ? tagSize * 1.2 : 0;
  const mailH = mail ? mailSize * 1.2 : 0;
  const telH = tel ? telSize * 1.2 : 0;
  const afterBrand = mail || tel ? h * 0.055 : 0;
  const betweenContacts = mail && tel ? h * 0.018 : 0;
  const stackH = nameH + tagH + afterBrand + mailH + telH + betweenContacts;
  let cursorY = y + (h - stackH) / 2;

  ctx.textAlign = 'left';
  const paint = (text, size, weight, color, lineH) => {
    if (!text) return;
    fillFittedText(ctx, text, rightX, cursorY + lineH / 2, rightW, FONT_SANS, size, size, weight, color);
    cursorY += lineH;
  };

  paint(name, nameSize, '800', ink, nameH);
  paint(tag, tagSize, '600', muted, tagH);
  cursorY += afterBrand;
  paint(mail, mailSize, '600', ink, mailH);
  cursorY += betweenContacts;
  paint(tel, telSize, '600', ink, telH);
  ctx.restore();
}

function drawStickers(ctx, addon, width, height, logo, bounds) {
  (addon.circles || []).forEach((circle) => {
    const cx = circle.cx * width;
    const cy = circle.cy * height;
    const r = circle.r * width;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    drawContainedLogo(ctx, logo, bounds, cx - r, cy - r, r * 2, r * 2, 0.16);
    ctx.restore();
  });
}

async function loadLogoForCanvas(logoUrls) {
  const urls = (Array.isArray(logoUrls) ? logoUrls : [logoUrls]).filter(Boolean);
  let lastError = null;
  for (const url of urls) {
    try {
      return await loadImage(url, true);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Logo image could not be loaded.');
}

export async function composeLogoAddonMockup({
  addon,
  logo,
  bounds,
  theme,
  businessName,
  slogan,
  email,
  phone,
}) {
  const template = await loadImage(addon.template, false);
  const width = template.naturalWidth;
  const height = template.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(template, 0, 0, width, height);

  const name = String(businessName || '').trim();
  const tag = String(slogan || '').trim();
  const mail = String(email || '').trim();
  const tel = String(phone || '').trim();

  if (addon.kind === 'business-card') {
    drawBusinessCard(ctx, px(addon.slot, width, height), logo, bounds, theme, name, tag, mail, tel);
  } else if (addon.kind === 'stickers') {
    drawStickers(ctx, addon, width, height, logo, bounds);
  } else if (addon.kind === 'logo-slot') {
    drawLogoSlot(ctx, px(addon.slot, width, height), logo, bounds);
  }

  return canvas.toDataURL('image/jpeg', 0.88);
}

export async function composeAllLogoAddonMockups({
  logoUrl,
  logoUrls,
  businessName,
  slogan,
  email,
  phone,
}) {
  const logoImage = await loadLogoForCanvas(logoUrls || logoUrl);
  const logo = removeLogoBackground(logoImage);
  const bounds = cropLogoBounds(logo);
  const theme = extractTheme(logo);
  const previews = {};

  for (const addon of LOGO_CREATOR_ADDONS) {
    previews[addon.id] = await composeLogoAddonMockup({
      addon,
      logo,
      bounds,
      theme,
      businessName,
      slogan,
      email,
      phone,
    });
  }

  return { theme, previews };
}
