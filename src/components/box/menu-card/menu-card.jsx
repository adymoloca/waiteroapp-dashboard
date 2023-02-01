import React from "react";
import { Paper, Box } from "@material-ui/core";
import { useState } from "react";

const MenuCard = ({title, image}) => {

    const [elevation, setElevation] = useState(4);

    return (
        <Paper style={{ height: 170, width: 280, borderRadius: 5, cursor: 'pointer', backgroundColor: image ? '#00000000' : '#00000099', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center' }} onMouseOver={()=>setElevation(24)} onMouseOut={()=>setElevation(4)} elevation={elevation}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                width={'100%'} height={'100%'} fontSize={22} color={'white'} textAlign={'center'} borderRadius={5} style={{backgroundColor: '#00000099'}}>
                {title}
            </Box>
        </Paper>
    );
}

export default MenuCard;