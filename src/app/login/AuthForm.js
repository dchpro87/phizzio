'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import createUser from '../../features/create-user';
import { capitalizeName } from '../../lib/utils';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryStr = Object.fromEntries(searchParams);

  const [isLogin, setIsLogin] = useState(
    queryStr.signUp === 'true' ? false : true
  );
  const [revealPassword, setRevealPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [enteredName, setEnteredName] = useState(queryStr.name ?? '');
  const [enteredEmail, setEnteredEmail] = useState(queryStr.email ?? '');
  const [enteredPassword, setEnteredPassword] = useState(
    queryStr.password ?? ''
  );
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState(
    queryStr.password ?? ''
  );

  let callbackUrl = null;
  const isDemo = queryStr.email === 'demo@phizzio.com';

  function handleSwitchAuthMode() {
    setIsLogin((prevState) => !prevState);
    setMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (isLogin && !isDemo) {
      const result = await signIn('credentials', {
        email: enteredEmail,
        password: enteredPassword,
        redirect: false,
      });

      if (!result.ok || result.error) {
        setMessage(result.error || 'Email or password incorrect!');
        setIsLoading(false);
      }

      if (result.url) {
        const url = new URL(result.url);
        callbackUrl = url.searchParams.get('callbackUrl');
        router.push(callbackUrl ?? '/');
      }
    } else {
      try {
        const randomNum = Math.floor(Math.random() * 10000);

        const createNewUser = await createUser({
          name: capitalizeName(enteredName),
          email: queryStr.email ? `demo${randomNum}@phizzio.com` : enteredEmail,
          password: enteredPassword,
          passwordConfirm: queryStr.password
            ? enteredPassword
            : enteredPasswordConfirm,
        });

        if (createNewUser.status === 'success') {
          console.log('New user created successfully!');
          const result = await signIn('credentials', {
            email: queryStr.email
              ? `demo${randomNum}@phizzio.com`
              : enteredEmail,
            password: enteredPassword,
            redirect: false,
          });

          if (result.url) {
            const url = new URL(result.url);
            callbackUrl = url.searchParams.get('callbackUrl');
            router.push(callbackUrl ?? '/');
          }
          router.push('/');
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
            disabled={isDemo}
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
            disabled={isDemo}
            // inputRef={passwordInputRef}
            value={enteredPassword}
            label='Password'
            InputProps={{
              endAdornment: (
                <VisibilityOffIcon
                  onClick={() => {
                    !isDemo ? setRevealPassword((prev) => !prev) : null;
                  }}
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
            loading={isLoading}
            variant='contained'
            type='submit'
            sx={{ my: 2, color: 'text.light' }}
          >
            <span>{isLogin ? 'Login' : 'Create Account'}</span>
          </LoadingButton>
          <Button
            variant='text'
            type='button'
            disabled={isDemo}
            onClick={handleSwitchAuthMode}
          >
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
