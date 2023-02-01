import React from 'react';
import {Grid} from '@material-ui/core';
import SubscriptionBox from '../../../../components/box/subscription-box/subscription-box.jsx';

const subscriptions = [
    {name: 'A casual restaurant', location:'Cluj Napoca, Romania', subscriptionType: 'Gold', renewDate:'26/06/2022',
     partnerFrom: '20/04/2022', rate:'4.5'},
     {name: 'A casual restaurant', location:'Cluj Napoca, Romania', subscriptionType: 'Gold', renewDate:'26/06/2022',
     partnerFrom: '20/04/2022', rate:'4.5'},
     {name: 'A casual restaurant', location:'Cluj Napoca, Romania', subscriptionType: 'Gold', renewDate:'26/06/2022',
     partnerFrom: '20/04/2022', rate:'4.5'},
     {name: 'A casual restaurant', location:'Cluj Napoca, Romania', subscriptionType: 'Gold', renewDate:'26/06/2022',
     partnerFrom: '20/04/2022', rate:'4.5'},
     {name: 'A casual restaurant', location:'Cluj Napoca, Romania', subscriptionType: 'Gold', renewDate:'26/06/2022',
     partnerFrom: '20/04/2022', rate:'4.5'},
]

const ActiveSubscriptions = ()=>{
    return(

        <Grid container direction='row' spacing={3}>
            {subscriptions.map((el, index)=>
                <Grid key={el.name+index.toString()} container item xs={6} justifyContent='center'>
                    <SubscriptionBox name={el.name} location={el.location} subscriptionType={el.subscriptionType}
                             renewDate={el.renewDate} partnerFrom={el.partnerFrom} rate={el.rate}/>
                </Grid>  
            )}
        </Grid>

    );
}

export default ActiveSubscriptions;