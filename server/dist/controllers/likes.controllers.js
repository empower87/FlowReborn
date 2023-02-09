import { Comment, Song, User } from "../models/index.js";
import { TRPCError } from "../utils/trpc/index.js";
export const likeSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    const song = await Song.findById({ _id: input._id });
    if (!song)
        throw TRPCError("INTERNAL_SERVER_ERROR", "liked song not found");
    const user = await User.findOne({ username: ctx.user.username });
    if (!user)
        throw TRPCError("INTERNAL_SERVER_ERROR", "user not found");
    if (song.likes.includes(user._id.toString()))
        throw TRPCError("BAD_REQUEST", "you already liked this song");
    const updateLikedSong = await song.updateOne({ $push: { likes: user._id } });
    return updateLikedSong;
};
export const unlikeSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    const song = await Song.findById({ _id: input._id });
    if (!song)
        throw TRPCError("INTERNAL_SERVER_ERROR", "liked song not found");
    const user = await User.findOne({ username: ctx.user.username });
    if (!user)
        throw TRPCError("INTERNAL_SERVER_ERROR", "user not found");
    if (!song.likes.includes(user._id.toString()))
        throw TRPCError("BAD_REQUEST", "you have not liked this song");
    const updateUnlikedSong = await song.updateOne({ $pull: { likes: user._id } });
    return updateUnlikedSong;
};
export const likeCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    const { _id } = input;
    const comment = await Comment.findById({ _id: _id });
    if (!comment)
        throw TRPCError("INTERNAL_SERVER_ERROR", "comment not found");
    const user = await User.findOne({ username: ctx.user.username });
    if (!user)
        throw TRPCError("INTERNAL_SERVER_ERROR", "user not found");
    if (comment.likes.includes(user._id.toString()))
        throw TRPCError("BAD_REQUEST", "you already liked this comment");
    const updatedComment = await comment.updateOne({ $push: { likes: user._id } });
    return updatedComment;
};
export const unlikeCommentHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user not authorized to comment");
    const { _id } = input;
    const comment = await Comment.findById({ _id: _id });
    if (!comment)
        throw TRPCError("INTERNAL_SERVER_ERROR", "comment not found");
    const user = await User.findOne({ username: ctx.user.username });
    if (!user)
        throw TRPCError("INTERNAL_SERVER_ERROR", "user not found");
    if (!comment.likes.includes(user._id.toString()))
        throw TRPCError("BAD_REQUEST", "you have not liked this comment");
    const updatedComment = await comment.updateOne({ $pull: { likes: user._id } });
    return updatedComment;
};
//# sourceMappingURL=likes.controllers.js.map