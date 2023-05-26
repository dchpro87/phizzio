import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useUpdatePasswordMutation } from '../../store/services/apiSlice';

export default function ChangePassword() {
  const [message, setMessage] = useState('');
  const { userId } = useSelector((state) => state.user);

  const [updatePassword, mutationResult] = useUpdatePasswordMutation();

  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');

    const enteredCurrentPassword = currentPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (
      enteredNewPassword.trim() !== enteredConfirmPassword.trim() ||
      enteredNewPassword.trim().length < 8
    ) {
      setMessage('New passwords not matching or are less than 8 characters');
      return;
    }

    const userData = {
      userId,
      passwordCurrent: enteredCurrentPassword,
      password: enteredNewPassword,
      passwordConfirm: enteredConfirmPassword,
    };

    try {
      const result = await updatePassword(userData);

      if (result.data.status === 'fail') throw new Error(result.data.message);

      currentPasswordInputRef.current.value = '';
      newPasswordInputRef.current.value = '';
      confirmPasswordInputRef.current.value = '';

      setMessage('Success. Password changed.');
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
            size='small'
            name='currentPassword'
            id='current-password'
            type='password'
            inputRef={currentPasswordInputRef}
            label='Current Password'
            placeholder='••••••••'
          />
          <TextField
            size='small'
            name='newPassword'
            id='new-password'
            type='password'
            inputRef={newPasswordInputRef}
            label='New Password'
            placeholder='••••••••'
          />
          <TextField
            size='small'
            name='confirmPassword'
            id='confirm-password'
            type='password'
            inputRef={confirmPasswordInputRef}
            label='Confirm Password'
            placeholder='••••••••'
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
          sx={{ bgcolor: 'primary.main', color: 'text.light' }}
        >
          <span>Change Password</span>
        </LoadingButton>
      </form>
    </>
  );
}
