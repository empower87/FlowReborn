"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const comments_controllers_1 = require("../controllers/comments.controllers");
const comments_schema_1 = require("../schema/comments.schema");
const trpc_1 = require("../utils/trpc");
exports.commentsRouter = (0, trpc_1.router)({
    getComment: trpc_1.protectedProcedure
        .input(comments_schema_1.GetCommentByIdSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .query(({ ctx, input }) => (0, comments_controllers_1.getComment)({ ctx, input })),
    getCommentPopulatedUser: trpc_1.protectedProcedure
        .input(comments_schema_1.GetCommentByIdSchema)
        // .output(CommentSchemaPopulatedUser)
        .query(({ ctx, input }) => (0, comments_controllers_1.getCommentPopulatedUser)({ ctx, input })),
    createComment: trpc_1.protectedProcedure
        .input(comments_schema_1.CreateCommentSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .mutation(({ ctx, input }) => (0, comments_controllers_1.createCommentHandler)({ ctx, input })),
    editComment: trpc_1.protectedProcedure
        .input(comments_schema_1.EditCommentSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .mutation(({ ctx, input }) => (0, comments_controllers_1.editCommentHandler)({ ctx, input })),
    deleteComment: trpc_1.protectedProcedure
        .input(comments_schema_1.DeleteCommentSchema)
        // .output(CommentSchemaPopulatedUserAndReplies)
        .mutation(({ ctx, input }) => (0, comments_controllers_1.deleteCommentHandler)({ ctx, input })),
});
