import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { getBase64Image } from '../../../utils/functions/base64Image';

const ChangePhotoButton = ({ name, setPhoto, width, height, photo, disabled, showImageOn }) => {

    const [source, setSource] = useState(photo || '');

    const createCoverPhoto = async (photo) => {
        const base64 = await getBase64Image(photo)
        setSource(base64)
    }

    useEffect(() => {
        if (source.length)
            setPhoto(source)
        // eslint-disable-next-line
    }, [source])

    return (
        <>
            <input type={'file'} name={`select-${name})`} accept='image/*' id={`select-${name})`} style={{ display: 'none', height: 0, width: 0 }} onChange={e => createCoverPhoto(e.target.files[0])} />
            <Button disabled={disabled} style={{ width: width || 200, height: height || 60, backgroundImage: `url(${showImageOn && photo})`, opacity: disabled ? '50%' : '100%', color: showImageOn && photo ? '#fff' : '#000', backgroundSize: 'cover', backgroundPosition: 'center' }}><label htmlFor={`select-${name})`} style={{ width: '100%', height: height || 60, display: 'flex', borderRadius: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: !disabled && photo ? '#00000090' : '#00000000' }}><Publish style={{ paddingRight: 10 }} /> {photo ? 'Schimba' : 'Adauga'} poza</label></Button>
        </>
    )

}

export default ChangePhotoButton;