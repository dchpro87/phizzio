'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { useCreateAppointmentMutation } from '@/store/services/apiSlice';

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
import InputAdornment from '@mui/material/InputAdornment';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CreateAppointment({ onCancelClicked, clientId }) {
  const [dateTime, setDateTime] = useState('');
  const [treatmentType, setTreatmentType] = useState('Sports injuries');
  const [confirmed, setConfirmed] = useState(false);
  const [charge, setCharge] = useState(0);
  const [paid, setPaid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [causality, setCausality] = useState('');
  const [treatmentNote, setTreatmentNotes] = useState('');

  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);

  const { data: session } = useSession();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const [createAppointment, createAppointmentResult] =
    useCreateAppointmentMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userId } = session.user;

    const payload = {
      userId,
      clientId,
      dateTime,
      treatmentType,
      confirmed,
      charge,
      paid,
      completed,
      causality,
      treatmentNote,
    };

    try {
      if (!dateTime) setMessage('Please select a date and time');

      const result = await createAppointment(payload);
      if (result.error) throw new Error(result.error.data.message);

      onCancelClicked();
    } catch (err) {
      setMessage(err.message);
      console.log(err.message);
    }
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
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              label='Charge'
              variant='outlined'
              type='number'
              // inputProps={{ maxLength: 6, step: '2' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>R</InputAdornment>
                ),
              }}
              sx={{ width: '15ch', mr: 2 }}
              onChange={(e) => setCharge(parseFloat(e.target.value).toFixed(2))}
            />

            <DateTimePicker
              label='Date'
              minDateTime={dayjs()}
              sx={{ width: '30ch' }}
              // value={dayjs(dateRaised)}
              onChange={(date) => setDateTime(date.toISOString())}
              // sx={{ m: 1 }}
              // slotProps={{ field: { InputProps: { size: 'small' } } }}
              // disabled={isDisabled}
            />
          </Box>
          <FormControl>
            <FormLabel id='demo-row-radio-buttons-group-label'>Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
            >
              <FormControlLabel
                value='Sports injuries'
                control={<Radio />}
                label='Sports injuries'
              />
              <FormControlLabel
                value='Musculoskeletal disorders'
                control={<Radio />}
                label='Musculoskeletal disorders'
              />
              <FormControlLabel
                value='Post-surgical rehabilitation'
                control={<Radio />}
                label='Post-surgical rehabilitation'
              />
              <FormControlLabel
                value='Chronic pain'
                control={<Radio />}
                label='Chronic pain'
              />
              <FormControlLabel
                value='Pediatric'
                control={<Radio />}
                label='Pediatric'
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
            loading={createAppointmentResult.isLoading}
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
