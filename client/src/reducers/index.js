import { combineReducers } from 'redux';

import posts from './posts.reducer';
import authReducer from './auth.reducer';

export default combineReducers({
    posts, // is nothing but posts: posts
    authData: authReducer
});