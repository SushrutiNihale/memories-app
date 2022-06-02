import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import { Post } from './Post/Post';
import useStyles from './styles';
import { useEffect } from 'react';

export const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((store) => store.posts);

    // useEffect(() => {
    //     console.log(posts);
    // }, [posts]);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className='container' container alignItems='stretch' spacing={3}>
                {posts.map((post) => {
                    return (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    )
                })}
            </Grid>
        )
    );
};