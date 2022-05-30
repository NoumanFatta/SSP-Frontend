import * as React from 'react';
import {
    createTheme,
    ThemeProvider,
    Container,
    Typography,
    TextField,
    CssBaseline,
    Button,
    Avatar,
    Box
} from '@mui/material';
import useAxios from '../../axios/httpServices';
import { authLogin } from '../../axios/authRequests';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useCookies } from "react-cookie";

const theme = createTheme();

const Login = () => {
    const [, setCookie] = useCookies();

    const [, excuteLogin] = useAxios(authLogin(), {
        manual: true,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await excuteLogin({
            data: {
                email: data.get('email'),
                password: data.get('password'),
            }
        })
        setCookie("token", response.data.token, {
            path: "/"
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {/* {cookies.user && <p>{cookies.user}</p>} */}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Login;