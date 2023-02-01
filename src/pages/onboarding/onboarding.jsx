import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Slide } from '@material-ui/core'
import PageContainer from '../../components/container/page-container/page-container';
import { withRouter } from 'react-router-dom';
import WaiteroTextFieldLarge from '../../components/text-field/text-field-large/text-field-large';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton';
import { useHistory } from 'react-router-dom';
import { addRestaurant } from '../../api/api-client/client-requests';
import { connect } from 'react-redux';
import { restaurant_categories } from '../../utils/costants/constants';
import { ToggleButton } from '@material-ui/lab';

const OnBoarding = ({ clientReducer, addRestaurant }) => {

    const history = useHistory();

    const setNavigation = (path) => {
        history.push(path)
    }

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantCuisines, setRestaurantCuisinies] = useState([]);

    const [loading, setLoading] = useState(false);


    const submitHandler = () => {
        addRestaurant(restaurantName, restaurantCuisines, clientReducer.client._id, setLoading, setNavigation)
    }

    const onCategoryClick = (category) => {
        if (restaurantCuisines.includes(category))
            setRestaurantCuisinies(cuisines => cuisines.filter(cat => cat !== category))
        else
            setRestaurantCuisinies(cuisines => cuisines.concat([category]))
    }

    return (<>
        <PageContainer>
            <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                <Box width='32%' display='flex' flexDirection='column' justifyContent='center'>
                    <Box textAlign='left' fontSize='35px' paddingBottom={5}>
                        Incepe prin a adauga restaurantul tau..
                    </Box>
                </Box>
                <Grid container spacing={3}>
                    <Grid container item xs={10}>
                        <Box fontSize={28} fontWeight={600} textAlign='left'>Care este numele restaurantului?</Box>
                        <WaiteroTextFieldLarge defaultValue={restaurantName} placeholder={'Numele restaurantului'} onKeyDown={(e)=>e.key==='Enter' ? setRestaurantName(e.target.value) : null} onBlur={(e) => setRestaurantName(e.target.value)} fullWidth/>
                    </Grid>
                    <Slide in={restaurantName.length>0 } direction='right'>
                        <Grid container item xs={10}>
                            <Box fontSize={28} fontWeight={600} paddingBottom={1} textAlign='left'>Ce tip de mancare serviti? <br/>Este nevoie sa adaugati cel putin o categorie.</Box>
                            <Box display={'flex'} width='100%' flexWrap={'wrap'}>
                                {restaurant_categories.map((category) => {
                                    return <ToggleButton style={{marginRight: 10, marginTop: 10, fontSize: 20}} selected={restaurantCuisines.includes(category)} onChange={() => onCategoryClick(category)}>
                                        {category}        
                                    </ToggleButton>
                                })}
                            </Box>
                        </Grid>
                    </Slide>
                    <Grid container item xs={10} justifyContent={'flex-end'}>
                        <PrimaryButton variant={'contained'} disabled={!restaurantName.length || !restaurantCuisines.length} onClick={() => submitHandler()} style={{ width: 350 }}>
                            { loading ? <CircularProgress  style={{color: '#fff'}} size={26}/> : 'SUBMITETI' }
                        </PrimaryButton>
                    </Grid>
                    {/* <Redirect to={'/overview'}/> */}
                </Grid>
            </Box>
        </PageContainer>
    </>)
} 

const mapStateToProps = (state) => ({ clientReducer: state.clientReducer });
const mapDispatchToProps = (dispatch) => ({ addRestaurant: (restaurantName, restaurantDescription, restaurantCuisines, clientId, loadingSetter, setNavigation) => dispatch(addRestaurant(restaurantName, restaurantDescription, restaurantCuisines, clientId, loadingSetter, setNavigation)) })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnBoarding));