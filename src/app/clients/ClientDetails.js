'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from '@/store/services/apiSlice';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Dialog from '@/ui/Dialog';

export default function ClientDetals({ client, resetClickedClientId }) {
  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [expandClientUpdate, setExpandClientUpdate] = useState(false);

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [cellphone, setCellphone] = useState(client.cellphone);
  const [address1, setAddress1] = useState(client.address1);
  const [city, setCity] = useState(client.city);
  const [state, setState] = useState(client.state);
  const [zip, setZip] = useState(client.zip);
  const [note, setNote] = useState(client.note);

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
      resetClickedClientId();
    } catch (err) {
      setMessage(err.message);
      console.log(err);
    }
  };

  const handleSubmitClientDetails = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      cellphone,
      address1,
      city,
      state,
      zip,
      clientId: client.id,
      note,
    };

    try {
      if (payload.name.trim().length < 3) {
        resetClickedClientId();
        return;
      }
      const result = await updateClient(payload);

      if (result.error) throw new Error(result.error.data.message);

      resetClickedClientId();
    } catch (err) {
      setMessage(err.message);
      console.log(err.message);
    }
  };

  // const handleSubmitAppointment = async (event) => {
  //   event.preventDefault();

  //   const payload = {};

  //   try {
  //     if (!payload.name || payload.name.trim().length < 3)
  //       resetClickedClientId((prev) => !prev);
  //     const result = await updateClient(payload);

  //     if (result.error) throw new Error(result.error.data.message);

  //     resetClickedClientId((prev) => !prev);
  //   } catch (err) {
  //     setMessage(err.message);
  //     console.log(err.message);
  //   }
  // };

  return (
    <>
      <Dialog
        showDialog={showDialog}
        closeDialog={() => setShowDialog((prev) => !prev)}
        content='Delete this client?'
        onConfirm={handleDeleteClient}
      />

      <Accordion expanded={expandClientUpdate}>
        <AccordionSummary
          onClick={() => setExpandClientUpdate((prev) => !prev)}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ backgroundColor: 'primary.main', color: 'text.light' }}
        >
          <Typography variant='h4' component='h4'>
            Info
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <form onSubmit={handleSubmitClientDetails}>
            <Box
              mb={2}
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
                label='State or Province'
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
                sx={{ backgroundColor: btnColor, color: 'text.light' }}
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
              <Button
                variant='outlined'
                // onClick={() => resetClickedClientId((prev) => !prev)}
                onClick={() => setExpandClientUpdate((prev) => !prev)}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
