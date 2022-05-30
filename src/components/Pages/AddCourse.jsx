import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useAxios from '../../axios/httpServices';
import { addCourse } from '../../axios/authRequests';
import { useCookies } from "react-cookie";
import { MainContext } from '../../App';

const theme = createTheme();

const AddCourse = (props) => {
    const { showAlert } = useContext(MainContext)
    const [cookies] = useCookies()
    const token = cookies.token
    const [, executeAddCourse] = useAxios(
        addCourse(token),
        {
            manual: true,
        }
    );
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const response = await executeAddCourse({
                data: {
                    title: data.get('title'),
                    status: data.get('status'),
                }
            })
            props.setCourses((prev) => {
                return [
                    ...prev, { ...response.data.data }
                ]
            })
            showAlert("Course successfully Added", "success")
            props.setOpen(false)

        } catch (error) {
            showAlert(error.response.data.error, "danger")
        }

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
                        Add Course
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Course Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                        />
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>

                            <Select
                                defaultValue={true}
                                label="Status"
                                name='status'
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AddCourse;