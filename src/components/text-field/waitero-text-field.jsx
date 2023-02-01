import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = {
    root: {
      '& label.Mui-focused': {
        color: 'rgba(255, 90, 95, 1)',
      },
      '& .MuiInput-underline:after':{
        borderBottomColor: 'rgba(255, 90, 95, 1)',
      },
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'rgba(255, 90, 95, 1)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(255, 90, 95, 1)',
        },
      },
    }
  };

  const WaiteroTextField = (props) => <TextField className={props.classes.root} autoComplete='new-password' inputProps={{autoComplete: 'new-password'}} {...props}/>

  // (TextField)

  export default withStyles(styles)(WaiteroTextField);