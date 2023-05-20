'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from '@/store/services/apiSlice';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Dialog from '@/ui/Dialog';

export default function UpdateClient({ client, onCancelClicked }) {
  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [cellphone, setCellphone] = useState(client.cellphone);

  const { status } = useSession();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const [updateClient, mutationResult] = useUpdateClientMutation();
  const [deleteClient, deleteResult] = useDeleteClientMutation();

  if (status === 'unauthenticated') signIn();

  const handleDeleteClient = async () => {
    try {
      setShowDialog((prev) => !prev);
      const payload = { clientId: client.id };

      const result = await deleteClient(payload).unwrap();

      if (result.error) throw new Error(result.error.data.message);
      onCancelClicked((prev) => !prev);
    } catch (err) {
      setMessage(err.message);
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { name, email, cellphone, clientId: client.id };

    try {
      if (!payload.name || payload.name.trim().length < 3)
        onCancelClicked((prev) => !prev);
      const result = await updateClient(payload);

      if (result.error) throw new Error(result.error.data.message);

      onCancelClicked((prev) => !prev);
    } catch (err) {
      setMessage(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <Dialog
        showDialog={showDialog}
        closeDialog={() => setShowDialog((prev) => !prev)}
        content='Delete this client?'
        onConfirm={handleDeleteClient}
      />
      {/* <Paper
        sx={{
          p: 2,
        }}
      > */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h3' component='h3' gutterBottom>
            {client.name}
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
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
            <Stack direction='row' spacing={2}>
              <LoadingButton
                size='small'
                loading={mutationResult.isLoading}
                variant='contained'
                type='submit'
                sx={{ bgcolor: btnColor, color: 'text.light' }}
              >
                <span>Update</span>
              </LoadingButton>
              <LoadingButton
                size='small'
                loading={deleteResult.isLoading}
                variant='outlined'
                onClick={() => setShowDialog((prev) => !prev)}
              >
                <span>Delete</span>
              </LoadingButton>
              {/* <Button
              variant='outlined'
            >
              Delete Client
            </Button> */}
              <Button
                variant='outlined'
                onClick={() => onCancelClicked((prev) => !prev)}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
      {/* </Paper> */}
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
