import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import memories from '../../images/memories.png';
import useStyles from './styles';
import { AUTH, LOGOUT } from "../../constants/actionTypes";

export const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(
        () => getUserDetails(),
        []
    );

    const getUserDetails = () => {
        if (localStorage.getItem('user_details')) {
            // if user has not been logged out in the last session
            const user_details = JSON.parse(localStorage.getItem('user_details'));
            const action = { type: AUTH, payload: user_details };
            dispatch(action);
        }
    }
    const user = useSelector((store) => store.authData);

    const logOut = () => {
        dispatch({ type: LOGOUT });
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    component={Link} to="/"
                    className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height={60} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ?
                    // if user is logged in
                    (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                                {/* will be displayed if image is not displayed */}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Log Out</Button>
                        </div>
                    )
                    :
                    // if user is not logged in
                    (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Log In</Button>
                    )}
            </Toolbar>
        </AppBar>
    );
}