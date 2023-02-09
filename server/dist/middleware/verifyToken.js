"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
const verifyToken = async ({ req, res }) => {
    const token = req.headers["authorization" || "Authorization"]?.split(" ")[1];
    console.log(token, "is this ok???");
    const notAuthenticated = {
        req,
        res,
        user: null,
    };
    if (!token)
        return notAuthenticated;
    console.log(token, typeof token, "did we get here?");
    const decoded = (0, jwt_1.verifyJwt)(token, "accessTokenPrivateKey");
    console.log(decoded, "omfg what is going");
    if (!decoded)
        return notAuthenticated;
    const user = await User_1.User.findOne({ username: decoded.username });
    if (!user)
        return notAuthenticated;
    return {
        req,
        res,
        user: { username: user.username },
    };
};
exports.verifyToken = verifyToken;
