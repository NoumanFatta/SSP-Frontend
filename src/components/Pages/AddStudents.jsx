import { useContext, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { MainContext } from "../../App";
const AddStudents = () => {
    const { showAlert } = useContext(MainContext)
    const [newFile, setNewFile] = useState();
    const [cookies] = useCookies()
    const token = cookies.token
    const headers = {
        token
    }
    const send = (event) => {
        const data = new FormData();
        if (
            newFile.type.includes(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            data.append("studentsFile", newFile);
            Axios.post("http://localhost:8000/auth/addStudent", data, {
                headers: headers
            })
                // Axios.post("https://ssp-backend-node.herokuapp.com/auth/addStudent", data, {
                //     headers: headers
                // })
                .then((res) => showAlert('Students Successfully Added', "success"))
                .catch((err) => console.log(err));
        } else {
            showAlert('Please Select Correct File', "danger")
        }
    };
    return (
        <div className="App">
            <input
                type="file"
                name="studentsFile"
                onChange={(e) => setNewFile(e.target.files[0])}
            />
            <input type="button" onClick={send} value="submit" />
        </div>
    );
}

export default AddStudents;
