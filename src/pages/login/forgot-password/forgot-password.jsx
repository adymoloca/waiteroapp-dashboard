import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import LoginContainer from '../../../components/container/login-page/login-page-container';
import LoginBox from '../../../components/box/login-page/primary-box-login-page';
import WaiteroTextField from '../../../components/text-field/waitero-text-field';
import PrimaryButton from '../../../components/buttons/primaryButton/primaryButton';
import SecondaryButton from '../../../components/buttons/secondaryButton/secondaryButton';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  const [Email, setEmail] = useState(null);

  const [emailSent, setEmailSent] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if ((localStorage.getItem('isLoggedIn') === 'true'))
      history.push('/home')
    // eslint-disable-next-line
  }, [])

  return (
    <LoginContainer>
      <LoginBox>
        <Box marginBottom={8} fontSize={25}>
          Resetare parola
        </Box>
        {!emailSent ? (
          <Grid container xl={7} lg={7} md={7} spacing={4}>
            <Grid container item xl={12}>
              <WaiteroTextField value={Email} onChange={(e) => setEmail(e.target.value)}
                label='Email' variant='outlined' fullWidth />
            </Grid>
            <Grid container item xl={6} lg={6} md={6} justifyContent='flex-end' alignItems='center'>
              <Link to='/login' style={{ textDecoration: 'none', width: '100%' }}>
                <SecondaryButton variant='outlined' fullWidth>INAPOI</SecondaryButton>
              </Link>
            </Grid>
            <Grid container item xl={6} lg={6} md={6}>
              <PrimaryButton variant='contained' onClick={() => setEmailSent(true)} fullWidth>TRIMITE</PrimaryButton>
            </Grid>
          </Grid>
        ) : (
          <Grid container xl={12} lg={12} md={12} spacing={4} justifyContent='center'>
            <Grid container item xl={12} lg={12} md={12} justifyContent='center'>
              <Box fontSize={18}>
                Un link cu resetarea parolei a fost trimis la adresa de email!
              </Box>
            </Grid>
            <Grid container item xl={7} lg={7} md={7}>
              <Link to='/login' style={{ textDecoration: 'none', width: '100%' }}>
                <PrimaryButton variant='contained' fullWidth>INAPOI LA AUTENTIFICARE</PrimaryButton>
              </Link>
            </Grid>
          </Grid>
        )}
      </LoginBox>
    </LoginContainer>
  );
}

export default ForgotPassword;
