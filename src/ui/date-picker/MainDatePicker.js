import { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import Badge from '@mui/material/Badge';
import CheckIcon from '@mui/icons-material/Check';

const initialValue = dayjs(new Date());

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

async function getAppointments(date, { signal }) {
  const url =
    './api/v1/appointments?userId=6461ed1cb88848b2ef3607c4&fields=dateTime';

  const response = await fetch(url, { signal });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch appointments.');
  }
  //  create array of days from the dates returned in data
  const daysToHighlight = data.appointments.map((appointment) =>
    dayjs(appointment.dateTime).date()
  );

  return { daysToHighlight };
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

export default function MainDatePicker() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    getAppointments(date, {
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
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <StaticDatePicker
      defaultValue={initialValue}
      loading={isLoading}
      onMonthChange={handleMonthChange}
      renderLoading={() => <DayCalendarSkeleton />}
      slots={{
        day: ServerDay,
      }}
      slotProps={{
        day: {
          highlightedDays,
        },
      }}
    />
  );
}