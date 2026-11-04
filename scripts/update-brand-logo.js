const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function updateAllBrandAssets() {
  const rootDir = path.join(__dirname, '..');
  const sourceLogoPath = path.join(rootDir, 'public', 'images', 'logo.jpg');

  if (!fs.existsSync(sourceLogoPath)) {
    throw new Error(`Source logo not found at ${sourceLogoPath}`);
  }

  console.log('🔄 Processing new brand logo:', sourceLogoPath);

  // 1. Create a circular masked PNG of the new logo for favicons and app icons
  const createCircularLogo = async (size) => {
    const circleMask = Buffer.from(
      `<svg width="${size}" height="${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#ffffff"/>
      </svg>`
    );

    return sharp(sourceLogoPath)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toBuffer();
  };

  // 2. Generate 32x32 Favicon
  const favicon32 = await createCircularLogo(32);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), favicon32);
  fs.writeFileSync(path.join(rootDir, 'app', 'favicon.ico'), favicon32);
  console.log('✅ Updated public/favicon.ico and app/favicon.ico');

  // 3. Generate 192x192 App Icon
  const icon192 = await createCircularLogo(192);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.png'), icon192);
  fs.writeFileSync(path.join(rootDir, 'app', 'icon.png'), icon192);
  console.log('✅ Updated public/icon.png and app/icon.png');

  // 4. Generate 180x180 Apple Touch Icon (Rounded square for iOS)
  const appleTouchSize = 180;
  const roundedSquareMask = Buffer.from(
    `<svg width="${appleTouchSize}" height="${appleTouchSize}">
      <rect x="0" y="0" width="${appleTouchSize}" height="${appleTouchSize}" rx="36" fill="#ffffff"/>
    </svg>`
  );

  const appleTouchIcon = await sharp(sourceLogoPath)
    .resize(appleTouchSize, appleTouchSize, { fit: 'cover' })
    .composite([{ input: roundedSquareMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), appleTouchIcon);
  fs.writeFileSync(path.join(rootDir, 'app', 'apple-icon.png'), appleTouchIcon);
  console.log('✅ Updated public/apple-touch-icon.png and app/apple-icon.png');

  // 5. Create SEO-friendly named copies in public/images
  fs.copyFileSync(sourceLogoPath, path.join(rootDir, 'public', 'images', 'rabia-aziz-logo.jpg'));
  console.log('✅ Created public/images/rabia-aziz-logo.jpg');
}

updateAllBrandAssets().catch((err) => {
  console.error('❌ Error updating brand assets:', err);
  process.exit(1);
});
