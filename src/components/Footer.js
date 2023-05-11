'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      sx={{
        height: '4rem',
        bgcolor: 'common.black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'fixed',
        bottom: 'fixed',
      }}
    >
      <Typography variant='body2' align='center' sx={{ color: 'text.light' }}>
        By continuing, you agree to our Terms of Use and Privacy Policy.
      </Typography>
    </Box>
  );
}
