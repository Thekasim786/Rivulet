// VideoPlayerPage.jsx - Updated with integrated quality selector
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
  Alert,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import VideoJS from "./VideoJS";


const VideoPlayerPage = () => {
  const apiUrl = import.meta.env.VITE_VIDEO_BASE_URL;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const { id } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streamError, setStreamError] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setError(err.response?.data?.error || "Failed to fetch video details");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleBack = () => navigate("/");

  // Video options with quality selector plugin
  const videoJsOptions = useMemo(() => {
    if (!video) return null;

    return {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      preload: 'metadata',
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      poster: video.thumbnail ? `${apiUrl}/thumbnails/${video.thumbnail}` : null,
      sources: [
        {
          //src: `http://localhost:5500/videos/${video.filename}/master.m3u8`,
          src: `${apiUrl}/video/${video.filename}/master.m3u8`,
          type: "application/x-mpegURL"
        }
      ],
      html5: {
        hls: {
          withCredentials: false,
          overrideNative: true
        }
      },
      techOrder: ['html5']
    };
  }, [video]);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    setPlayerReady(true);
    
    console.log('Player ready');
    
    player.ready(() => {
      setStreamError(null);
      
      // Enhanced error handling
      player.on('error', () => {
        const error = player.error();
        if (error) {
          console.error('Player error:', error);
          let errorMessage = 'Playback error occurred';
          
          switch (error.code) {
            case 1:
              errorMessage = 'Video loading aborted';
              break;
            case 2:
              errorMessage = 'Network error - check your connection';
              break;
            case 3:
              errorMessage = 'Video decode error';
              break;
            case 4:
              errorMessage = 'Video not supported';
              break;
            default:
              errorMessage = error.message || 'Unknown playback error';
          }
          
          setStreamError(errorMessage);
        }
      });

      player.on('loadstart', () => {
        console.log('Loading started');
        setStreamError(null);
      });

      player.on('loadedmetadata', () => {
        console.log('Metadata loaded');
        // Add quality selector after metadata is loaded
        addQualitySelector(player);
      });

      player.on('canplay', () => {
        console.log('Can start playing');
      });

      // Modern Video.js VHS error handling
      const tech = player.tech();
      if (tech && tech.vhs) {
        tech.vhs.on('error', (event, data) => {
          console.error('VHS Error:', data);
          setStreamError(`Streaming Error: ${data.type || 'Unknown error'}`);
        });
      }
    });
  };

  const addQualitySelector = (player) => {
    // Wait for HLS to initialize and quality levels to be available
    const checkForQualityLevels = () => {
      const qualityLevels = player.qualityLevels && player.qualityLevels();
      
      if (qualityLevels && qualityLevels.length > 1) {
        console.log(`Found ${qualityLevels.length} quality levels`);
        createQualityButton(player, qualityLevels);
      } else {
        // Check VHS tech as fallback
        const tech = player.tech();
        if (tech && tech.vhs && tech.vhs.playlists && tech.vhs.playlists.media_) {
          const playlists = tech.vhs.playlists.media_;
          if (playlists.length > 1) {
            console.log(`Found ${playlists.length} VHS playlists`);
            createQualityButtonFromVHS(player, playlists);
          } else {
            // Retry after delay
            setTimeout(checkForQualityLevels, 2000);
          }
        } else {
          // Retry after delay
          setTimeout(checkForQualityLevels, 2000);
        }
      }
    };

    // Start checking after a delay
    setTimeout(checkForQualityLevels, 1500);
  };

  const createQualityButton = (player, qualityLevels) => {
    const controlBar = player.getChild('controlBar');
    if (!controlBar) return;

    // Remove existing quality button if it exists
    const existingButton = controlBar.getChild('customQualityButton');
    if (existingButton) {
      controlBar.removeChild(existingButton);
    }

    // Create a simple button element
    const qualityButton = document.createElement('button');
    qualityButton.className = 'vjs-control vjs-button vjs-quality-button';
    qualityButton.type = 'button';
    qualityButton.setAttribute('title', 'Quality');
    qualityButton.setAttribute('aria-label', 'Quality');
    qualityButton.innerHTML = `
      <span class="vjs-control-text">Quality</span>
      <span class="vjs-quality-text">HD</span>
    `;

    // Create dropdown menu
    const qualityMenu = document.createElement('div');
    qualityMenu.className = 'vjs-quality-menu';
    qualityMenu.style.cssText = `
      position: absolute;
      bottom: 100%;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      border-radius: 4px;
      padding: 8px 0;
      min-width: 80px;
      display: none;
      z-index: 1000;
    `;

    // Add Auto option
    const autoOption = document.createElement('div');
    autoOption.className = 'vjs-quality-option vjs-quality-selected';
    autoOption.textContent = 'Auto';
    autoOption.style.cssText = `
      padding: 8px 16px;
      cursor: pointer;
      color: white;
      font-size: 13px;
    `;
    autoOption.onclick = () => setQuality(player, qualityLevels, -1, 'Auto');
    qualityMenu.appendChild(autoOption);

    // Add quality options
    const qualities = [];
    for (let i = 0; i < qualityLevels.length; i++) {
      const level = qualityLevels[i];
      if (level.height) {
        qualities.push({ level: i, height: level.height, label: `${level.height}p` });
      }
    }

    // Sort by height (descending)
    qualities.sort((a, b) => b.height - a.height);

    qualities.forEach(({ level, label }) => {
      const option = document.createElement('div');
      option.className = 'vjs-quality-option';
      option.textContent = label;
      option.style.cssText = `
        padding: 8px 16px;
        cursor: pointer;
        color: white;
        font-size: 13px;
      `;
      option.onclick = () => setQuality(player, qualityLevels, level, label);
      qualityMenu.appendChild(option);
    });

    // Style menu options on hover
    const style = document.createElement('style');
    style.textContent = `
      .vjs-quality-option:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
      }
      .vjs-quality-selected {
        background-color: #007acc !important;
      }
      .vjs-quality-button {
        position: relative;
      }
      .vjs-quality-text {
        font-size: 11px;
        font-weight: bold;
        color: white;
      }
    `;
    document.head.appendChild(style);

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'relative';
    buttonContainer.appendChild(qualityButton);
    buttonContainer.appendChild(qualityMenu);

    // Toggle menu on click
    qualityButton.onclick = (e) => {
      e.stopPropagation();
      const isVisible = qualityMenu.style.display !== 'none';
      qualityMenu.style.display = isVisible ? 'none' : 'block';
    };

    // Close menu when clicking outside
    document.addEventListener('click', () => {
      qualityMenu.style.display = 'none';
    });

    // Insert button before fullscreen button
    const fullscreenToggle = controlBar.el().querySelector('.vjs-fullscreen-control');
    if (fullscreenToggle) {
      controlBar.el().insertBefore(buttonContainer, fullscreenToggle);
    } else {
      controlBar.el().appendChild(buttonContainer);
    }

    console.log('Quality selector button added successfully');
  };

  const createQualityButtonFromVHS = (player, playlists) => {
    // Similar implementation but for VHS playlists
    const controlBar = player.getChild('controlBar');
    if (!controlBar) return;

    // Create quality data from playlists
    const qualities = [];
    playlists.forEach((playlist, index) => {
      if (playlist.attributes && playlist.attributes.RESOLUTION) {
        const resolution = playlist.attributes.RESOLUTION;
        qualities.push({
          level: index,
          height: resolution.height,
          label: `${resolution.height}p`
        });
      }
    });

    if (qualities.length > 1) {
      // Use the same button creation logic but with VHS switching
      createQualityButton(player, { length: qualities.length, qualities });
    }
  };

  const setQuality = (player, qualityLevels, level, label) => {
    if (level === -1) {
      // Auto quality - enable all levels
      for (let i = 0; i < qualityLevels.length; i++) {
        qualityLevels[i].enabled = true;
      }
      console.log('Quality set to Auto');
    } else {
      // Specific quality - disable all others, enable selected
      for (let i = 0; i < qualityLevels.length; i++) {
        qualityLevels[i].enabled = (i === level);
      }
      console.log(`Quality set to ${label}`);
    }

    // Update button text
    const qualityText = document.querySelector('.vjs-quality-text');
    if (qualityText) {
      qualityText.textContent = label === 'Auto' ? 'HD' : label.replace('p', '');
    }

    // Update selected option
    document.querySelectorAll('.vjs-quality-option').forEach(option => {
      option.classList.remove('vjs-quality-selected');
      if (option.textContent === label) {
        option.classList.add('vjs-quality-selected');
      }
    });

    // Close menu
    const menu = document.querySelector('.vjs-quality-menu');
    if (menu) {
      menu.style.display = 'none';
    }
  };



  const retryStream = () => {
    const player = playerRef.current;
    if (player) {
      setStreamError(null);
      player.load();
      console.log('Retrying stream...');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading video...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />} variant="contained">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F5ECD5", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Stream Error Alert */}
        {streamError && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }} 
            action={
              <Button color="inherit" size="small" onClick={retryStream}>
                Retry
              </Button>
            }
          >
            {streamError}
          </Alert>
        )}

        {/* Video Player */}
        <Paper elevation={3} sx={{ borderRadius: "8px", overflow: "hidden", mb: 3 }}>
          {videoJsOptions && (
            <VideoJS 
              options={videoJsOptions} 
              onReady={handlePlayerReady}
            />
          )}
        </Paper>

        {/* Video Information */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {video?.title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {video?.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {video.description}
          </Typography>
        )}
      </Container>
      
      {/* Custom CSS for quality button styling */}
      <style>{`
        .vjs-quality-button {
          font-family: 'Roboto', Arial, sans-serif;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          position: relative;
        }
        
        .vjs-quality-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .vjs-quality-text {
          font-size: 11px;
          font-weight: bold;
          color: white;
        }
        
        .vjs-quality-menu {
          position: absolute;
          bottom: 100%;
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 4px;
          padding: 8px 0;
          min-width: 80px;
          display: none;
          z-index: 1000;
        }
        
        .vjs-quality-option {
          padding: 8px 16px;
          cursor: pointer;
          color: white;
          font-size: 13px;
        }
        
        .vjs-quality-option:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .vjs-quality-selected {
          background-color: #007acc;
        }
      `}</style>
    </Box>
  );
};

export default VideoPlayerPage;