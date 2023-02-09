"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const models_1 = require("../../models");
const jwt_1 = require("../jwt");
const createContext = async ({ req, res }) => {
    async function getUserFromHeader() {
        const token = req.headers["authorization" || "Authorization"]?.split(" ")[1];
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
        const user = await models_1.User.findOne({ username: decoded.username });
        if (!user)
            return notAuthenticated;
        return {
            req,
            res,
            user: { username: user.username },
        };
    }
    const user = await getUserFromHeader();
    return user;
};
exports.createContext = createContext;
// export const verifyToken = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
//   const token = req.headers["authorization" || "Authorization"]?.split(" ")[1]
//   console.log(token, "is this ok???")
//   const notAuthenticated = {
//     req,
//     res,
//     user: null,
//   }
//   if (!token) return notAuthenticated
//   console.log(token, typeof token, "did we get here?")
//   const decoded = verifyJwt<CtxUserToken>(token, "accessTokenPrivateKey")
//   console.log(decoded, "omfg what is going")
//   if (!decoded) return notAuthenticated
//   const user = await User.findOne({ username: decoded.username })
//   if (!user) return notAuthenticated
//   return {
//     req,
//     res,
//     user: { username: user.username },
//   }
// }
