'use client';

import { useSession } from 'next-auth/react';
import Container from '@mui/material/Container';
import MainDatePicker from '@/ui/date-picker/MainDatePicker';
import { Typography } from '@mui/material';

export default function AppointmentsMain() {
  const { data: session, status } = useSession();

  const userId = session?.user?.userId;
  return (
    <Container maxWidth='sm'>
      <MainDatePicker userId={userId} />
    </Container>
  );
}
