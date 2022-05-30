import {  Button } from '@mui/material';
import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { MainContext } from '../App';
import Alert from './Alert';
const UserMainLayout = ({ token, removeCookie }) => {
    const { alert } = useContext(MainContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        Saylani Student Portal
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className='nav-link' to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to="courses">
                                    Courses
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to="leaves">
                                    Leaves
                                </NavLink>
                            </li>
                        </ul>
                        {token ? <Button variant='contained' onClick={() => removeCookie("token", {
                            path: "/"
                        })} >LogoOut</Button>
                            :
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
                                <li className="nav-item">
                                    <NavLink className="nav-link m-2" to="/signup" >Sign up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link m-2" to="/login" >Login</NavLink>
                                </li>
                            </ul>
                        }

                    </div>
                </div>
            </nav>
            <Alert alert={alert} />
            <Outlet />
        </>
    )
}

export default UserMainLayout