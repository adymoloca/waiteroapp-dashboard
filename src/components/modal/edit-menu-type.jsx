import React, { useEffect, useState } from 'react';
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
import { updateCategory, updateMenu } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';

const EditMenuModal = ({
    isOpen,
    setIsOpen,
    menuName,
    clientId,
    restaurantId,
    menuId,
    categoryId,
    updateMenuType,
}) => {
    const classes = useStyles();
    const [name, setName] = useState(menuName);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });

    function returnBack() {
        setIsOpen();
        setName('');
    }

    const closeModal = () => {
        updateMenuType();
        setIsOpen(false);
    }

    function updateMenuTypeAction() {
        if (categoryId.length === 0)
            updateMenu(name, clientId, restaurantId, menuId, setLoading, setError, closeModal)
        else
            updateCategory(
                name,
                clientId,
                restaurantId,
                menuId,
                categoryId,
                setLoading,
                setError,
                closeModal
            )
        setName('');
    }

    useEffect(()=>{
        setName(menuName)
    }, [menuName])

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
                                                updateMenuTypeAction(name)
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
                                        <IconButton
                                            onClick={() => {
                                                updateMenuTypeAction();
                                            }}
                                        >
                                            <SaveAlt
                                                style={{
                                                    color: 'rgba(0,110,10)',
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

export default EditMenuModal;
