import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

const getThumbnail = () => {
  console.log(video.thumbnail);
  return video.thumbnail
    ? `http://localhost:5500/thumbnails/${video.thumbnail}`
    : '/api/placeholder/480/270'; // fallback
};


  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 6,
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
        },
      }}
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={getThumbnail()}
          alt={video.title}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.1)',
            opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '15px solid white',
                marginLeft: '5px',
              }}
            />
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          component="h3"
          noWrap
          sx={{
            fontWeight: 600,
            color: '#212121',
            fontSize: '1rem',
          }}
        >
          {video.title}
        </Typography>
        {video.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mt: 1,
              fontSize: '0.9rem',
            }}
          >
            {video.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
