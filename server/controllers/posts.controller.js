import { Post } from "../models/posts.models.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().lean().exec();
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const createPost = async (req, res) => {
    try {
        let post = await Post.create(req.body);
        res.status(200).send(`${post} has been created successfully`);
    } catch (err) {
        res.status(500).send(err);
    }
}