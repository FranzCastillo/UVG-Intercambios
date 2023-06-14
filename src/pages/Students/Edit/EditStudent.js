import React, {useState, useEffect} from "react";
import "./EditStudent.scss";
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {getStudentById, updateStudent} from "../../../supabase/StudentQueries";
import {getFaculties, getCareersByFaculty} from "../../../supabase/CareersQueries";
import {FormControlLabel} from "@mui/material";


const EditStudent = () => {
    const {id} = useParams();

    const [student, setStudent] = useState(null);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [faculties, setFaculties] = useState([]);
    const [careers, setCareers] = useState([]);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isIdEmpty, setIsIdEmpty] = useState(false);
    const [isFacultyEmpty, setIsFacultyEmpty] = useState(false);
    const [isCareerEmpty, setIsCareerEmpty] = useState(false);
    const [isMailEmpty, setIsMailEmpty] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const studentDetails = await getStudentById(id);
                const facultiesList = await getFaculties();
                const careersList = await getCareersByFaculty(studentDetails.faculty_id);
                setStudent(studentDetails);
                setFaculties(facultiesList);
                setCareers(careersList);
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        updateStudent({
            id: student.id,
            name: data.get('name'),
            mail: data.get('mail'),
            career_id: data.get('career'),
            gender: data.get('gender')
        }).then(() => {
            alert('Estudiante actualizado con éxito');
            navigate(`/estudiantes/${student.id}`);
        }).catch((error) => {
            alert(error.message);
        });
    };

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
                <div className={"edit-student"}>
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
                                <EditIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Editar Estudiante
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
                                            value={student.id}
                                            InputLabelProps={{ shrink: true }}
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
                                            InputLabelProps={{ shrink: true }}
                                            value={student.name}
                                            error={isNameEmpty}
                                            helperText={isNameEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, name: e.target.value})
                                                setIsNameEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="mail"
                                            required
                                            fullWidth
                                            label="Correo del Estudiante"
                                            name="mail"
                                            InputLabelProps={{ shrink: true }}
                                            value={student.mail}
                                            error={isMailEmpty}
                                            helperText={isMailEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, mail: e.target.value})
                                                setIsMailEmpty(false);
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
                                                setStudent({...student, faculty_id: e.target.value});
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
                                    <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'center', }}>
                                        <RadioGroup
                                            row
                                            aria-labelledby="gender-radio-group"
                                            name="gender"
                                            defaultValue={student.gender}
                                        >
                                            <FormControlLabel
                                                value="Femenino"
                                                control={<Radio />}
                                                label="Femenino"
                                                labelPlacement={"top"}
                                            />
                                            <FormControlLabel
                                                value="Masculino"
                                                control={<Radio />}
                                                label="Masculino"
                                                labelPlacement={"top"}
                                            />
                                        </RadioGroup>
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

export default EditStudent;