require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('./models/Video');

mongoose.connect(process.env.MONGO_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ MongoDB connected');

  const videos = [
    {
      title: 'Video 1',
      description: 'A demo streaming file.',
      filename: 'video1.mp4',
      thumbnail: 'video1.jpg'
    },
    {
      title: 'Video 2',
      description: 'Another streaming demo.',
      filename: 'video2.mp4',
      thumbnail: 'video2.jpg'
    },
    {
      title: 'Video 3',
      description: 'Another streaming demo.',
      filename: 'video3.mp4',
      thumbnail: 'video3.jpg'
    },
    {
      title: 'Video 4',
      description: 'Another streaming demo.',
      filename: 'video4.mp4',
      thumbnail: 'video4.jpg'
    },
    {
      title: 'Video 5',
      description: 'Another streaming demo.',
      filename: 'video5.mp4',
      thumbnail: 'video5.jpg'
    },
    {
      title: 'Video 6',
      description: 'Another streaming demo.',
      filename: 'video6.mp4',
      thumbnail: 'video6.jpg'
    },
    {
      title: 'Video 7',
      description: 'Another streaming demo.',
      filename: 'video7.mp4',
      thumbnail: 'video7.jpg'
    },
    {
      title: 'Video 8',
      description: 'Another streaming demo.',
      filename: 'video8.mp4',
      thumbnail: 'video8.jpg'
    }
  ];

  const insertedVideos = await Video.insertMany(videos);
  console.log('✅ Videos seeded with IDs:');
  insertedVideos.forEach(video => {
    console.log(`- ${video.title}: ${video._id}`);
  });

  mongoose.disconnect();
});
