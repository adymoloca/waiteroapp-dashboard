import React, { useState } from 'react';
import { Box, Modal, Fade, Grid, InputAdornment, IconButton, CircularProgress, Paper } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroTextField from '../text-field/waitero-text-field';
import { Add, Close, Delete, SaveAlt } from '@material-ui/icons';
import { addPlate } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { numberValidator } from '../../utils/functions/input-validators';
import ChangePhotoButton from '../buttons/changePhoto/changePhotoButton';
import PlatePlaceHolder from '../../assets/images/placeholder_food.png';

const AddMenuItem = ({isModalOpen, setIsModalOpen, setItem, clientId, restaurantId, menuId, categoryId}) => {
    
    const classes = useStyles();

    const initialItem = {
        plateName: '',
        plateIngredients: [],
        platePrice: '',
        platePhoto: ''
    }

    const [tempItem, setTempItem] = useState(initialItem);
    const [newIngredient, setNewIngredient] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });

    function addItem() {
        setTempItem({ ...tempItem, plateIngredients: tempItem?.plateIngredients?.concat([ newIngredient ]) });
        setNewIngredient('');
    }

    function deleteItem(index) {
        const temp = [...tempItem.plateIngredients];
        temp.splice(index, 1)
        setTempItem({...tempItem, plateIngredients: temp});
    }

    function returnBack() {
        setIsModalOpen();
        setTempItem(initialItem);
    }

    const setEdits = (item, index) => {
        const tempIngredients = [...tempItem.plateIngredients]
        tempIngredients.splice(index, 1, item)
        setTempItem({ ...tempItem, plateIngredients: tempIngredients })    
    }

    const closeModal = () =>{
        setItem();
        setIsModalOpen();
    }

    function saveItem() {
        addPlate(tempItem.plateName, parseFloat(tempItem.platePrice), newIngredient.length > 0 ? tempItem.plateIngredients.concat([newIngredient]) : tempItem.plateIngredients, tempItem.platePhoto, clientId, restaurantId, menuId, categoryId, setLoading, setError, closeModal)
        setTempItem(initialItem);
    }

    return (
        <>
            <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({message: '', isError: false})} />
            <Modal open={isModalOpen} onClose={()=>returnBack() }>
                <Fade in={isModalOpen} timeout={600}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
                        {loading ? <CircularProgress /> : (<>
                            <Box mr={2} width={400}>
                                <WaiteroTextField value={tempItem.plateName} onChange={(e) => setTempItem({ ...tempItem, plateName: e.target.value })} placeholder='Nume preparat' fullWidth />
                            </Box>
                            <Box mr={2} width={400}>
                                <WaiteroTextField value={tempItem.platePrice} onChange={(e) => setTempItem({ ...tempItem, platePrice: e.target.value })} placeholder='Pret preparat' fullWidth />
                            </Box>
                            <Box display="flex" mt={3} width='80%' fontSize={22}>
                                <Grid container justifyContent='space-between'>
                                    {tempItem?.plateIngredients?.map((ing, index) => {
                                        return (
                                            <Grid key={ing} container item xs={5}>
                                                <WaiteroTextField fullWidth value={ing} onChange={(t) => setEdits(t.target.value, index)}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position={"start"}>
                                                                <IconButton onClick={() => deleteItem(index)} size={'small'}>
                                                                    <Delete size={16} />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }} />
                                            </Grid>
                                        )
                                    }) || "Ingredients can't be read"}
                                    <Grid container item xs={5}>
                                        <WaiteroTextField value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} InputProps={{
                                            endAdornment: (
                                                <InputAdornment position={"start"}>
                                                    <IconButton onClick={() => addItem()} size={'small'}>
                                                        <Add size={16} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }} onKeyDown={(event) => event.key === 'Enter' ? addItem() : null} placeholder='Adauga ingredient' fullWidth />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Paper style={{marginTop: 20, height: 200, width: 200, backgroundImage: `url(${tempItem?.platePhoto || PlatePlaceHolder})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                            <Box display="flex">
                                <ChangePhotoButton photo={tempItem?.platePhoto} name={tempItem?.plateName?.replace(' ', '')} setPhoto={(photo) => setTempItem({...tempItem, platePhoto: photo})}/>
                            </Box>
                            <Box display="flex" mt={3}>
                                <Box ml={2}>
                                    <IconButton onClick={returnBack}><Close color='error' size={25} /></IconButton>
                                </Box>
                                <Box ml={2}>
                                    <IconButton onClick={saveItem}
                                        disabled={!tempItem.plateName.length || numberValidator(tempItem.platePrice) || !tempItem.plateIngredients.length}
                                    >
                                        <SaveAlt style={{ color: !tempItem.plateName.length || numberValidator(tempItem.platePrice) || !tempItem.plateIngredients.length ? 'rgba(0,0,0,0.2)' : 'rgba(0,110,10)', fontSize: 25 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </>)}
                    </Box>
                </Fade>
            </Modal>
        </>
    ); 
}

export default AddMenuItem;