import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Paper, Grid, Container, TextField } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
// import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Input } from "./Input";
import Icon from "./icon";

export const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }
    const toggleComp = () => {
        setIsSignUp((prev) => !prev);
        handleShowPassword();
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj; // optional chaining operator; does not throw an error if res doesn't exist
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', payload: { result, token } });

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    const googleFailure = (err) => {
        console.log(err.details);
        console.log(err.error);
        console.log("Login failed");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {/* we can have both sign in and sign up in a single component as shown below */}
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    {/* <GoogleLogin
                        clientId="423720360471-l0f4kjdd6o4b0g0hvkjkdk7975hck6ng.apps.googleusercontent.com"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        theme="filled_blue"
                        text="signin_with"
                    /> */}

                    <GoogleLogin
                        clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={toggleComp}>
                                {isSignUp
                                    ?
                                    "Already have an account? Log In"
                                    :
                                    "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >
    )
}