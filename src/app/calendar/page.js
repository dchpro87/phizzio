'use client';
import { useState } from 'react';

import { useSession } from 'next-auth/react';

import {
  useGetAllAppointmentsQuery,
  useGetClientsQuery,
} from '@/store/services/apiSlice';

import Container from '@mui/material/Container';
import MainDatePicker from '@/ui/date-picker/MainDatePicker';
import Box from '@mui/material/Box';

import AppointmentCard from '../clients/AppointmentCard';
import UpdateAppointment from '../clients/UpdateAppointment';
import { set } from 'mongoose';

export default function AppointmentsMain() {
  const [selectedDay, setSelectedDay] = useState('');
  const [clickedAppointmentId, setClickedAppointmentId] = useState('');
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;

  const {
    data: clientsData,
    isSuccess: isClientsSuccess,
    isLoading: isClientsLoading,
  } = useGetClientsQuery({ userId, filter: '?sort=name' });

  const {
    data: appointmentsData,
    isSuccess: isAppointmentsSuccess,
    isLoading: isAppointmentsLoading,
  } = useGetAllAppointmentsQuery({
    filter: `?userId=${userId}`,
  });

  if (status === 'unauthenticated') signIn();

  const daysAppointments = appointmentsData?.appointments?.filter(
    (appointment) => {
      const appointmentDay = new Date(appointment.dateTime).getDate();
      return appointmentDay === selectedDay && appointment.clientId !== null;
    }
  );

  const appointmentsList = daysAppointments?.map((appointment) => (
    <AppointmentCard
      key={appointment.id}
      appointment={appointment}
      clientName={
        clientsData?.clients?.find(
          (client) => client.id === appointment?.clientId?.id
        ).name
      }
      onCardClicked={() => setClickedAppointmentId(appointment.id)}
    />
  ));

  const handleDateSelected = (date) => {
    date === '' ? setSelectedDay('') : setSelectedDay(date.date());
    //  find all appointments for the selected day
  };

  if (clickedAppointmentId) {
    const appointment = appointmentsData?.appointments?.find(
      (appointment) => appointment.id === clickedAppointmentId
    );

    return (
      <>
        <Container maxWidth='sm'>
          <UpdateAppointment
            appointment={appointment}
            clientName={
              clientsData?.clients?.find(
                (client) => client.id === appointment?.clientId?.id
              ).name
            }
            onCancelClicked={() => setClickedAppointmentId('')}
          />
        </Container>
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }

  return (
    <>
      <Container maxWidth='sm'>
        <MainDatePicker userId={userId} onDateSelected={handleDateSelected} />
        {isAppointmentsLoading ? (
          <div>Loading...</div>
        ) : (
          <Box>{appointmentsList}</Box>
        )}
      </Container>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
