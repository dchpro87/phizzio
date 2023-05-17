import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Client({ client }) {
  return (
    <Card
      sx={{
        width: '14ch',
        m: 1,
        p: 2,
        // bgcolor: "grey.900",
        ':hover': {
          bgcolor: 'action.hover',
          cursor: 'pointer',
        },
      }}
      onClick={() => onResidentClicked(index)}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <div>
          <Typography fontSize='0.6rem'>{client.name}</Typography>
          <Typography fontSize='0.6rem'>{client.email}</Typography>
          <Typography fontSize='0.6rem'>{client.cellphone}</Typography>
        </div>
      </Box>
    </Card>
  );
}
