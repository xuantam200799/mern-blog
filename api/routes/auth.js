const router = require("express").Router();
const Validator = require("../middlewares/Validator");
const {
    loginController,
    registerController,
} = require("../controllers/authControllers");

// register
router.post("/register", Validator("register"), registerController);

// login
router.post("/login", Validator("login"), loginController);

module.exports = router;
