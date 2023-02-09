"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = __importDefault(require("../config/default"));
function signJwt(object, keyName, options = {}) {
    const secret = keyName === "accessTokenPrivateKey" ? default_1.default.accessTokenPrivateKey : default_1.default.refreshTokenPrivateKey;
    // const signingKey = Buffer.from(secret, 'base64').toString('ascii')
    console.log(secret, "problem is here");
    return jsonwebtoken_1.default.sign(object, secret, { ...(options && options) });
}
exports.signJwt = signJwt;
function verifyJwt(token, keyName) {
    const secret = keyName === "accessTokenPrivateKey" ? default_1.default.accessTokenPrivateKey : default_1.default.refreshTokenPrivateKey;
    // const publicKey = Buffer.from(secret, 'base64').toString('ascii')
    // const decoded = jwt.verify(token, secret, { complete: true }) as T
    // console.log(decoded, "WHAT THE FUCK IS DECODED?? VERIFYJWT")
    // if (decoded === null) throw TRPCError("INTERNAL_SERVER_ERROR", "jwt is null")
    // return decoded
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(token, decoded, secret, "WTF ISG OING ON ? WE GET HERE???");
        return decoded;
    }
    catch (e) {
        console.log(e, "OMG DUDD");
        return null;
    }
}
exports.verifyJwt = verifyJwt;
