import React, { useEffect, useState } from 'react'
import { updateLeave, getLeaves, getMyLeaves } from '../../../axios/authRequests';
import useAxios from '../../../axios/httpServices';
import { Button, Box, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import { useCookies } from "react-cookie";
import AddLeave from './AddLeave';
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
const Home = () => {

    const [cookies] = useCookies();
    const token = cookies.token
    const [leaves, setLeaves] = useState([]);

    const [, excuteGetLeaves] = useAxios(getMyLeaves(token), {
        manual: true,
    });

    useEffect(() => {
        const getLeaves = async () => {
            try {
                const result = await excuteGetLeaves()
                setLeaves(result.data.leaves);
            } catch (error) {
                setLeaves([])
                console.log(error)
            }
        }
        getLeaves()
    }, [cookies])
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Grid container mt={2} spacing={2}>
            <Button fullWidth variant='contained' onClick={handleOpen}>Add Leave</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <AddLeave setLeaves={setLeaves} setOpen={setOpen} />
                </Box>
            </Modal>
            {
                leaves.map((leave, index) => {
                    return (
                        <Grid item xs={6} key={leave._id}>
                            <Card sx={{ minWidth: 275, marginBottom: 8 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                        <strong>Subject:</strong>{leave.subject}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Description:</strong>
                                        {leave.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Status:</strong>
                                        {leave.status}
                                    </Typography>
                                    {leave.image &&
                                        <Box width={'300px'} >
                                            <img style = {{width:'100%'}} src={leave.image} />
                                        </Box>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    )

                })
            }
        </Grid>
    )
}

export default Home