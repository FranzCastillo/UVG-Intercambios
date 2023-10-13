import React, {useEffect, useState} from "react";
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
import {doesStudentExist, getStudentById, insertStudent, updateStudent} from "../../supabase/StudentQueries";
import {getCareersByFaculty, getFaculties} from "../../supabase/CareersQueries";
import RadioGroup from "@mui/material/RadioGroup";
import {FormControlLabel} from "@mui/material";
import Radio from "@mui/material/Radio";
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'


const StudentsForm = ({id = -1}) => {
    const isNewStudent = id === -1;
    const [student, setStudent] = useState({
        id: '',
        name: '',
        mail: '',
        facultyId: '',
        careerId: '',
        gender: 'Femenino',
    });
    useEffect(() => {
        if (!isNewStudent) {
            getStudentById(id).then((student) => {
                setStudent({
                    id: student.id,
                    name: student.name,
                    mail: student.mail,
                    facultyId: student.faculty_id,
                    careerId: student.career_id,
                    gender: student.gender,
                })
            }).catch((error) => {
                setErrorOccurred(true);
                setError(error);
            })
        }
    }, []);

    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firstTry, setFirstTry] = useState(true);

    const [isIdEmpty, setIsIdEmpty] = useState(false);
    useEffect(() => {
        if (!firstTry) {
            setIsIdEmpty(student.id === '')
        }
    }, [student.id]);

    const [isNameEmpty, setIsNameEmpty] = useState(false);
    useEffect(() => {
        if (!firstTry) {
            setIsNameEmpty(student.name === '')
        }
    }, [student.name]);

    const [isFacultyEmpty, setIsFacultyEmpty] = useState(false);
    useEffect(() => {
        if (!firstTry) {
            setIsFacultyEmpty(student.faculty_id === '')
        }
    }, [student.facultyId]);

    const [isCareerEmpty, setIsCareerEmpty] = useState(false);
    useEffect(() => {
        if (!firstTry) {
            setIsCareerEmpty(student.career_id === '')
        }
    }, [student.careerId]);

    const [isMailEmpty, setIsMailEmpty] = useState(false);
    useEffect(() => {
        if (!firstTry) {
            setIsMailEmpty(student.mail === '')
        }
    }, [student.mail]);

    const [faculties, setFaculties] = useState([]);
    useEffect(() => {
        getFaculties().then(
            (faculties) => {
                setFaculties(faculties);
                setLoading(false);
            }
        )
    }, []);

    const [careers, setCareers] = useState([]);
    useEffect(() => {
        getCareersByFaculty(student.facultyId).then(
            (careers) => {
                setCareers(careers);
            }
        )
    }, [student.facultyId]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFirstTry(false);
        try {
            if (isNewStudent) {
                const doesExist = await doesStudentExist(id);
                if (doesExist) { // RIse error
                    throw new Error(`El estudiante con carné "${id}" ya existe`);
                } else {
                    insertStudent({
                        id: student.id,
                        name: student.name,
                        mail: student.mail,
                        career_id: student.carrerId,
                        gender: student.gender
                    }).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Muy Bien!',
                            text: 'Estudiante registrado exitosamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            navigate('/estudiantes');
                        }, 1500);
                    }).catch((error) => {
                        setErrorOccurred(true);
                        setError(error);
                    })
                }
            } else {
                updateStudent({
                    id: student.id,
                    name: student.name,
                    mail: student.mail,
                    career_id: student.careerId,
                    gender: student.gender
                }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Muy Bien!',
                        text: 'Estudiante actualizado exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        navigate('/estudiantes');
                    }, 1500);
                }).catch((error) => {
                    setErrorOccurred(true);
                    setError(error);
                })
            }
        } catch (error) {
            setErrorOccurred(true);
            setError(error);
        }
    }

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
                                {isNewStudent ? <PersonAddIcon/> : <EditIcon/>}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {isNewStudent ? 'Registrar Estudiante' : 'Editar Estudiante'}
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
                                            value={student.id}
                                            autoFocus
                                            error={isIdEmpty}
                                            helperText={isIdEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, id: e.target.value});
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
                                            value={student.name}
                                            error={isNameEmpty}
                                            helperText={isNameEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, name: e.target.value})
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
                                            value={student.mail}
                                            error={isMailEmpty}
                                            helperText={isMailEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, mail: e.target.value})
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
                                            value={student.facultyId}
                                            error={isFacultyEmpty}
                                            helperText={isFacultyEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, facultyId: e.target.value});
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
                                            value={student.careerId}
                                            error={isCareerEmpty}
                                            helperText={isCareerEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setStudent({...student, careerId: e.target.value});
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
                                <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'center',}}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="gender-radio-group"
                                        name="gender"
                                        defaultValue={'Femenino'}
                                        value={student.gender}
                                        onChange={(e) => {
                                            setStudent({
                                                ...student,
                                                gender: e.target.value
                                            })
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Femenino"
                                            control={<Radio/>}
                                            label="Femenino"
                                            labelPlacement={"top"}
                                        />
                                        <FormControlLabel
                                            value="Masculino"
                                            control={<Radio/>}
                                            label="Masculino"
                                            labelPlacement={"top"}
                                        />
                                    </RadioGroup>
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

export default StudentsForm;