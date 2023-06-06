import React from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox, CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import LockRoundedIcon from '@mui/icons-material/LockRounded';


const MadeWithLove = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {"Built with love by the "}
        <Link color="inherit" href="https://material-ui.com/">
            Material-UI
        </Link>
        {" team."}
    </Typography>
);

// const useStyles = makeStyles(theme => ({
//     root: {
//         height: "100vh"
//     },
//     image: {
//         backgroundImage: "url(https://source.unsplash.com/random)",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center"
//     },
//     paper: {
//         margin: theme.spacing(8, 4),
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main
//     },
//     form: {
//         width: "100%", // Fix IE 11 issue.
//         marginTop: theme.spacing(1)
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2)
//     }
// }));
//

const SignInSide = () => {
    return (
        <Grid container component="main">
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div>
                    <Avatar>
                        <LockRoundedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <MadeWithLove/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default SignInSide;
