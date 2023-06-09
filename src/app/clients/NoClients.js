'use client';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function NoClients({ onAddClicked }) {
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
          No Clients found. Add some.
        </Typography>
        <Button
          variant='contained'
          sx={{ color: 'text.light' }}
          onClick={onAddClicked}
        >
          Add a client
        </Button>
      </Paper>
      {/* </Container> */}
    </>
  );
}
