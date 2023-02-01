import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Box, Grid, FormControlLabel, CircularProgress} from '@material-ui/core';
import LoginContainer from '../../components/container/login-page/login-page-container';
import LoginBox from '../../components/box/login-page/primary-box-login-page';
import WaiteroTextField from '../../components/text-field/waitero-text-field';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton';
import WaiteroCheckbox from '../../components/checkbox/waitero-checkbox';
import { Link } from 'react-router-dom';
import { loginA } from '../../api/api-admin/login-admin';
import { connect } from 'react-redux';
import WaiteroSwitch from '../../components/switch/waitero-switch';
import { rememberMeToggle, cleanErrorMessage } from '../../redux/types/AdminTypes';
import { withRouter } from 'react-router-dom';
import WaiteroAlert from '../../components/alert/alert';
import { cleanErrorMessageClient, rememberMeToggleClient } from '../../redux/types/ClientTypes';
import { loginC } from '../../api/api-client/login-client';
import { mailValidator, passwordValidator } from '../../utils/functions/input-validators';

const Login = ({ loginAdmin, loginClient, rememberMeToggleAdmin, rememberMeToggleClient, cleanErrorMessageAdmin, cleanErrorMessageClient, rememberMeAdmin,  rememberMeClient, adminData, clientData }) => { 

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [adminLog, setAdminLog] = useState(false);

  const history = useHistory();

  const setNavigation = (path) => {
    history.push(path)
  }

  const loginHandler = () => {
    if (adminLog)
      loginAdmin(email, password, setLoading, setNavigation)
    else 
      loginClient(email, password, setLoading, setNavigation)
  }

  const rememberMeToggleHandler = (newValue) => {
    if (adminLog)
      rememberMeToggleAdmin(newValue)
    else 
      rememberMeToggleClient(newValue)
  }

  return (
    <LoginContainer>
      <WaiteroAlert isError={adminData.hasErrors || clientData.hasErrors} message={adminData.message || clientData.message} cleanError={adminLog ? cleanErrorMessageAdmin : cleanErrorMessageClient}/>
      <LoginBox>
          <Box marginBottom={2} fontSize={25}>
            Autentificare
        </Box>
        <Box width={'80%'} marginBottom={5}>
              <Grid container>
                <Grid container item justifyContent='flex-end' xs={4} lg={4} md={4}>
                  <Box>Client</Box>
                </Grid>
                <Grid container item justifyContent='center' xs={4} lg={4} md={4} style={{height: 30}}>
              <WaiteroSwitch defaultValue={adminLog} onChange={() => setAdminLog(!adminLog)} />
                </Grid>
                <Grid container item justifyContent='flex-start' xs={4} lg={4} md={4}>
                  <Box>Admin</Box>
                </Grid>
          </Grid>
          </Box>
        <Grid container item xl={7} lg={7} md={7} xs={12} spacing={2}>
              <Grid container item xl={12} lg={12} md={12}>
            <WaiteroTextField defaultValue={email} onKeyDown={ (event) => event.key === 'Enter' ? loginHandler() : null } onChange = {(e)=> setEmail(e.target.value)} 
                                label='email' variant='outlined' error={ mailValidator(email) } fullWidth type="email" name="secret-email-not-showed" />
              </Grid>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue= {password} onKeyDown={ (event) => event.key === 'Enter' ? loginHandler() : null } onChange = {(e)=> setPassword(e.target.value)} label='Parola' variant='outlined' type='password' error={passwordValidator(password)} fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={12} md={12} >
                <Box justifyContent={'center'} color={'#FF9494'} width={'100%'}>
                {mailValidator(email) && 'Va rugam sa introduceti o adresa e-mail valida.'}
                {passwordValidator(password) && 'Parola introdusa e in formatul gresit.'}
                </Box>
              </Grid>
              <Grid container item xl={12} lg={6} md={6}>
            <FormControlLabel defaultChecked={adminLog ? rememberMeAdmin : rememberMeClient} onChange={(e)=>rememberMeToggleHandler(e.target.checked) }control={<WaiteroCheckbox/>} 
                                  label='Remind me' style={{color:'rgba(255, 90, 95, 1)'}}/>
              </Grid>
              <Grid container item xl={12} lg={6} md={6} justifyContent='flex-end' alignItems='center'>
                <Link to='/login/forgot-password' style={{color:'rgba(255, 90, 95, 1)', textDecoration:'none', fontSize: '17px', textAlign: 'right'}}>
                  Am uitat parola
                </Link>
              </Grid>
              <Grid container item xl={12} lg={12} md={12} >
                  <PrimaryButton variant='contained' disabled={!email.length || mailValidator(email) || !password.length || passwordValidator(password)} onClick={() => loginHandler()} fullWidth>{loading ? <CircularProgress style={{color: '#fff'}} size={26}/> : 'AUTENTIFICARE'}</PrimaryButton>
              </Grid>
          <Grid container item xl={12} lg={12} md={12} justifyContent={'center'} >
            <Link to='/register' style={{color:'rgba(255, 90, 95, 1)', fontSize: '14px', textAlign: 'center'}}>
              Vreau sa ma inregistrez
            </Link>
              </Grid>
          </Grid>
        </LoginBox>
      </LoginContainer>
  );
}

const mapStateToProps = (state) => ({
  rememberMeAdmin: state.adminReducer.rememberMe,
  adminData: state.adminReducer,
  rememberMeClient: state.clientReducer.rememberMe,
  clientData: state.clientReducer
});

const mapDispatchToProps = (dispatch) => ({
  loginAdmin: (email, password, setLoading, setNavigation) => dispatch(loginA(email, password, setLoading, setNavigation)),
  loginClient: (email, password, setLoading, setNavigation) => dispatch(loginC(email, password, setLoading, setNavigation)),
  rememberMeToggleAdmin: (newStatus) => dispatch(rememberMeToggle(newStatus)),
  rememberMeToggleClient: (newStatus) => dispatch(rememberMeToggleClient(newStatus)),
  cleanErrorMessageAdmin: () => dispatch(cleanErrorMessage()),
  cleanErrorMessageClient: () => dispatch(cleanErrorMessageClient())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
