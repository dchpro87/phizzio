import { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import CheckIcon from '@mui/icons-material/Check';

const initialValue = dayjs(new Date());

async function getAppointments(date, userId, { signal }) {
  const url = `./api/v1/appointments/month?userId=${userId}&year=${date.year()}&month=${date.month()}`;
  try {
    const response = await fetch(url, { signal });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch appointments.');
    }

    //  create array of days from the dates returned in data
    const daysToHighlight = data.map((appointment) =>
      dayjs(appointment.dateTime).date()
    );
    // console.log(daysToHighlight);
    return { daysToHighlight };
  } catch (err) {
    console.log(err.message);
    return { daysToHighlight: [] };
  }
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap='circular'
      badgeContent={
        isSelected ? <CheckIcon sx={{ color: 'red' }} /> : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function MainDatePicker({ userId, onDateSelected }) {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);

  const fetchHighlightedDays = (date, userId) => {
    const controller = new AbortController();
    getAppointments(date, userId, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue, userId);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, [userId]);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date, userId);
    onDateSelected('');
  };

  const handleChange = (date) => {
    onDateSelected(date);
  };

  return (
    <>
      <StaticDatePicker
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        onChange={handleChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
          actionBar: () => null,
          toolbar: () => (
            <Typography
              variant='h3'
              component='h3'
              sx={{
                textAlign: 'center',
                py: 2,
                bgcolor: 'primary.main',
                color: 'text.light',
                boxShadow: 3,
              }}
            >
              Client Appointments
            </Typography>
          ),
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
          layout: {
            sx: {
              display: 'block',
              boxShadow: 6,
            },
          },
        }}
      />
    </>
  );
}
