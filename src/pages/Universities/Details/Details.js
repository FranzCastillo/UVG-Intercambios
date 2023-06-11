import React, {useState, useEffect} from "react";
import "./Details.scss";
import { useParams } from 'react-router-dom';
import {getUniversityById} from "../../../supabase/UniversitiesQueries";
import CircularProgress from '@mui/material/CircularProgress';
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const NewUniversity = () => {
    const { id } = useParams();

    const [university, setUniversity] = useState(null);

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const response = await getUniversityById(id);
                setUniversity(response);
            } catch (error) {
                console.error('Error fetching university', error);
            }
        }

        fetchUniversity();
    }, []);

    return (
        <>
            {university ? (
                <Container maxWidth="xl" className="university-details">
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
                </Container>
            ) : (
                <div className="loading">
                    <CircularProgress/>
                </div>
            )}
        </>
    );
}

export default NewUniversity;