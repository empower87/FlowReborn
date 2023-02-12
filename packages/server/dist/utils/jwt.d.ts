import { SignOptions } from "jsonwebtoken";
export type CtxUserToken = {
    username: string;
    iat: number;
    exp: number;
};
export declare function signJwt(object: Object, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey", options?: SignOptions): string;
export declare function verifyJwt<T>(token: string, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"): T | null;
