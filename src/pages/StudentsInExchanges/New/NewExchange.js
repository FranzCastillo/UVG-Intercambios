import React, {useEffect, useState} from "react";
import "./NewExchange.scss";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Autocomplete, FormControl, InputLabel, Select} from "@mui/material";
import {getUniversities} from "../../../supabase/UniversitiesQueries";
import {doesStudentExist} from "../../../supabase/StudentQueries";
import {getModalities, getStates} from "../../../supabase/MiscellaneousQueries";
import {insertStudentInExchange} from "../../../supabase/ExchangeQueries";
import CheckStudentButton from "../../../components/Buttons/CheckStudent";


const NewExchange = () => {
    const navigate = useNavigate();

    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [exchange, setExchange] = useState({
        modality: '',
        state: '',
        university: '',
    });

    const [modalities, setModalities] = useState([]);
    useEffect(() => {
        getModalities()
            .then((modalities) => {
                setModalities(modalities);
            })
            .catch((error) => {
                setErrorOccurred(true);
                setError(error);
            })
    }, []);

    const [states, setStates] = useState([]);
    useEffect(() => {
        getStates()
            .then((states) => {
                setStates(states);
            })
            .catch((error) => {
                setErrorOccurred(true);
                setError(error);
            })
    }, []);

    const [universities, setUniversities] = useState([]);
    useEffect(() => {
        getUniversities()
            .then((universities) => {
                const transformedUniversities = universities.map((university) => {
                    return {
                        label: university.name,
                        id: university.id,
                    }
                });
                setUniversities(transformedUniversities);
            })
            .catch((error) => {
                setErrorOccurred(true);
                setError(error);
            })
    }, []);

    useEffect(() => {
        if (modalities.length > 0 && states.length > 0 && universities.length > 0) {
            setLoading(false);
        }
    }, [modalities, states, universities]);

    const [isYearEmpty, setIsYearEmpty] = useState(false);
    const [isSemesterEmpty, setIsSemesterEmpty] = useState(false);
    const [isStudentEmpty, setIsStudentEmpty] = useState(false);
    const [isUniversityEmpty, setIsUniversityEmpty] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const year = data.get('year');
        const semester = data.get('semester');
        const student = data.get('student');
        const university = exchange.university.id;
        const modality = exchange.modality;
        const state = exchange.state;
        const cycle = data.get('cycle');
        const date = data.get('date');
        const coursesUvg = data.get('coursesUvg');
        const coursesExchange = data.get('coursesExchange');
        const comments = data.get('comments');

        if (year === '') {
            setIsYearEmpty(true);
        }
        if (semester === '') {
            setIsSemesterEmpty(true);
        }
        if (student === '') {
            setIsStudentEmpty(true);
        }
        if (university === '') {
            setIsUniversityEmpty(true);
        }

        if (year === '' || semester === '' || student === '' || university === '') {
            return;
        }

        const studentExists = await doesStudentExist(student);
        if (!studentExists) {
            setIsStudentEmpty(true);
            setError({
                message: "El estudiante no existe"
            })
            setErrorOccurred(true);
            return;
        }

        const exchangeData = {
            year,
            semester,
            studentId: student,
            universityId: university,
        };

        if (modality !== '') {
            exchangeData.modalityId = modality;
        }
        if (state !== '') {
            exchangeData.stateId = state;
        }
        if (cycle !== '') {
            exchangeData.cycle = cycle;
        }
        if (date !== '') {
            exchangeData.date = date;
        }
        if (coursesUvg !== '') {
            exchangeData.coursesUvg = coursesUvg;
        }
        if (coursesExchange !== '') {
            exchangeData.coursesExchange = coursesExchange;
        }
        if (comments !== '') {
            exchangeData.comments = comments;
        }

        insertStudentInExchange(exchangeData)
            .then(() => {
                alert("Intercambio registrado exitosamente");
                navigate('/estudiantes-de-intercambio');
            })
            .catch((error) => {
                setErrorOccurred(true);
                setError(error);
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
                <div className={"new-exchange"}>
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
                                <AddCircleIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Registrar nuevo Intercambio
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            name="year"
                                            id="year"
                                            label="Año"
                                            required
                                            fullWidth
                                            autoFocus
                                            error={isYearEmpty}
                                            helperText={isYearEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setExchange({...exchange, year: e.target.value});
                                                setIsYearEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="semester"
                                            label="Semestre"
                                            name="semester"
                                            error={isSemesterEmpty}
                                            helperText={isSemesterEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setExchange({...exchange, semester: e.target.value});
                                                setIsSemesterEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="student"
                                            label="Carné del Estudiante"
                                            name="student"
                                            error={isStudentEmpty}
                                            helperText={isStudentEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setExchange({...exchange, student: e.target.value});
                                                setIsStudentEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                        <CheckStudentButton
                                            studentId={exchange.student}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete
                                            disablePortal
                                            required
                                            fullWidth
                                            id="university"
                                            name="university"
                                            options={universities}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                           label="Universidad"
                                                           error={isUniversityEmpty}
                                                           helperText={isUniversityEmpty ? 'Este campo es requerido' : ''}
                                                />
                                            }
                                            onChange={(event, value) => {
                                                setExchange({...exchange, university: value});
                                                setIsUniversityEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="modalities-label">Modalidad</InputLabel>
                                            <Select
                                                labelId="modalities-label"
                                                id="modalities"
                                                value={exchange.modality}
                                                label="modalities"
                                                onChange={(e) => {
                                                    setExchange({...exchange, modality: e.target.value});
                                                }}
                                            >
                                                {modalities.map((modality) => (
                                                    <MenuItem key={modality.id} value={modality.id}>
                                                        {modality.modality}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="states-label">Estado</InputLabel>
                                            <Select
                                                labelId="states-label"
                                                id="states"
                                                value={exchange.state}
                                                label="Estado"
                                                onChange={(e) => {
                                                    setExchange({...exchange, state: e.target.value});
                                                }}
                                            >
                                                {states.map((state) => (
                                                    <MenuItem key={state.id} value={state.id}>
                                                        {state.state}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="cycle"
                                            fullWidth
                                            id="cycle"
                                            label="Ciclo"
                                            onChange={(e) => {
                                                setExchange({...exchange, cycle: e.target.value});
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="date"
                                            fullWidth
                                            id="date"
                                            label="Fecha Viaje"
                                            onChange={(e) => {
                                                setExchange({...exchange, date: e.target.value});
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="coursesUvg"
                                            label="Cursos UVG"
                                            name="coursesUvg"
                                            onChange={(e) => setExchange({...exchange, courses_uvg: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="coursesExchange"
                                            label="Cursos Intercambio"
                                            name="coursesExchange"
                                            onChange={(e) => setExchange({
                                                ...exchange,
                                                courses_exchange: e.target.value
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="comments"
                                            name={"comments"}
                                            label="Comentarios"
                                            multiline
                                            fullWidth
                                            rows={4}
                                            defaultValue=""
                                            onChange={(e) => setExchange({...exchange, comments: e.target.value})}
                                        />
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

export default NewExchange;