import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signIn = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        const action = { type: AUTH, payload: data };
        dispatch(action);
    } catch (err) {
        console.log(err)
    };
}

export const signUp = (formData) => async (dispatch) => {
    // console.log('signing up user')
    try {
        const { data } = await api.signUp(formData);
        // console.log('here')
        // console.log(data);

        const action = { type: AUTH, payload: data };
        dispatch(action);
    } catch (err) {
        console.log(err)
    };
}