import React, {useState, useEffect} from "react";
import "./Edit.scss";
import {useNavigate, useParams} from 'react-router-dom';
import {getUniversityById, updateUniversity} from "../../../supabase/UniversitiesQueries";
import {getCountriesList} from "../../../supabase/GeoQueries";
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


const EditUniversity = () => {
    const {id} = useParams();

    const [university, setUniversity] = useState(null);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const universityDetails = await getUniversityById(id);
                const countriesList = await getCountriesList();
                setUniversity(universityDetails);
                setCountries(countriesList)
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversity();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        updateUniversity({
            id: university.id,
            name: data.get('name'),
            short_name: data.get('short_name'),
            country_id: data.get('countries'),
        }).then(() => {
            alert('Universidad actualizada con éxito');
            navigate(`/universidades/${university.id}`);
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
                <div className={"edit-university"}>
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
                                Editar Universidad
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Nombre de la Universidad"
                                            autoFocus
                                            value={university.name}
                                            InputLabelProps={{shrink: true}}
                                            onChange={(e) => setUniversity({...university, name: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="short_name"
                                            label="Nombre Corto"
                                            name="short_name"
                                            value={university.short_name}
                                            InputLabelProps={{shrink: true}}
                                            onChange={(e) => setUniversity({...university, short_name: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="countries"
                                            select
                                            label="País"
                                            defaultValue={university.country_id}
                                            fullWidth
                                            name="countries"
                                            value={university.country_id}
                                            onChange={(e) => setUniversity({...university, country_id: e.target.value})}
                                        >
                                            {countries ? (
                                                countries.map((country) => (
                                                    <MenuItem key={country.id} value={country.id}>
                                                        {country.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value={0}>
                                                    No hay países disponibles
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

export default EditUniversity;
