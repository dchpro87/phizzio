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

  const { name } = client;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 345,
        margin: '0.5rem',
      }}
      onClick={() => onCardClicked(id)}
    >
      <CardHeader title='Name' subheader={`${dateTime}`} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {treatmentType}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {notes}
        </Typography>
      </CardContent>
    </Card>
  );
}
