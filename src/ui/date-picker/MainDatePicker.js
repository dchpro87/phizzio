import { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import Badge from '@mui/material/Badge';
import CheckIcon from '@mui/icons-material/Check';

const initialValue = dayjs(new Date());

async function getAppointments(date, userId, { signal }) {
  const _month = date.month() + 1;
  const url = `./api/v1/appointments/month?userId=${userId}&year=${date.year()}&month=${_month}`;

  const response = await fetch(url, { signal });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch appointments.');
  }
  console.log(data);
  //  create array of days from the dates returned in data
  const daysToHighlight = data.map((appointment) =>
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

export default function MainDatePicker({ userId }) {
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
