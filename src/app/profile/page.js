'use client';

import { signIn, useSession } from 'next-auth/react';

import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import MyProfile from './MyProfile';
// import ChangePassword from './ChangePassword';

export default function Profile() {
  const { status } = useSession();
  if (status === 'unauthenticated') signIn();

  return (
    <Container maxWidth='lg'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h3' component='h3'>
            My Profile
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>lkjb</p>
          {/* <MyProfile /> */}
        </AccordionDetails>
      </Accordion>

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography variant='h3' component='h3'>
            Change my password
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChangePassword />
        </AccordionDetails>
      </Accordion> */}
    </Container>
  );
}
