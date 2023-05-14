'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import createUser from '../features/create-user';
import { capitalizeName } from '../helpers/validators';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// async function createUser(newUser) {
//   try {
//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       body: JSON.stringify(newUser),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const result = await res.json();

//     if (!res.ok) throw new Error(result.message || 'Something went wrong!');

//     return result;
//   } catch (err) {
//     throw new Error(err.message || 'Something went wrong!');
//   }
// }

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [revealPassword, setRevealPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');

  const router = useRouter();

  let callbackUrl = null;

  function handleSwitchAuthMode() {
    setIsLogin((prevState) => !prevState);
    setMessage('');
  }

  const handleEyeClicked = () => setRevealPassword((prev) => !prev);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (isLogin) {
      const result = await signIn('credentials', {
        email: enteredEmail,
        password: enteredPassword,
        redirect: false,
      });

      if (!result.ok) {
        setMessage('Email or password incorrect!');
        setIsLoading(false);
      }

      if (result.url) {
        const url = new URL(result.url);
        callbackUrl = url.searchParams.get('callbackUrl');
        router.push(callbackUrl ?? '/');
      }
      router.push('/');
    } else {
      // create new user
      try {
        const createNewUser = await createUser({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          passwordConfirm: enteredPasswordConfirm,
        });

        if (createNewUser.status === 'success') {
          await signIn('credentials', {
            email: enteredEmail,
            password: enteredPassword,
            redirect: false,
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setMessage(err.message);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: '35ch', margin: 'auto' }}>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 5,
            p: 2,
            '& .MuiTextField-root': { my: 2 },
          }}
        >
          <Typography variant='h5' component='h1'>
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>
          {!isLogin && (
            <TextField
              size='small'
              id='full-name'
              name='fullName'
              type='text'
              // inputRef={userNameInputRef}
              value={enteredName}
              label='Full Name'
              onChange={(e) => setEnteredName(e.target.value)}
            />
          )}
          <TextField
            size='small'
            id='email'
            name='email'
            type='email'
            required
            // inputRef={emailInputRef}
            value={enteredEmail}
            label='Email'
            autoFocus
            onChange={(e) => setEnteredEmail(e.target.value)}
          />

          <TextField
            size='small'
            id='password'
            name='password'
            type={revealPassword ? 'text' : 'password'}
            required
            // inputRef={passwordInputRef}
            value={enteredPassword}
            label='Password'
            InputProps={{
              endAdornment: (
                <VisibilityOffIcon
                  onClick={handleEyeClicked}
                  sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '10px',
                    color: 'grey.400',
                  }}
                />
              ),
            }}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />

          {!isLogin && (
            <TextField
              size='small'
              id='password-confirm'
              name='password'
              type={revealPassword ? 'text' : 'password'}
              // inputRef={passwordConfirmInputRef}
              value={enteredPasswordConfirm}
              label='Confirm Password'
              onChange={(e) => setEnteredPasswordConfirm(e.target.value)}
            />
          )}
          {message && <Alert severity='info'>{message}</Alert>}
          <LoadingButton
            disabled={!formIsValid}
            loading={isLoading}
            variant='contained'
            type='submit'
            sx={{ my: 2, color: 'text.light' }}
          >
            <span>{isLogin ? 'Login' : 'Create Account'}</span>
          </LoadingButton>
          <Button variant='text' type='button' onClick={handleSwitchAuthMode}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Box>
      </Paper>
      <br />
      <br />
      <br />
    </>
  );
}
