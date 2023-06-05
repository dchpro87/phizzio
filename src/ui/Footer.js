'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'common.black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '4rem',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Typography variant='body2' align='center' sx={{ color: 'text.light' }}>
        This app is under development - June 2023.
      </Typography>
      <Link href='https://github.com/dchpro87/phizzio' target='_blank'>
        <GitHubIcon sx={{ color: 'text.light', marginLeft: '0.5rem' }} />
      </Link>
    </Box>
  );
}
