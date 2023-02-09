import { likeCommentHandler, likeSongHandler, unlikeCommentHandler, unlikeSongHandler, } from "../controllers/likes.controllers.js";
import { LikeSchema } from "../schema/likes.schema.js";
import { publicProcedure, router } from "../utils/trpc/index.js";
export const likesRouter = router({
    likeSong: publicProcedure.input(LikeSchema).mutation(async ({ ctx, input }) => await likeSongHandler({ ctx, input })),
    unlikeSong: publicProcedure
        .input(LikeSchema)
        .mutation(async ({ ctx, input }) => await unlikeSongHandler({ ctx, input })),
    likeComment: publicProcedure
        .input(LikeSchema)
        .mutation(async ({ ctx, input }) => await likeCommentHandler({ ctx, input })),
    unlikeComment: publicProcedure
        .input(LikeSchema)
        .mutation(async ({ ctx, input }) => await unlikeCommentHandler({ ctx, input })),
});
//# sourceMappingURL=likes.router.js.map