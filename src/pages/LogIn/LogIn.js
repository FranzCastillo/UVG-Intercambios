// https://github.com/mui/material-ui/blob/v5.13.4/docs/data/material/getting-started/templates/sign-in/SignIn.js
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './LogIn.scss';
import {useState} from "react";
import {supabase} from "../../supabase/client";
import {useNavigate} from "react-router-dom";

export default function LogIn() {
    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const [invalidLogin, setInvalidLogin] = useState(false);

    const requiredHelper = "Este campo es obligatorio";
    const invalidHelper = "Su correo institucional o su contraseña son incorrectos";

    const navigate = useNavigate();

    const logIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            console.log(error);
            setInvalidLogin(true);
        } else {
            navigate('/home');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = data.get('password');
        const email = data.get('email');

        setIsEmailFilled(email.length > 0);

        try{
            await logIn(email, password);
        } catch (error) {
            console.log(error);
            setInvalidLogin(true);
        }
    }

    return (
        <div className={"log-in"}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#0b9e51'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingresar
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Institucional"
                                    name="email"
                                    autoComplete="email"
                                    error={!isEmailFilled || invalidLogin}
                                    helperText={!isEmailFilled ? requiredHelper : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={invalidLogin}
                                    helperText={invalidLogin ? invalidHelper : ""}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            className={"submit-button"}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={'./sign-up'} variant="body2">
                                    ¿No tienes una cuenta? Regístrate
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}