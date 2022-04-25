const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.x_authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token is'nt valid!");
            }
            req.user = user.payload;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndCheckUserId = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndCheckUsername = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.username === req.body.username || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndCheckUserId,
    verifyTokenAndAdmin,
    verifyTokenAndCheckUsername,
};
