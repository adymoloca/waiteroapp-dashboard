import React, { useState } from "react";
import { Box } from "@material-ui/core";
import PageContainer from "../../components/container/page-container/page-container.jsx";
import { useEffect } from "react";
import useStyles from "./ordersStyle.jsx";
import Order from "../../components/box/order-card/order-card.jsx";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.jsx";
import useInterval from "../../utils/functions/useInterval.js";
import { cleanErrorMessageRestaurant, cleanRestaurant, updateOrdersCooked } from "../../redux/types/RestaurantTypes.js";
import { getOrders } from "../../api/api-client/client-requests.js";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import WaiteroAlert from "../../components/alert/alert.jsx";

const Orders = ({ restaurants, ordersRed, clientData, restaurantReducer, getOrders, cleanErrorMessage, cleanRestaurant }) => {

  const classes = useStyles();

  const [restaurantSelected, setRestaurantSelected] = useState(restaurants?.length ? restaurants[0]._id : '');
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({ arr: ordersRed || [] })
  const [ordersCooked, setOrdersCooked] = useState({ arr: [] })

  const removeOrder = (index) => {
    const tempCooked = [...ordersCooked.arr]
    const tempOrd = [...orders.arr]
    const el = tempOrd.splice(index, 1)
    if (tempCooked.length > 10)
      tempCooked.shift();
    tempCooked.push(el[0])
    setOrders({ arr: [...tempOrd] })
    setOrdersCooked({ arr: [...tempCooked] })

  }

  const addNewOrders = async () => {
    function arrayUnique(array) {
      let a = array?.concat();
      for (let i = 0; i < a?.length; ++i) {
        for (let j = i + 1; j < a?.length; ++j) {
          if (a[i]?._id === a[j]?._id)
            a.splice(j--, 1);
        }
      }

      return a;
    }
    // Merges both arrays and gets unique items
    // eslint-disable-next-line
    const temp = arrayUnique(orders.arr.concat(ordersRed.filter((el) => el.isServed === false)));
    setOrders({ arr: [...ordersRed] || [] })
  }

  const getOrdersStart = () => {
    if (restaurantSelected.length > 0)
      return getOrders(clientData._id, restaurantSelected, setLoading);
  }

  useEffect(() => {
    if (restaurantSelected.length > 0)
      getOrders(clientData._id, restaurantSelected, setLoading);
    // eslint-disable-next-line
  }, [restaurantSelected, clientData._id])

  useEffect(() => {
    addNewOrders()
    // eslint-disable-next-line
  }, [ordersRed])

  useInterval(getOrdersStart, 100000)

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
              Comenzi
            </Box>
          </Box>
          {restaurantReducer.loading ? <CircularProgress /> : <>
            <Box className={classes.container}>
              {orders.arr?.map((order, index, array) => {
                return (<Order clientId={order?.clientId} restaurantId={order?.restaurantId} userId={order?.userId} orderId={order?._id} key={order?._id} order={order?.myCart} createdAt={order?.createdAt || 0} tableNumber={order?.tableNumber} remove={() => removeOrder(index)} />)
              })}
            </Box>
            <Box className={classes.container}>
              {ordersCooked.arr?.map((order, index, array) => {
                return (<Order cooked clientId={order?.clientId} restaurantId={order?.restaurantId} userId={order?.userId} orderId={order?._id} key={order?._id} order={order?.myCart} createdAt={order?.createdAt || 0} tableNumber={order?.tableNumber} remove={() => removeOrder(index)} />)
              })}
            </Box>
          </>}
        </>
      )}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  ordersRed: state?.restaurantReducer?.restaurant?.orders,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getOrders: (clientId, restaurantId, loadingSetter) => dispatch(getOrders(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant()),
  cleanRestaurant: () => dispatch(cleanRestaurant()),
  updateOrdersCooked: (orders) => dispatch(updateOrdersCooked(orders))
})


export default connect(mapStateToProps, mapDispatchToProps)(Orders);