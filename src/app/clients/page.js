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

export default function ClientsMain() {
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [clickedClientId, setClickedClientId] = useState('');
  const { userId } = useSelector((state) => state.user);

  const {
    data: clients,
    isSuccess: isClientsSuccess,
    isLoading: isClientsLoading,
  } = useGetClientsQuery({ userId, filter: '?sort=name' });

  const {
    data: appointments,
    isSuccess: isAppointmentsSuccess,
    isLoading: isAppointmentsLoading,
  } = useGetAllAppointmentsQuery({
    filter: `?userId=${userId}`,
  });

  const { status } = useSession();
  if (status === 'unauthenticated') signIn();

  if (isClientsLoading)
    return <SpinnerWithMessage message='Fetching your clients' />;

  const client = clients?.find((client) => client.id === clickedClientId);

  if (isClientsSuccess && clients.length > 0) {
    const clientsList = clients.map((client) => (
      <ClientCard
        key={client.id}
        client={client}
        onCardClicked={setClickedClientId}
      />
    ));

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
              }}
              onBookClicked={() => {
                setIsAddingAppointment(true);
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

          {isAddingAppointment && (
            <CreateAppointment
              onCancelClicked={() => setIsAddingAppointment(false)}
              clientId={clickedClientId}
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
