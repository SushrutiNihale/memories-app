import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => { // we use async since the process takes some time; this is part of redux thunk
    try {
        const { data } = await api.getPosts();
        const action = { type: 'GET_POSTS', payload: data }

        // return action; // without redux thunk
        dispatch(action); // with redux thunk
    } catch (err) {
        console.log(err);
    }
}

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData);
        const action = { type: 'CREATE_POST', payload: data };

        dispatch(action);
    } catch (err) {
        console.log(err);
    }
}
