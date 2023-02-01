import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const MyContainer = withStyles({
    

    root: {
        position: 'relative',
        display:'flex',
        flexDirection:'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor: 'rgba(255, 90, 95, 1)',
        //minHeight:'100vh',
        height: '100%',
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
    },

    maxWidthLg :{
        maxWidth: '100%',
    },

})(Container);

const SideMenuContainer = (props) => {

    return(
        <MyContainer>
            <Box maxWidth='100%' paddingTop={5} display='flex' justifyContent='center'
                fontSize={35} color={'white' } fontWeight={700}>
                WAITERO
            </Box>
            {props.userRole ? (<Box width={'100%'} paddingTop={1} display={'flex'} justifyContent={'center'} fontSize={25} color={'white'}>
                                    {props.userRole?.toUpperCase()}
                                </Box>) : null}
            <Box width='100%' display='flex' alignSelf='center' >
                {props.children}
            </Box>
            <Box position='absolute' bottom={0} width='50%' height='5%' borderTop={2} paddingTop={1} color='white' 
                textAlign='center' fontWeight={500}>
                2022 WAITERO
            </Box>
        </MyContainer>
    );
}

export default SideMenuContainer;
