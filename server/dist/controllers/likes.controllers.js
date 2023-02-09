"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeCommentHandler = exports.likeCommentHandler = exports.unlikeSongHandler = exports.likeSongHandler = void 0;
const Comment_1 = require("../models/Comment");
const Song_1 = require("../models/Song");
const User_1 = require("../models/User");
const trpc_1 = require("../utils/trpc");
const likeSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const song = await Song_1.Song.findById({ _id: input._id });
    if (!song)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "liked song not found");
    const user = await User_1.User.findOne({ username: ctx.user.username });
    if (!user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
    if (song.likes.includes(user._id.toString()))
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you already liked this song");
    const updateLikedSong = await song.updateOne({ $push: { likes: user._id } });
    return updateLikedSong;
};
exports.likeSongHandler = likeSongHandler;
const unlikeSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const song = await Song_1.Song.findById({ _id: input._id });
    if (!song)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "liked song not found");
    const user = await User_1.User.findOne({ username: ctx.user.username });
    if (!user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
    if (!song.likes.includes(user._id.toString()))
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you have not liked this song");
    const updateUnlikedSong = await song.updateOne({ $pull: { likes: user._id } });
    return updateUnlikedSong;
};
exports.unlikeSongHandler = unlikeSongHandler;
const likeCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const { _id } = input;
    const comment = await Comment_1.Comment.findById({ _id: _id });
    if (!comment)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "comment not found");
    const user = await User_1.User.findOne({ username: ctx.user.username });
    if (!user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
    if (comment.likes.includes(user._id.toString()))
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you already liked this comment");
    const updatedComment = await comment.updateOne({ $push: { likes: user._id } });
    return updatedComment;
};
exports.likeCommentHandler = likeCommentHandler;
const unlikeCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user not authorized to comment");
    const { _id } = input;
    const comment = await Comment_1.Comment.findById({ _id: _id });
    if (!comment)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "comment not found");
    const user = await User_1.User.findOne({ username: ctx.user.username });
    if (!user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "user not found");
    if (!comment.likes.includes(user._id.toString()))
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "you have not liked this comment");
    const updatedComment = await comment.updateOne({ $pull: { likes: user._id } });
    return updatedComment;
};
exports.unlikeCommentHandler = unlikeCommentHandler;
