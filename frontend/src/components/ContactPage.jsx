import React from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

export default function ContactPage() {
  return (
    <Container
      sx={{
        py: 8,
        backgroundColor: '#F5ECD5',
        minHeight: '100vh',
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: '#626F47' }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 4, color: '#626F47' }}
      >
        Have questions? We're here to help!
      </Typography>

      <Box
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          backgroundColor: '#A4B465',
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#F5ECD5' } }}
          InputProps={{
            style: {
              color: '#F5ECD5',
              borderColor: '#F5ECD5',
            },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#F5ECD5' } }}
          InputProps={{
            style: {
              color: '#F5ECD5',
              borderColor: '#F5ECD5',
            },
          }}
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#F5ECD5' } }}
          InputProps={{
            style: {
              color: '#F5ECD5',
              borderColor: '#F5ECD5',
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#F0BB78',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#e3aa67',
            },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
}
