"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesRouter = void 0;
const likes_controllers_1 = require("../controllers/likes.controllers");
const likes_schema_1 = require("../schema/likes.schema");
const trpc_1 = require("../utils/trpc");
exports.likesRouter = (0, trpc_1.router)({
    likeSong: trpc_1.publicProcedure.input(likes_schema_1.LikeSchema).mutation(async ({ ctx, input }) => await (0, likes_controllers_1.likeSongHandler)({ ctx, input })),
    unlikeSong: trpc_1.publicProcedure
        .input(likes_schema_1.LikeSchema)
        .mutation(async ({ ctx, input }) => await (0, likes_controllers_1.unlikeSongHandler)({ ctx, input })),
    likeComment: trpc_1.publicProcedure
        .input(likes_schema_1.LikeSchema)
        .mutation(async ({ ctx, input }) => await (0, likes_controllers_1.likeCommentHandler)({ ctx, input })),
    unlikeComment: trpc_1.publicProcedure
        .input(likes_schema_1.LikeSchema)
        .mutation(async ({ ctx, input }) => await (0, likes_controllers_1.unlikeCommentHandler)({ ctx, input })),
});
