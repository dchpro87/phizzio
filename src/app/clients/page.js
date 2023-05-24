'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';

import SpinnerWithMessage from '@/ui/SpinnerWithMessage';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import {
  useGetClientsQuery,
  useGetAllAppointmentsQuery,
} from '@/store/services/apiSlice';

import NoClient from './NoClients';
import CreateClient from './CreateClient';
import ClientDetails from './ClientDetails';
import ClientCard from './ClientCard';
import ClientHeader from './ClientHeader';
import ClientMenu from './ClientMenu';
import CreateAppointment from './CreateAppointment';
import AppointmentCard from './AppointmentCard';
import UpdateAppointment from './UpdateAppointment';

export default function ClientsMain() {
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [clickedClientId, setClickedClientId] = useState('');
  const [clickedAppointmentId, setClickedAppointmentId] = useState('');
  const { userId } = useSelector((state) => state.user);

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

  const { status } = useSession();
  if (status === 'unauthenticated') signIn();

  if (isClientsLoading || isAppointmentsLoading)
    return (
      <SpinnerWithMessage message='Fetching your clients and checking for appointments' />
    );

  const client = clientsData?.clients?.find(
    (client) => client.id === clickedClientId
  );

  const clientsList = clientsData.clients?.map((client) => (
    <ClientCard
      key={client.id}
      client={client}
      onCardClicked={setClickedClientId}
    />
  ));

  const clientAppointments = appointmentsData.appointments?.filter(
    (appointment) => appointment.clientId === clickedClientId
  );

  const appointment = clientAppointments?.find(
    (appointment) => appointment.id === clickedAppointmentId
  );

  const appointmentsList = clientAppointments?.map((appointment) => (
    <AppointmentCard
      key={appointment.id}
      appointment={appointment}
      onCardClicked={setClickedAppointmentId}
    />
  ));

  if (isClientsSuccess && clientsData.length > 0) {
    return (
      <>
        <Container maxWidth='sm'>
          {!isAddingClient && clickedClientId === '' && (
            <ClientHeader onAddClicked={setIsAddingClient} />
          )}
          {!isAddingClient && clickedClientId.length > 0 && (
            <ClientMenu
              name={client.name}
              onBackClicked={() => {
                setClickedClientId('');
                setIsAddingAppointment(false);
                setClickedAppointmentId('');
              }}
              onBookClicked={() => {
                setIsAddingAppointment((prev) => !prev);
              }}
            />
          )}
          {!isAddingClient && clickedClientId === '' && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'rows',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {clientsList}
            </Box>
          )}
          {isAddingClient && clickedClientId === '' && (
            <CreateClient onCancelClicked={setIsAddingClient} />
          )}
          {clickedClientId.length > 0 && (
            <ClientDetails
              client={client}
              onCancelClicked={() => setClickedClientId('')}
            />
          )}
          {!isAddingAppointment &&
            clickedClientId.length > 0 &&
            appointmentsData.length > 0 &&
            !clickedAppointmentId && <Box>{appointmentsList}</Box>}

          {isAddingAppointment && (
            <CreateAppointment
              onCancelClicked={() => setIsAddingAppointment(false)}
              clientId={clickedClientId}
            />
          )}
          {clickedAppointmentId.length > 0 && (
            <UpdateAppointment
              appointment={appointment}
              onCancelClicked={() => setClickedAppointmentId('')}
            />
          )}
        </Container>
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }

  return (
    <Container maxWidth='sm'>
      {!isAddingClient && <NoClient onAddClicked={setIsAddingClient} />}
      {isAddingClient && <CreateClient onCancelClicked={setIsAddingClient} />}
    </Container>
  );
}
