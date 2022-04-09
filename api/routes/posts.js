const router = require("express").Router();
const {
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    createPost,
} = require("../controllers/postControllers");

// create new post
router.post("/", createPost);

// update post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

// get post
router.get("/:id", getPost);

//GET ALL POSTS
router.get("/", getAllPosts);

module.exports = router;
