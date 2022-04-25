const User = require("../models/User");

const getUser = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch {
        return null;
    }
};

const getEmail = async (email) => {
    try {
        const email = await User.findOne({ email: email });
    } catch {
        return null;
    }
};

const updateRefreshToken = async (username, refreshToken) => {
    try {
        await User.findOneAndUpdate(
            { username: username },
            { refreshToken: refreshToken },
            { upsert: true }
        );
        return true;
    } catch {
        return false;
    }
};

module.exports = { updateRefreshToken, getUser, getEmail };
