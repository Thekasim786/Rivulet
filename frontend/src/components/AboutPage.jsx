import React from 'react';
import NavbarLogout from './NavbarLogout';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function AboutPage() {
  return (
    <>
      <NavbarLogout />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#F5ECD5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            backgroundColor: '#A4B465',
            borderRadius: 4,
            padding: { xs: 3, sm: 6 },
            maxWidth: 800,
            width: '100%',
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#626F47', fontWeight: 'bold' }}
          >
            About Our Platform
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: '#F5ECD5', lineHeight: 1.8, fontSize: '1.1rem' }}
          >

Welcome to BitFlix — where every byte counts and every frame tells a story.

At BitFlix, we're redefining how the world streams video. Built with cutting-edge technology and a passion for seamless user experiences, BitFlix delivers bit-by-bit video streaming that's faster, smarter, and beautifully adaptive. Whether you're watching a film, a short, or a tutorial, our platform ensures smooth playback tailored to your device and connection — no more endless buffering or poor-quality visuals.

🎬 Why BitFlix?
Because we believe quality should never be compromised. Powered by advanced adaptive bitrate streaming (HLS) and smart transcoding, BitFlix dynamically adjusts video delivery so you get the best experience, every time.

🌐 What We Offer:

    Crystal-clear playback with minimal data usage

    Real-time streaming, even on low bandwidth

    Personalized content recommendations

    Secure cloud storage and streaming with modern tech like Cloudinary

    A platform built for creators and viewers alike

📈 Our Mission
To empower creators and delight audiences by providing a platform that streams high-quality content efficiently, one bit at a time.

Whether you're a creator looking to share your story or a viewer searching for your next favorite series — BitFlix is here to bring your screen to life.
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
