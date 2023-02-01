import React from "react";
import { Snackbar, Slide } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const WaiteroAlert = ({message, isError, cleanError = () => undefined}) => {
    return <>
        <Snackbar open={message?.length > 0} onClose={()=> cleanError()} autoHideDuration={1000} anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            TransitionComponent={(props) => { return <Slide {...props} direction={'left'} /> }}>
            <Alert  onClose={() => cleanError()} severity={isError ? 'error' : 'success'} style={{marginTop: isError ? '50px' : 0}}>
                {message}
            </Alert>
        </Snackbar>
    </>
}

export default WaiteroAlert