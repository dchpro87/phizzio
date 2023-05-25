import dayjs from 'dayjs';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AppointmentCard({
  client,
  appointment,
  onCardClicked,
}) {
  const {
    id,
    userId,
    clientId,
    dateTime,
    treatmentType,
    confirmed,
    charge,
    paid,
    completed,
    causality,
    treatmentNote,
  } = appointment;

  // convert dateTime to date and time
  const date = dayjs(dateTime).format('ddd, MMM D, YYYY');
  const time = dayjs(dateTime).format('h:mm A');

  return (
    <Card
      sx={{
        width: '100%',
        mt: 2,
        ':hover': {
          bgcolor: 'action.hover',
          cursor: 'pointer',
        },
        // maxWidth: 345,
        // margin: '0.5rem',
      }}
      onClick={() => onCardClicked(id)}
    >
      <CardHeader title={`${date} ${time}`} subheader={treatmentType} />
      <CardContent></CardContent>
    </Card>
  );
}
