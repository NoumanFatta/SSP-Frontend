import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addLeave } from '../../../axios/authRequests';
import useAxios from '../../../axios/httpServices';
import { useCookies } from "react-cookie";
import Axios from "axios";


const theme = createTheme();

export default function AddLeave(props) {
    const [cookies] = useCookies();
    const token = cookies.token
    const headers = {
        token
    }
    const [, executeAddLeave] = useAxios(addLeave(token), {
        manual: true,
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // Axios.post("http://localhost:8000/leaves/addLeave", data, {
        //     headers: headers
        // })
        Axios.post("https://ssp-backend-node.herokuapp.com/leaves/addLeave", data, {
            headers: headers
        })
            .then((response) => {
                props.setLeaves((prev) => {
                    return [
                        ...prev, { ...response.data.leave }
                    ]
                })
                props.setOpen(false)
            })
            .catch((err) => console.log(err));

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add Leave
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="subject"
                            label="Subject"
                            name="subject"
                            autoComplete="subject"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="description"
                            type="description"
                            id="descriptions"
                            autoComplete="current-description"
                        />
                        <input type="file" name="leaveImage" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}