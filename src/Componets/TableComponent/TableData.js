import React, { useEffect, useState } from 'react'
import { Table, TableContainer, Button, TextField, TableHead, Grid, TableRow, TableCell, IconButton, TableBody, Box, Paper } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from '../Modal/ModalComponent';
import AddModalComponent from '../Modal/AddModalComponent';
import {toast} from 'react-toastify'
import {toastStyle} from '../msgDisplay/toastStyle'
import axios from 'axios'
const header = [
    'Name',
    'Email',
    'Job'
]
const TableData = (props) => {
    const{data}=props
    const [open, setOpen] = useState(false)
    const [id, setId] = useState([])
    const [AddModal,setAddModal]=useState(false)
    const [searchName, setSearchName] = useState('')
    const [filterData, setFilterData] = useState([])
    const [newData,setData]=useState([])

    useEffect(() => {
        if (searchName.length >= 3) {
            let filter = data.filter((item) => {
                return item.name.toLowerCase().startsWith(searchName.toLowerCase());
            })
            setFilterData(filter)
        }
        return () => {
            setFilterData(data)
        }
    }, [searchName])
    const openHandler = (rowData) => {
        setId(rowData)
        setOpen(true)
    }
    const AddOpenModal=()=>{
        setAddModal(true)
    }
    const handleClose = () => {
        setOpen(false)
        setAddModal(false)
    }
    const handleChange = (e) => {
        setSearchName(e.target.value)
    }
    const PassProps=(data)=>{
        setData(data)
      }
    console.log(filterData)
    const RefreshApi = () => {
        const Fetched = async () => {
          const response = await axios.get("http://localhost:3006/Employees");
         setData(response.data);
          console.log("Delete", response.data);
        };
        Fetched();
      };
    const handleDelete=(id)=>{
        (async()=>{
            await axios.delete(`http://localhost:3006/Employees/${id}`)
            .then((res)=>{
              if(res.status===200){
                console.log("ok",res)
              }
            })
            .catch((err)=>{
             toast.error(
               'error in update',
               toastStyle
             )
            })
        })();
        setTimeout(()=>{
            RefreshApi()
        },1000)
    }
    return (
        <Box>
           <Box sx={{display:"flex",mb:2}}>
            <Box sx={{flexGrow:0.11}}>
            </Box>
            <Button variant="contained" onClick={AddOpenModal}>Add Employee</Button>
            <Box sx={{flexGrow:0.8}}>
            </Box>
            <TextField sx={{padding:"0px"}} value={searchName} placeholder="Search Employee" onChange={handleChange} />
            <Box sx={{flexGrow:0.11}}>
            </Box>
           </Box>
            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {
                                        header.map((head, i) => {
                                            return (
                                                <TableCell key={i} sx={{fontSize:"15px",fontWeight:"bolder"}}>
                                                    {head}
                                                </TableCell>
                                            )
                                        })
                                    }
                                    <TableCell>

                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    (filterData && filterData.length > 0 ? filterData:(newData.length>0?(newData):data)).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.email}
                                            </TableCell>
                                            <TableCell>
                                                {row.job}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton><ModeEditIcon sx={{color:"lightGreen",'&:hover':{color:"green"}}} onClick={() => openHandler(row)}/></IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton><DeleteIcon onClick={()=>handleDelete(row.id)} sx={{color:"lightGreen",'&:hover':{color:"green"}}} /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={1}>

                </Grid>

            </Grid>
            {id && <ModalComponent onclose={handleClose} open={open} rows={id} data={data} newdata={PassProps} />}
            {<AddModalComponent onclose={handleClose} open={AddModal}newdata={PassProps}/>}
        </Box>
    )
}
export default TableData