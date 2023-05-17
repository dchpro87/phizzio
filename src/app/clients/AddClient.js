'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');

  const { data: session } = useSession();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { userId } = session.user;

    const payload = { name, email, cellphone, userId };

    try {
      const response = await fetch('/api/v1/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!result.ok) throw new Error(result.message);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setMessage(err.message);
      console.log(err.message);
    }
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
              value={name ? name : ''}
              label='Full Name'
              onChange={(e) => {
                setName(e.target.value);
                setIsUpdated(false);
              }}
            />
            <TextField
              id='email'
              size='small'
              name='email'
              type='email'
              value={email ? email : ''}
              label='Email'
              onChange={(e) => {
                setEmail(e.target.value);
                setIsUpdated(false);
              }}
            />
            <TextField
              id='cellphone'
              size='small'
              name='cellphone'
              type='tel'
              value={cellphone ? cellphone : ''}
              label='Cellphone'
              onChange={(e) => {
                setCellphone(e.target.value);
                setIsUpdated(false);
              }}
            />
          </Box>
          {message && (
            <Alert severity='info' sx={{ m: 1 }}>
              {message}
            </Alert>
          )}
          <LoadingButton
            size='small'
            loading={isSubmitting}
            variant='contained'
            type='submit'
            sx={{ bgcolor: btnColor, color: 'text.light' }}
          >
            <span>Add</span>
          </LoadingButton>
        </form>
      </Paper>
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}
