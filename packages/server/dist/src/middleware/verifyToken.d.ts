/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="cookie-parser" />
import * as trpcExpress from "@trpc/server/adapters/express";
export declare const verifyToken: ({ req, res }: trpcExpress.CreateExpressContextOptions) => Promise<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: null;
} | {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user: {
        username: string;
    };
}>;
