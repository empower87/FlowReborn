import { initTRPC } from "@trpc/server";
import { TRPCError } from "./trpcError.js";
export const t = initTRPC.context().create();
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
const isAuthed = middleware(({ next, ctx }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not logged in");
    return next({ ctx });
});
export const protectedProcedure = t.procedure.use(isAuthed);
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
//# sourceMappingURL=createRouter.js.map