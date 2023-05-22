'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { useCreateClientMutation } from '@/store/services/apiSlice';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CreateAppointment({ onCancelClicked }) {
  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);

  const { data: session } = useSession();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  // const [createClient, mutationResult] = useCreateClientMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { userId } = session.user;

    // const payload = {};

    // try {
    //   if (!payload.name || payload.name.trim().length < 3)
    //     onCancelClicked((prev) => !prev);
    //   const result = await createClient(payload);
    //   if (result.error) throw new Error(result.error.data.message);

    //   onCancelClicked((prev) => !prev);
    // } catch (err) {
    //   setMessage(err.message);
    //   console.log(err.message);
    // }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h4' component='h4' gutterBottom>
        Set an Appointment
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
          <DateTimePicker
            label='Date'
            // value={dayjs(dateRaised)}
            // onChange={handleDateRaisedChange}
            // sx={{ m: 1 }}
            // slotProps={{ field: { InputProps: { size: 'small' } } }}
            // disabled={isDisabled}
          />
          <FormControl>
            <FormLabel id='demo-row-radio-buttons-group-label'>Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                value='musculoskeletal-disorders'
                control={<Radio />}
                label='Musculoskeletal disorders'
              />
              <FormControlLabel
                value='sports-injuries'
                control={<Radio />}
                label='Sports injuries'
              />
              <FormControlLabel
                value='post-surgical-rehabilitation'
                control={<Radio />}
                label='Post-surgical rehabilitation'
              />
              <FormControlLabel
                value='chronic-pain'
                control={<Radio />}
                label='Chronic pain'
              />
              <FormControlLabel
                value='pediatric'
                control={<Radio />}
                label='Pediatric'
              />
            </RadioGroup>
          </FormControl>
        </Box>
        {message && (
          <Alert severity='info' sx={{ m: 1 }}>
            {message}
          </Alert>
        )}
        <Stack direction='row' spacing={2}>
          <LoadingButton
            size='small'
            // loading={mutationResult.isLoading}
            variant='contained'
            type='submit'
            sx={{ bgcolor: btnColor, color: 'text.light' }}
          >
            <span>Add</span>
          </LoadingButton>
          <Button variant='outlined' onClick={onCancelClicked}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
