'use client';
import { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function AddClient() {
  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('submit clicked');
  };

  return (
    <Container maxWidth='sm'>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant='h3' component='h3' gutterBottom>
          Add a client
        </Typography>

        <Divider />

        <form onSubmit={handleSubmit}>
          <Box
            my={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { my: 1 },
            }}
          >
            <TextField
              id='full-name'
              size='small'
              name='fullName'
              type='text'
              // value={name ? name : ''}
              label='Full Name'
              // onChange={handleNameChange}
            />
            <TextField
              id='email'
              size='small'
              name='email'
              type='email'
              // value={name ? name : ''}
              label='Email'
              // onChange={handleNameChange}
            />
            <TextField
              id='cellphone'
              size='small'
              name='cellphone'
              type='tel'
              // value={name ? name : ''}
              label='Cellphone'
              // onChange={handleNameChange}
            />
          </Box>
          {message && (
            <Alert severity='info' sx={{ m: 1 }}>
              {message}
            </Alert>
          )}
          <LoadingButton
            size='small'
            // loading={mutationResult.isLoading}
            variant='contained'
            type='submit'
            sx={{ bgcolor: btnColor, color: 'text.light' }}
          >
            <span>Add</span>
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
}
