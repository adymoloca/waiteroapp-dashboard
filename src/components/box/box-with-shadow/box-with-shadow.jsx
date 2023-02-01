import React, { useState} from 'react';
import {Box, Paper, Fade} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const MyPaper = withStyles({

    root:{
        display:'flex',
        padding:0,
        justifyContent: 'left',
        alignItems: 'flex-end',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius:'5px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }

})(Paper);

const BoxWithShadow = ({name, source, overlayText, isButton, height, width, setSource, justifyContent, multiple}) =>{

    const [onHover, setOnHover] = useState(4);

    return(
    <>
                    <input type='file' multiple={multiple} name={`select-${name})`} accept='image/*' id={`select-${name})`} style={{ display: 'none', height: 0, width: 0 }} onChange={e => setSource(e.target.files[0]) }/>
            {isButton ? (
            <MyPaper style={{
                backgroundImage: `url(${source})`,
                backgroundSize: 'cover',
                    filter: onHover > 4 ? `grayscale(1)` : '',
                    justifyContent: justifyContent ? justifyContent : 'center',
                height: height,
                    width: width,
                cursor: 'pointer'
                }} onMouseEnter={() => setOnHover(24)} onMouseLeave={() => setOnHover(4)} elevation={onHover}>
                    <Fade in={onHover > 4}>
                    <label htmlFor={`select-${name})`} style={{height: '100%', width: '100%', backdropFilter: 'brightness(40%)', borderRadius: 5, cursor: 'pointer'}}>

                         <Box fontSize={height / 4} fontWeight={'bold'} marginX={2} color={'white'}>{overlayText}</Box>
                    </label>
                    </Fade>
            </MyPaper>) : (
                <MyPaper style={{
                backgroundImage: `url(${source})`,
                        backgroundSize: 'cover',
                justifyContent: justifyContent ? justifyContent : 'center',
                height: height,
                width: width,
            }} onMouseEnter={() => setOnHover(24)} onMouseLeave={() => setOnHover(4)} elevation={onHover}>
            { onHover ? <Box fontSize={height / 4} fontWeight={'bold'} marginX={2} color={'white'}>{ overlayText }</Box> : null}
            </MyPaper> ) }
    </>
    );
}

export default BoxWithShadow;