import { User } from "../models/User.js";
import { TRPCError } from "../utils/trpc/index.js";
export const getMeHandler = async ({ ctx }) => {
    const user = ctx.user;
    if (!user)
        throw TRPCError("INTERNAL_SERVER_ERROR", "you must be logged in");
    const getUser = await User.findOne({ username: user.username });
    if (!getUser)
        throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't complete request");
    return getUser;
};
export const getUserHandler = async ({ ctx, input }) => {
    const user = await User.findOne({ _id: input._id });
    if (!user)
        throw TRPCError("BAD_REQUEST", "user not found");
    return user;
};
export const updateUserHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized for this action");
    const user = await User.findOneAndUpdate({ username: ctx.user.username }, { $set: { ...input } }, { new: true });
    if (!user)
        throw TRPCError("BAD_REQUEST", "user not found");
    console.log(user, "this should have changed");
    return user;
};
//# sourceMappingURL=users.controllers.js.map