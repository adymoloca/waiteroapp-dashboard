import React, { useEffect, useState } from 'react';
import { Box, Modal, Grid, Fade, IconButton } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import { updateRestaurantField } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';

const EditAddressModal = ({ addressObject, setAddressObject = () => undefined, clientId, restaurantId }) => {

  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', isError: false });
  const [country, setCountry] = useState(addressObject?.country);
  const [city, setCity] = useState(addressObject?.city);
  const [street, setStreet] = useState(addressObject?.street);
  const [number, setNumber] = useState(addressObject?.number);
  const [postalCode, setPostalCode] = useState(addressObject?.postalCode);

  const classes = useStyles();

  useEffect(() => {
    setCountry(addressObject?.country);
    setCity(addressObject?.city);
    setStreet(addressObject?.street);
    setNumber(addressObject?.number);
    setPostalCode(addressObject?.postalCode);
  }, [addressObject])

  const updateField = () => {
    updateRestaurantField({
      location: {
        address: {
          country: country,
          city: city,
          street: street,
          number: number,
          postalCode: postalCode
        }
      }
    }, clientId, restaurantId, () => setAddressObject({
      country: country,
      city: city,
      street: street,
      number: number,
      postalCode: postalCode
    }), setLoading, setError, setOpen);
  }

  return (
    <>
      <IconButton onClick={(e) => { setOpen(true); e.stopPropagation() }} size={'small'} style={{ marginLeft: 15 }}><Edit size={14} /></IconButton>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box display="flex" mt={3}>
              <Grid container spacing={2} justifyContent={'flex-end'} alignItems={'center'}>
                <Grid container item xs={5}>
                  <WaiteroTextField value={country} onChange={(e) => setCountry(e.target.value)} fullWidth placeholder='Tara (ex. Romania)' />
                </Grid>
                <Grid container item xs={5}>
                  <WaiteroTextField value={city} onChange={(e) => setCity(e.target.value)} fullWidth placeholder='Oras (ex. Cluj-Napoca)' />
                </Grid>
                <Grid container item xs={5}>
                  <WaiteroTextField value={street} onChange={(e) => setStreet(e.target.value)} fullWidth placeholder='Strada (ex. Galati)' />
                </Grid>
                <Grid container item xs={2}>
                  <WaiteroTextField value={number} onChange={(e) => setNumber(e.target.value)} fullWidth placeholder='Nr (ex. 8)' />
                </Grid>.
                <Grid container item xs={2}>
                  <WaiteroTextField value={postalCode} onChange={(e) => setPostalCode(e.target.value)} fullWidth placeholder='Cod postal (ex. 123456)' />
                </Grid>
              </Grid>
              <Box ml={2}>
                <IconButton onClick={() => setOpen(false)}><Close color='error' size={25} /></IconButton>
              </Box>
              <Box ml={2}>
                <IconButton onClick={() => updateField()}><SaveAlt style={{ color: 'rgba(0,110,10)', fontSize: 25 }} /></IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default connect(null, null)(EditAddressModal);