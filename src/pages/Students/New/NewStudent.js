import React, {useEffect, useState} from "react";
import "./NewStudent.scss";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {insertStudent, doesStudentExist} from "../../../supabase/StudentQueries";
import {getFaculties, getCareersByFaculty} from "../../../supabase/CareersQueries";


const NewStudent = () => {
    const [student, setStudent] = useState({
        faculty_id: '',
        career_id: '',
    });
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isIdEmpty, setIsIdEmpty] = useState(false);
    const [isFacultyEmpty, setIsFacultyEmpty] = useState(false);
    const [isCareerEmpty, setIsCareerEmpty] = useState(false);
    const [faculties, setFaculties] = useState([]);
    const [careers, setCareers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const facultiesList = await getFaculties();
                setFaculties(facultiesList)
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            }
        }

        fetchFaculties();
    }, []);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const careersList = await getCareersByFaculty(student.faculty_id);
                setCareers(careersList)
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, [student.faculty_id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        const id = data.get('id');
        const career_id = data.get('career_id');
        const careers = await getFaculties();
        console.log({
            name,
            id,
            career_id,
            careers
        });
    }
    //     if (name === '') {
    //         setIsNameEmpty(true);
    //     }
    //     if (country_id === '') {
    //         setIsCountryEmpty(true);
    //     }
    //     if (name !== '' && country_id !== '') {
    //         try {
    //             const doesExist = await doesUniversityExist(name);
    //             if (doesExist) { // RIse error
    //                 throw new Error(`La universidad con el nombre "${name}" ya existe`);
    //             } else {
    //                 insertUniversity({name, short_name, country_id}).then(() => {
    //                     alert("Universidad registrada correctamente");
    //                     navigate('/universidades');
    //                 });
    //             }
    //         } catch (error) {
    //             setErrorOccurred(true);
    //             setError(error);
    //         }
    //     }
    // }

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
                <div className={"new-student"}>
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: '#0b9e51'}}>
                                <PersonAddIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Agregar Estudiante
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="id"
                                            required
                                            fullWidth
                                            id="id"
                                            label="Carné del Estudiante"
                                            autoFocus
                                            error={isIdEmpty}
                                            helperText={isIdEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, id: e.target.value});
                                                setIsIdEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="name"
                                            required
                                            fullWidth
                                            label="Nombre del Estudiante"
                                            name="name"
                                            error={isNameEmpty}
                                            helperText={isNameEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, name: e.target.value})
                                                setIsNameEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="faculty"
                                            select
                                            label="Facultad"
                                            fullWidth
                                            name="faculty"
                                            value={student.faculty_id}
                                            error={isFacultyEmpty}
                                            helperText={isFacultyEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                const selectedFacultyId = e.target.value;
                                                setStudent({...student, faculty_id: selectedFacultyId});
                                                setIsFacultyEmpty(false);
                                            }}
                                        >
                                            {faculties ? (
                                                faculties.map((faculty) => (
                                                    <MenuItem key={faculty.id} value={faculty.id}>
                                                        {faculty.short_name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">
                                                    No hay facultades disponibles
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="career"
                                            select
                                            label="Carrera"
                                            fullWidth
                                            name="career"
                                            value={student.career_id}
                                            error={isCareerEmpty}
                                            helperText={isCareerEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                const selectedCareerId = e.target.value;
                                                setStudent({...student, career_id: selectedCareerId});
                                                setIsCareerEmpty(false);
                                            }}
                                        >
                                            {careers ? (
                                                careers.map((career) => (
                                                    <MenuItem key={career.id} value={career.id}>
                                                        {career.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">
                                                    No hay carreras disponibles
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    className={"submit-button"}
                                    color={"success"}
                                >
                                    Guardar
                                    <SaveIcon sx={{marginLeft: '0.5rem'}}/>
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </div>
            )}
        </>
    );
};

export default NewStudent;