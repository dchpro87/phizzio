'use client';

import Container from '@mui/material/Container';
import MainDatePicker from '@/ui/date-picker/MainDatePicker';
import { Typography } from '@mui/material';

export default function AppointmentsMain() {
  return (
    <Container maxWidth='sm'>
      <MainDatePicker />
    </Container>
  );
}
