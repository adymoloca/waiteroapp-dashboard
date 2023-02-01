import React, { useState } from 'react';
import { Box, IconButton, Paper } from '@material-ui/core';
import { AddCircleTwoTone, HomeTwoTone, TableChartTwoTone, ArtTrackTwoTone, VpnKeyTwoTone, DeleteForever } from '@material-ui/icons';

const AddBoxOverview = ({ source, overlayText, height, width, color, backgroundColor, justifyContent, flexDirection, alignItems, onClick, iconAdd, iconList, iconHome, iconPassword, iconDisplay, iconDelete }) => {

    const [elevation, setElevation] = useState(4);

    return (
        <>
            <Paper onClick={onClick} style={{ height: height, width: width, padding: 0, borderRadius: 5, cursor: 'pointer', backgroundColor: backgroundColor || '#00000099', display: 'flex', justifyContent: justifyContent || 'left', flexDirection: flexDirection || 'row', alignItems: alignItems || 'center' }} onMouseOver={() => setElevation(24)} onMouseOut={() => setElevation(4)} elevation={elevation}>
                {iconPassword ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><VpnKeyTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', padding: '30px' }} /> </IconButton> : null}
                <Box padding={3} fontSize={iconDelete ? height / 7 : height / 5} fontWeight={'bold'} color={color ? color : (elevation > 4 ? 'white' : '#ffffff80')}>{overlayText}</Box>
                {iconAdd ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><AddCircleTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', padding: '30px' }} /> </IconButton> : null}
                {iconList ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><TableChartTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
                {iconHome ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><HomeTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
                {iconDisplay ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><ArtTrackTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
                {iconDelete ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><DeleteForever style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
            </Paper>
        </>
    );
}

export default AddBoxOverview;