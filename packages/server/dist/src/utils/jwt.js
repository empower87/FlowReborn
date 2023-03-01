import jwt from "jsonwebtoken";
import customConfig from "../config/default.js";
export function signJwt(object, keyName, options = {}) {
    const secret = keyName === "accessTokenPrivateKey" ? customConfig.accessTokenPrivateKey : customConfig.refreshTokenPrivateKey;
    // const signingKey = Buffer.from(secret, 'base64').toString('ascii')
    console.log(secret, "problem is here");
    return jwt.sign(object, secret, { ...(options && options) });
}
export function verifyJwt(token, keyName) {
    const secret = keyName === "accessTokenPrivateKey" ? customConfig.accessTokenPrivateKey : customConfig.refreshTokenPrivateKey;
    // const publicKey = Buffer.from(secret, 'base64').toString('ascii')
    // const decoded = jwt.verify(token, secret, { complete: true }) as T
    // console.log(decoded, "WHAT THE FUCK IS DECODED?? VERIFYJWT")
    // if (decoded === null) throw TRPCError("INTERNAL_SERVER_ERROR", "jwt is null")
    // return decoded
    try {
        const decoded = jwt.verify(token, secret);
        console.log(token, decoded, secret, "WTF ISG OING ON ? WE GET HERE???");
        return decoded;
    }
    catch (e) {
        console.log(e, "OMG DUDD");
        return null;
    }
}
//# sourceMappingURL=jwt.js.map