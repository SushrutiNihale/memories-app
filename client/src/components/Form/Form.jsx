import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost } from '../../actions/posts.actions';

export const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        creator: '',
        title: '',
        tags: '',
        message: '',
        selectedFile: ''
    });

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(formData));
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const clear = () => { };

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.form} ${classes.root}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>Creating a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={formData.creator} onChange={handleChange} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={formData.title} onChange={handleChange} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={formData.message} onChange={handleChange} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={formData.tags} onChange={handleChange} />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color="primary" size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}