'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  updateUserName,
  updateUserEmail,
  updateUserCellphone,
} from '../../store/features/user/userSlice';
import { useUpdateUserByIdMutation } from '../../store/services/apiSlice';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { capitalizeName } from '../../lib/utils';

export default function MyProfile() {
  const [message, setMessage] = useState('');
  const { userId, name, email, cellphone } = useSelector((state) => state.user);
  const [isUpdated, setIsUpdated] = useState(true);

  const dispatch = useDispatch();
  const [updateUserById, mutationResult] = useUpdateUserByIdMutation();

  //  change button color when user updates profile
  //  no validation!!!
  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const handleNameChange = (event) => {
    setIsUpdated(false);
    dispatch(updateUserName({ name: event.target.value }));
  };
  const handleEmailChange = (event) => {
    setIsUpdated(false);
    dispatch(updateUserEmail({ email: event.target.value }));
  };
  const handleCellphoneChange = (event) => {
    setIsUpdated(false);
    dispatch(updateUserCellphone({ cellphone: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdated) return;

    setMessage('');

    const payload = { userId, name: capitalizeName(name), email, cellphone };

    try {
      //  check email and cellphone are valid
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
        {/* <hr /> */}
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
            type='text'
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
