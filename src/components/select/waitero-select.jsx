import { Select } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const WaiteroSelect = withStyles({
  root: {

    '& label.Mui-focused': {
      color: 'rgba(255, 90, 95, 1)',
    },

    '& .MuiSelect-underline:after': {
      borderBottomColor: 'rgba(255, 90, 95, 1)',
    },

    '& .MuiOutlinedSelect-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(255, 90, 95, 1)',

      },

      '&.Mui-focused fieldset': {
        borderColor: 'rgba(255, 90, 95, 1)',
      },
    },
  }
})(Select)

export default WaiteroSelect;
