import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
// we can use import (instead of require) statements in the latest version of node
// make sure to include "type": "module" in package.json


import postsRoutes from './routes/posts.routes.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postsRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
    .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false); // makes sure we don't get any warnings in our console
