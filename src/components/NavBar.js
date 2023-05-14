'use client';
import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Test'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// let status = 'authenticated';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { status } = useSession();
  console.log(status);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    const href = event.currentTarget.innerText.toLowerCase();
    setAnchorElNav(null);
    if (href !== '') router.push(`/${href}`);
  };

  const handleCloseUserMenu = (event) => {
    const href = event.currentTarget.innerText.toLowerCase();
    setAnchorElUser(null);
    if (href === 'logout') signOut();
    // if (href !== '') router.push(`/${href}`);
  };

  return (
    <AppBar position='sticky'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography
            variant='h2'
            noWrap
            component='p'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'secondary.main',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'all .1s ease-in-out',
              },
            }}
          >
            <Link
              href='/'
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              PHIZZIO
            </Link>
          </Typography>
          {status === 'authenticated' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant='h5'
            noWrap
            component='p'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'secondary.main',
              textDecoration: 'none',
              '&:hover': {
                fontSize: '1.8rem',
                transition: 'all .1s ease-in-out',
              },
            }}
          >
            <Link
              href='/'
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              PHIZZIO
            </Link>
          </Typography>
          {status === 'authenticated' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'text.light', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}
          {status === 'unauthenticated' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'text.light', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}
            </Box>
          )}

          {status === 'unauthenticated' && (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant='outlined'
                sx={{
                  color: 'text.light',
                  borderColor: 'text.light',
                  '&:hover': {
                    borderColor: 'text.light',
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            </Box>
          )}
          {status === 'authenticated' && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
