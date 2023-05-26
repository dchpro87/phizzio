'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { useCreateClientMutation } from '@/store/services/apiSlice';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

import { capitalizeName } from '@/lib/utils';

export default function AddClient({ onCancelClicked }) {
  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [note, setNote] = useState('');

  const { data: session } = useSession();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const [createClient, mutationResult] = useCreateClientMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userId } = session.user;

    const payload = {
      name,
      email,
      cellphone,
      address1,
      city,
      state,
      zip,
      userId,
      note,
    };

    try {
      if (!payload.name || payload.name.trim().length < 3)
        onCancelClicked((prev) => !prev);
      const result = await createClient(payload);
      if (result.error) throw new Error(result.error.data.message);

      onCancelClicked((prev) => !prev);
    } catch (err) {
      setMessage(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <Paper sx={{ p: 2, my: 2 }}>
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
            <TextField
              id='address1'
              size='small'
              name='address1'
              type='text'
              value={address1 ? address1 : ''}
              label='Street Address'
              onChange={(e) => {
                setAddress1(e.target.value);
                setIsUpdated(false);
              }}
            />
            <TextField
              id='city'
              size='small'
              name='city'
              type='text'
              value={city ? city : ''}
              label='Town or suburb'
              onChange={(e) => {
                setCity(e.target.value);
                setIsUpdated(false);
              }}
            />
            <TextField
              id='state'
              size='small'
              name='state'
              type='text'
              value={state ? state : ''}
              label='State / Province / Region'
              onChange={(e) => {
                setState(e.target.value);
                setIsUpdated(false);
              }}
            />
            <TextField
              id='zip'
              size='small'
              name='zip'
              type='text'
              value={zip ? zip : ''}
              label='Code'
              onChange={(e) => {
                setZip(e.target.value);
                setIsUpdated(false);
              }}
            />
            <TextField
              id='note'
              size='small'
              name='note'
              multiline
              type='text'
              rows={3}
              value={note ? note : ''}
              label='Notes'
              onChange={(e) => {
                setNote(e.target.value);
                setIsUpdated(false);
              }}
            />
          </Box>
          {message && (
            <Alert severity='info' sx={{ m: 1 }}>
              {message}
            </Alert>
          )}
          <Stack direction='row' spacing={2}>
            <LoadingButton
              size='small'
              loading={mutationResult.isLoading}
              variant='contained'
              type='submit'
              sx={{ bgcolor: btnColor, color: 'text.light' }}
            >
              <span>Add</span>
            </LoadingButton>
            <Button
              variant='outlined'
              onClick={() => onCancelClicked((prev) => !prev)}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Paper>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
