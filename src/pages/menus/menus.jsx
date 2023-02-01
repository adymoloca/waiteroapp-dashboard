import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import MenuCard from '../../components/box/menu-card/menu-card.jsx';
import { ArrowBack, Edit } from '@material-ui/icons';
import EditMenuItem from '../../components/modal/edit-menu-item.jsx';
import AddMenuModal from '../../components/modal/add-menu-type.jsx';
import AddContent from '../../components/box/add-content/add-content.jsx';
import AddMenuItem from '../../components/modal/add-menu-item.jsx';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { getCategories, getMenus, getPlates } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import EditMenuModal from '../../components/modal/edit-menu-type.jsx';

const Menus = ({ restaurants, menus, categories, plates, clientData, restaurantReducer, getMenus, getCategories, getPlates, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState(restaurants?.length ? restaurants[0]._id : '');
  const [menuType, setMenuType] = useState('')
  const [onCategory, setOnCategory] = useState('');
  const [plateSelected, setPlateSelected] = useState('');
  const [modalAddMenuType, setModalAddMenuType] = useState(false);
  const [modalAddMenuItem, setModalAddMenuItem] = useState(false);
  const [modalEditMenuType, setModalEditMenuType] = useState({ name: '', id: '' });

  const getTitle = () => {
    if (menuType?.length === 0)
      return 'Meniuri'
    else if (onCategory?.length === 0)
      return 'Categorii'
    else if (menuType?.length > 0 && onCategory?.length > 0)
      return 'Preparate'
  }

  const goBackMenuSelection = () => {
    if (onCategory?.length > 0) {
      setOnCategory('');
      return;
    } else if (menuType?.length > 0 && onCategory?.length === 0) {
      setMenuType('')
      return;
    } else if (menuType?.length === 0) {
      setRestaurantSelected('')
      return;
    }
  }

  useEffect(() => {
    if (restaurantSelected?.length > 0)
      getMenus(clientData._id, restaurantSelected)
    // eslint-disable-next-line
  }, [restaurantSelected, clientData._id])

  useEffect(() => {
    if (menuType?.length > 0)
      getCategories(clientData._id, restaurantSelected, menuType)
    // eslint-disable-next-line
  }, [menuType])

  useEffect(() => {
    if (onCategory?.length > 0)
      getPlates(clientData._id, restaurantSelected, menuType, onCategory)
    // eslint-disable-next-line
  }, [onCategory])

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
                <PrimaryButton key={el._id} variant='contained' style={{ marginBottom: 5, width: '50%' }} onClick={() => setRestaurantSelected(el._id)}>
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
              {getTitle()}
            </Box>
            <Box width={'100%'} display={'flex'} marginTop={'2%'} flexWrap='wrap'>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                {menuType?.length === 0 && (
                  <>
                    {
                      menus?.map((item) => {
                        return (
                          <Box key={item._id}>
                            <Box display={'flex'}>
                              <DeleteModalIcon type={'menu'} clientId={clientData._id} message={'Confirmati stergerea acestui meniu?'} restaurantId={restaurantSelected} menuId={item._id} />
                              <IconButton onClick={() => setModalEditMenuType({ name: item.menuName, id: item._id })}><Edit /></IconButton>
                            </Box>
                            <Box key={item._id} marginRight={3} marginBottom={3} onClick={() => setMenuType(item._id)}>
                              <MenuCard title={item.menuName} />
                            </Box>
                          </Box>
                        )
                      })}
                    <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuType(true)}>
                      <MenuCard title={<AddContent title={'Adauga meniu'} />} />
                    </Box>
                  </>
                )}
                {menuType?.length > 0 && onCategory?.length === 0 && (
                  <>
                    {categories?.map((item) => {
                      return (
                        <Box key={item._id}>
                          <Box display={'flex'}>
                            <DeleteModalIcon type={'category'} clientId={clientData._id} message={'Confirmati stergerea acestei categorii?'} restaurantId={restaurantSelected} menuId={menuType} categoryId={item._id} />
                            <IconButton onClick={() => setModalEditMenuType({ name: item.categoryName, id: item._id })}><Edit /></IconButton>
                          </Box>
                          <Box key={item._id} marginRight={3} marginBottom={3} onClick={() => setOnCategory(item._id)}>
                            <MenuCard title={item.categoryName} />
                          </Box>
                        </Box>
                      )
                    })}
                    <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuType(true)}>
                      <MenuCard title={<AddContent title={'Adauga categorie'} />} />
                    </Box>
                  </>
                )}
                {onCategory?.length > 0 && (
                  <>
                    {plates?.map((item) => {
                      return (
                        <Box key={item._id}>
                          <Box display={'flex'}>
                            <DeleteModalIcon type={'plate'} clientId={clientData._id} message={'Confirmati stergerea acestui preparat?'} restaurantId={restaurantSelected} menuId={menuType} categoryId={onCategory} plateId={item._id} />
                          </Box>
                          <Box marginRight={3} marginBottom={3} onClick={() => setPlateSelected(item._id)}>
                            <MenuCard image={item?.platePhoto} title={<Box><Box width={'100%'}>{item.plateName}</Box><Box width={'100%'}>{item.platePrice} RON</Box></Box>} />
                          </Box>
                        </Box>
                      )
                    })}
                    <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuItem(true)}>
                      <MenuCard title={<AddContent title={'Adauga preparat'} />} />
                    </Box>
                  </>
                )}
              </>)}
            </Box>
          </Box>
          <AddMenuModal isOpen={modalAddMenuType} setIsOpen={() => setModalAddMenuType(false)} clientId={clientData._id} restaurantId={restaurantSelected} menuId={menuType} createMenuType={() => menuType?.length > 0 ? getCategories(clientData._id, restaurantSelected, menuType) : getMenus(clientData._id, restaurantSelected)} />
          <EditMenuModal isOpen={modalEditMenuType.id?.length > 0} setIsOpen={() => setModalEditMenuType({ name: '', id: '' })} menuName={modalEditMenuType.name} clientId={clientData._id} restaurantId={restaurantSelected} menuId={modalEditMenuType.id} categoryId={menuType?.length > 0 ? modalEditMenuType.id : ''} updateMenuType={() => menuType?.length > 0 ? getCategories(clientData._id, restaurantSelected, menuType) : getMenus(clientData._id, restaurantSelected)} />
          <AddMenuItem isModalOpen={modalAddMenuItem} setIsModalOpen={() => setModalAddMenuItem(false)} setItem={() => { getPlates(clientData._id, restaurantSelected, menuType, onCategory) }} clientId={clientData._id} restaurantId={restaurantSelected} menuId={menuType} categoryId={onCategory} />
          <EditMenuItem isModalOpen={plateSelected?.length > 0} setIsModalOpen={() => setPlateSelected('')} item={plates?.find(el => el._id === plateSelected)} setItem={() => { getPlates(clientData._id, restaurantSelected, menuType, onCategory) }} clientId={clientData._id} restaurantId={restaurantSelected} menuId={menuType} categoryId={onCategory} plateId={plateSelected} />
        </>)}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  plates: state?.restaurantReducer?.restaurant?.plates,
  categories: state?.restaurantReducer?.restaurant?.categories,
  menus: state?.restaurantReducer?.restaurant?.menus,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getMenus: (clientId, restaurantId, loadingSetter) => dispatch(getMenus(clientId, restaurantId, loadingSetter)),
  getCategories: (clientId, restaurantId, menuId, loadingSetter) => dispatch(getCategories(clientId, restaurantId, menuId, loadingSetter)),
  getPlates: (clientId, restaurantId, menuId, categoryId, loadingSetter) => dispatch(getPlates(clientId, restaurantId, menuId, categoryId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menus));
