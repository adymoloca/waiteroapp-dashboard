import React, { useState, useEffect } from 'react';
import { Box, Modal, Grid, Fade, IconButton } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';
import { updateRestaurantField } from '../../api/api-client/client-requests';

const EditContactModal = ({ contactObject, setContactObject = () => undefined, clientId, restaurantId }) => {

  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ message: '', isError: false });
  const [phone, setPhone] = useState(contactObject?.phoneNumber);
  const [website, setWebsite] = useState(contactObject?.website);
  const [mondayToFriday, setMondayToFriday] = useState({ openAt: contactObject?.orar?.mondayToFriday?.openAt, closeAt: contactObject?.orar?.mondayToFriday?.closeAt });
  const [saturday, setSaturday] = useState({ openAt: contactObject?.orar?.saturday?.openAt, closeAt: contactObject?.orar?.saturday?.closeAt });
  const [sunday, setSunday] = useState({ openAt: contactObject?.orar?.sunday?.openAt, closeAt: contactObject?.orar?.sunday?.closeAt });
  const [facebook, setFacebook] = useState(contactObject?.socialMedia?.facebookLink);
  const [instagram, setInstagram] = useState(contactObject?.socialMedia?.instagramLink);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const updateField = () => {
    updateRestaurantField({
      contact: {
        phoneNumber: phone,
        website: website,
        orar: {
          mondayToFriday: mondayToFriday,
          saturday: saturday,
          sunday: sunday
        },
        socialMedia: {
          facebookLink: facebook,
          instagramLink: instagram
        }
      }
    }, clientId, restaurantId, () => setContactObject({
      phoneNumber: phone,
      website: website,
      orar: {
        mondayToFriday: mondayToFriday,
        saturday: saturday,
        sunday: sunday
      },
      socialMedia: {
        facebookLink: facebook,
        instagramLink: instagram
      }
    }), setLoading, setError, setOpen);
  }

  useEffect(() => {
    setPhone(contactObject?.phoneNumber);
    setWebsite(contactObject?.website);
    setMondayToFriday({ openAt: contactObject?.orar?.mondayToFriday?.openAt, closeAt: contactObject?.orar?.mondayToFriday?.closeAt });
    setSaturday({ openAt: contactObject?.orar?.saturday?.openAt, closeAt: contactObject?.orar?.saturday?.closeAt })
    setSunday({ openAt: contactObject?.orar?.sunday?.openAt, closeAt: contactObject?.orar?.sunday?.closeAt })
    setFacebook(contactObject?.socialMedia?.facebookLink)
    setInstagram(contactObject?.socialMedia?.instagramLink)
  }, [contactObject])

  return (
    <>
      <IconButton onClick={(e) => { setOpen(true); e.stopPropagation() }} size={'small'} style={{ marginLeft: 15 }}><Edit size={14} /></IconButton>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
      <Modal disableEnforceFocus open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box display="flex" mt={3} width={'50%'}>
              <Grid container spacing={2} justifyContent={'center'}>
                <Grid container item xs={5}>
                  <WaiteroTextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth placeholder='Numar de telefon' />
                </Grid>
                <Grid container item xs={5}>
                  <WaiteroTextField value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth placeholder='Website' />
                </Grid>
                <Grid container item xs={5}>
                  <Box>Luni-vineri</Box>
                </Grid>
                <Grid container item xs={5}>
                  <Box>Sambata</Box>
                </Grid>
                <Grid container item xs={5} justifyContent={'space-between'}>
                  <Grid container item xs={5}>
                    <WaiteroTextField value={mondayToFriday.openAt} onChange={(e) => setMondayToFriday({ ...mondayToFriday, openAt: e.target.value })} fullWidth placeholder='00:00' />
                  </Grid>
                  <Grid container item xs={5}>
                    <WaiteroTextField value={mondayToFriday.closeAt} onChange={(e) => setMondayToFriday({ ...mondayToFriday, closeAt: e.target.value })} fullWidth placeholder='00:00' />
                  </Grid>
                </Grid>
                <Grid container item xs={5} justifyContent={'space-between'}>
                  <Grid container item xs={5}>
                    <WaiteroTextField value={saturday.openAt} onChange={(e) => setSaturday({ ...saturday, openAt: e.target.value })} fullWidth placeholder='00:00' />
                  </Grid>
                  <Grid container item xs={5}>
                    <WaiteroTextField value={saturday.closeAt} onChange={(e) => setSaturday({ ...saturday, closeAt: e.target.value })} fullWidth placeholder='00:00' />
                  </Grid>
                </Grid>
                <Grid container item xs={10}>
                  <Box>Duminica</Box>
                </Grid>
                <Grid container item xs={10} justifyContent={'flex-start'}>
                  <Grid container item xs={6} justifyContent={'space-between'}>
                    <Grid container item xs={5}>
                      <WaiteroTextField value={sunday.openAt} onChange={(e) => setSunday({ ...sunday, openAt: e.target.value })} fullWidth placeholder='00:00' />
                    </Grid>
                    <Grid container item xs={5}>
                      <WaiteroTextField value={sunday.closeAt} onChange={(e) => setSunday({ ...sunday, closeAt: e.target.value })} fullWidth placeholder='00:00' />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={5}>
                  <WaiteroTextField value={facebook} onChange={(e) => setFacebook(e.target.value)} fullWidth placeholder='Facebook link' />
                </Grid>
                <Grid container item xs={5}>
                  <WaiteroTextField value={instagram} onChange={(e) => setInstagram(e.target.value)} fullWidth placeholder='Instagram link' />
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

export default connect(null, null)(EditContactModal);