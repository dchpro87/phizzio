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
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CreateAppointment({ onCancelClicked }) {
  const [dateTime, setDateTime] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [charge, setCharge] = useState(0);
  const [paid, setPaid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [causality, setCausality] = useState('');
  const [treatmentNotes, setTreatmentNotes] = useState('');

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
        New Appointment
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
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox />}
              label='Confirmed'
              onChange={() => setConfirmed((prev) => !prev)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Paid'
              onChange={() => setPaid((prev) => !prev)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Completed'
              onChange={() => setCompleted((prev) => !prev)}
            />
          </FormGroup>
          <TextField
            label='Charge'
            variant='outlined'
            onChange={(e) => setCharge(e.target.value)}
          />

          <DateTimePicker
            label='Date'
            // value={dayjs(dateRaised)}
            onChange={(date) => setDateTime(date.toISOString())}
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
                onChange={(e) => setTreatmentType(e.target.value)}
              />
              <FormControlLabel
                value='sports-injuries'
                control={<Radio />}
                label='Sports injuries'
                onChange={(e) => setTreatmentType(e.target.value)}
              />
              <FormControlLabel
                value='post-surgical-rehabilitation'
                control={<Radio />}
                label='Post-surgical rehabilitation'
                onChange={(e) => setTreatmentType(e.target.value)}
              />
              <FormControlLabel
                value='chronic-pain'
                control={<Radio />}
                label='Chronic pain'
                onChange={(e) => setTreatmentType(e.target.value)}
              />
              <FormControlLabel
                value='pediatric'
                control={<Radio />}
                label='Pediatric'
                onChange={(e) => setTreatmentType(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label='Causality'
            variant='outlined'
            multiline
            rows={2}
            onChange={(e) => setCausality(e.target.value)}
          />
          <TextField
            label='Treatment Notes'
            variant='outlined'
            multiline
            rows={2}
            onChange={(e) => setTreatmentNotes(e.target.value)}
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
