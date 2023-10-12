import Button from "@mui/material/Button";
import React from "react";
import {getStudentById} from "../../supabase/StudentQueries";

const handleCheckStudent = (studentId) => {
    getStudentById(studentId).then((student) => {
        console.log(`Estudiante encontrado: ${JSON.stringify(student)}`);
    }).catch((error) => {
        console.log(`Error: ${error.message}`);
    });
}

const CheckStudentButton = ({studentId}) => {
    return (
        <Button
            variant={"contained"}
            fullWidth
            required
            sx={{
                height: '100%',
            }}
            onClick={() => {
                handleCheckStudent(studentId);
            }}
        >
            Verificar
        </Button>
    )
}

export default CheckStudentButton;