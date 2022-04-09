const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerController = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(400).json("Wrong credentials!");
        } else {
            const validated = await bcrypt.compare(
                req.body.password,
                user.password
            );
            !validated && res.status(400).json("Wrong credentials!");

            const { password, ...others } = user._doc;
            if (!others.profilePic) {
                others.profilePic = "blank-avatar.jpg";
            }
            res.status(200).json(others);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { registerController, loginController };
