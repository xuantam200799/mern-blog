const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
    try {
        const checkUsername = await User.findOne({
            username: req.body.username,
        });
        if (checkUsername) {
            return res.status(422).send("Username is exist");
        }

        const checkMailExit = await User.findOne({ email: req.body.email });
        if (checkMailExit) {
            return res.status(422).send("Email is exist");
        }

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
            return res.status(422).send("Wrong credentials!");
        }

        const validated = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validated) {
            return res.status(422).send("Wrong credentials!");
        }

        const { password, ...others } = user._doc;
        if (!others.profilePic) {
            others.profilePic = "blank-avatar.jpg";
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "24h",
            }
        );

        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { registerController, loginController };
