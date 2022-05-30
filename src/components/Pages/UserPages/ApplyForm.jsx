import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';

const ApplyForm = ({ registerHandler }) => {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Registeration Form
            </Typography>
            <form onSubmit={registerHandler} >
                <Grid mt={2} container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="fullName"
                            name="fullName"
                            label="Full name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="fatherName"
                            name="fatherName"
                            label="Father name"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth>
                            <InputLabel>City</InputLabel>
                            <Select
                                defaultValue=''
                                variant='standard'
                                name="city"
                                label="City"
                            >
                                <MenuItem value='Karachi'>Karachi</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                defaultValue=''
                                variant='standard'
                                name="gender"
                                label="Gender"
                            >
                                <MenuItem value='male'>Male</MenuItem>
                                <MenuItem value='female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="cnic"
                            name="cnic"
                            label="CNIC"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            *Date Of Birth
                            <Input name= "dob" required type="date" id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address"
                            label="Address"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" >register</Button>
                    </Grid>

                </Grid>
            </form>
        </React.Fragment>
    );
}
export default ApplyForm;