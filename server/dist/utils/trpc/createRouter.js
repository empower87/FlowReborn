"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.mergeRouters = exports.publicProcedure = exports.middleware = exports.router = exports.t = void 0;
const server_1 = require("@trpc/server");
const trpcError_1 = require("./trpcError");
exports.t = server_1.initTRPC.context().create();
exports.router = exports.t.router;
exports.middleware = exports.t.middleware;
exports.publicProcedure = exports.t.procedure;
exports.mergeRouters = exports.t.mergeRouters;
const isAuthed = (0, exports.middleware)(({ next, ctx }) => {
    if (!ctx.user)
        throw (0, trpcError_1.TRPCError)("UNAUTHORIZED", "user is not logged in");
    return next({ ctx });
});
exports.protectedProcedure = exports.t.procedure.use(isAuthed);
// export const protectedProcedure = publicProcedure.use(verifyToken)
// export function createRouter() {
//   return router<Context>({})
// }
// import * as trpc from "@trpc/server"
// import { initTRPC } from "@trpc/server"
// import { Context } from "./createContext"
// const t = initTRPC.create()
// export function createRouter() {
//   return trpc.router<Context>()
// }
