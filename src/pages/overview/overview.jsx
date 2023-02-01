import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import BoxWithShadow from '../../components/box/box-with-shadow/box-with-shadow.jsx';
import { Redirect, useHistory } from 'react-router-dom';
import EditLabelModal from '../../components/modal/edit-label-modal.jsx';
import { AttachMoney, Facebook, Forum, Instagram, Language, Money, MusicNote, Phone, RestaurantMenu, Room, Schedule } from '@material-ui/icons';
import EditStringArrayModal from '../../components/modal/edit-string-array-modal.jsx';
import AddBoxOverview from '../../components/box/add-box-overview/add-box-overview.jsx';
import GeneralStatisticsBox from '../../components/box/general-statistics-box/general-statistics-box.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import WaiteroSelect from '../../components/select/waitero-select.jsx';
import { getPlateMinimumPrice, getRating, getRestaurants, updateRestaurantField } from '../../api/api-client/client-requests.js';
import { useRef } from 'react';
import WaiteroAlert from '../../components/alert/alert.jsx';
import { getBase64Image } from '../../utils/functions/base64Image.js';
import EditAddressModal from '../../components/modal/edit-address-modal.jsx';
import EditContactModal from '../../components/modal/edit-contact-modal.jsx';
import CoverImagePlaceholder from '../../assets/images/placeholder_cover_image.png';

const Overview = ({ restaurants, clientData, getRestaurants, loading }) => {

  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants?.length > 0 ? restaurants[0]?._id : '')
  const [coverPhoto, setCoverPhoto] = useState(restaurants?.length > 0 ? restaurants[0]?.coverPicture : '');
  const [photoChanged, setPhotoChanged] = useState(false);
  const [restaurantName, setRestaurantName] = useState(restaurants?.length > 0 ? restaurants[0]?.restaurantName : '');
  const [restaurantAddress, setRestaurantAddress] = useState(restaurants?.length > 0 ? restaurants[0]?.location?.address : '');
  const [showEditResAddress, setShowEditResAddress] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [showEditCusines, setShowEditCusines] = useState(false);
  const [showEditEnterteinment, setShowEditEnterteinment] = useState(false);
  const [showEditPaymentOptions, setShowEditPaymentOptions] = useState(false);
  const [resDescription, setResDescription] = useState(restaurants?.length > 0 ? restaurants[0]?.description : '')
  const [cusines, setCusines] = useState(restaurants?.length > 0 ? restaurants[0]?.cuisines : '')
  const [entertainment, setEntertainment] = useState(restaurants?.length > 0 ? restaurants[0]?.entertainment : '')
  const [paymentOptions, setPaymentOptions] = useState(restaurants?.length > 0 ? restaurants[0]?.paymentOptions : '')
  const [error, setError] = useState({ message: '', isError: false });
  const [restaurantContact, setRestaurantContact] = useState(restaurants?.length > 0 ? restaurants[0]?.contact : '')
  const [plateMinimumPrice, setPlateMinimumPrice] = useState(0);
  const [generalRating, setGeneralRating] = useState(0);
  const [ratingsNumber, setRatingsNumber] = useState(0);
  const [rat, setRat] = useState({ food: 0, service: 0, ambience: 0, experience: 0 });
  const [loadingMinPrice, setLoadMinPrice] = useState(false);
  const history = useHistory()
  const firstRender = useRef(true)

  const createCoverPhoto = async (photo) => {
    const base64 = await getBase64Image(photo)
    setPhotoChanged(true);
    setCoverPhoto(base64)
  }

  useEffect(() => {
    getPlateMinimumPrice(clientData?._id, selectedRestaurant, setPlateMinimumPrice, setLoadMinPrice, setError)
    getRating(clientData?._id, selectedRestaurant, setGeneralRating, setRatingsNumber, setRat, () => undefined, setError)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setRestaurantName(restaurants.find(el => el?._id === selectedRestaurant)?.restaurantName)
    setResDescription(restaurants.find(el => el?._id === selectedRestaurant)?.description)
    setCusines(restaurants.find(el => el?._id === selectedRestaurant)?.cuisines)
    setEntertainment(restaurants.find(el => el?._id === selectedRestaurant)?.entertainment)
    setPaymentOptions(restaurants.find(el => el?._id === selectedRestaurant)?.paymentOptions)
    setCoverPhoto(restaurants.find(el => el?._id === selectedRestaurant)?.coverPicture)
    // eslint-disable-next-line
  }, [selectedRestaurant])

  useEffect(() => {
    if (!restaurants?.find(el => el?._id === selectedRestaurant) && selectedRestaurant !== restaurants[0]?._id)
      setSelectedRestaurant(restaurants[0]?._id)
    //  eslint-disable-next-line
  }, [restaurants])

  const handleChangeRestaurant = (e) => {
    setSelectedRestaurant(e.target.value)
  }

  useEffect(() => {
    getRestaurants(clientData?._id, () => undefined)
    // eslint-disable-next-line
  }, [restaurantName, resDescription, cusines, coverPhoto])

  useEffect(() => {
    if (firstRender.current)
      firstRender.current = false
    else if (coverPhoto.length > 0 && !(firstRender.current) && photoChanged) {
      updateRestaurantField({ coverPicture: coverPhoto }, clientData?._id, selectedRestaurant, setCoverPhoto, () => undefined, setError)
      setPhotoChanged(false)
    }
    // eslint-disable-next-line
  }, [coverPhoto])

  return (
    <PageContainer>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
      {loading ? <CircularProgress /> : restaurants.length > 0 ? (
        <Box display='flex' width={'90%'} flexDirection={'row'} alignItems={'flex-start'} justifyContent={'flex-start'}>
          <Box width='32%' display='flex' flexDirection='column' justifyContent='center'>
            <Box display={'flex'} width={'100%'}>
              <WaiteroSelect value={selectedRestaurant} fullWidth onChange={handleChangeRestaurant} style={{ fontSize: 25 }}>
                {restaurants.map((restaurant, index) => {
                  return (
                    <MenuItem key={restaurant?._id + index} value={restaurant?._id}>
                      {restaurant?.restaurantName}
                    </MenuItem>
                  )
                })}
              </WaiteroSelect>
              <EditLabelModal labelName={'restaurantName'} label={restaurantName} setLabel={(label) => setRestaurantName(label)} clientId={clientData?._id} restaurantId={selectedRestaurant} />
            </Box>
            <Box paddingTop='8%'>
              <BoxWithShadow name={'cover-photo'} source={coverPhoto || CoverImagePlaceholder} setSource={createCoverPhoto}
                overlayText={'EDITEAZA COPERTA'} height={250} width={'92%'} isButton />
              <Box onMouseEnter={() => setShowEditResAddress(true)} onMouseLeave={(e) => e.relatedTarget.lastChild ? setShowEditResAddress(false) : null}
                style={{ fontSize: 25, fontWeight: '-moz-initial', paddingTop: '20px', width: 426, fontStyle: 'oblique' }}><Room size={25} color={'inherit'} style={{ marginRight: 3 }} />
                {restaurantAddress?.street ? restaurantAddress?.street + ' ' + restaurantAddress?.number + ', ' : ''}{restaurantAddress?.city ? restaurantAddress?.city + ', ' : ''}{restaurantAddress?.country}
                <Box>{restaurantAddress?.postalCode}{showEditResAddress && <EditAddressModal addressObject={restaurantAddress} setAddressObject={(obj) => setRestaurantAddress(obj)} clientId={clientData?._id} restaurantId={selectedRestaurant} />}</Box>
              </Box>
            </Box>
            <Box>
              <Box width={'92%'} display={'flex'} justifyContent={'flex-end'}> <Rating readOnly defaultValue={generalRating} precision={0.1} size='large' /></Box>
              <Box width={'92%'} display={'flex'} paddingBottom={1} fontSize={20} flexDirection={'row'}> <Forum size={20} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{ratingsNumber} recenzii</Box></Box>
              <Box width={'92%'} display={'flex'} paddingBottom={1} fontSize={20} flexDirection={'row'}> <Money size={20} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{loadingMinPrice ? <CircularProgress size={16} /> : plateMinimumPrice} RON pret minim</Box></Box>
              <Box width={'92%'} display={'flex'} paddingBottom={1} fontSize={20} flexDirection={'row'}> <RestaurantMenu size={20} color={'inherit'} style={{ paddingRight: 20 }} /><Box onMouseEnter={() => setShowEditCusines(true)} onMouseLeave={(e) => e.relatedTarget.lastChild ? setShowEditCusines(false) : null}>{cusines?.length ? cusines.join(', ') : ''}{showEditCusines ? <EditStringArrayModal labelName={'cuisines'} array={cusines} setArray={(cuisines) => setCusines(cuisines)} clientId={clientData?._id} restaurantId={selectedRestaurant} /> : null}</Box></Box>
              <Box width={'92%'} display={'flex'} paddingBottom={1} fontSize={20} flexDirection={'row'}> <MusicNote size={20} color={'inherit'} style={{ paddingRight: 20 }} /><Box onMouseEnter={() => setShowEditEnterteinment(true)} onMouseLeave={(e) => e.relatedTarget.lastChild ? setShowEditEnterteinment(false) : null}>{entertainment?.length ? entertainment.join(', ') : ''}{showEditEnterteinment ? <EditStringArrayModal labelName={'entertainment'} array={entertainment} setArray={(entertainment) => setEntertainment(entertainment)} clientId={clientData?._id} restaurantId={selectedRestaurant} /> : null}</Box></Box>
              <Box width={'92%'} display={'flex'} paddingBottom={1} fontSize={20} flexDirection={'row'}> <AttachMoney size={20} color={'inherit'} style={{ paddingRight: 20 }} /><Box onMouseEnter={() => setShowEditPaymentOptions(true)} onMouseLeave={(e) => e.relatedTarget.lastChild ? setShowEditPaymentOptions(false) : null}>{paymentOptions?.length ? paymentOptions.join(', ') : ''}{showEditPaymentOptions ? <EditStringArrayModal labelName={'paymentOptions'} array={paymentOptions} setArray={(options) => options ? setPaymentOptions(options) : null} clientId={clientData?._id} restaurantId={selectedRestaurant} /> : null}</Box></Box>
            </Box>
            <Box width={'92%'} display={'flex'} fontSize={23} marginTop={2} onMouseEnter={() => setShowEditDescription(true)} onMouseLeave={(e) => e.relatedTarget.lastChild ? setShowEditDescription(false) : null}>
              {resDescription}
              {showEditDescription ? <EditLabelModal labelName={'description'} label={resDescription} setLabel={(label) => setResDescription(label)} clientId={clientData?._id} restaurantId={selectedRestaurant} /> : null}
            </Box>
          </Box>
          <Box width={'63%'} display={'flex'} flexDirection={'column'} alignItems='center'>
            <Box width='100%' marginTop={'8%'} display='flex' flexDirection='row' justifyContent='space-between' marginBottom={4}>
              <Box paddingTop='1%' width={'48%'}>
                <AddBoxOverview onClick={() => history.push('/menus')}
                  overlayText={'Adauga meniu'} backgroundColor={'#00000099'} height={250} width={'100%'} alignItems={'center'} justifyContent={'flex-end'} iconAdd />
              </Box>
              <Box width={'48%'}>
                <Box height={250} padding={1} width={'100%'} borderRadius={5} border={showEditContact ? 1 : 0} onMouseEnter={() => setShowEditContact(true)} onMouseLeave={(e) => e.relatedTarget.lastChild ? setShowEditContact(false) : null}>
                  <Box fontSize={22}>Informati contact</Box>
                  <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Phone size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.phoneNumber}</Box></Box>
                  <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Language size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.website}</Box></Box>
                  <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Schedule size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>Lun-Vin {restaurantContact?.orar?.mondayToFriday?.openAt}-{restaurantContact?.orar?.mondayToFriday?.closeAt} | Sam {restaurantContact?.orar?.saturday?.openAt}-{restaurantContact?.orar?.saturday?.closeAt} | Dum {restaurantContact?.orar?.sunday?.openAt}-{restaurantContact?.orar?.sunday?.closeAt} </Box></Box>
                  <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Facebook size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.socialMedia?.facebookLink}</Box></Box>
                  <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Instagram size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.socialMedia?.instagramLink}</Box></Box>
                  {showEditContact && <EditContactModal contactObject={restaurantContact} setContactObject={(obj) => setRestaurantContact(obj)} clientId={clientData?._id} restaurantId={selectedRestaurant} />}
                </Box>
              </Box>
            </Box>
            <Box height={200} width={'100%'} marginTop={4}>
              <Grid container justifyContent='space-between' width='100%'>
                <Grid container item xs={3} justifyContent={'center'}>
                  <GeneralStatisticsBox title={'Mancare'} content={rat?.food?.toFixed(1)} subInfo={<Rating readOnly defaultValue={rat?.food} precision={0.1} size='small' />} rating />
                </Grid>
                <Grid container item xs={3} justifyContent={'center'}>
                  <GeneralStatisticsBox title={'Servire'} content={rat?.service?.toFixed(1)} subInfo={<Rating readOnly defaultValue={rat?.service} precision={0.1} size='small' />} rating />
                </Grid>
                <Grid container item xs={3} justifyContent={'center'}>
                  <GeneralStatisticsBox title={'Locul'} content={rat?.ambience?.toFixed(1)} subInfo={<Rating readOnly defaultValue={rat?.ambience} precision={0.1} size='small' />} rating />
                </Grid>
                <Grid container item xs={3} justifyContent={'center'}>
                  <GeneralStatisticsBox title={'Experienta'} content={rat?.experience?.toFixed(1)} subInfo={<Rating readOnly defaultValue={rat?.experience} precision={0.1} size='small' />} rating />
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Box>
      ) : <Redirect to='on-boarding' />}
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  loading: state?.clientReducer?.loading,
  restaurants: state?.clientReducer?.client?.restaurants || [],
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getRestaurants: (clientId, loadingSetter) => dispatch(getRestaurants(clientId, loadingSetter))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
