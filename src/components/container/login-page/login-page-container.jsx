import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const MyContainer = withStyles({


    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 90, 95, 1)',
        height: '100vh',
        width: '100%'
    },

    maxWidthLg: {
        maxWidth: '100%',
    },

})(Container);

const LoginContainer = (props) => {
    return (
        <MyContainer>
            <Box width='100%' paddingTop={props.paddingTop || '1%'} paddingBottom={3} display='flex' justifyContent='center'
                fontSize={60} fontWeight={700} color={'white'} textAlign={'center'}>
                WAITERO
            </Box>
            <Box display='flex' width={0.5} maxWidth={'650px'} minWidth={'350px'} marginTop={10} justifyContent={'center'} alignItems={'center'}>
                {props.children}
            </Box>
        </MyContainer>
    );
}

export default LoginContainer;