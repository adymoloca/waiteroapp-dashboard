import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Box, Grid, CircularProgress} from '@material-ui/core';
import LoginContainer from '../../components/container/login-page/login-page-container';
import LoginBox from '../../components/box/login-page/primary-box-login-page';
import WaiteroTextField from '../../components/text-field/waitero-text-field';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WaiteroAlert from '../../components/alert/alert';
import { cleanErrorMessageClient } from '../../redux/types/ClientTypes';
import SecondaryButton from '../../components/buttons/secondaryButton/secondaryButton';
import { registerClient } from '../../api/api-client/register-client';
import { mailValidator, passwordValidator, phoneValidator } from '../../utils/functions/input-validators';

const Register = ({ registerClient, cleanErrorMessageClient, clientData }) => { 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);


  const history = useHistory();

  const setNavigation = (path) => {
    history.push(path)
  }

  const registerHandler = () => {
      registerClient(name, email, phone, password, setLoading, setNavigation)
  }

  return (
    <LoginContainer>
      <WaiteroAlert isError={clientData.hasErrors} message={ clientData.message} cleanError={cleanErrorMessageClient}/>
      <LoginBox>
          <Box marginBottom={3} fontSize={25}>
            Inregistrare
        </Box>
        <Grid container item xl={7} lg={7} md={7} spacing={2}>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue = {name} onChange = {(e)=> setName(e.target.value)} 
                                label='Nume' variant='outlined' fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue = {email} onChange = {(e)=> setEmail(e.target.value)} 
                                label='Email' variant='outlined' error={mailValidator(email)} fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue= {password} onChange = {(e)=> setPassword(e.target.value)} 
                                label='Parola' variant='outlined' type='password' error={passwordValidator(password)} fullWidth/>
          </Grid>
          <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue= {phone} onChange = {(e)=> setPhone(e.target.value)} 
                                label='Telefon' variant='outlined' error={phoneValidator(phone)} fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={12} md={12} >
                <Box justifyContent={'center'} color={'#FF9494'} width={'100%'}>
                {mailValidator(email) && 'Va rugam sa introduceti o adresa e-mail valida.'}
                {passwordValidator(password) && ' Parola introdusa trebuie sa contina cel putin: 1 litera mare, 1 litera mica, 1 numar si 1 caracter special. (8-32) '}
                </Box>
              </Grid>
              <Grid container item xl={12} lg={12} md={12} >
                  <PrimaryButton variant='contained' onClick={() => registerHandler()}  disabled={!name.length || !email.length || mailValidator(email) || !password.length || passwordValidator(password) || !phone.length || phoneValidator(phone) } fullWidth>{loading ? <CircularProgress  style={{color: '#fff'}} size={30}/> : 'INREGISTRARE'}</PrimaryButton>

          </Grid>
          <Grid container item xl={12} lg={12} md={12} >
                  <SecondaryButton variant='outlined' onClick={() => setNavigation('/login')} fullWidth>AM DEJA CONT, VREAU SA MA LOGHEZ</SecondaryButton>
              </Grid>
          </Grid>
        </LoginBox>
      </LoginContainer>
  );
}

const mapStateToProps = (state) => ({
  clientData: state.clientReducer
});

const mapDispatchToProps = (dispatch) => ({
  cleanErrorMessageClient: () => dispatch(cleanErrorMessageClient()),
  registerClient: (name, email, phone, password, loadingSetter, setNavigation) => dispatch(registerClient(name, email, phone, password, loadingSetter, setNavigation))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
