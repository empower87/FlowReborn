"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followsRouter = void 0;
const follows_controllers_1 = require("../controllers/follows.controllers");
const follows_schema_1 = require("../schema/follows.schema");
const trpc_1 = require("../utils/trpc");
exports.followsRouter = (0, trpc_1.router)({
    follow: trpc_1.publicProcedure.input(follows_schema_1.FollowSchema).mutation(async ({ ctx, input }) => await (0, follows_controllers_1.followHandler)({ ctx, input })),
    unfollow: trpc_1.publicProcedure
        .input(follows_schema_1.FollowSchema)
        .mutation(async ({ ctx, input }) => await (0, follows_controllers_1.unfollowHandler)({ ctx, input })),
});
