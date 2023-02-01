import React from 'react';
import {Box, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const MyBox = withStyles({

    root:{
        display:'flex',
        padding:'13px',
        justifyContent:'center',
        width:'92%',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius:'15px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }

})(Box);

const MyGrid = withStyles({

    root:{
        fontSize:'17px',
        fontWeight:'lighter',
        lineHeight:'1.1',
    }

})(Grid)

const SubscriptionBox = (props) =>{

    return(

        <MyBox>
            <Grid container justifyContent='center'>
                <MyGrid container item xs={6}>
                    {props.name}
                </MyGrid>
                <MyGrid container item xs={6}>
                    {props.location}
                </MyGrid>
                <MyGrid container item xs={6}>
                    {props.subscriptionType}
                </MyGrid>
                <MyGrid container item xs={6}>
                    {props.renewDate}
                </MyGrid>
                <MyGrid container item xs={6}>
                    {props.partnerFrom}
                </MyGrid>
                <MyGrid container item xs={6}>
                    {props.rate}
                </MyGrid>
            </Grid>
        </MyBox>

    );
}

export default SubscriptionBox;