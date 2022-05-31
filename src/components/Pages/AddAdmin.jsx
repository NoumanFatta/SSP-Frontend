import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authAddAdmin } from "../../axios/authRequests";
import useAxios from "../../axios/httpServices";
import { useCookies } from "react-cookie";
import { MainContext } from "../../App";

const theme = createTheme();

const AddAdmin = () => {
    const { showAlert} = useContext(MainContext)
    const [cookies] = useCookies()
    const token = cookies.token;
    const [, executeAddAdmin] = useAxios(
        authAddAdmin(token),
        {
            manual: true,
        }
    );
    // initial state of controlled components
    const [loginData, setLoginData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // change handler to get data of controlled component
    const changeHandler = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = loginData;
            await executeAddAdmin({ data });
            setLoginData({
                name: "",
                email: "",
                password: "",
            });
            showAlert('Admin Succesfully Added', "success")
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
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Admin
                    </Typography>
                    <Box noValidate sx={{ mt: 3 }}>
                        <form onSubmit={submitHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        value={loginData.name}
                                        autoComplete=""
                                        name="name"
                                        required
                                        fullWidth
                                        label="Name"
                                        autoFocus
                                        onChange={(e) => changeHandler(e)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        value={loginData.email}
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={(e) => changeHandler(e)}
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={loginData.password}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={(e) => changeHandler(e)}
                                        autoComplete=""
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                ADD
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AddAdmin;