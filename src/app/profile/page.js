import { useState } from 'react';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MyProfile from './MyProfile';
import ChangePassword from './ChangePassword';
import SpinnerWithMessage from '../../components/SpinnerWithMessage';

export default function Profile() {
  const { status } = useSession();
  if (status === 'unauthenticated') signIn();
  if (status === 'loading')
    return <SpinnerWithMessage message='Checking User Session' />;

  const headContent = (
    <Head>
      <title>ComLog | Login</title>
      <meta
        name='description'
        content='Residential Complex management solution for building managers and trustees.'
      />
    </Head>
  );

  return (
    <>
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
          <MyProfile />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h3' component='h3'>
            Change my password
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChangePassword />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
