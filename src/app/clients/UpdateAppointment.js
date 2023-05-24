'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import dayjs from 'dayjs';

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

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Dialog from '@/ui/Dialog';
import {
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from '@/store/services/apiSlice';

export default function UpdateAppointment({
  onCancelClicked,
  clientId,
  appointment,
}) {
  const [dateTime, setDateTime] = useState(appointment.dateTime);
  const [treatmentType, setTreatmentType] = useState(appointment.treatmentType);
  const [confirmed, setConfirmed] = useState(appointment.confirmed);
  const [charge, setCharge] = useState(appointment.charge);
  const [paid, setPaid] = useState(appointment.paid);
  const [completed, setCompleted] = useState(appointment.completed);
  const [causality, setCausality] = useState(appointment.causality);
  const [treatmentNote, setTreatmentNotes] = useState(
    appointment.treatmentNote
  );

  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(true);

  const { data: session } = useSession();

  const btnColor = isUpdated ? 'primary.main' : 'secondary.main';

  const [updateAppointment, updateAppointmentResult] =
    useUpdateAppointmentMutation();
  const [deleteAppointment, deleteAppointmentResult] =
    useDeleteAppointmentMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userId } = session.user;

    const payload = {
      appointmentId: appointment.id,
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
      const result = await updateAppointment(payload);

      if (result.error) throw new Error(result.error.data.message);
      onCancelClicked();
    } catch (err) {
      setMessage(err.message);
      console.log(err.message);
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      setShowDialog((prev) => !prev);

      const payload = { appointmentId: appointment.id };

      const result = await deleteAppointment(payload);

      if (result.error) throw new Error(result.error.data.message);
      onCancelClicked();
    } catch (err) {
      setMessage(err.message);
      console.log(err);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Dialog
        showDialog={showDialog}
        closeDialog={() => setShowDialog((prev) => !prev)}
        content='Delete this appointment?'
        onConfirm={handleDeleteAppointment}
      />
      <Typography variant='h4' component='h4' gutterBottom>
        Update Appointment
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
              checked={confirmed}
              value={confirmed}
              onChange={() => {
                setConfirmed((prev) => !prev);
                setIsUpdated(false);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Paid'
              checked={paid}
              value={paid}
              onChange={() => {
                setPaid((prev) => !prev);
                setIsUpdated(false);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Completed'
              checked={completed}
              value={completed}
              onChange={() => {
                setCompleted((prev) => !prev);
                setIsUpdated(false);
              }}
            />
          </FormGroup>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              label='Charge'
              type='number'
              variant='outlined'
              inputProps={{ maxLength: 15, step: '2' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>R</InputAdornment>
                ),
              }}
              sx={{ width: '15ch', mr: 2 }}
              value={charge}
              onChange={(e) => {
                setCharge(parseFloat(e.target.value));
                setIsUpdated(false);
              }}
            />

            <DateTimePicker
              label='Date'
              sx={{ width: '30ch' }}
              value={dayjs(dateTime)}
              onChange={(date) => {
                setDateTime(date.toISOString());
                setIsUpdated(false);
              }}
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
              onChange={(e) => {
                setTreatmentType(e.target.value);
                setIsUpdated(false);
              }}
            >
              <FormControlLabel
                value='sports-injuries'
                control={<Radio />}
                label='Sports injuries'
              />
              <FormControlLabel
                value='musculoskeletal-disorders'
                control={<Radio />}
                label='Musculoskeletal disorders'
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
          <TextField
            label='Causality'
            variant='outlined'
            multiline
            rows={2}
            value={causality}
            onChange={(e) => {
              setCausality(e.target.value);
              setIsUpdated(false);
            }}
          />
          <TextField
            label='Treatment Notes'
            variant='outlined'
            multiline
            rows={2}
            value={treatmentNote}
            onChange={(e) => {
              setTreatmentNotes(e.target.value);
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
            loading={updateAppointmentResult.isLoading}
            variant='contained'
            type='submit'
            sx={{ bgcolor: btnColor, color: 'text.light' }}
          >
            <span>Update</span>
          </LoadingButton>
          <LoadingButton
            size='small'
            loading={deleteAppointmentResult.isLoading}
            variant='outlined'
            onClick={() => setShowDialog((prev) => !prev)}
          >
            <span>Delete</span>
          </LoadingButton>
          <Button variant='outlined' onClick={onCancelClicked}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
