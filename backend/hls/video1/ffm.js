const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function convertToHLS(inputPath, outputDir, callback) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const command = `
    ffmpeg -i "${inputPath}" \
    -filter_complex "[0:v]split=3[v1][v2][v3]; \
    [v1]scale=w=426:h=240[v1out]; \
    [v2]scale=w=640:h=360[v2out]; \
    [v3]scale=w=1280:h=720[v3out]" \
    -map "[v1out]" -c:v:0 libx264 -b:v:0 400k \
    -map "[v2out]" -c:v:1 libx264 -b:v:1 800k \
    -map "[v3out]" -c:v:2 libx264 -b:v:2 1400k \
    -map a:0 -c:a aac -ac 2 \
    -f hls -hls_time 6 -hls_list_size 0 -hls_segment_filename "${outputDir}/v%v/segment_%03d.ts" \
    -master_pl_name master.m3u8 \
    -var_stream_map "v:0,a:0 v:1,a:0 v:2,a:0" \
    "${outputDir}/v%v/prog.m3u8"
  `;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('FFmpeg error:', stderr);
      callback(error);
    } else {
      console.log('HLS conversion complete');
      callback(null);
    }
  });
}

// Example usage:
const input = path.join(__dirname, 'uploads', 'video.mp4');
const output = path.join(__dirname, 'hls_output', 'video123');

convertToHLS(input, output, (err) => {
  if (err) console.error('Failed to convert');
  else console.log('Success!');
});
