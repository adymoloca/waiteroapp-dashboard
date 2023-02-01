import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import AddBoxOverview from '../../components/box/add-box-overview/add-box-overview.jsx';
import ResetPasswordModal from '../../components/modal/reset-password.jsx';
import { connect } from 'react-redux';
import DeleteModal from '../../components/modal/delete-modal.jsx';

const Settings = ({ client, restaurants }) => {

    const [current, setCurrent] = useState(-1);

    return (
        <PageContainer>
            <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                <Box textAlign='left' width={'100%'} fontSize='35px'>
                    Setari
                </Box>
                <Box display='flex' justifyContent={'flex-start'}>
                    <Box marginTop={3} marginRight={3} onClick={() => setCurrent(1)} width={'300px'}>
                        <AddBoxOverview
                            overlayText={'Reset Password'} backgroundColor={'#ffffff'} color={'#00000090'} height={180} width={'300px'} alignItems={'center'} iconPassword boxShadow={'0px 6px 6px rgba(0, 0, 0, 0.25)'} />
                    </Box>
                    {restaurants?.length && restaurants?.map((restaurant, index) => {
                        return <DeleteModal label={`Sterge restaurantul ${restaurant.restaurantName}`} message={'Confirmati stergerea acestui restaurant?'} clientId={client?._id} restaurantId={restaurant._id} />
                    })}
                </Box>
            </Box>
            <ResetPasswordModal open={current === 1} setOpen={setCurrent} clientId={client._id} />
        </PageContainer>
    )
}

const mapStateToProps = (state) => ({
    client: state?.clientReducer?.client,
    restaurants: state?.clientReducer?.client?.restaurants || []
})

export default withRouter(connect(mapStateToProps, null)(Settings));
