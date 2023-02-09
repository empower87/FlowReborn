"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowHandler = exports.followHandler = void 0;
const User_1 = require("../models/User");
const trpc_1 = require("../utils/trpc");
const followHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const { follower, following } = input;
    const me = await User_1.User.findById(follower);
    const user = await User_1.User.findById(following);
    if (!me || !user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
    if (ctx.user.username === user.username)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you can not follow yourself");
    if (me.following.includes(following) || user.followers.includes(follower))
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you already following this user");
    const updateMe = await me.updateOne({ $push: { following: following } });
    const updateUser = await user.updateOne({
        $push: { followers: follower },
    });
    return updateUser;
};
exports.followHandler = followHandler;
const unfollowHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const { follower, following } = input;
    const me = await User_1.User.findById(follower);
    const user = await User_1.User.findById(following);
    if (!me || !user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
    if (ctx.user.username === user.username)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you can not unfollow yourself");
    if (!me.following.includes(following) || !user.followers.includes(follower))
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you already following this user");
    const updateMe = await me.updateOne({ $pull: { following: following } });
    const updateUser = await user.updateOne({
        $pull: { followers: follower },
    });
    return updateUser;
};
exports.unfollowHandler = unfollowHandler;
