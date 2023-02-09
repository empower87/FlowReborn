"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshHandler = exports.loginHandler = exports.registerHandler = void 0;
const default_1 = __importDefault(require("../config/default"));
const User_1 = require("../models/User");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const trpc_1 = require("../utils/trpc");
const registerHandler = async ({ input }) => {
    const { email, username, password } = input;
    const lowercaseUsername = username.toLowerCase();
    const lowercaseEmail = email.toLowerCase();
    const takenUsername = await User_1.User.findOne({ username: lowercaseUsername });
    if (takenUsername)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "username has already been taken");
    const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
    if (!hashedPassword)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "password failed to encrypt");
    const newUser = await User_1.User.create({
        username: lowercaseUsername,
        email: lowercaseEmail,
        password: hashedPassword,
    });
    return { username: lowercaseUsername, password: password };
};
exports.registerHandler = registerHandler;
const loginHandler = async ({ ctx, input }) => {
    const { username, password } = input;
    const lowercaseUsername = username.toLowerCase();
    const dbUser = await User_1.User.findOne({ username: lowercaseUsername }).select("+password");
    if (!dbUser)
        throw (0, trpc_1.TRPCError)("NOT_FOUND", `username of: ${username} does not exist`);
    const isMatch = await (0, bcrypt_1.matchPassword)(password, dbUser.password);
    if (!isMatch)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "invalid password");
    const payload = { username: dbUser.username };
    const accessToken = (0, jwt_1.signJwt)({ ...payload }, "accessTokenPrivateKey", {
        expiresIn: `${default_1.default.accessTokenExpiresIn}m`,
    });
    const refreshToken = (0, jwt_1.signJwt)({ ...payload }, "refreshTokenPrivateKey", {
        expiresIn: `${default_1.default.refreshTokenExpiresIn}m`,
    });
    ctx.res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
    });
    const returnUser = await User_1.User.findById(dbUser._id).select("-password");
    if (!returnUser)
        throw (0, trpc_1.TRPCError)("NOT_FOUND", "user not found..");
    console.log(returnUser, "OMG WE GOT HERE???");
    return { token: accessToken, user: returnUser };
};
exports.loginHandler = loginHandler;
const refreshHandler = async ({ ctx }) => {
    try {
        const cookies = ctx.req.cookies.jwt;
        if (!cookies)
            throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "refresh expired token");
        const refreshToken = cookies;
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, "refreshTokenPrivateKey");
        if (!decoded)
            throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "refresh expired token");
        const user = await User_1.User.findOne({ username: decoded.username });
        if (!user)
            throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
        const accessToken = (0, jwt_1.signJwt)({ username: user.username }, "accessTokenPrivateKey", {
            expiresIn: `${default_1.default.accessTokenExpiresIn}m`,
        });
        console.log(cookies, decoded, user, accessToken, "HAHAHAH ???");
        return accessToken;
    }
    catch (err) {
        throw err;
    }
};
exports.refreshHandler = refreshHandler;
// export const googleLoginHandler = async () => {
//   const tokenId: string | undefined = req.header('X-Google-Token')
//   console.log(tokenId, 'google token')
//   if (tokenId != null) {
//     res.json({ success: false, message: 'missing Google token' })
//   }
//   const googleResponse = await axios.get(
//     `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${encodeURI(tokenId!)}`,
//   )
//   const { email, email_verified, picture, given_name, family_name, error_description } =
//     googleResponse.data
//   if (!email || error_description) {
//     res.json({
//       success: false,
//       error: error_description,
//       message: 'error awaiting response from Google',
//     })
//   } else if (!email_verified) {
//     res.json({ success: false, message: 'email not verified with Google' })
//   }
//   const emailToUserName = (email: string) => {
//     const allCharsBeforeAt = /^.*?(?=\@)/gm
//     const validChars = /[a-zA-Z0-9]/gm
//     let splitEmail: Array<string> | null = email.match(allCharsBeforeAt)
//     if (splitEmail != null) {
//       let username = splitEmail[0]!.match(validChars)!.join('')
//       return username
//     }
//   }
//   const userData = {
//     email,
//     password: `thisisnotvalid`,
//     username: emailToUserName(email),
//     email_verified,
//     picture,
//     given_name,
//     family_name,
//     error_description,
//     googleId: req.body.googleId,
//   }
//   let user = await User.findOne({ email })
//   if (!user) {
//     user = await User.create(userData)
//   }
//   console.log(user, 'what could go wrong herre??')
//   const payload = {
//     _id: user._id,
//     username: user.username,
//   }
//   const secret = process.env.JWT_SECRET
//   if (!secret) return
//   jwt.sign(payload, secret, { expiresIn: 86400 }, (err: any, token: any) => {
//     if (err) return res.json({ success: false, error: err, message: "couldn't verify token" })
//     else {
//       return res.json({
//         success: true,
//         message: 'Success',
//         token: token,
//       })
//     }
//   })
// }
