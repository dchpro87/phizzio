'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';

import SpinnerWithMessage from '@/ui/SpinnerWithMessage';
import Container from '@mui/material/Container';

import { useGetClientsQuery } from '@/store/services/apiSlice';

import NoClient from './NoClients';
import AddClient from './AddClient';
import UpdateClient from './UpdateClient';
import ClientCard from './ClientCard';
import ClientHeader from './ClientHeader';
import Box from '@mui/material/Box';

export default function ClientsMain() {
  const [isaddingClient, setIsAddingClient] = useState(false);
  const [clickedClientId, setClickedClientId] = useState('');
  const { userId } = useSelector((state) => state.user);

  const {
    data: clients,
    isSuccess,
    isLoading,
  } = useGetClientsQuery({ userId, filter: '?sort=name' });

  const { status } = useSession();
  if (status === 'unauthenticated') signIn();

  if (isLoading) return <SpinnerWithMessage message='Fetching your clients' />;

  if (isSuccess && clients.length > 0) {
    const clientsList = clients.map((client) => (
      <ClientCard
        key={client._id}
        client={client}
        onCardClicked={setClickedClientId}
      />
    ));

    return (
      <Container maxWidth='sm'>
        {isaddingClient && clickedClientId === '' && (
          <AddClient onCancelClicked={setIsAddingClient} />
        )}
        {!isaddingClient && clickedClientId === '' && (
          <>
            <ClientHeader onAddClicked={setIsAddingClient} />
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
          </>
        )}
        {clickedClientId.length > 0 && (
          <UpdateClient onCancelClicked={() => setClickedClientId('')} />
        )}
      </Container>
    );
  }

  return (
    <Container maxWidth='sm'>
      {!isaddingClient && <NoClient onAddClicked={setIsAddingClient} />}
      {isaddingClient && <AddClient onCancelClicked={setIsAddingClient} />}
    </Container>
  );
}
