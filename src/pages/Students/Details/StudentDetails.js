import React, {useState, useEffect} from "react";
import "./StudentDetails.scss";
import {useParams} from 'react-router-dom';
import {getStudentById} from "../../../supabase/StudentQueries";
import CircularProgress from '@mui/material/CircularProgress';
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const StudentDetails = () => {
    const {id} = useParams();

    const [student, setStudent] = useState(null);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await getStudentById(id);
                setStudent(response);
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    return (
        <>
            {errorOccurred && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>
            )}
            {loading && !errorOccurred ? (
                <div className="loading">
                    <CircularProgress/>
                </div>
            ) : (
                <Container maxWidth="xl" className="student-details">
                    {student && (
                        <>
                            <Paper className="header">
                                <Typography variant="h4" className="name" sx={{fontFamily: "Roboto"}}>
                                    {student.name}
                                </Typography>
                                <Typography variant="h5" className="short-name" sx={{fontFamily: "Roboto"}}>
                                    {student.id}
                                </Typography>
                            </Paper>
                            <Paper className={"career"}>
                                <Typography variant="h5" className="title" sx={{fontFamily: "Roboto"}}>
                                    Carrera:
                                </Typography>
                                <Typography variant="h6" className="career-name" sx={{fontFamily: "Roboto"}}>
                                    {student.career}, {student.faculty}
                                </Typography>
                            </Paper>
                        </>
                    )}
                </Container>
            )}
        </>
    );
};

export default StudentDetails;
