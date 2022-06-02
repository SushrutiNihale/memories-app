import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, UPDATE_LIKESCOUNT } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case CREATE_POST:
            return [...posts, action.payload];
        case UPDATE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE_POST:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE_LIKESCOUNT:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        default:
            return posts;
    }
}