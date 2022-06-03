import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import memories from '../../images/memories.png';
import useStyles from './styles';

export const Navbar = () => {
    const classes = useStyles();

    const user = null;

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    // component={Link} to="/"
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
                            <Button variant="contained" className={classes.logout} color="secondary">Log Out</Button>
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