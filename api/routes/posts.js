const router = require("express").Router();
const {
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    createPost,
} = require("../controllers/postControllers");
const {
    verifyToken,
    verifyTokenAndCheckUserId,
    verifyTokenAndCheckUsername,
} = require("../middlewares/verifyToken");

// create new post
router.post("/", verifyTokenAndCheckUsername, createPost);

// update post
router.put("/:id", verifyTokenAndCheckUsername, updatePost);

// delete post
router.delete("/:id", verifyTokenAndCheckUsername, deletePost);

// get post
router.get("/:id", getPost);

//GET ALL POSTS
router.get("/", getAllPosts);

module.exports = router;
