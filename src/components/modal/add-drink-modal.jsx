import React, { useState } from 'react';
import {
    Box,
    Modal,
    Fade,
    IconButton,
    CircularProgress,
    Paper,
} from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, SaveAlt } from '@material-ui/icons';
import { addDrink } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { drink_categories } from '../../utils/costants/constants';
import { ToggleButton } from '@material-ui/lab';
import { numberValidator } from '../../utils/functions/input-validators';
import ChangePhotoButton from '../buttons/changePhoto/changePhotoButton';
import DrinkPlaceHolder from '../../assets/images/placeholder_drinks.png';

const AddDrinkModal = ({
    isOpen,
    setIsOpen,
    clientId,
    restaurantId,
    createDrinkType,
}) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [drinkCategory, setDrinkCateory] = useState('');
    const [drinkPhoto, setDrinkPhoto] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });

    function returnBack() {
        setIsOpen();
        setName('');
        setPrice('');
        setDrinkCateory('');
        setDrinkPhoto('');
    }

    const closeModal = () => {
        createDrinkType();
        setIsOpen(false);
    }

    function createDrinkTypeAction() {
        addDrink(name, parseFloat(price), drinkCategory, drinkPhoto, clientId, restaurantId, setLoading, setError, closeModal)
        setName('');
        setPrice('');
        setDrinkCateory('');
        setDrinkPhoto('');
    }

    const onCategoryClick = (category) => {
        if (drinkCategory.length > 0 && drinkCategory === category)
            setDrinkCateory('');
        else
            setDrinkCateory(category)
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
                                    <Box>
                                        <Box display={'flex'}>
                                            <Box mr={2} width={400}>
                                                <WaiteroTextField
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    fullWidth
                                                />
                                            </Box>
                                            <Box mr={2} width={400}>
                                                <WaiteroTextField
                                                    placeholder="Pret"
                                                    value={price}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    fullWidth
                                                />
                                            </Box>
                                        </Box>
                                        <Box fontSize={18} marginTop={3}>
                                            Selectati o categorie
                                            <Box display={'flex'} width='100%' flexWrap={'wrap'}>
                                                {drink_categories.map((category) => {
                                                    return <ToggleButton key={category} value={category} style={{marginRight: 10, marginTop: 10, fontSize: 14}} disabled={drinkCategory.length > 0 && drinkCategory !== category}  selected={drinkCategory === category} onChange={() => onCategoryClick(category)}>
                                                        {category}        
                                                    </ToggleButton>
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box style={{display: 'flex', flexDirection: 'column'}}>
                                        <Paper style={{marginTop: 20, height: 200, width: 200, backgroundImage: `url(${drinkPhoto || DrinkPlaceHolder})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                                        <Box display="flex">
                                            <ChangePhotoButton photo={drinkPhoto} name={name?.replace(' ', '')} setPhoto={(photo) => setDrinkPhoto(photo)}/>
                                        </Box>
                                    </Box>
                                    <Box ml={2}>
                                        <IconButton onClick={returnBack}>
                                            <Close color="error" size={25} />
                                        </IconButton>
                                    </Box>
                                    <Box ml={2}>
                                        <IconButton
                                            disabled={!name.length || numberValidator(price) || !drinkCategory.length}    
                                            onClick={() => {
                                                createDrinkTypeAction();
                                            }}
                                        >
                                            <SaveAlt
                                                style={{
                                                    color: !name.length || numberValidator(price) || !drinkCategory.length ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0,110,10)',
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

export default AddDrinkModal;
