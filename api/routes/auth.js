const router = require("express").Router();
const Validator = require("../middlewares/Validator");
const {
    loginController,
    registerController,
    refreshToken,
} = require("../controllers/authControllers");

// register
router.post("/register", Validator("register"), registerController);

// login
router.post("/login", Validator("login"), loginController);

// refresh token
router.post("/refresh", refreshToken);

module.exports = router;
