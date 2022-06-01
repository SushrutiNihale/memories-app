import mongoose from "mongoose";
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
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");

        // if id exists in the database
        const updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        console.log(updatedPost);
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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");

        const updatedPost = await Post.findOneAndUpdate({ _id: id }, { $inc: { likesCount: 1 } }, { new: true });
        console.log(updatedPost);
        return res.status(200).send(updatedPost);
    } catch (err) {
        res.status(500).send(err);
    }
}