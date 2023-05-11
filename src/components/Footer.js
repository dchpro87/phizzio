'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        By continuing, you agree to our Terms of Use and Privacy Policy.
      </Typography>
    </Box>
  );
}
