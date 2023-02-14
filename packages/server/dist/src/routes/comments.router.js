import { createCommentHandler, deleteCommentHandler, editCommentHandler, getComment, getCommentPopulatedUser, } from "../controllers/comments.controllers.js";
import { CreateCommentSchema, DeleteCommentSchema, EditCommentSchema, GetCommentByIdSchema, } from "../schema/comments.schema.js";
import { protectedProcedure, router } from "../utils/trpc/index.js";
export const commentsRouter = router({
    getComment: protectedProcedure
        .input(GetCommentByIdSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .query(({ ctx, input }) => getComment({ ctx, input })),
    getCommentPopulatedUser: protectedProcedure
        .input(GetCommentByIdSchema)
        // .output(CommentSchemaPopulatedUser)
        .query(({ ctx, input }) => getCommentPopulatedUser({ ctx, input })),
    createComment: protectedProcedure
        .input(CreateCommentSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .mutation(({ ctx, input }) => createCommentHandler({ ctx, input })),
    editComment: protectedProcedure
        .input(EditCommentSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .mutation(({ ctx, input }) => editCommentHandler({ ctx, input })),
    deleteComment: protectedProcedure
        .input(DeleteCommentSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .mutation(({ ctx, input }) => deleteCommentHandler({ ctx, input })),
});
//# sourceMappingURL=comments.router.js.map