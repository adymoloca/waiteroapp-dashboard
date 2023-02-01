import React, { useEffect, useState } from 'react';
import { Box, Modal, Fade, IconButton } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import { updateRestaurantField } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';

const EditLabelModal = ({ labelName, label, setLabel = () => undefined, clientId, restaurantId }) => {

  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', isError: false });
  const [field, setField] = useState(label);
  const classes = useStyles();

  useEffect(() => {
    setField(label)
  }, [label])

  const updateField = () => {
    updateRestaurantField({ [labelName]: field }, clientId, restaurantId, setLabel, setLoading, setError, setOpen);
  }

  return (
    <>
      <IconButton onClick={(e) => { setOpen(true); e.stopPropagation() }} size={'small'} style={{ marginLeft: 15 }}><Edit size={14} /></IconButton>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box display="flex" mt={3}>
              <Box mr={2} width={400}>
                <WaiteroTextField value={field} onChange={(e) => setField(e.target.value)} fullWidth />
              </Box>
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

export default connect(null, null)(EditLabelModal);