import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const PageContainer = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'static',
        right: 0,
        bottom: 0,
        margin: 0,
        marginTop: 0,
        paddingLeft: '14%',
        padding: 0,
        paddingTop: '80px',
        paddingBottom: '20px',
        alignItems: 'center',
        backgroundColor: 'white',
        maxWidth: 'none',
    },

})(Container)

export default PageContainer;