// VideoJS.jsx - Modern implementation with updated Video.js
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Modern Video.js includes HLS support by default
// No need to import additional HLS plugins

const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be inside the component el for React 18 Strict Mode
      const videoElement = document.createElement("video-js");
      
      videoElement.classList.add(
        'vjs-big-play-centered',
        'video-js',
        'vjs-default-skin'
      );
      
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('Player is ready');
        onReady && onReady(player);
      });

    } else {
      const player = playerRef.current;
      
      // Update player with new options
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player style={{ width: '100%' }}>
      <div ref={videoRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default VideoJS;