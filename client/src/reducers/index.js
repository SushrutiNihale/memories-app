import { combineReducers } from 'redux';

import posts from './posts.reducer';

export default combineReducers({
    posts, // is nothing but posts: posts
});