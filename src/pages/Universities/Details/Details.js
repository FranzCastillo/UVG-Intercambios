import React, {useState, useEffect} from "react";
import "./Details.scss";
import {useParams} from 'react-router-dom';
import {getUniversityById} from "../../../supabase/UniversitiesQueries";
import CircularProgress from '@mui/material/CircularProgress';
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const NewUniversity = () => {
    const {id} = useParams();

    const [university, setUniversity] = useState(null);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const response = await getUniversityById(id);
                setUniversity(response);
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversity();
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
                <Container maxWidth="xl" className="university-details">
                    {university && (
                        <>
                            <Paper className="header">
                                <Typography variant="h4" className="name" sx={{fontFamily: "Roboto"}}>
                                    {university.name}
                                </Typography>
                                <Typography variant="h5" className="short-name" sx={{fontFamily: "Roboto"}}>
                                    {university.short_name}
                                </Typography>
                            </Paper>
                            <Paper className={"geo"}>
                                <Typography variant="h5" className="title" sx={{fontFamily: "Roboto"}}>
                                    Ubicación:
                                </Typography>
                                <Typography variant="h6" className="location" sx={{fontFamily: "Roboto"}}>
                                    {university.continent}, {university.country}
                                </Typography>
                            </Paper>
                        </>
                    )}
                </Container>
            )}
        </>
    );
};

export default NewUniversity;
