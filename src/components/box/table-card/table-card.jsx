import React, {useState} from "react";
import { Paper, Box } from "@material-ui/core";

const TableCard = ({title, qrcode}) => {

    const [elevation, setElevation] = useState(4);

    return (
        <Paper style={{ height: 300, width: 200, borderRadius: 5, cursor: 'pointer', backgroundColor: '#fff', display: 'flex', flexDirection:'column', alignItems: 'center' }} onMouseOver={()=>setElevation(24)} onMouseOut={()=>setElevation(4)} elevation={elevation}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'flex-end'}
                width={'100%'} height={'30%'} fontSize={50} fontWeight={'bold'} color={'rgba(255, 90, 95, 1)'} textAlign={'center'}>
                {title}
            </Box>
            <Box height={'70%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'flex-end'}>
                <img src={qrcode} alt={'qr-code'}/>
            </Box>
        </Paper>
    );
}

export default TableCard;