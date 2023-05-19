'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { useGetUserByIdQuery } from '@/store/services/apiSlice';

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
import MessageIcon from '@mui/icons-material/Message';

import Dialog from './Dialog';
import CommentDialog from './CommentDialog';

const pages = ['Clients'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const userId = session?.user?.userId;

  useGetUserByIdQuery(userId);

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
    if (href === 'logout') setShowDialog(true);
    if (href === 'profile') router.push(`/${href}`);
  };

  return (
    <AppBar position='sticky'>
      <Dialog
        showDialog={showDialog}
        closeDialog={() => setShowDialog((prev) => !prev)}
        content='Log out of PHIZZIO?'
        onConfirm={() => signOut({ callBackUrl: '/', redirect: true })}
      />
      <CommentDialog
        showDialog={showCommentDialog}
        closeDialog={() => setShowCommentDialog((prev) => !prev)}
        onSend={() => {}}
      />
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link href='/' passHref>
              <Image
                src='/phizzio-logo-word.png'
                alt='PHIZZIO logo'
                width={160}
                height={38}
              />
            </Link>
          </Box>
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
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <Link href='/' passHref>
              <Image
                src='/phizzio-logo-word.png'
                alt='PHIZZIO logo'
                width={140}
                height={34}
              />
            </Link>
          </Box>

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
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            ></Box>
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
          <Tooltip arrow title='Send comments to the development dudes'>
            <MessageIcon
              sx={{
                mr: 2,
                color: 'grey.200',
                '&:hover': { color: 'action.hover', cursor: 'pointer' },
              }}
              onClick={() => setShowCommentDialog((prev) => !prev)}
            />
          </Tooltip>
          {status === 'authenticated' && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${name}`}
                  src=''
                  sx={{ bgcolor: 'secondary.main' }}
                >
                  {name && name.at(0).toUpperCase()}
                </Avatar>
              </IconButton>
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
