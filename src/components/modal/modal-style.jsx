import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #fff',
    borderRadius: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY:'auto'
  },
}));

export default useStyles;
