import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const LoginBox = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '500px',
        boxSizing: 'border-box',
        padding: '40px',
        zIndex: '0',
        borderRadius: '15px',
        boxShadow: ' 0 15px 20px rgba(0, 0, 0, 0.31)',
    }
})(Box)

export default LoginBox;