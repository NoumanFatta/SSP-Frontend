import React, { useContext, useState } from 'react'
import { authChangePassword } from '../../axios/authRequests';
import useAxios from '../../axios/httpServices';
import { Button, Grid, TextField, Box } from '@mui/material'
import { useCookies } from "react-cookie";
import "./ChangePassword.css"
import { MainContext } from '../../App';
const ChangePassword = () => {
  const { showAlert } = useContext(MainContext)


  const [passwords, setPasswords] = useState({ password: "", updatePassword: "", confirmPassword: "" });
  const [cookies] = useCookies();
  const token = cookies.token
  const [, executeChangePassword] = useAxios(authChangePassword(token), {
    manual: true,
  });
  const handleTextFields = (e) => {
    setPasswords((passowrd => {
      return {
        ...passowrd, [e.target.name]: e.target.value
      }
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwords.updatePassword !== passwords.confirmPassword) {
      showAlert('Password Not matching', "danger")
    }
    else {
      executeChangePassword({ data: passwords }).then((res) => {
        setPasswords({ password: "", updatePassword: "", confirmPassword: "" })
        showAlert("Password successfully changed", "success")

      }).catch((err) => {
        showAlert(err.response.data.error, "danger")
      })
    }
  }
  return (
    <Grid container py={10} justifyContent='center'>
      <Grid item xs={6}>
        <form onSubmit={handleSubmit}>
          <Box padding={5} sx={{ background: '#afc2d526', borderRadius: '10px', boxShadow: '4px -4px #888888' }} >
            <TextField value={passwords.password} autoComplete='' onChange={handleTextFields} required name="password" type="password" sx={{ marginBottom: 5 }} label="Old Password" fullWidth variant="outlined" />
            <TextField value={passwords.updatePassword} autoComplete='' onChange={handleTextFields} required name="updatePassword" type="password" sx={{ marginBottom: 5 }} label="New Password" fullWidth variant="outlined" />
            <TextField value={passwords.confirmPassword} autoComplete='' onChange={handleTextFields} required name="confirmPassword" type="password" sx={{ marginBottom: 5 }} label="Confirm New Password" fullWidth variant="outlined" />
            <Grid display='flex' justifyContent='center'>
              <Button type="submit" variant="contained" >Change</Button>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}

export default ChangePassword