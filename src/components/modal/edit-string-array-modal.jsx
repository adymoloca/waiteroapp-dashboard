import React, { useEffect, useState } from 'react';
import { Box, Modal, Fade, IconButton } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import { restaurant_categories, entertainment_types, payment_options } from '../../utils/costants/constants';
import { updateRestaurantField } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';

const EditStringArrayModal = ({ labelName, array, setArray = () => undefined, clientId, restaurantId }) => {

  const [open, setOpen] = useState(false);
  const [itemT, setItemT] = useState(array);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', isError: false })
  const classes = useStyles();

  useEffect(() => {
    setItemT(array)
  }, [array])

  const onCategoryClick = (category) => {
    if (itemT.includes(category))
      setItemT(old => old.filter(cat => cat !== category))
    else
      setItemT(old => old.concat([category]))
  }

  const updateField = () => {
    updateRestaurantField({ [labelName]: itemT }, clientId, restaurantId, setArray, setLoading, setError, setOpen);
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size={'small'} style={{ marginLeft: 15 }}><Edit size={14} /></IconButton>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box display="flex" mt={3}>
              <Box mr={2} width={800}>
                {labelName === 'cuisines' && restaurant_categories.map((category) => {
                  return <ToggleButton key={category} style={{ marginRight: 10, marginTop: 10, fontSize: 16 }} selected={itemT.includes(category)} onChange={() => onCategoryClick(category)}>
                    {category}
                  </ToggleButton>
                })}
                {labelName === 'entertainment' && entertainment_types.map((category) => {
                  return <ToggleButton key={category} style={{ marginRight: 10, marginTop: 10, fontSize: 16 }} selected={itemT.includes(category)} onChange={() => onCategoryClick(category)}>
                    {category}
                  </ToggleButton>
                })}
                {labelName === 'paymentOptions' && payment_options.map((category) => {
                  return <ToggleButton key={category} style={{ marginRight: 10, marginTop: 10, fontSize: 16 }} selected={itemT.includes(category)} onChange={() => onCategoryClick(category)}>
                    {category}
                  </ToggleButton>
                })}
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

export default EditStringArrayModal;