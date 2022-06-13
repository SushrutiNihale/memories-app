import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

// post routes
export const getPosts = () => API.get('/posts');
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// auth routes
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);