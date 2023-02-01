import React, { useState } from 'react';
import {
    Box,
    Modal,
    Fade,
    IconButton,
    CircularProgress,
} from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, SaveAlt } from '@material-ui/icons';
import { addCategory, addMenu } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';

const AddMenuModal = ({
    isOpen,
    setIsOpen,
    clientId,
    restaurantId,
    menuId,
    createMenuType,
}) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });

    function returnBack() {
        setIsOpen();
        setName('');
    }

    const closeModal = () => {
        createMenuType();
        setIsOpen(false);
    }

    function createMenuTypeAction() {
        if (menuId.length === 0)
            addMenu(name, clientId, restaurantId, setLoading, setError, closeModal)
        else
            addCategory(
                name,
                clientId,
                restaurantId,
                menuId,
                setLoading,
                setError,
                closeModal
            )
        setName('');
    }

    return (
        <>
            <WaiteroAlert
                isError={error.isError}
                message={error.message}
                cleanError={() => setError({ message: '', isError: false })}
            />
            <Modal open={isOpen} onClose={() => returnBack()}>
                <Fade in={isOpen} timeout={600}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.paper}
                    >
                        <Box display="flex" mt={3}>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Box mr={2} width={400}>
                                        <WaiteroTextField
                                            placeholder="Name"
                                            value={name}
                                            onKeyDown={(key) =>
                                                key.key === 'Enter' &&
                                                createMenuTypeAction(name)
                                            }
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            fullWidth
                                        />
                                    </Box>
                                    <Box ml={2}>
                                        <IconButton onClick={returnBack}>
                                            <Close color="error" size={25} />
                                        </IconButton>
                                    </Box>
                                    <Box ml={2}>
                                        <IconButton disabled={!name.length}
                                            onClick={() => {
                                                createMenuTypeAction();
                                            }}
                                        >
                                            <SaveAlt
                                                style={{
                                                    color: !name.length ? 'rgba(0,0,0,0.2)' : 'rgba(0,110,10)',
                                                    fontSize: 25,
                                                }}
                                            />
                                        </IconButton>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default AddMenuModal;
