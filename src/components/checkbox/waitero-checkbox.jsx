import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Checkbox} from '@material-ui/core';

const WaiteroCheckbox = withStyles({
    checked: {
        color: 'rgba(255, 90, 95, 1)',
    },
})((props)=><Checkbox color="default" {...props}/>);

export default WaiteroCheckbox;