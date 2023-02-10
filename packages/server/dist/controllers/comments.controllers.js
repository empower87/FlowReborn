import { Comment, Song } from "../models/index.js";
import { TRPCError } from "../utils/trpc/index.js";
export const getComment = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to get comment");
    const getComment = await Comment.findOne({ _id: input._id })
        .populate("user")
        .populate({ path: "replies", populate: "user" });
    console.log(getComment, "is this hydrated???");
    if (!getComment)
        throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't get request");
    return getComment;
};
export const getCommentPopulatedUser = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to get comment");
    const getComment = await Comment.findOne({ _id: input._id }).populate("user");
    if (!getComment)
        throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't get request");
    return getComment;
};
export const createCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    if (!input.text.length)
        throw TRPCError("BAD_REQUEST", "comment must be at least 1 character");
    const create = { text: input.text, parent: input.parent, user: input.user };
    const createdComment = await Comment.create(create);
    if (!createdComment)
        throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't create comment in database");
    if (input.parent === input.songId) {
        const updateSong = await Song.findByIdAndUpdate(input.songId, { $push: { comments: createdComment } }, { new: true });
        const getCreatedComment = await Comment.findById(createdComment._id)
            .populate("user")
            .populate({
            path: "replies",
            populate: "user",
        });
        if (!getCreatedComment)
            throw TRPCError("INTERNAL_SERVER_ERROR", "request could not be completed");
        return getCreatedComment;
    }
    else {
        const updateComment = await Comment.findByIdAndUpdate(input.parent, { $push: { replies: createdComment } }, { new: true })
            .populate("user")
            .populate({ path: "replies", populate: "user" });
        if (!updateComment)
            throw TRPCError("INTERNAL_SERVER_ERROR", "request could not be completed");
        return updateComment;
    }
};
export const editCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    const getComment = await Comment.findById(input._id)
        .populate("user")
        .populate({ path: "replies", populate: "user" });
    if (!getComment)
        throw TRPCError("NOT_FOUND", "comment not found. Bad/invalid request data");
    if (getComment.text === input.text)
        return TRPCError("BAD_REQUEST", "comment hasn't been edited");
    getComment.update({ $set: { text: input.text, editedOn: new Date() } }, { new: true }).exec();
    await getComment.save();
    // if (getComment.parent._id === input.songId) {
    //   return getComment
    // } else {
    //   const getParentComment = await Comment.findById(getComment.parent._id)
    //     .populate<{ user: IUser }>("user")
    //     .populate<{ replies: IComment["replies"] }>({ path: "replies", populate: "user" })
    //   return getParentComment
    // }
    return getComment;
};
export const deleteCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    var ObjectId = require("mongoose").Types.ObjectId;
    const beforeDelete = await Comment.findById(input._id)
        .populate("user")
        .populate({ path: "replies", populate: "user" });
    const deletedComment = await Comment.findOneAndDelete({ _id: input._id });
    if (input.parent === input.songId) {
        const song = await Song.findByIdAndUpdate(input.songId, { $pull: { comments: new ObjectId(input._id) } }, { new: true });
        if (!beforeDelete)
            throw TRPCError("INTERNAL_SERVER_ERROR", "request could not be completed");
        return beforeDelete;
    }
    else {
        const updatedComment = await Comment.findByIdAndUpdate(input.parent, { $pull: { replies: new ObjectId(input._id) } }, { new: true })
            .populate("user")
            .populate({ path: "replies", populate: "user" });
        if (!updatedComment)
            throw TRPCError("INTERNAL_SERVER_ERROR", "request could not be completed");
        return updatedComment;
    }
};
//# sourceMappingURL=comments.controllers.js.map