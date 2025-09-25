import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import VideoCard from './VideoCard';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/videos`);
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        setVideos(data);
        filterVideos(data, searchQuery);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  const filterVideos = (videos, query) => {
    if (query) {
      const filtered = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query)
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  };

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          flexDirection: 'column',
          backgroundColor: '#328e6e',
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body1" sx={{ color: '#e1eebc' }}>
          Please try again later or contact support.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #328e6e, #e1eebc)',
          pt: 4,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#e1eebc',
              textAlign: 'center',
            }}
          >
            Recommended Videos
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <CircularProgress sx={{ color: '#67ae6e' }} />
            </Box>
          ) : filteredVideos.length > 0 ? (
            <Grid container spacing={4}>
              {filteredVideos.map((video) => (
                <Grid item key={video._id} xs={12} sm={6} md={6} lg={4}>
                  <VideoCard video={video} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <Typography variant="h6" sx={{ color: '#90c67c' }}>
                No videos available
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
