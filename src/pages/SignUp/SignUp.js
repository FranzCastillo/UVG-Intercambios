// https://github.com/mui/material-ui/blob/v5.13.4/docs/data/material/getting-started/templates/sign-up/SignUp.js
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
import './SignUp.scss';
import {useState} from "react";
import {supabase} from "../../supabase/client";

export default function SignUp() {

    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
    const [isNameFilled, setIsNameFilled] = useState(true);
    const [isLastNameFilled, setIsLastNameFilled] = useState(true);
    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const helper = "Este campo es obligatorio";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = data.get('password');
        const email = data.get('email');
        const name = data.get('name');
        const lastName = data.get('lastName');

        setIsPasswordLengthValid(password.length >= 6);
        setIsNameFilled(name.length > 0);
        setIsLastNameFilled(lastName.length > 0);
        setIsEmailFilled(email.length > 0);

        // if (isPasswordLengthValid && isNameFilled && isLastNameFilled && isEmailFilled) {
        //     try {
        //         const { user, error } = await supabase.auth.signInWithPassword({
        //             email: email,
        //             password: password
        //         });
        //
        //         if (error) {
        //             console.log('Error:', error.message);
        //         } else {
        //             console.log('Successfully signed in:', user);
        //         }
        //     } catch (error) {
        //         console.log('Error:', error.message);
        //     }
        // }
    };

    return (
        <div className={"sign-up"}>
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
                        Crear un Usuario
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombres"
                                    autoFocus
                                    {...(isNameFilled ? {} : {error: true, helperText: helper})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellidos"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...(isLastNameFilled ? {} : {error: true, helperText: helper})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Institucional"
                                    name="email"
                                    autoComplete="email"
                                    {...(isEmailFilled ? {} : {error: true, helperText: helper})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    {...(isPasswordLengthValid ? {} : {
                                        error: true,
                                        helperText: "La contraseña debe tener al menos 6 caracteres"
                                    })}
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
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
                            Crear Usuario
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={'./logIn'} variant="body2">
                                    ¿Ya has creado tu usuario? Inicia Sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}