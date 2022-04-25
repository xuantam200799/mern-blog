const Post = require("../models/Post");
const { updatePost: findByIdAndUpdatePost } = require("../methods/postMethods");

const createPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    if (!newPost.photo) {
        newPost.photo = "no-pic.jpg";
    }
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                // const updatedPost = await Post.findByIdAndUpdate(
                //     req.params.id,
                //     {
                //         $set: req.body,
                //     },
                //     { new: true }
                // );
                const updatedPost = await findByIdAndUpdatePost(
                    req.params.id,
                    req.body
                );
                res.status(200).json(updatedPost);
            } catch (err) {}
        } else {
            res.status(401).json("You can update only you posts!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllPosts = async (req, res, next) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
            if (posts.photo) {
                posts.photo = posts.photo;
            } else {
                posts.photo = "no-pic.jpg";
            }
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getAllPosts, getPost, deletePost, updatePost, createPost };
