"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentHandler = exports.editCommentHandler = exports.createCommentHandler = exports.getCommentPopulatedUser = exports.getComment = void 0;
const index_1 = require("../models/index");
const trpc_1 = require("../utils/trpc");
const getComment = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to get comment");
    const getComment = await index_1.Comment.findOne({ _id: input._id })
        .populate("user")
        .populate({ path: "replies", populate: "user" });
    console.log(getComment, "is this hydrated???");
    if (!getComment)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't get request");
    return getComment;
};
exports.getComment = getComment;
const getCommentPopulatedUser = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to get comment");
    const getComment = await index_1.Comment.findOne({ _id: input._id }).populate("user");
    if (!getComment)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't get request");
    return getComment;
};
exports.getCommentPopulatedUser = getCommentPopulatedUser;
const createCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    if (!input.text.length)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "comment must be at least 1 character");
    const create = { text: input.text, parent: input.parent, user: input.user };
    const createdComment = await index_1.Comment.create(create);
    if (!createdComment)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't create comment in database");
    if (input.parent === input.songId) {
        const updateSong = await index_1.Song.findByIdAndUpdate(input.songId, { $push: { comments: createdComment } }, { new: true });
        const getCreatedComment = await index_1.Comment.findById(createdComment._id)
            .populate("user")
            .populate({
            path: "replies",
            populate: "user",
        });
        if (!getCreatedComment)
            throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "request could not be completed");
        return getCreatedComment;
    }
    else {
        const updateComment = await index_1.Comment.findByIdAndUpdate(input.parent, { $push: { replies: createdComment } }, { new: true })
            .populate("user")
            .populate({ path: "replies", populate: "user" });
        if (!updateComment)
            throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "request could not be completed");
        return updateComment;
    }
};
exports.createCommentHandler = createCommentHandler;
const editCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const getComment = await index_1.Comment.findById(input._id)
        .populate("user")
        .populate({ path: "replies", populate: "user" });
    if (!getComment)
        throw (0, trpc_1.TRPCError)("NOT_FOUND", "comment not found. Bad/invalid request data");
    if (getComment.text === input.text)
        return (0, trpc_1.TRPCError)("BAD_REQUEST", "comment hasn't been edited");
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
exports.editCommentHandler = editCommentHandler;
const deleteCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    var ObjectId = require("mongoose").Types.ObjectId;
    const beforeDelete = await index_1.Comment.findById(input._id)
        .populate("user")
        .populate({ path: "replies", populate: "user" });
    const deletedComment = await index_1.Comment.findOneAndDelete({ _id: input._id });
    if (input.parent === input.songId) {
        const song = await index_1.Song.findByIdAndUpdate(input.songId, { $pull: { comments: new ObjectId(input._id) } }, { new: true });
        if (!beforeDelete)
            throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "request could not be completed");
        return beforeDelete;
    }
    else {
        const updatedComment = await index_1.Comment.findByIdAndUpdate(input.parent, { $pull: { replies: new ObjectId(input._id) } }, { new: true })
            .populate("user")
            .populate({ path: "replies", populate: "user" });
        if (!updatedComment)
            throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "request could not be completed");
        return updatedComment;
    }
};
exports.deleteCommentHandler = deleteCommentHandler;
