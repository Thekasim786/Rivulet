const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Paths based on your setup
const videoDir = path.join(__dirname, 'backend/video');
const thumbnailDir = path.join(__dirname, 'backend/thumbnail');

// Ensure thumbnail directory exists
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

// Get first 8 video files
const videoFiles = fs.readdirSync(videoDir)
  .filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file))
  .slice(0, 8);

if (videoFiles.length === 0) {
  console.log('No video files found.');
  process.exit(0);
}

console.log(`Generating thumbnails for ${videoFiles.length} video(s)...`);

videoFiles.forEach((videoFile, index) => {
  const videoPath = path.join(videoDir, videoFile);
  const thumbnailFilename = `${path.parse(videoFile).name}.jpg`;
  const thumbnailPath = path.join(thumbnailDir, thumbnailFilename);

  ffmpeg(videoPath)
    .on('end', () => {
      console.log(`✔️  [${index + 1}] Thumbnail created: ${thumbnailFilename}`);
    })
    .on('error', (err) => {
      console.error(`❌  [${index + 1}] Failed for ${videoFile}:`, err.message);
    })
    .screenshots({
      count: 1,
      folder: thumbnailDir,
      filename: thumbnailFilename,
      size: '320x240',
    });
});
