import React from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { Drawer, Grid, Box } from '@material-ui/core';
import SideMenuContainer from '../container/side-menu/side-menu-container';
import { withStyles } from '@material-ui/core';
import { History, RestaurantMenu, Settings, ViewQuilt, LocalBar, LocalPizza, CropFree, LocalAtm } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { connect } from 'react-redux';

const MyDrawer = withStyles({

    root: {
        width: '14%',
        minWidth: '200px'
    },

    paper: {
        width: '14%',
        minWidth: '200px',
        border: 0,
        boxShadow: ' 5px 0 0 rgba(0, 0, 0, 0.31)',
    },

})(Drawer);

const MyButton = withStyles({

    root: {
        padding: 0,
        width: '100%',
        color: 'white',
        border: 'none',
        overflow: 'auto'
    },

    label: {
        alignItems: 'center',
        justifyContent: 'start',
        fontSize: '15px',
        fontWeight: 'Bold',
    },

})(ToggleButton);

const MyButtonGroup = withStyles({

    root: {
        width: '100%',
    },

})(ToggleButtonGroup);

const SideMenuPublic = ({ currentPage, restaurants }) => {

    const history = useHistory();

    return (

        <MyDrawer variant='permanent' anchor='left'>
            <SideMenuContainer userRole={'client'} >
                <Box mt='10%' width='100%'>
                    {restaurants.length > 0 &&
                        <MyButtonGroup value={currentPage}
                            exclusive
                            orientation='vertical'>
                            <MyButton value='/overview' onClick={() => history.push('/overview')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <ViewQuilt fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    OVERVIEW
                                </Grid>
                            </MyButton>
                            <MyButton value='/menus' onClick={() => history.push('/menus')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <RestaurantMenu fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    MENIURI
                                </Grid>
                            </MyButton>
                            <MyButton value='/drinks' onClick={() => history.push('/drinks')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <LocalBar fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    BAUTURI
                                </Grid>
                            </MyButton>
                            <MyButton value='/extra' onClick={() => history.push('/extra')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <LocalPizza fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    EXTRA
                                </Grid>
                            </MyButton>
                            <MyButton value='/tables' onClick={() => history.push('/tables')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <CropFree fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    QR MESE
                                </Grid>
                            </MyButton>
                            <MyButton value='/orders' onClick={() => history.push('/orders')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <History fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    COMENZI
                                </Grid>
                            </MyButton>
                            <MyButton value='/checkout' onClick={() => history.push('/checkout')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <LocalAtm fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    CHECKOUT
                                </Grid>
                            </MyButton>
                            {/* <MyButton value='/work-staff' onClick={()=>history.push('/work-staff')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <SupervisorAccount fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                PERSONAL
                            </Grid>
                        </MyButton> */}
                            <MyButton value='/settings' onClick={() => history.push('/settings')}>
                                <Grid container item xs={4} justifyContent='center'>
                                    <Settings fontSize='large' />
                                </Grid>
                                <Grid container item xs={5} justifyContent='flex-start'>
                                    SETARI
                                </Grid>
                            </MyButton>
                        </MyButtonGroup>
                    }
                </Box>
            </SideMenuContainer>
        </MyDrawer>

    );
}

const mapStateToProps = (state) => ({ restaurants: state?.clientReducer?.client?.restaurants || [] })

export default withRouter(connect(mapStateToProps, null)(SideMenuPublic));