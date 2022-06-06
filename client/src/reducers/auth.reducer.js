import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (store = null, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action.payload);
            localStorage.setItem('user_details', JSON.stringify({ ...action?.payload }));
            return action.payload;
        case LOGOUT:
            localStorage.removeItem('user_details');
            return null;
        default:
            return store;
    }
}

export default authReducer;