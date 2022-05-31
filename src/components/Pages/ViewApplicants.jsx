import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getForms } from '../../axios/authRequests';
import useAxios from '../../axios/httpServices';
import { useCookies } from "react-cookie";
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';


const ViewApplicants = () => {
    const [cookies] = useCookies()
    const token = cookies.token
    const [rows, setRows] = useState([]);
    const [tableRow, setTableRow] = useState([]);
    const [, executeGetForms] = useAxios(getForms(token), {
        manual: true,
    });
    useEffect(() => {
        const getStudents = async () => {
            const response = await executeGetForms()
            setTableRow(response.data)
            response.data.forEach(data => {
                setRows((prev) => [...prev, { ...data, course: data.course._id }])
            });
        }
        getStudents()
        // eslint-disable-next-line
    }, [])
    const handleExport = () => {

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "Students.xlsx")
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Roll Number</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Father Name</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>CNIC</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Course</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRow.map((student) => (
                            <TableRow
                                key={student.roleNumber}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right"> {student.roleNumber} </TableCell>
                                <TableCell align="right"> {student.fullName} </TableCell>
                                <TableCell align="right"> {student.fatherName} </TableCell>
                                <TableCell align="right"> {student.city} </TableCell>
                                <TableCell align="right"> {student.gender} </TableCell>
                                <TableCell align="right"> {student.meail} </TableCell>
                                <TableCell align="right"> {student.phone} </TableCell>
                                <TableCell align="right"> {student.cnic} </TableCell>
                                <TableCell align="right"> {student.dob.split("T")[0]} </TableCell>
                                <TableCell align="right"> {student.address} </TableCell>
                                <TableCell align="right">{student.course.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleExport} variant="contained" >Export As Excel</Button>
        </>

    );
}

export default ViewApplicants;