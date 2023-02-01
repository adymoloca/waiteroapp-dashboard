import React, { useEffect, useState } from 'react';
import { Box, Modal, Fade, Grid, InputAdornment, IconButton, CircularProgress, Paper } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroTextField from '../text-field/waitero-text-field';
import { Add, Close, Delete, SaveAlt } from '@material-ui/icons';
import { updatePlate } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import ChangePhotoButton from '../buttons/changePhoto/changePhotoButton';
import PlatePlaceHolder from '../../assets/images/placeholder_food.png';

const EditMenuItem = ({isModalOpen, setIsModalOpen, item, setItem, clientId, restaurantId, menuId, categoryId, plateId }) => {
    
    const classes = useStyles();

    const [tempItem, setTempItem] = useState(item);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });
    const [newIngredient, setNewIngredient] = useState('')

    function addIngredient() {
        setTempItem({ ...tempItem, plateIngredients: tempItem?.plateIngredients?.concat([ newIngredient ]) });
        setNewIngredient('');
    }

    function deleteIngredient(index) {
        const temp = [...tempItem.plateIngredients];
        temp.splice(index, 1)
        setTempItem({...tempItem, plateIngredients: temp});
    }

    function returnBack() {
        setIsModalOpen();
    }

    const updateIngredient = (item, index) => {
        const tempIngredients = [...tempItem.plateIngredients]
        tempIngredients.splice(index, 1, item)
        setTempItem({ ...tempItem, plateIngredients: tempIngredients })    
    }

    function saveItem() {
        setItem();
        setIsModalOpen();
    }

    const updateItem = () => {
        updatePlate(tempItem.plateName, parseFloat(tempItem.platePrice), newIngredient.length > 0 ? tempItem.plateIngredients.concat([newIngredient]) : tempItem.plateIngredients, tempItem?.platePhoto, clientId, restaurantId, menuId, categoryId, plateId, setLoading, setError, saveItem )
    }

    useEffect(() => {
        if (item)
            setTempItem(item) 
    }, [item])

    return (
        <>
            <WaiteroAlert
                isError={error.isError}
                message={error.message}
                cleanError={() => setError({ message: '', isError: false })}
            />
            <Modal open={isModalOpen} onClose={()=>returnBack() }>
                <Fade in={isModalOpen} timeout={600}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
                        <Box mr={2} width={400}>
                                <WaiteroTextField value={tempItem?.plateName} onChange={(e) => setTempItem({ ...tempItem, plateName: e.target.value })} placeholder='Nume preparat' fullWidth />
                            </Box>
                            <Box mr={2} width={400}>
                                <WaiteroTextField value={tempItem?.platePrice} onChange={(e) => setTempItem({ ...tempItem, platePrice: e.target.value })} placeholder='Pret preparat' fullWidth />
                            </Box>
                        <Box display="flex" mt={3} width='80%' fontSize={22}>
                            <Grid container justifyContent='space-between'>
                                {tempItem?.plateIngredients?.map((ing, index) => {
                                    return (
                                        <Grid key={ing} container item xs={5}>
                                            <WaiteroTextField fullWidth defaultValue={ing} onBlur={(t) => updateIngredient(t.target.value, index)}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position={"start"}>
                                                                        <IconButton onClick={() => deleteIngredient(index)} size={'small'}>
                                                                            <Delete size={ 16 }/>
                                                                        </IconButton>
                                                                    </InputAdornment>    
                                                                )
                                                            }}/>
                                        </Grid>
                                    )
                                }) || "Ingredients can't be read"}
                                <Grid container item xs={5}>
                                <WaiteroTextField value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={"start"}>
                                            <IconButton onClick={() => addIngredient()} size={'small'}>
                                                <Add size={ 16 }/>
                                            </IconButton>
                                        </InputAdornment>    
                                    )
                                }} onKeyDown={(event)=>event.key === 'Enter' ? addIngredient() : null} fullWidth/>
                                </Grid>
                            </Grid>
                        </Box>
                        <Paper style={{marginTop: 20, height: 200, width: 200, backgroundImage: `url(${tempItem?.platePhoto || PlatePlaceHolder})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                        <Box display="flex">
                            <ChangePhotoButton photo={tempItem?.platePhoto} name={tempItem?.plateName?.replace(' ', '')} setPhoto={(photo) => setTempItem({...tempItem, platePhoto: photo})}/>
                        </Box>
                        <Box display="flex" mt={3}>
                            <Box ml={2}>
                                    <IconButton onClick={returnBack}><Close color='error' size={25}/></IconButton>
                            </Box>
                            <Box ml={2}>
                                {loading ? <CircularProgress size={25}/> : <IconButton onClick={updateItem}><SaveAlt style={{color: 'rgba(0,110,10)', fontSize: 25}}/></IconButton>}
                            </Box>
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    ); 
}

export default EditMenuItem;