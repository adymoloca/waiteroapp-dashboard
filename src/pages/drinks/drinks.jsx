import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import MenuCard from '../../components/box/menu-card/menu-card.jsx';
import { ArrowBack } from '@material-ui/icons';
import AddDrinkModal from '../../components/modal/add-drink-modal.jsx';
import AddContent from '../../components/box/add-content/add-content.jsx';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { getDrinks } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import EditDrinkModal from '../../components/modal/edit-drink-modal.jsx';

const Drinks = ({ restaurants, drinks, clientData, restaurantReducer, getDrinks, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState(restaurants?.length ? restaurants[0]._id : '');
  const [drinkSelected, setDrinkSelected] = useState('')
  const [modalAddDrinkType, setModalAddDrinkType] = useState(false);
  const [groupedByCategory, setGroupedByCategory] = useState({});

  const goBackMenuSelection = () => {
    setRestaurantSelected('')
  }

  function groupBy(arr, property) {
    return arr?.reduce(function (memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {}) || [];
  }

  useEffect(() => {
    async function createGroupedDrinks() {
      const o = await groupBy(drinks, 'drinkCategory')
      return o
    }
    createGroupedDrinks().then((grouped) => setGroupedByCategory(grouped))
  }, [drinks])

  useEffect(() => {
    if (restaurantSelected?.length > 0)
      getDrinks(clientData?._id, restaurantSelected)
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
            {restaurants?.map((el) => {
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
              BAUTURI
            </Box>
            <Box width={'100%'} /* display={'flex'}  */ marginTop={'2%'} flexWrap='wrap'>
              <Box marginRight={3} marginTop={3} marginBottom={3} width={280} onClick={() => setModalAddDrinkType(true)}>
                <MenuCard title={<AddContent title={'Adauga bautura'} />} />
              </Box>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                {Object.keys(groupedByCategory)?.map((key) => {
                  return <Fragment key={key}>
                    <Box fontSize={30} borderBottom={1}>
                      {key}
                    </Box>
                    <Box display={'flex'} flexWrap={'wrap'}>
                      {groupedByCategory[key].map((item) => {
                        return (
                          <Box key={item?._id}>
                            <Box display={'flex'}>
                              <DeleteModalIcon type={'drink'} clientId={clientData?._id} message={'Confirmati stergerea acestei bauturi?'} restaurantId={restaurantSelected} drinkId={item?._id} />
                            </Box>
                            <Box key={item?._id} marginRight={3} marginBottom={3} onClick={() => setDrinkSelected(item?._id)}>
                              <MenuCard image={item?.drinkPhoto} title={<Box><Box width={'100%'}>{item.drinkName}</Box><Box width={'100%'}>{item.drinkPrice} RON</Box></Box>} />
                            </Box>
                          </Box>
                        )
                      }
                      )}
                    </Box>
                  </Fragment>
                })}
              </>
              )}
            </Box>
          </Box>
          <AddDrinkModal isOpen={modalAddDrinkType} setIsOpen={() => setModalAddDrinkType(false)} clientId={clientData?._id} restaurantId={restaurantSelected} createDrinkType={() => getDrinks(clientData?._id, restaurantSelected)} />
          <EditDrinkModal isOpen={drinkSelected?.length > 0} setIsOpen={() => setDrinkSelected('')} item={drinks?.find(el => el?._id === drinkSelected)} clientId={clientData?._id} restaurantId={restaurantSelected} drinkId={drinkSelected} updateDrinkType={() => getDrinks(clientData?._id, restaurantSelected)} />
        </>)}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  drinks: state?.restaurantReducer?.restaurant?.drinks,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getDrinks: (clientId, restaurantId, loadingSetter) => dispatch(getDrinks(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drinks));
