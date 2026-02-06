const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// List all the folders that contain heavy images
const FOLDERS_TO_PROCESS = [
  './public/images/specialoffers',
  './public/images/personas',
  './public/images/map'
];

async function optimizeImages() {
  for (const folder of FOLDERS_TO_PROCESS) {
    if (!fs.existsSync(folder)) {
      console.log(`⚠️ Folder skipped (not found): ${folder}`);
      continue;
    }

    console.log(`\n📂 Entering: ${folder}`);
    const files = fs.readdirSync(folder);
    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png)$/i));

    for (const file of imageFiles) {
      const filePath = path.join(folder, file);
      const originalStats = fs.statSync(filePath);

      // Only process if the file is larger than 500KB (optional safety)
      if (originalStats.size < 500 * 1024) {
        console.log(`⏩ Skipping ${file} (Already small: ${(originalStats.size / 1024).toFixed(0)} KB)`);
        continue;
      }

      console.log(`⚙️ Processing: ${file} (${(originalStats.size / 1024 / 1024).toFixed(2)} MB)`);

      try {
        const buffer = await sharp(filePath)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();

        fs.writeFileSync(filePath, buffer);
        const newStats = fs.statSync(filePath);
        console.log(`   ✅ Success! Now ${(newStats.size / 1024).toFixed(0)} KB`);
      } catch (err) {
        console.error(`   ❌ Error processing ${file}:`, err.message);
      }
    }
  }
  console.log("\n✨ All folders processed!");
}

optimizeImages().catch(console.error);