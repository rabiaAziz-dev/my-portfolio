const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Modern, high-end monochrome obsidian aesthetic matching the portfolio
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090b"/>
        <stop offset="50%" stop-color="#111622"/>
        <stop offset="100%" stop-color="#09090b"/>
      </linearGradient>
      
      <linearGradient id="silver-text" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="50%" stop-color="#e2e8f0"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>

      <linearGradient id="accent-glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#818cf8" stop-opacity="0.8"/>
      </linearGradient>

      <radialGradient id="center-glow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.4"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>
    <rect width="${width}" height="${height}" fill="url(#center-glow)"/>

    <!-- Outer Decorative Border Frame -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>
    <rect x="32" y="32" width="${width - 64}" height="${height - 64}" rx="18" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>

    <!-- Corner Aesthetic Accents -->
    <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.6"/>
    <circle cx="${width - 50}" cy="50" r="3" fill="#ffffff" opacity="0.6"/>
    <circle cx="50" cy="${height - 50}" r="3" fill="#ffffff" opacity="0.6"/>
    <circle cx="${width - 50}" cy="${height - 50}" r="3" fill="#ffffff" opacity="0.6"/>

    <!-- Top Badge Pill -->
    <g transform="translate(80, 80)">
      <rect width="360" height="42" rx="21" fill="#18181b" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1"/>
      <circle cx="24" cy="21" r="5" fill="#10b981"/>
      <text x="38" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#e2e8f0" letter-spacing="1.5">AVAILABLE FOR NEW PROJECTS</text>
    </g>

    <!-- Main Title -->
    <text x="80" y="225" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="900" fill="url(#silver-text)" letter-spacing="-1">
      Rabia Aziz
    </text>

    <!-- Role Subheading -->
    <text x="80" y="285" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">
      Flutter Developer &amp; Mobile App Engineer
    </text>

    <!-- Tagline description -->
    <text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94a3b8" letter-spacing="0">
      Crafting AI-powered cross-platform mobile apps, robust Supabase &amp; Firebase
    </text>
    <text x="80" y="370" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94a3b8" letter-spacing="0">
      backends, and clean, high-performance UI/UX architectures.
    </text>

    <!-- Tech Badges -->
    <g transform="translate(80, 420)">
      <!-- Badge 1: Flutter & Dart -->
      <g transform="translate(0, 0)">
        <rect width="160" height="46" rx="12" fill="#1e293b" fill-opacity="0.8" stroke="#ffffff" stroke-opacity="0.15"/>
        <text x="24" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#f1f5f9">Flutter &amp; Dart</text>
      </g>
      <!-- Badge 2: AI / ML Integration -->
      <g transform="translate(175, 0)">
        <rect width="175" height="46" rx="12" fill="#1e293b" fill-opacity="0.8" stroke="#ffffff" stroke-opacity="0.15"/>
        <text x="24" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#f1f5f9">AI Mobile Apps</text>
      </g>
      <!-- Badge 3: Supabase & Firebase -->
      <g transform="translate(365, 0)">
        <rect width="210" height="46" rx="12" fill="#1e293b" fill-opacity="0.8" stroke="#ffffff" stroke-opacity="0.15"/>
        <text x="24" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#f1f5f9">Supabase &amp; Firebase</text>
      </g>
      <!-- Badge 4: Clean Architecture -->
      <g transform="translate(590, 0)">
        <rect width="190" height="46" rx="12" fill="#1e293b" fill-opacity="0.8" stroke="#ffffff" stroke-opacity="0.15"/>
        <text x="24" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#f1f5f9">Clean Architecture</text>
      </g>
    </g>

    <!-- Bottom Footer Bar -->
    <line x1="80" y1="520" x2="${width - 80}" y2="520" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
    
    <g transform="translate(80, 560)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#64748b">
        FEATURED APPS: CivicCoach • Zemen Calendar • ZenPeace • Health Tracker
      </text>
    </g>

    <g transform="translate(${width - 80}, 560)">
      <text x="0" y="0" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#e2e8f0" letter-spacing="0.5">
        swe-rabia-aziz.vercel.app
      </text>
    </g>
  </svg>
  `;

  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ Generated og-image.png at: ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('❌ Error generating og-image:', err);
  process.exit(1);
});
