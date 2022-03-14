import React from "react";
import {AppBar,Toolbar,Box} from '@mui/material'

const Header=()=>{
    return(
        <Box>
            <AppBar sx={{background:"#f1fff1"}} position="fixed">
                <Toolbar>
                   <Box>
                       <img src="https://www.dorustree.com/wp-content/uploads/2021/08/dorustree-f.png" style={{width:"70%",height:"50px"}}/>
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header