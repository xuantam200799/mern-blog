const Post = require("../models/Post");

const updatePost = async (id, data, options = {}) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                $set: data,
            },
            { new: true, ...options }
        );
        return updatedPost;
    } catch {
        return null;
    }
};

module.exports = { updatePost };
