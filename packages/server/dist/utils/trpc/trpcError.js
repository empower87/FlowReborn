import * as trpc from '@trpc/server';
export const TRPCError = (code, message) => {
    throw new trpc.TRPCError({ code: code, message: message });
};
//# sourceMappingURL=trpcError.js.map