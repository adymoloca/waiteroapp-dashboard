import React from "react";
import { Box } from "@material-ui/core";
import { AddBoxTwoTone } from "@material-ui/icons";

const AddContent = ({title}) => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {title}
            <AddBoxTwoTone style={{fontSize: '50px', marginTop: 10}}/>
        </Box>
    );
}

export default AddContent;