import axios from 'axios';

const url = "http://localhost:5000/posts";

export const getPosts = () => axios.get(url);
export const createPost = (postData) => axios.post(url, postData);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);