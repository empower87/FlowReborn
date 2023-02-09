"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHandler = exports.getAllSongsHandler = exports.getUsersFollowersSongs = exports.getUsersLikedSongs = exports.getUsersSongsHandler = exports.getSongWithPopulatedUserAndCommentsHandler = exports.getSongWithPopulatedUserHandler = exports.getSongHandler = exports.deleteSongHandler = exports.updateSongHandler = exports.createSongHandler = void 0;
const Song_1 = require("../models/Song");
const User_1 = require("../models/User");
const trpc_1 = require("../utils/trpc");
const createSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user is not authorized ");
    const newSong = await Song_1.Song.create(input);
    // if (!newSong)
    console.log(newSong, input, "YO WHAT IS GOING ON??? WHY NO THUMBY");
    return newSong;
};
exports.createSongHandler = createSongHandler;
const updateSongHandler = async ({ ctx, input }) => {
    const update = { title: input.title, caption: input.caption };
    const updatedSong = await Song_1.Song.findByIdAndUpdate(input._id, update, {
        new: true,
    })
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!updatedSong)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "failed to update song");
    return updatedSong;
};
exports.updateSongHandler = updateSongHandler;
const deleteSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user is not authorized ");
    const deleteSong = await Song_1.Song.findOneAndDelete({ input });
    return deleteSong;
};
exports.deleteSongHandler = deleteSongHandler;
const getSongHandler = async ({ input }) => {
    const getSong = await Song_1.Song.findOne(input);
    // .populate<{ user: IUser }>("user")
    // .populate<{ comments: ISong["comments"] }>({
    //   path: "comments",
    //   populate: "user",
    // })
    if (!getSong)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't find song");
    return getSong;
};
exports.getSongHandler = getSongHandler;
const getSongWithPopulatedUserHandler = async ({ ctx, input }) => {
    const getSong = await Song_1.Song.findOne(input).populate("user");
    // .populate<{ comments: ISong["comments"] }>({
    //   path: "comments",
    //   populate: "user",
    // })
    if (!getSong)
        return (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't find song");
    return getSong;
};
exports.getSongWithPopulatedUserHandler = getSongWithPopulatedUserHandler;
const getSongWithPopulatedUserAndCommentsHandler = async ({ input }) => {
    const getSong = await Song_1.Song.findOne(input)
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!getSong)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "couldn't find song");
    return getSong;
};
exports.getSongWithPopulatedUserAndCommentsHandler = getSongWithPopulatedUserAndCommentsHandler;
const getUsersSongsHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user is not authorized ");
    const userSongs = await Song_1.Song.find({ user: input._id }).populate("user");
    // .populate<{ comments: ISong["comments"] }>({
    //   path: "comments",
    //   populate: "user",
    // })
    if (!userSongs)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "user not found");
    return userSongs;
};
exports.getUsersSongsHandler = getUsersSongsHandler;
const getUsersLikedSongs = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user is not authorized ");
    const likedSongs = await Song_1.Song.find({ likes: { $in: input._id } }).populate("user");
    if (!likedSongs)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "could not find users liked songs");
    return likedSongs;
};
exports.getUsersLikedSongs = getUsersLikedSongs;
const getUsersFollowersSongs = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("UNAUTHORIZED", "user is not authorized ");
    const followers = input.followers;
    const songsByFollowers = await Song_1.Song.find({
        user: { $in: [...followers] },
    }).populate("user");
    if (!songsByFollowers)
        throw (0, trpc_1.TRPCError)("BAD_REQUEST", "could not find followers songs");
    return songsByFollowers;
};
exports.getUsersFollowersSongs = getUsersFollowersSongs;
const getAllSongsHandler = async () => {
    const allSongs = await Song_1.Song.find({})
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!allSongs)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "request coulnd't be completed");
    return allSongs;
};
exports.getAllSongsHandler = getAllSongsHandler;
const searchHandler = async ({ ctx, input }) => {
    let data;
    const users = await User_1.User.find().or([
        { username: { $regex: input, $options: "i" } },
        { email: { $regex: input, $options: "i" } },
        { firstName: { $regex: input, $options: "i" } },
    ]);
    const songs = await Song_1.Song.find({ title: { $regex: input, $options: "i" } })
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    data = { users: [...users], songs: [...songs] };
    console.log(data, users, songs, "whats this data look like in search");
    return data;
};
exports.searchHandler = searchHandler;
