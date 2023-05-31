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

import NoClients from './NoClients';
import CreateClient from './CreateClient';
import ClientDetails from './ClientDetails';
import ClientCard from './ClientCard';
import ClientHeader from './ClientHeader';
import ClientMenu from './ClientMenu';
import CreateAppointment from './CreateAppointment';
import AppointmentCard from './AppointmentCard';
import UpdateAppointment from './UpdateAppointment';
import { Skeleton } from '@mui/material';

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
  } = useGetClientsQuery({ path: userId, queryStr: 'sort=name' });

  const {
    data: appointmentsData,
    isSuccess: isAppointmentsSuccess,
    isLoading: isAppointmentsLoading,
  } = useGetAllAppointmentsQuery({ path: userId, queryStr: 'sort=dateTime' });

  const { data: session, status } = useSession();
  if (status === 'unauthenticated') signIn();

  const client = clientsData?.clients?.find(
    (client) => client.id === clickedClientId
  );

  const clientsList = clientsData?.clients?.map((client) => (
    <ClientCard
      key={client.id}
      client={client}
      onCardClicked={setClickedClientId}
    />
  ));

  const clientAppointments = appointmentsData?.appointments?.filter(
    (appointment) => appointment?.clientId?.id === clickedClientId
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

  return (
    <>
      <Container maxWidth='sm'>
        {!isAddingClient && !clickedClientId && (
          <ClientHeader onAddClicked={setIsAddingClient} />
        )}

        {!isAddingClient && clickedClientId && (
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

        {!isAddingClient && !clickedClientId && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'rows',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            {isClientsSuccess ? (
              clientsList
            ) : (
              <Skeleton
                variant='rectangular'
                width='100%'
                animation='wave'
                sx={{ marginBottom: '1rem' }}
              >
                <div style={{ paddingTop: '20%' }} />
              </Skeleton>
            )}
          </Box>
        )}

        {isAddingClient && !clickedClientId && (
          <CreateClient onCancelClicked={setIsAddingClient} />
        )}

        {clickedClientId && (
          <ClientDetails
            client={client}
            resetClickedClientId={() => {
              setClickedClientId('');
              setClickedAppointmentId('');
            }}
            isAddingAppointment={isAddingAppointment}
          />
        )}

        {!isAddingAppointment &&
          clickedClientId &&
          appointmentsData &&
          !clickedAppointmentId && <Box>{appointmentsList}</Box>}

        {isAddingAppointment && (
          <CreateAppointment
            onCancelClicked={() => setIsAddingAppointment(false)}
            clientId={clickedClientId}
          />
        )}

        {clickedAppointmentId && (
          <UpdateAppointment
            appointment={appointment}
            onCancelClicked={() => setClickedAppointmentId('')}
            isAddingAppointment={isAddingAppointment}
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
