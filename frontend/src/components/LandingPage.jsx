import React from 'react';
import NavbarLogout from './NavbarLogout';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DevicesIcon from '@mui/icons-material/Devices';
import SyncIcon from '@mui/icons-material/Sync';

export default function LandingPage() {
  return (
    <>
      <NavbarLogout />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Stream Your World
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, maxWidth: '700px' }}>
          Dive into a universe of movies, shows, and originals — all in stunning HD and on any device.
        </Typography>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: '#328e6e' }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" textAlign="center" mb={5} color="text.secondary">
          The ultimate entertainment experience at your fingertips.
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4, backgroundColor: '#e1eebc' }}>
              <OndemandVideoIcon sx={{ color: '#328e6e', fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#328e6e' }}>
                  HD Streaming
                </Typography>
                <Typography variant="body2">
                  Enjoy buffer-free high-definition video with adaptive streaming.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4, backgroundColor: '#e1eebc' }}>
              <FavoriteIcon sx={{ color: '#328e6e', fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#328e6e' }}>
                  Personalized Picks
                </Typography>
                <Typography variant="body2">
                  Smart AI curates content you’ll love based on your watch history.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4, backgroundColor: '#e1eebc' }}>
              <DevicesIcon sx={{ color: '#328e6e', fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#328e6e' }}>
                  Watch Anywhere
                </Typography>
                <Typography variant="body2">
                  Stream across mobile, TV, and web with seamless synchronization.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4, backgroundColor: '#e1eebc' }}>
              <SyncIcon sx={{ color: '#328e6e', fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#328e6e' }}>
                  Multi-device Sync
                </Typography>
                <Typography variant="body2">
                  Sync your watchlist across all devices for a seamless experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          backgroundColor: '#328e6e',
          color: '#fff',
          textAlign: 'center',
          py: 6,
          px: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Unlimited Movies, Shows & More
        </Typography>
        <Typography variant="body1">
          Watch anywhere. Cancel anytime. Sign up and get your first month free.
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} BitFlix. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
