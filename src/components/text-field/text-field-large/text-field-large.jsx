import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const WaiteroTextFieldLarge = withStyles({
  root: {
    '& .MuiInputBase-input': {
        fontSize: 'xx-large'
      },
        
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
  })(TextField);

  export default WaiteroTextFieldLarge