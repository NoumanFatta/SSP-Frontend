import React, { useContext, useEffect, useRef, useState } from 'react'
import { updateLeave, getLeaves } from '../../axios/authRequests';
import useAxios from '../../axios/httpServices';
import { Box, Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { useCookies } from "react-cookie";
import { MainContext } from '../../App'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'transparent',
};

const Home = () => {
  const [cookies] = useCookies()
  const token = cookies.token
  const [leaves, setLeaves] = useState([]);
  const [, excuteGetLeaves] = useAxios(getLeaves(token), {
    manual: true,
  });

  const [open, setOpen] = useState(false);
  const [openedLeave, setOpenedLeave] = useState({})
  const handleOpen = (leave) => {
    setOpen(true);
    setLeaveId(leave._id)
    setOpenedLeave(leave)
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedLeave({})
  };
  const [leaveId, setLeaveId] = useState('')
  const [, executeUpdateLeave] = useAxios(updateLeave(token, leaveId), {
    manual: true,
  });
  const { alert, showAlert } = useContext(MainContext)
  useEffect(() => {
    const getLeaves = async () => {
      try {
        const result = await excuteGetLeaves()
        setLeaves(result.data.leaves);
      } catch (error) {
        console.log(error)
      }
    }
    getLeaves()
  }, [])

  const [status, setStatus] = useState('')
  const updateLeaveHandler = async () => {
    if (status) {
      try {
        await executeUpdateLeave({ data: { response: status } });
        setStatus('')
        setOpen(false)
        showAlert("Leave Updated", "success")
        const result = await excuteGetLeaves()
        setLeaves(result.data.leaves);
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Card sx={{ minWidth: 275, padding: 2 }}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} gutterBottom>
                <strong>Subject:</strong>{openedLeave.subject}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 18 }}>
                <strong>Description:</strong>
                {openedLeave.description}
              </Typography>
              {openedLeave.image &&
                <Box width={'300px'} >
                  <img style={{ width: '100%' }} src={openedLeave.image} />
                </Box>
              }
            </CardContent>
            <CardActions>
              <FormControl >
                <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <FormControlLabel value="accepted" control={<Radio />} label="Accept" />
                  <FormControlLabel value="rejected" control={<Radio />} label="Reject" />
                </RadioGroup>
              </FormControl>
            </CardActions>
            <CardActions>
              <Button onClick={updateLeaveHandler} >Update</Button>
            </CardActions>
          </Card>

        </Box>
      </Modal>
      {
        leaves.length ?
          leaves.map((leave, index) => {
            return (
              <Card key={leave._id} sx={{ minWidth: 275, marginBottom: 8 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <strong>Full Name: </strong>{leave.user.fullName}
                  </Typography>
                  <Typography variant="h5" component="div">
                    <strong>Father Name: </strong>{leave.user.fatherName}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>Email:</strong>  {leave.user.email}
                  </Typography>
                </CardContent>

                <CardContent >
                  <Button onClick={() => handleOpen(leave)} variant='contained' >View leave</Button>
                </CardContent>

              </Card>
            )

          })
          :
          <Typography variant="h5">
            No leaves Are Pending
          </Typography>
      }
    </>
  )
}

export default Home