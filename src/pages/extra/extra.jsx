import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Grid } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import { Add, ArrowBack, Close, Edit, SaveAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { addExtra, getExtra, updateExtra } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import WaiteroTextField from '../../components/text-field/waitero-text-field.jsx';
import { numberValidator } from '../../utils/functions/input-validators.js';
import ChangePhotoButton from '../../components/buttons/changePhoto/changePhotoButton.jsx';

const Extra = ({ restaurants, extra, clientData, restaurantReducer, getExtra, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState(restaurants?.length ? restaurants[0]._id : '');
  const [newExtraName, setNewExtraName] = useState('');
  const [newExtraPrice, setNewExtraPrice] = useState('');
  const [newExtraPhoto, setNewExtraPhoto] = useState('');
  const [itemOnEditValues, setItemOnEditValues] = useState({ extraName: '', extraPrice: '', extraPhoto: '' })

  const [loadingOnAdd, setLoadingOnAdd] = useState(false);
  const [error, setError] = useState({ message: '', isError: false });
  const [onEditItem, setOnEditItem] = useState({ index: -1, loading: false });

  const goBackMenuSelection = () => {
    setRestaurantSelected('')
  }

  const resetFields = () => {
    setNewExtraName('')
    setNewExtraPrice('')
    setNewExtraPhoto('')
  }

  const resetExistentExtra = () => {
    setOnEditItem({ index: -1, loading: false });
    setItemOnEditValues({ extraName: '', extraPrice: '', extraPhoto: '' })
  }

  const refreshMyExtras = () => {
    resetFields();
    getExtra(clientData?._id, restaurantSelected)
  }

  const refreshMyExtrasOnUpdate = () => {
    resetExistentExtra();
    getExtra(clientData?._id, restaurantSelected)
  }

  const addExtraToList = () => {
    addExtra(newExtraName, parseFloat(newExtraPrice), newExtraPhoto, clientData?._id, restaurantSelected, setLoadingOnAdd, setError, refreshMyExtras)
  }

  const updateExtraFromList = (extraId) => {
    updateExtra(itemOnEditValues.extraName, parseFloat(itemOnEditValues.extraPrice), itemOnEditValues?.extraPhoto, clientData?._id, restaurantSelected, extraId, (stat) => setOnEditItem({ ...onEditItem, loading: stat }), setError, refreshMyExtrasOnUpdate)
  }

  const clickedEditOnItem = (index, defaultNameValue, defaultPriceValue, defaultPhotoValue) => {
    setOnEditItem({ index: index, loading: false })
    setItemOnEditValues({ extraName: defaultNameValue, extraPrice: defaultPriceValue, extraPhoto: defaultPhotoValue })
  }

  useEffect(() => {
    if (restaurantSelected?.length > 0)
      getExtra(clientData?._id, restaurantSelected)
    // eslint-disable-next-line
  }, [restaurantSelected])

  return (
    <PageContainer>
      {!restaurantSelected ? (
        <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'}>
          <Box width='100%' display={'flex'} justifyContent={'center'} fontSize={30} mb={3}>
            ALEGETI RESTAURANTUL
          </Box>
          <>
            {restaurants.map((el) => {
              return (
                <PrimaryButton key={el?._id} variant='contained' style={{ marginBottom: 5, width: '50%' }} onClick={() => setRestaurantSelected(el?._id)}>
                  {el.restaurantName}
                </PrimaryButton>
              )
            })}
          </>
        </Box>
      ) : (
        <>
          <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
            <Box textAlign='left' width={'100%'} fontSize='35px'>
              <IconButton onClick={() => goBackMenuSelection()} size={'small'} style={{ marginRight: 15 }} >
                <ArrowBack size={14} />
              </IconButton>
              EXTRA
            </Box>
            <Box width={'100%'} flexWrap='wrap'>
              <Box fontSize={20} marginTop={2} marginBottom={2}  >
                Adauga Extra
              </Box>
              <Grid container spacing={3}>
                <Grid container item xs={3}>
                  <WaiteroTextField value={newExtraName} onChange={(e) => setNewExtraName(e.target.value)} placeholder={'Nume'} fullWidth />
                </Grid>
                <Grid container item xs={1}>
                  <WaiteroTextField value={newExtraPrice} onChange={(e) => setNewExtraPrice(e.target.value)} placeholder={'Pret'} fullWidth />
                </Grid>
                <Grid container item xs={2}>
                  <ChangePhotoButton showImageOn photo={newExtraPhoto} height={40} name={'newExtraPhoto'} setPhoto={(photo) => setNewExtraPhoto(photo)} />
                </Grid>
                <Grid container item xs={2}>
                  {loadingOnAdd ? <CircularProgress size={20} /> : <>
                    <IconButton style={{ marginRight: 2 }} onClick={resetFields}><Close color='error' /></IconButton>
                    <IconButton disabled={!newExtraName?.length || !newExtraPrice?.length || numberValidator(newExtraPrice)}
                      onClick={addExtraToList}>
                      <Add color={!newExtraName?.length || !newExtraPrice?.length || numberValidator(newExtraPrice) ? 'disabled' : 'action'} />
                    </IconButton>
                  </>
                  }
                </Grid>
              </Grid>
              <Box fontSize={20} marginTop={2} marginBottom={2}  >
                Extra adaugati
              </Box>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                {
                  extra?.map((item, index) => {
                    return (
                      <Grid key={item?._id} container spacing={3}>
                        <Grid container item xs={3}>
                          <WaiteroTextField value={onEditItem.index === index ? itemOnEditValues.extraName : item.extraName} onChange={(e) => setItemOnEditValues({ extraName: e.target.value, extraPrice: itemOnEditValues.extraPrice, extraPhoto: itemOnEditValues.extraPhoto })} fullWidth disabled={onEditItem.index !== index} />
                        </Grid>
                        <Grid container item xs={1}>
                          <WaiteroTextField value={onEditItem.index === index ? itemOnEditValues.extraPrice : item.extraPrice} onChange={(e) => setItemOnEditValues({ extraName: itemOnEditValues.extraName, extraPrice: e.target.value, extraPhoto: itemOnEditValues.extraPhoto })} fullWidth disabled={onEditItem.index !== index} />
                        </Grid>
                        <Grid container item xs={2}>
                          <ChangePhotoButton showImageOn photo={onEditItem.index === index ? itemOnEditValues?.extraPhoto : item?.extraPhoto} disabled={onEditItem.index !== index} height={40} name={item?.extraPhoto?.replace(' ', '') + index} setPhoto={(photo) => setItemOnEditValues({ extraName: itemOnEditValues.extraName, extraPrice: itemOnEditValues.extraPrice, extraPhoto: photo })} />
                        </Grid>
                        <Grid container item xs={2}>
                          {onEditItem.index === index && onEditItem.loading ? <CircularProgress size={20} /> : <>
                            {onEditItem.index === index ? (<>
                              <IconButton style={{ marginRight: 2 }} onClick={resetExistentExtra}><Close color='error' /></IconButton>
                              <IconButton onClick={() => updateExtraFromList(item?._id)}><SaveAlt color='action' /></IconButton>
                            </>) : (<>
                              <IconButton onClick={() => clickedEditOnItem(index, item?.extraName, item?.extraPrice, item?.extraPhoto)}><Edit color='action' /></IconButton>
                              <DeleteModalIcon type={'extra'} clientId={clientData?._id} message={'Confirmati stergerea acestui extra?'} restaurantId={restaurantSelected} drinkId={item?._id} extraId={item?._id} />
                            </>)}
                          </>}
                        </Grid>
                      </Grid>)
                  })
                }
              </>)}
            </Box>
          </Box>
        </>)}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  extra: state?.restaurantReducer?.restaurant?.extra,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getExtra: (clientId, restaurantId, loadingSetter) => dispatch(getExtra(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Extra));
