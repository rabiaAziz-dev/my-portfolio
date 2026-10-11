const sharp = require('sharp');
const fs = require('fs');

async function inspect() {
  const p1 = 'C:/Users/TECH-BUDDY404SP/.gemini/antigravity-ide/brain/21dfc8db-a6b0-41e4-a476-7a45062af1e8/media__1791643103732.png';
  const p2 = 'C:/Users/TECH-BUDDY404SP/.gemini/antigravity-ide/brain/21dfc8db-a6b0-41e4-a476-7a45062af1e8/media__1791643146608.png';
  const p3 = 'C:/Users/TECH-BUDDY404SP/.gemini/antigravity-ide/brain/21dfc8db-a6b0-41e4-a476-7a45062af1e8/media__1791643157500.png';

  // Let's inspect p2 (Dashboard)
  // In p2, the screen is roughly in the center lower portion
  // Let's extract various crops and check their size
  const m2 = await sharp(p2).metadata();
  console.log('Image 2 size:', m2.width, m2.height);

  // In p2, let's look at the phone bezel:
  // The phone starts around y=160 and extends to bottom
  // Let's save a test crop of the phone area
  await sharp(p2)
    .extract({ left: 45, top: 160, width: 243, height: 432 })
    .toFile('d:/my-portfolio/crop2_test.png');
  console.log('crop2_test created');
}

inspect().catch(console.error);
