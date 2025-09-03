import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Theme colors
const themeColors = {
  primary: '#246956',
  hover: '#67ae6e',
  text: '#e1eebc',
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#ffffff', 0.15),
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(13),
    width: '1500px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: themeColors.text,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavbarLogout() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate('/about')}>
        <p>About</p>
      </MenuItem>
      <MenuItem onClick={() => navigate('/contact')}>
        <p>Contact</p>
      </MenuItem>
      <MenuItem onClick={() => navigate('/')}>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" sx={{ color: themeColors.primary }}>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: themeColors.primary,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar>
          {/* <IconButton size="large" edge="start" sx={{ mr: 2, color: themeColors.text }}>
            <MenuIcon />
          </IconButton> */}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: themeColors.text, display: { xs: 'none', sm: 'block' } }}
          >
            Bitflix
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 4 }}>
            <Button sx={{ color: themeColors.text }} onClick={() => navigate('/')}>Home</Button>
            <Button sx={{ color: themeColors.text }} onClick={() => navigate('/about')}>About</Button>
            <Button sx={{ color: themeColors.text }} onClick={() => navigate('/contact')}>Contact</Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              variant="outlined"
              sx={{
                color: themeColors.text,
                borderColor: themeColors.text,
                '&:hover': {
                  borderColor: themeColors.hover,
                  color: themeColors.hover,
                },
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: themeColors.text,
                borderColor: themeColors.text,
                '&:hover': {
                  borderColor: themeColors.hover,
                  color: themeColors.hover,
                },
              }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: themeColors.text }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
