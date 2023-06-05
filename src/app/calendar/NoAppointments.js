'use client';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function NoAppontments() {
  const router = useRouter();

  return (
    <>
      {/* <Container maxWidth='sm'> */}
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='subtitle1' component='h3' gutterBottom>
          No appointments found. Click Clients and set some up
        </Typography>
        <Button
          variant='contained'
          sx={{ color: 'text.light' }}
          onClick={() => router.push('/clients')}
        >
          Clients
        </Button>
      </Paper>
      {/* </Container> */}
    </>
  );
}
