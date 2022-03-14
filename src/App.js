import React,{useState,useEffect} from 'react'
import Header from './Componets/Header/Header'
import {AppBar,Toolbar,Grid,Box,Typography} from '@mui/material'
import TableData from './Componets/TableComponent/TableData'
import axios from 'axios'
const App=()=>{
  const [tblData,setTblData]=useState([])
   useEffect(()=>{
    const Fetched=async()=>{
     const response= await axios.get('http://localhost:3006/Employees')
     setTblData(response.data)
     console.log("first page response",response.data)
    }
    Fetched()
  },[])
  return (
    <>
   <Box>
     <Box>
     <Header/>
     </Box>
     <Box sx={{mt:10,textAlign:'center'}}>
     <Grid container>
       <Grid item xs={12}>
         <Typography variant="h5" sx={{color:"green"}}>Company Employee List </Typography>
       </Grid>
     </Grid>
     <Box sx={{mt:6}}>
     <Grid container>
       <Grid item xs={0}>
       </Grid>
       <Grid item xs={12}>
         {tblData && <TableData data={tblData}/>}
       </Grid>
       <Grid item xs={0}>
       </Grid>
     </Grid>
     </Box>
     </Box>
   </Box>
    </>
  )
}
export default App

