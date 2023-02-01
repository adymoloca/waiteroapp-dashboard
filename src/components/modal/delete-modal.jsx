import React, { useState } from 'react';
import { Box, Modal, Fade, Grid, CircularProgress } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';
import PrimaryButton from '../buttons/primaryButton/primaryButton';
import SecondaryButton from '../buttons/secondaryButton/secondaryButton';
import { deleteRestaurant, getRestaurants } from '../../api/api-client/client-requests';
import AddBoxOverview from '../box/add-box-overview/add-box-overview';

const DeleteModal = ({ label, message, clientId, restaurantId=undefined, getRestaurants}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({message: '', isError: false});
  const classes = useStyles();

  const closeModal = () => {
    getRestaurants(clientId, setLoading);
    setOpen(false)
  }

  const handleDeleteClick = () => {
    deleteRestaurant(clientId, restaurantId, setLoading, setError, closeModal)
    
  }

  return (
    <>
    <Box marginTop={3} marginRight={3} onClick={()=>setOpen(true)} width={'300px'}>
       <AddBoxOverview overlayText={label} backgroundColor={'#ffffff'} color={'#00000090'} height={180} width={'300px'} alignItems={'center'} iconDelete boxShadow={'0px 6px 6px rgba(0, 0, 0, 0.25)'}/>
       </Box>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({message: '', isError: false})} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
              <Box width={400} my={2} display={'flex'} justifyContent='center'>
                {message}
              </Box>
              <Box mr={2} width={400} my={2}>
                <Grid container justifyContent='space-between'>                                
                    <Grid container item xs={5}>
                        <SecondaryButton variant={'outlined'} onClick={()=>setOpen(false)} fullWidth>INAPOI</SecondaryButton>
                    </Grid>
                    <Grid container item xs={5}>
                        <PrimaryButton variant={'contained'} onClick={()=>handleDeleteClick()} fullWidth>{loading ? <CircularProgress  style={{color: '#fff'}}/> : 'STERGE'}</PrimaryButton>
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </Fade>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({getRestaurants: (clientId, loadingSetter) => dispatch(getRestaurants(clientId, loadingSetter))})

export default connect(null, mapDispatchToProps)(DeleteModal);