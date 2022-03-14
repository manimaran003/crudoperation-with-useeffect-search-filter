import React,{useState} from 'react'
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify'
import { toastStyle} from '../msgDisplay/toastStyle';
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
const initialValues = {
  name: "",
  email: "",
  job: "",
};

const AddModalComponent=(props)=>{
    const [state, setState] = useState(initialValues);
    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: [e.target.value],
      });
    };
    const RefreshApi = () => {
      const Fetched = async () => {
        const response = await axios.get("http://localhost:3006/Employees");
        props.newdata(response.data);
        console.log("add api data", response.data);
      };
      Fetched();
    };
    const AddApi = (data) => {
      (async()=>{
          await axios.post(`http://localhost:3006/Employees`,data)
          .then((res)=>{
            if(res.status===200){
             toast.success(
                 'successfully added employee',
                 toastStyle
             )
            }
          })
          .catch((err)=>{
            toast.success(
                'error in add employee',
                toastStyle
            )
          })
      })();
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      props.onclose()
      const data = {
        id:uuidv4(),
        name: state.name.join(),
        email: state.email.join(),
        job: state.job.join(),
      };
      AddApi(data);
      setTimeout(() => {
        RefreshApi();
      }, 1000);
    };
    return(
    <Modal
      open={props.open}
      onClose={props.onclose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <Box sx={{display:"flex",justifyContent:"center",mb:2,color:"green"}}>
              <Typography variant="h6">Add Employee to Dorustree</Typography>
              </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            alignItems: "center",
          }}
        >
          <Typography>Name</Typography>
          <TextField
            name="name"
            value={state.name}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            alignItems: "center",
          }}
        >
          <Typography>Email</Typography>
          <TextField
            name="email"
            value={state.email}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            alignItems: "center",
          }}
        >
          <Typography>Job</Typography>
          <TextField
            name="job"
            value={state.job}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box sx={{ width: "100%", textAlign: "center", mt: 3 }}>
          <Button variant="contained" onClick={handleSubmit}>
           ADD
          </Button>
        </Box>
      </Box>
    </Modal>
    )
}
export default AddModalComponent