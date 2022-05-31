import { Button, Box, Card, CardActions, CardContent, Grid, Modal, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { applyCourse, getCourses } from '../../../axios/authRequests';
import useAxios from '../../../axios/httpServices';
import { useCookies } from "react-cookie";
import ApplyForm from './ApplyForm';
import { MainContext } from '../../../App';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Courses = () => {
  const { showAlert } = useContext(MainContext);



  const [newRoleNumber, setNewRoleNumber] = useState('')
  const [courses, setCourses] = useState([]);
  const [cookies] = useCookies();
  const token = cookies.token;
  const [courseId, setCourseId] = useState(null)
  const [, executeGetCourses] = useAxios(getCourses(), {
    manual: true,
  });
  const [, executeApplyCourse] = useAxios(applyCourse(), {
    manual: true,
  });
  useEffect(() => {
    const getAllCourses = async () => {
      const response = await executeGetCourses()
      setCourses(response.data.courses);
    }
    getAllCourses()
    // eslint-disable-next-line
  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setCourseId(id)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [roleNumberModal, setroleNumberModal] = useState(false);


  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData(e.currentTarget);

      const fullName = data.get('fullName');
      const fatherName = data.get('fatherName');
      const city = data.get('city');
      const gender = data.get('gender');
      const email = data.get('email');
      const phone = data.get('phone');
      const cnic = data.get('cnic');
      const dob = data.get('dob');
      const address = data.get('address');
      const response = await executeApplyCourse({
        data: {
          course: courseId,
          fullName,
          fatherName,
          city,
          gender,
          email,
          phone,
          cnic,
          dob,
          address
        }
      })
      showAlert("Your are succesffully registered", "success")
      setNewRoleNumber(response.data.roleNumber)
      setroleNumberModal(true)
      setOpen(false)
    } catch (error) {
      console.log(error)
      showAlert(error.response.data.error, "danger")
    }
  }
  function decodeToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload).userData;
  };

  const handleRoleNumberModal = () => {
    setroleNumberModal(false)
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '50%', overflowY: 'scroll', height: '600px' }}>
          <ApplyForm registerHandler={registerHandler} />
        </Box>
      </Modal>
      <Modal
        open={roleNumberModal}
        onClose={handleRoleNumberModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '50%' }}>
          <div>Your Role Number is : {newRoleNumber}</div>
        </Box>
      </Modal>
      <Grid container spacing={2} mt={2}>
        {courses.map((course, index) => {
          return (
            <Grid key={index} item xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <strong>Course Title: </strong>{course.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    <strong>Course Status: </strong>{course.status ? "Active" : "Closed"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button disabled={!(course.status) || (token && decodeToken(token).isApplied)} onClick={() => handleOpen(course._id)} variant='contained' >
                    {token && decodeToken(token).isApplied ? "Already applied" : 'Apply'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>

  )
}

export default Courses