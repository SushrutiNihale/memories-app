import * as api from '../api';
import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, UPDATE_LIKESCOUNT } from '../constants/actionTypes';

// Action Creators
export const getPosts = () => async (dispatch) => { // we use async since the process takes some time; this is part of redux thunk
    try {
        const { data } = await api.getPosts();
        const action = { type: GET_POSTS, payload: data }

        // return action; // without redux thunk
        dispatch(action); // with redux thunk
    } catch (err) {
        console.log(err);
    }
}

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData);
        const action = { type: CREATE_POST, payload: data };

        dispatch(action);
    } catch (err) {
        console.log(err);
    }
};

export const updatePost = (id, postData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, postData);
        const action = { type: UPDATE_POST, payload: data };

        dispatch(action);
    } catch (err) {
        console.log(err);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE_POST, payload: id });
    } catch (err) {
        console.log(err);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        const action = { type: UPDATE_LIKESCOUNT, payload: data };

        dispatch(action);
    } catch (err) {
        console.log(err);
    }
}
