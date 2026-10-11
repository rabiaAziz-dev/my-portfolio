const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildShowcase() {
  const p1 = 'C:/Users/TECH-BUDDY404SP/.gemini/antigravity-ide/brain/21dfc8db-a6b0-41e4-a476-7a45062af1e8/media__1791643103732.png';
  const p2 = 'C:/Users/TECH-BUDDY404SP/.gemini/antigravity-ide/brain/21dfc8db-a6b0-41e4-a476-7a45062af1e8/media__1791643146608.png';
  const p3 = 'C:/Users/TECH-BUDDY404SP/.gemini/antigravity-ide/brain/21dfc8db-a6b0-41e4-a476-7a45062af1e8/media__1791643157500.png';

  const W = 1600;
  const H = 900;

  // Let's create a rounded mask for the cards
  // Card dimensions: let's scale them nicely
  // Original is 333x592. If scale is 1.25: width = 416, height = 740
  const cardW = 416;
  const cardH = 740;
  const radius = 28;

  const maskSvg = Buffer.from(`
    <svg width="${cardW}" height="${cardH}">
      <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#fff" />
    </svg>
  `);
  const mask = await sharp(maskSvg).png().toBuffer();

  // Resize and mask each card
  async function prepareCard(imgSrc) {
    const resized = await sharp(imgSrc)
      .resize(cardW, cardH, { fit: 'cover' })
      .toBuffer();

    return await sharp(resized)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
  }

  const card1 = await prepareCard(p1);
  const card2 = await prepareCard(p2);
  const card3 = await prepareCard(p3);

  // Positions
  // Gap between cards
  const totalCardsW = cardW * 3 + 60 * 2; // 416*3 + 120 = 1368
  const startX = Math.round((W - totalCardsW) / 2); // (1600 - 1368) / 2 = 116
  const yPos = Math.round((H - cardH) / 2); // (900 - 740) / 2 = 80

  const x1 = startX;
  const x2 = startX + cardW + 60;
  const x3 = x2 + cardW + 60;

  // Card border & shadow SVG
  const borderSvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cardShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.65" />
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#00E5FF" flood-opacity="0.2" />
        </filter>
        <linearGradient id="cardBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#00E5FF" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
        </linearGradient>
      </defs>

      <!-- Shadows -->
      <rect x="${x1}" y="${yPos}" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#000" filter="url(#cardShadow)" />
      <rect x="${x3}" y="${yPos}" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#000" filter="url(#cardShadow)" />
      <rect x="${x2}" y="${yPos - 12}" width="${cardW}" height="${cardH + 24}" rx="${radius + 4}" ry="${radius + 4}" fill="#000" filter="url(#cardShadow)" />
    </svg>
  `);

  // Glowing borders SVG
  const overlaySvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
          <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="${x1}" y="${yPos}" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="none" stroke="url(#cardBorder)" stroke-width="2" />
      <rect x="${x2}" y="${yPos}" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="none" stroke="url(#cardBorder)" stroke-width="2.5" />
      <rect x="${x3}" y="${yPos}" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="none" stroke="url(#cardBorder)" stroke-width="2" />
    </svg>
  `);

  // Background SVG
  const bgSvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#030712" />
          <stop offset="40%" stop-color="#0b172e" />
          <stop offset="70%" stop-color="#081026" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
        <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00A3FF" stop-opacity="0.25" />
          <stop offset="50%" stop-color="#0284c7" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="bottomGlow" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00E5FF" stop-opacity="0" />
          <stop offset="25%" stop-color="#00E5FF" stop-opacity="0.3" />
          <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.7" />
          <stop offset="75%" stop-color="#00E5FF" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#00E5FF" stop-opacity="0" />
        </linearGradient>
        <filter id="ecgGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Dark gradient background -->
      <rect width="${W}" height="${H}" fill="url(#bg)" />

      <!-- Ambient glow circles -->
      <circle cx="${W / 2}" cy="${H / 2}" r="650" fill="url(#cyanGlow)" />
      <circle cx="${W / 2}" cy="${H}" r="600" fill="url(#bottomGlow)" />

      <!-- Subtle background grid pattern -->
      <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
        ${Array.from({ length: 16 }).map((_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${H}" />`).join('')}
        ${Array.from({ length: 9 }).map((_, i) => `<line x1="0" y1="${i * 100}" x2="${W}" y2="${i * 100}" />`).join('')}
      </g>

      <!-- Medical ECG pulse wave line -->
      <path d="M 0,450 L 250,450 L 290,450 L 310,400 L 330,520 L 350,340 L 370,490 L 390,430 L 410,450 L 1190,450 L 1210,400 L 1230,520 L 1250,340 L 1270,490 L 1290,430 L 1310,450 L 1600,450"
            fill="none" stroke="url(#ecgGrad)" stroke-width="2.5" filter="url(#ecgGlow)" />
    </svg>
  `);

  const bgBuffer = await sharp(bgSvg).png().toBuffer();
  const shadowBuffer = await sharp(borderSvg).png().toBuffer();
  const overlayBuffer = await sharp(overlaySvg).png().toBuffer();

  const finalImg = await sharp(bgBuffer)
    .composite([
      { input: shadowBuffer, top: 0, left: 0 },
      { input: card1, top: yPos, left: x1 },
      { input: card3, top: yPos, left: x3 },
      { input: card2, top: yPos, left: x2 }, // Center card on top
      { input: overlayBuffer, top: 0, left: 0 },
    ])
    .jpeg({ quality: 95 })
    .toBuffer();

  const outPath = 'd:/my-portfolio/public/images/health_trackor showcase.jpg';
  fs.writeFileSync(outPath, finalImg);
  console.log('Successfully saved to', outPath);
}

buildShowcase().catch(console.error);
