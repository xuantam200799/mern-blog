const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");

const { SALT_ROUNDS } = require("../variables/auth");
const { refreshTokenSize } = require("../variables/jwt");
const {
    updateRefreshToken,
    getUser,
    getEmail,
} = require("../methods/userModelMethods");
const { decodeToken, generateToken } = require("../methods/tokenMethods");

const registerController = async (req, res, next) => {
    try {
        const username = req.body.username.toLowerCase();
        const checkUsername = await getUser(username);
        if (checkUsername) {
            return res.status(422).send("Username is exist");
        }

        const checkMailExit = await getEmail(req.body.email);
        if (checkMailExit) {
            return res.status(422).send("Email is exist");
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        if (!user) {
            return res.status(400).send("Create new User failed!");
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(422).send("Wrong credentials!");
        }

        const validated = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validated) {
            return res.status(422).send("Wrong password!");
        }

        const { password, ...others } = user._doc;
        if (!others.profilePic) {
            others.profilePic = "blank-avatar.jpg";
        }

        const accessToken = await generateToken(
            { _id: user._id, username: user.username, isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_LIFE
        );
        console.log(accessToken);
        if (!accessToken) {
            return res.status(401).send("Login failed, please try again.");
        }

        let refreshToken = randToken.generate(refreshTokenSize);
        if (!user.refreshToken) {
            await updateRefreshToken(user.username, refreshToken);
        } else {
            refreshToken = user.refreshToken;
        }

        res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
        res.status(500).json(err);
    }
};

const refreshToken = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization.split(" ")[1];
    if (!accessTokenFromHeader) {
        return res.status(400).send("access token not found.");
    }

    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send("refresh token not found.");
    }

    const decoded = await decodeToken(
        accessTokenFromHeader,
        process.env.ACCESS_TOKEN_SECRET
    );
    if (!decoded) {
        return res.status(400).send("Access token không hợp lệ.");
    }
    const username = decoded.payload.username;

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(401).send("User không tồn tại.");
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send("Refresh token không hợp lệ.");
    }

    const accessToken = jwt.sign(
        { _id: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
    );

    if (!accessToken) {
        return res
            .status(400)
            .send("Tạo access token không thành công, vui lòng thử lại.");
    }
    return res.json({
        accessToken,
    });
};

module.exports = { registerController, loginController, refreshToken };
