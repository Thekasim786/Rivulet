import React from 'react';

const videos = new Array(8).fill({
  title: 'Sample Video',
  channel: 'Demo Channel',
  thumbnail: 'https://via.placeholder.com/300x200'
});

const VideoGrid = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
      {videos.map((video, index) => (
        <div key={index}>
          <img src={video.thumbnail} alt="Thumbnail" style={{ width: '100%' }} />
          <h4 style={{ color: 'white' }}>{video.title}</h4>
          <p style={{ color: 'gray' }}>{video.channel}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
