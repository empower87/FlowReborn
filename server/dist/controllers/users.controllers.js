"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserHandler = exports.getUserHandler = exports.getMeHandler = void 0;
const User_1 = require("../models/User");
const trpc_1 = require("../utils/trpc");
const getMeHandler = async ({ ctx }) => {
    const user = ctx.user;
    if (!user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "you must be logged in");
    const getUser = await User_1.User.findOne({ username: user.username });
    if (!getUser)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't complete request");
    return getUser;
};
exports.getMeHandler = getMeHandler;
const getUserHandler = async ({ ctx, input }) => {
    const user = await User_1.User.findOne({ _id: input._id });
    if (!user)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "user not found");
    return user;
};
exports.getUserHandler = getUserHandler;
const updateUserHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user is not authorized for this action");
    const user = await User_1.User.findOneAndUpdate({ username: ctx.user.username }, { $set: { ...input } }, { new: true });
    if (!user)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "user not found");
    console.log(user, "this should have changed");
    return user;
};
exports.updateUserHandler = updateUserHandler;
