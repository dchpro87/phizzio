'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { useUpdateUserByIdMutation } from '../../store/services/apiSlice';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { capitalizeName } from '../../lib/utils';

export default function MyProfile({ user }) {
  const [message, setMessage] = useState('');

  const [isUpdated, setIsUpdated] = useState(true);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cellphone, setCellphone] = useState(user.cellphone);

  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const [updateUserById, mutationResult] = useUpdateUserByIdMutation();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const handleNameChange = (event) => {
    setIsUpdated(false);
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setIsUpdated(false);
    setEmail(event.target.value);
  };
  const handleCellphoneChange = (event) => {
    setIsUpdated(false);
    setCellphone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdated) return;

    setMessage('');

    const payload = { userId, name: capitalizeName(name), email, cellphone };

    try {
      if (!payload.email || !/\S+@\S+\.\S+/.test(payload.email))
        throw new Error('Please provide a valid email');

      const result = await updateUserById(payload);

      if (result.status === 'fail') throw new Error(result.message);
      setIsUpdated(true);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
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
            onChange={handleNameChange}
          />
          <TextField
            id='email'
            size='small'
            name='email'
            type='email'
            value={email ? email : ''}
            label='Email'
            onChange={handleEmailChange}
          />
          <TextField
            id='cellphone'
            size='small'
            name='cellphone'
            type='tel'
            value={cellphone ? cellphone : ''}
            label='Cellphone'
            onChange={handleCellphoneChange}
          />
        </Box>
        {message && (
          <Alert severity='info' sx={{ m: 1 }}>
            {message}
          </Alert>
        )}
        <LoadingButton
          size='small'
          loading={mutationResult.isLoading}
          variant='contained'
          type='submit'
          sx={{ bgcolor: btnColor, color: 'text.light' }}
        >
          <span>Update</span>
        </LoadingButton>
      </form>
    </>
  );
}
