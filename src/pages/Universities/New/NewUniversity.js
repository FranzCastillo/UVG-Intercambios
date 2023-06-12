import React, {useEffect, useState} from "react";
import "./NewUniversity.scss";
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
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import SaveIcon from '@mui/icons-material/Save';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";


const NewUniversity = () => {
    const [university, setUniversity] = useState({
        short_name: "",
        country_id: "",
    });
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isCountryEmpty, setIsCountryEmpty] = useState(false);
    const navigate = useNavigate();

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
        const name = data.get('name');
        const short_name = data.get('short_name');
        const country_id = data.get('countries');
        if (name === '') {
            setIsNameEmpty(true);
        }
        if (country_id === '') {
            setIsCountryEmpty(true);
        }
        if (name !== '' && country_id !== '') {
            try {
                const doesExist = await doesUniversityExist(name);
                if (doesExist) { // RIse error
                    throw new Error(`La universidad con el nombre "${name}" ya existe`);
                } else {
                    insertUniversity({name, short_name, country_id}).then(() => {
                        alert("Universidad registrada correctamente");
                        navigate('/universidades');
                    });
                }
            } catch (error) {
                setErrorOccurred(true);
                setError(error);
            }
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
                                <DomainAddIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Agregar Universidad
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
                                            fullWidth
                                            id="short_name"
                                            label="Nombre Corto"
                                            name="short_name"
                                            onChange={(e) => setUniversity({...university, short_name: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="countries"
                                            select
                                            label="País"
                                            fullWidth
                                            name="countries"
                                            value={university.country_id}
                                            error={isCountryEmpty}
                                            helperText={isCountryEmpty ? 'Este campo es requerido' : ''}
                                            onChange={(e) => {
                                                const selectedCountryId = e.target.value;
                                                setUniversity({...university, country_id: selectedCountryId});
                                                setIsCountryEmpty(false);
                                            }}
                                        >
                                            {countries ? (
                                                countries.map((country) => (
                                                    <MenuItem key={country.id} value={country.id}>
                                                        {country.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">
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

export default NewUniversity;