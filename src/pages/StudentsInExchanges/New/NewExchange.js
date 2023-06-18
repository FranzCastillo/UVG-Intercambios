import React, {useEffect, useState} from "react";
import "./NewExchange.scss";
import {useNavigate} from 'react-router-dom';
import {doesUniversityExist, insertUniversity} from "../../../supabase/UniversitiesQueries";
import {getCountriesList} from "../../../supabase/GeoQueries";
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
import {getModalities, getStates} from "../../../supabase/MiscellaneousQueries";


const NewExchange = () => {
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isCountryEmpty, setIsCountryEmpty] = useState(false);
    const navigate = useNavigate();

    const [university, setUniversity] = useState({
        short_name: "",
        country_id: "",
    });

    const [modality, setModality] = useState('');
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
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const handleModalityChange = (event) => {
        setModality(event.target.value);
    }

    const [state, setState] = useState('');
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
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const handleStateChange = (event) => {
        setState(event.target.value);
    }

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
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesList = await getCountriesList();
                setCountries(countriesList)
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
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
                                            required
                                            fullWidth
                                            id="year"
                                            label="Año"
                                            autoFocus
                                            error={isNameEmpty}
                                            helperText={isNameEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setUniversity({...university, name: e.target.value});
                                                setIsNameEmpty(false);
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
                                            onChange={(e) => setUniversity({...university, short_name: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="student"
                                            label="Carné del Estudiante"
                                            name="student"
                                            onChange={(e) => setUniversity({...university, short_name: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                        <Button
                                            variant={"contained"}
                                            fullWidth
                                            sx={{
                                                height: '100%',
                                            }}
                                        >
                                            Verificar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="university"
                                            options={universities}
                                            renderInput={(params) => <TextField {...params} label="Universidad" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="modalities-label">Modalidad</InputLabel>
                                            <Select
                                                labelId="modalities-label"
                                                id="modalities"
                                                value={modality}
                                                label="Age"
                                                onChange={handleModalityChange}
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
                                                value={state}
                                                label="Estado"
                                                onChange={handleStateChange}
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
                                            required
                                            fullWidth
                                            id="cycle"
                                            label="Ciclo"
                                            autoFocus
                                            error={isNameEmpty}
                                            helperText={isNameEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setUniversity({...university, name: e.target.value});
                                                setIsNameEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="date"
                                            required
                                            fullWidth
                                            id="date"
                                            label="Fecha Viaje"
                                            autoFocus
                                            error={isNameEmpty}
                                            helperText={isNameEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                setUniversity({...university, name: e.target.value});
                                                setIsNameEmpty(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="courses_uvg"
                                            label="Cursos UVG"
                                            name="courses_uvg"
                                            onChange={(e) => setUniversity({...university, short_name: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="courses_exchange"
                                            label="Cursos Intercambio"
                                            name="courses_exchange"
                                            onChange={(e) => setUniversity({...university, short_name: e.target.value})}
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