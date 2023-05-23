import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function AppointmentCard({ appointment, onCardClicked }) {

    const { id, date, time, duration, notes, client } = appointment;
    
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
        <CardHeader
            title={name}
            subheader={`${date} ${time} ${duration}`}
        />
        <CardContent>
            <Typography variant='body2' color='text.secondary'>
            {notes}
            </Typography>
        </CardContent>
        </Card>
    );
    }