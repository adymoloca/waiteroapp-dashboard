import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const PrimaryButton = withStyles({

  contained: {
    color: '#fff',
    backgroundColor: 'rgba(255, 90, 95, 1)',
    '&:hover': {
      color: 'rgba(255, 90, 95, 1)',
      backgroundColor: '#fff',
    }
  }

})(Button);

export default PrimaryButton;