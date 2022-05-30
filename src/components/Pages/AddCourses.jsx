import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddCourse from './AddCourse';
import { getCourses, authUpdateCourse } from '../../axios/authRequests';
import useAxios from '../../axios/httpServices';
import { Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useCookies } from "react-cookie";
import { MainContext } from '../../App';

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


const AddCourses = () => {
    const { showAlert } = useContext(MainContext)
    const [cookies] = useCookies()
    const token = cookies.token
    const [, executeGetCourses] = useAxios(getCourses(), {
        manual: true,
    });

    const [courseId, setCourseId] = useState('')
    const [, executeUpdateCourse] = useAxios(authUpdateCourse(token, courseId), {
        manual: true,
    });

    const [courses, setCourses] = useState([])
    useEffect(() => {
        const getAllCourses = async () => {
            const response = await executeGetCourses()
            setCourses(response.data.courses);
        }
        getAllCourses()

    }, [])


    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleEditOpen = (id) => {
        setCourseId(id)
        setOpenEditModal(true);
    };
    const handleEditClose = () => {
        setCourseId('')
        setOpenEditModal(false);
    };

    const handleUpdateCourse = async (event) => {
        event.preventDefault()
        try {
            const data = new FormData(event.currentTarget);
            const response = await executeUpdateCourse({ data: { status: data.get('status'), title: data.get('title') } });
            const updatedCourse = courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, ...response.data.course };
                } else {
                    return course;
                }
            });
            setCourses(updatedCourse);
            setOpenEditModal(false);
            showAlert("Course successfully Edited", "success")
        } catch (error) {
            showAlert(error.response.data.error, "danger")
        }
    }
    return (
        <div>
            <Button fullWidth variant='outlined' onClick={handleOpen}>Add Course</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <AddCourse setCourses={setCourses} courses={courses} setOpen={setOpen} />
                </Box>
            </Modal>
            <Modal
                open={openEditModal}
                onClose={handleEditClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box component='form' onSubmit={handleUpdateCourse} sx={{ ...style, width: 400 }}>
                    <Box textAlign='center' my={2} >
                        <Typography variant="h5" >Edit Course</Typography>
                    </Box>
                    <Box gap={2} flexDirection="column" display="flex">
                        <TextField
                            required
                            autoComplete=""
                            name="title"
                            fullWidth
                            label="Title"
                            autoFocus
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                required
                                label="Status"
                                defaultValue=''
                                name="status"
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" type="submit" >Update</Button>
                    </Box>
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
                                </CardContent>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        <strong>Course Status: </strong>{course.status ? "Active" : "Closed"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleEditOpen(course._id)} variant='contained' >Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    )
                })}
            </Grid>

        </div>
    );
}
export default AddCourses;