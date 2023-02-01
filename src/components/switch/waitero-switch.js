import { Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const WaiteroSwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 20,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    color: theme.palette.grey[500],
    padding: 2,
    '&$checked': {
      transform: 'translateX(40px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 16,
    height: 16,
    boxShadow: 5,
  },
  track: {
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: 20 / 2,
    opacity: 1,
    height: 16,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default WaiteroSwitch;