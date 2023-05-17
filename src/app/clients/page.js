'use client';

import { useState } from 'react';

import SpinnerWithMessage from '@/ui/SpinnerWithMessage';

import { useGetClientsQuery } from '@/store/services/apiSlice';

import NoClient from './NoClients';
import AddClient from './AddClient';
import ClientCard from './ClientCard';

export default function ClientsMain() {
  const [isaddingClient, setIsAddingClient] = useState(false);

  const userId = '6461ed1cb88848b2ef3607c4';
  const { data: clients, isSuccess, isLoading } = useGetClientsQuery(userId);

  if (isLoading) return <SpinnerWithMessage message='Fetching your clients' />;

  if (isSuccess && clients.length > 0) {
    const clientsList = clients.map((client) => (
      <ClientCard key={client._id} client={client} />
    ));

    return <>{clientsList}</>;
  }

  return (
    <>
      {!isaddingClient && <NoClient onAddClicked={setIsAddingClient} />}
      {isaddingClient && <AddClient onCancelClicked={setIsAddingClient} />}
    </>
  );
}
