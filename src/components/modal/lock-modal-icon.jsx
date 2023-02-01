import React, { useState } from 'react';
import { Box, Modal, Fade, Grid, CircularProgress } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';
import PrimaryButton from '../buttons/primaryButton/primaryButton';
import SecondaryButton from '../buttons/secondaryButton/secondaryButton';
import { getClients, updateClientStatus } from '../../api/api-admin/admin-requests';
import { useEffect } from 'react';
import { cleanRestaurant } from '../../redux/types/RestaurantTypes';
import { useRef } from 'react';
import WaiteroSwitch from '../switch/waitero-switch';

const LockModalSwitch = ({ isBlocked, clientId = undefined, getClients }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', isError: false });
  const classes = useStyles();
  const isMounted = useRef()

  const closeModalOnLockedStatusChange = () => {
    getClients(setLoading);
    setOpen(false);
  }


  const handleChangeStatusClick = () => {
    updateClientStatus(!isBlocked, clientId, setLoading, setError, closeModalOnLockedStatusChange)
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line
  }, [updateClientStatus])

  return (
    <>
      <WaiteroSwitch checked={!isBlocked} onChange={() => setOpen(true)} />
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box width={400} my={2} display={'flex'} justifyContent='center'>
              {isBlocked ? 'Sunteti sigur ca vreti sa activati acest cont?' : 'Sunteti sigur ca vreti sa blocati acest cont?'}
            </Box>
            <Box mr={2} width={400} my={2}>
              <Grid container justifyContent='space-between'>
                <Grid container item xs={5}>
                  <SecondaryButton variant={'outlined'} onClick={() => setOpen(false)} fullWidth>INAPOI</SecondaryButton>
                </Grid>
                <Grid container item xs={5}>
                  <PrimaryButton variant={'contained'} onClick={() => handleChangeStatusClick()} fullWidth>{loading ? <CircularProgress size={20} /> : isBlocked ? 'Activeaza' : 'Blocheaza'}</PrimaryButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getClients: (loadingSetter) => dispatch(getClients(loadingSetter)),
  cleanRestaurant: () => dispatch(cleanRestaurant())
})

export default connect(null, mapDispatchToProps)(LockModalSwitch);