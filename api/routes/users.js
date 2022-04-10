const router = require("express").Router();
const {
    updateUser,
    deleteUser,
    getUser,
} = require("../controllers/userControllers");
const {
    verifyToken,
    verifyTokenAndCheckUserId,
    verifyTokenAndCheckUsername,
} = require("../middlewares/verifyToken");

// update
router.put("/:id", verifyTokenAndCheckUserId, updateUser);

// delete
router.delete("/:id", verifyTokenAndCheckUserId, deleteUser);

// get user
router.get("/:id", getUser);

module.exports = router;
