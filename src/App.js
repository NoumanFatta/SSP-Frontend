import "./App.css";
import MainLayout from "./components/MainLayout";
import React, { createContext, useState } from "react";
import Home from "./components/Pages/Home";
import ChangePassword from "./components/Pages/ChangePassword";
import AddAdmin from "./components/Pages/AddAdmin";
import { Navigate, Route, Routes } from "react-router-dom";
import AddStudents from "./components/Pages/AddStudents";
import UserMainLayout from "./components/UserMainLayout";
import Signup from "./components/Pages/UserPages/Signup";
import UserHome from "./components/Pages/UserPages/UserHome";
import UserLogin from "./components/Pages/UserPages/UserLogin";
import AddCourses from "./components/Pages/AddCourses";
import Courses from "./components/Pages/UserPages/Courses";
import { useCookies } from "react-cookie";
import Login from "./components/Pages/Login";
import ViewApplicants from "./components/Pages/ViewApplicants";
import AddLeaves from "./components/Pages/UserPages/AddLeaves";
const MainContext = createContext();

export default function App() {
  const [cookies, , removeCookie] = useCookies();
  const token = cookies.token;
  function decodeToken(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload).userData;
  }

  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const CheckToken = ({ token }) => {
    if (token && decodeToken(token).isAdmin === false) {
      return <Navigate to="/" />;
    }
  };

  return (
    <MainContext.Provider value={{ showAlert, alert }}>
      <Routes>
        <Route
          path="/"
          element={<UserMainLayout token={token} removeCookie={removeCookie} />}
        >
          <Route index element={<UserHome />} />
          <Route path="signup" element={<Signup />} />
          <Route path="courses" element={<Courses />} />
          <Route
            path="leaves"
            element={token ? <AddLeaves /> : <Navigate to="/login" />}
          />

          <Route path="login" element={<UserLogin />} />
        </Route>
        {token ? (
          <Route
            path="admin"
            element={
              <>
                <CheckToken token={token} />
                <MainLayout removeCookie={removeCookie} />
              </>
            }
          >
            <Route index element={<Home />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="addadmin" element={<AddAdmin />} />
            <Route path="addstudents" element={<AddStudents />} />
            <Route path="courses" element={<AddCourses />} />
            <Route path="forms" element={<ViewApplicants />} />
          </Route>
        ) : (
          <Route path="admin" element={<Login />} />
        )}
      </Routes>
    </MainContext.Provider>
  );
}
export { MainContext };
