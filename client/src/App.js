import React from "react";
import { Container } from '@material-ui/core';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
// import useStyles from './styles';

export const App = () => {
    const user_details = JSON.parse(localStorage.getItem('user_details'));

    return (
        <Container maxwidth="lg">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={
                    user_details ? <Navigate to="/" /> : <Auth /> // if user details are stored in local storage, go to home
                } />
            </Routes>
        </Container>
    );
};