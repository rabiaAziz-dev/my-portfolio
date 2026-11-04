const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateCleanPortfolioOgImage() {
  const width = 1200;
  const height = 630;

  // 1. Prepare rounded Logo
  const logoSize = 64;
  const logoCircleMask = Buffer.from(
    `<svg width="${logoSize}" height="${logoSize}">
      <circle cx="${logoSize / 2}" cy="${logoSize / 2}" r="${logoSize / 2}" fill="#ffffff"/>
    </svg>`
  );

  const roundedLogo = await sharp(path.join(__dirname, '..', 'public', 'images', 'logo.jpg'))
    .resize(logoSize, logoSize, { fit: 'cover' })
    .composite([{ input: logoCircleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Prepare CivicCoach app showcase (Clean, full, ZERO overlapping!)
  const previewWidth = 510;
  const previewHeight = 310;
  const previewCornerRadius = 14;
  const previewMask = Buffer.from(
    `<svg width="${previewWidth}" height="${previewHeight}">
      <rect x="0" y="0" width="${previewWidth}" height="${previewHeight}" rx="${previewCornerRadius}" fill="#ffffff"/>
    </svg>`
  );

  const cleanShowcase = await sharp(path.join(__dirname, '..', 'public', 'images', 'civic_coach_showcase.jpeg'))
    .resize(previewWidth, previewHeight, { fit: 'cover' })
    .composite([{ input: previewMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Construct high-fidelity SVG canvas mirroring Rabia's actual portfolio design
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep luxury dark background matching the portfolio -->
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#08090d"/>
        <stop offset="45%" stop-color="#0f1420"/>
        <stop offset="100%" stop-color="#08090d"/>
      </linearGradient>

      <!-- Glowing metallic text gradient -->
      <linearGradient id="silver-title" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="60%" stop-color="#e2e8f0"/>
        <stop offset="100%" stop-color="#cbd5e1"/>
      </linearGradient>

      <!-- Ambient glow behind mockups -->
      <radialGradient id="mockup-glow" cx="70%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.18"/>
        <stop offset="60%" stop-color="#818cf8" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <pattern id="dot-grid" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#475569" opacity="0.3"/>
      </pattern>
    </defs>

    <!-- Base Canvas -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#dot-grid)"/>
    <rect width="${width}" height="${height}" fill="url(#mockup-glow)"/>

    <!-- Subtle Outer Border Frame -->
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="22" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>

    <!-- TOP BAR: Portfolio Header (Logo + Brand Title + Status Badge) -->
    <!-- Brand Pill -->
    <g transform="translate(60, 52)">
      <rect width="250" height="48" rx="24" fill="#0f172a" fill-opacity="0.9" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
      <text x="56" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#ffffff" letter-spacing="0.5">SWE. Rabia Aziz</text>
    </g>

    <!-- Right Status Pill -->
    <g transform="translate(850, 52)">
      <rect width="290" height="48" rx="24" fill="#0f172a" fill-opacity="0.9" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
      <circle cx="24" cy="24" r="5" fill="#10b981"/>
      <text x="40" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#e2e8f0" letter-spacing="1">AVAILABLE FOR PROJECTS</text>
    </g>

    <!-- LEFT COLUMN: Portfolio Hero Content -->
    <g transform="translate(60, 160)">
      <!-- Pre-heading -->
      <text x="0" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="600" fill="#94a3b8">
        Hi, I'm
      </text>

      <!-- Main Name -->
      <text x="0" y="92" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="900" fill="url(#silver-title)" letter-spacing="-1.5">
        Rabia Aziz
      </text>

      <!-- Role Heading -->
      <text x="0" y="140" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="27" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">
        Flutter Developer &amp; Mobile App Engineer
      </text>

      <!-- Tagline -->
      <text x="0" y="184" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#94a3b8">
        Building AI-powered mobile experiences, Supabase backends,
      </text>
      <text x="0" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#94a3b8">
        and cross-platform applications across mobile, web &amp; desktop.
      </text>

      <!-- Tech Badges -->
      <g transform="translate(0, 244)">
        <!-- Badge 1: Flutter & Dart -->
        <g transform="translate(0, 0)">
          <rect width="130" height="38" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1"/>
          <text x="16" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">Flutter &amp; Dart</text>
        </g>
        <!-- Badge 2: AI Mobile Apps -->
        <g transform="translate(142, 0)">
          <rect width="150" height="38" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1"/>
          <text x="16" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">AI Mobile Apps</text>
        </g>
        <!-- Badge 3: Supabase & Firebase -->
        <g transform="translate(304, 0)">
          <rect width="180" height="38" rx="10" fill="#18181b" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1"/>
          <text x="16" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">Supabase &amp; Firebase</text>
        </g>
      </g>
    </g>

    <!-- RIGHT COLUMN: Clean Developer Window Mockup (Featuring Live CivicCoach Alone - No Overlap!) -->
    <g transform="translate(600, 135)">
      <!-- Window Background Container -->
      <rect width="540" height="385" rx="20" fill="#0d1117" fill-opacity="0.95" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5"/>

      <!-- Window Header Bar with MacOS style colored dots -->
      <path d="M 0 20 A 20 20 0 0 1 20 0 L 520 0 A 20 20 0 0 1 540 20 L 540 44 L 0 44 Z" fill="#161b22"/>
      <circle cx="24" cy="22" r="6" fill="#ef4444"/>
      <circle cx="42" cy="22" r="6" fill="#eab308"/>
      <circle cx="60" cy="22" r="6" fill="#22c55e"/>

      <!-- Window Title -->
      <text x="270" y="27" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#8b949e">
        CivicCoach — AI US Citizenship 2026
      </text>

      <!-- App Store Live Badge Top Right of Window -->
      <g transform="translate(385, 9)">
        <rect width="140" height="26" rx="13" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.4" stroke-width="1"/>
        <circle cx="12" cy="13" r="4" fill="#10b981"/>
        <text x="24" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#34d399">GOOGLE PLAY LIVE</text>
      </g>
    </g>

    <!-- BOTTOM BAR: Footer Branding -->
    <line x1="60" y1="565" x2="${width - 60}" y2="565" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>

    <g transform="translate(60, 595)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#64748b">
        LIVE APPS: CivicCoach (USCIS Civics 2026) • Zemen Calendar • ZenPeace (Focus) • Health Tracker
      </text>
    </g>

    <g transform="translate(${width - 60}, 595)">
      <text x="0" y="0" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#f8fafc" letter-spacing="0.5">
        swe-rabia-aziz.vercel.app
      </text>
    </g>
  </svg>
  `;

  const baseSvgBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  // Composite the real logo and the single, clean CivicCoach showcase image (NO OVERLAP!)
  const finalImage = await sharp(baseSvgBuffer)
    .composite([
      // 1. Official Logo in the Header Brand Pill
      {
        input: await sharp(roundedLogo).resize(36, 36).png().toBuffer(),
        top: 58,
        left: 68,
      },
      // 2. Clean Showcase: CivicCoach inside the Window Mockup (Full & Completely unobstructed!)
      {
        input: cleanShowcase,
        top: 192,
        left: 615,
      },
    ])
    .png()
    .toBuffer();

  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image.png');
  fs.writeFileSync(outputPath, finalImage);
  console.log(`✅ Generated clean, non-overlapping og-image at: ${outputPath}`);
}

generateCleanPortfolioOgImage().catch((err) => {
  console.error('❌ Error generating clean og-image:', err);
  process.exit(1);
});
