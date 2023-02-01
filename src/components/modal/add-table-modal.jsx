import React, {useState} from 'react';
import { Modal, Fade, Box, CircularProgress, IconButton } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroTextField from '../text-field/waitero-text-field';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addTable } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { Close, SaveAlt } from '@material-ui/icons';
import { numberValidator } from '../../utils/functions/input-validators';

const AddTableModal = ({isOpen, setIsOpen, clientId, restaurantId, tableAdded }) => {
    
    const classes = useStyles();
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });

    const closeOnAddTable = () => {
        tableAdded();
        setIsOpen(false);
    }

    const addTableHandlerHandler = () => {
        addTable(parseFloat(number), clientId, restaurantId,  setLoading, setError, closeOnAddTable)
    }

    const returnBack = () => {
        setNumber('');
        setIsOpen(false)
    }


    return (
        <>
            <WaiteroAlert
                isError={error.isError}
                message={error.message}
                cleanError={() => setError({ message: '', isError: false })}
            />
            <Modal open={isOpen} onClose={returnBack}>
                <Fade in={isOpen} timeout={600}>
                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" className={classes.paper}>
                        <Box>Adaugare masa..</Box>
                    <Box marginTop={10} display={'flex'} alignItems={'center'}>
                        <Box width={500}>
                                <WaiteroTextField placeholder='Numar masa' fullWidth value={number} onChange={(t) => setNumber(t.target.value)} />
                                </Box>
                                <Box display={'flex'}>
                            
                            {loading ? <CircularProgress size={20} /> : (<>
                                <Box ml={2}>
                                    <IconButton onClick={returnBack}>
                                        <Close color="error" size={25} />
                                    </IconButton>
                                </Box>
                                <Box ml={2}>
                                        <IconButton disabled={ numberValidator(number) }
                                        onClick={() => {
                                            addTableHandlerHandler();
                                        }}
                                    >
                                        <SaveAlt
                                            style={{
                                                color: numberValidator(number) ? 'rgba(0,0,0,0.2)' : 'rgba(0,110,10)',
                                                fontSize: 25,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </>)}
                    </Box>
                        </Box>
                        </Box>
                </Fade>
            </Modal>
        </>
    );

}

export default withRouter(connect(null, null)(AddTableModal));