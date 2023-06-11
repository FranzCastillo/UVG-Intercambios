import React, {useState, useEffect} from "react";
import "./Details.scss";
import { useParams } from 'react-router-dom';
import {getUniversityById} from "../../../supabase/UniversitiesQueries";
import CircularProgress from '@mui/material/CircularProgress';

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
                <div className="university-details">
                    <div className="header">
                        <h1>{university.name}</h1>
                        <h2>{university.short_name}</h2>
                    </div>
                    <div className="body">
                        <h3>{university.country}</h3>
                    </div>
                </div>
            ) : (
                <div className="loading">
                    <CircularProgress/>
                </div>
            )}
        </>
    );
}

export default NewUniversity;