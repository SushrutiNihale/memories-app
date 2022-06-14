import mongoose from "mongoose";
import { Post } from "../models/posts.model.js";

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
        let post = await Post.create({ ...req.body, creator: req.userId });
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updatePost = async (req, res) => {
    // if the auth middleware return no user id
    if (!req.userId) return res.send("Please log in to like this post");

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");

        // if id exists in the database
        const post = await Post.findById(id);
        // check if user has already liked this post
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // if user has not already liked this post
            post.likes.push(req.userId);
        } else {
            // user wants to unlike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));

        }

        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        return res.status(200).send(updatedPost);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");

    await Post.findByIdAndDelete(id);
    res.status(200).send("Post deleted successfully!");
};

export const likePost = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.userId) {
            return res.send({ message: "Please log in to interact with the post" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");

        const post = await Post.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // user liking the post
            post.likes.push(req.userId);
        } else {
            // user unliking the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        res.status(200).send(updatedPost);
    } catch (err) {
        res.status(500).send(err);
    }
}