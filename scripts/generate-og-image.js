const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOgImageWithLogo() {
  const width = 1200;
  const height = 630;
  const logoSize = 270;
  const logoX = 840;
  const logoY = 160;

  // 1. Create a circular mask for the logo with smooth edges
  const circleMask = Buffer.from(
    `<svg width="${logoSize}" height="${logoSize}">
      <circle cx="${logoSize / 2}" cy="${logoSize / 2}" r="${logoSize / 2 - 2}" fill="#ffffff"/>
    </svg>`
  );

  const roundedLogo = await sharp(path.join(__dirname, '..', 'public', 'images', 'Logo.png'))
    .resize(logoSize, logoSize, { fit: 'cover' })
    .composite([
      {
        input: circleMask,
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  // 2. Base SVG background with rich branding, text, and futuristic metallic aesthetic
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090b"/>
        <stop offset="50%" stop-color="#111625"/>
        <stop offset="100%" stop-color="#09090b"/>
      </linearGradient>

      <linearGradient id="silver-text" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="40%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>

      <linearGradient id="badge-glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>

      <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
        <stop offset="60%" stop-color="#818cf8" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.35"/>
      </pattern>
    </defs>

    <!-- Background Layers -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>

    <!-- Decorative Outer Borders -->
    <rect x="22" y="22" width="${width - 44}" height="${height - 44}" rx="22" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>
    <rect x="30" y="30" width="${width - 60}" height="${height - 60}" rx="16" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>

    <!-- Corner Aesthetic Nodes -->
    <circle cx="48" cy="48" r="3" fill="#ffffff" opacity="0.7"/>
    <circle cx="${width - 48}" cy="48" r="3" fill="#ffffff" opacity="0.7"/>
    <circle cx="48" cy="${height - 48}" r="3" fill="#ffffff" opacity="0.7"/>
    <circle cx="${width - 48}" cy="${height - 48}" r="3" fill="#ffffff" opacity="0.7"/>

    <!-- Top Badge -->
    <g transform="translate(70, 70)">
      <rect width="330" height="40" rx="20" fill="#18181b" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1"/>
      <circle cx="22" cy="20" r="5" fill="#10b981"/>
      <text x="36" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#e2e8f0" letter-spacing="1.5">AVAILABLE FOR NEW PROJECTS</text>
    </g>

    <!-- LEFT CONTENT: Titles & Bio -->
    <text x="70" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="900" fill="url(#silver-text)" letter-spacing="-1">
      Rabia Aziz
    </text>

    <text x="70" y="265" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" fill="#f1f5f9" letter-spacing="-0.5">
      Flutter Developer &amp; Mobile App Engineer
    </text>

    <text x="70" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="400" fill="#94a3b8">
      Building AI-powered mobile experiences, Supabase &amp; Firebase
    </text>
    <text x="70" y="342" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="400" fill="#94a3b8">
      backends, and high-performance apps across mobile, web &amp; desktop.
    </text>

    <!-- Tech Skill Badges -->
    <g transform="translate(70, 390)">
      <!-- Badge 1: Flutter & Dart -->
      <g transform="translate(0, 0)">
        <rect width="145" height="42" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Flutter &amp; Dart</text>
      </g>
      <!-- Badge 2: AI Mobile Apps -->
      <g transform="translate(157, 0)">
        <rect width="165" height="42" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">AI Mobile Apps</text>
      </g>
      <!-- Badge 3: Supabase & Firebase -->
      <g transform="translate(334, 0)">
        <rect width="195" height="42" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Supabase &amp; Firebase</text>
      </g>
      <!-- Badge 4: Clean Architecture -->
      <g transform="translate(541, 0)">
        <rect width="175" height="42" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Clean Arch (MVVM)</text>
      </g>
    </g>

    <!-- RIGHT CONTENT: Glowing Pedestal and Outer Frame for Logo -->
    <g transform="translate(${logoX + logoSize / 2}, ${logoY + logoSize / 2})">
      <!-- Ambient Outer Aura Glow -->
      <circle cx="0" cy="0" r="180" fill="url(#logo-glow)"/>

      <!-- Outer Specular Ring -->
      <circle cx="0" cy="0" r="150" fill="#09090b" fill-opacity="0.7" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5"/>

      <!-- Inner Accent Ring with Cyan / Violet gradient dash -->
      <circle cx="0" cy="0" r="142" fill="none" stroke="url(#badge-glow)" stroke-opacity="0.5" stroke-width="2"/>

      <!-- Logo Background Plate -->
      <circle cx="0" cy="0" r="137" fill="#18181b"/>
    </g>

    <!-- Footer Bar -->
    <line x1="70" y1="495" x2="${width - 70}" y2="495" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>

    <!-- Featured Apps -->
    <g transform="translate(70, 545)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#64748b">
        FEATURED APPS: CivicCoach • Zemen Calendar • ZenPeace • Health Tracker
      </text>
    </g>

    <!-- Domain Branding -->
    <g transform="translate(${width - 70}, 545)">
      <text x="0" y="0" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#ffffff" letter-spacing="0.5">
        swe-rabia-aziz.vercel.app
      </text>
    </g>
  </svg>
  `;

  const baseImageBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  const finalImage = await sharp(baseImageBuffer)
    .composite([
      {
        input: roundedLogo,
        top: logoY,
        left: logoX,
      },
    ])
    .png()
    .toBuffer();

  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image.png');
  fs.writeFileSync(outputPath, finalImage);
  console.log(`✅ Generated og-image.png with Logo at: ${outputPath}`);
}

generateOgImageWithLogo().catch((err) => {
  console.error('❌ Error generating og-image with logo:', err);
  process.exit(1);
});
