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

export default function MyProfile() {
  const [message, setMessage] = useState('');
  const { userId, name, email, cellphone } = useSelector((state) => state.user);
  const [isUpdated, setIsUpdated] = useState(true);

  const dispatch = useDispatch();
  const [updateUserById, mutationResult] = useUpdateUserByIdMutation();

  //  change button color when user updates profile
  //  no validation!!!
  const btnColor = isUpdated ? 'primary.main' : 'warning.main';

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
    setMessage('');

    const payload = { userId, name, email, cellphone };

    try {
      const result = await updateUserById(payload);

      if (result.error) throw new Error(result.error.data.message);
      setIsUpdated(true);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <hr />
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
            value={name}
            label='Full Name'
            onChange={handleNameChange}
          />
          <TextField
            id='email'
            size='small'
            name='email'
            type='email'
            value={email}
            label='Email'
            onChange={handleEmailChange}
          />
          <TextField
            id='cellphone'
            size='small'
            name='cellphone'
            type='text'
            value={cellphone}
            label='Cellphone'
            onChange={handleCellphoneChange}
          />
        </Box>
        {message && <Alert severity='info'>{message}</Alert>}
        <LoadingButton
          size='small'
          loading={mutationResult.isLoading}
          variant='contained'
          type='submit'
          sx={{ bgcolor: btnColor }}
        >
          <span>Confirm</span>
        </LoadingButton>
      </form>
    </>
  );
}
