const router = require("express").Router();
const {
    updateUser,
    deleteUser,
    getUser,
} = require("../controllers/userControllers");

// update
router.put("/:id", updateUser);

// delete
router.delete("/:id", deleteUser);

// get user
router.get("/:id", getUser);

module.exports = router;
