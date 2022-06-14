import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts.actions';
import { useEffect } from 'react';

export const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: '',
        tags: [],
        message: '',
        selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('user_details'));

    const updateThisPost = useSelector((store) => currentId ? store.posts.find((post) => post._id === currentId) : null);

    useEffect(() => {
        if (updateThisPost) setFormData(updateThisPost);
    }, [updateThisPost]);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            // if currentId is not null, that is, we have to update a post
            dispatch(updatePost(currentId, { ...formData, name: user?.result?.name }));
        } else {
            // create a post
            dispatch(createPost({ ...formData, name: user?.result?.name }));
        }

        clear();
    };
    const handleChange = (e) => {
        if (e.target.name === "tags") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value.split(',')
            });
        } else setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const clear = () => {
        setCurrentId(null);
        setFormData({
            title: '',
            tags: '',
            message: '',
            selectedFile: ''
        });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please log in to create memories and view other member's memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.form} ${classes.root}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
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