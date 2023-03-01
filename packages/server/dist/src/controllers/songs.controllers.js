import { Song, User } from "../models/index.js";
import { TRPCError } from "../utils/trpc/index.js";
export const createSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized ");
    const newSong = await Song.create(input);
    // if (!newSong)
    console.log(newSong, input, "YO WHAT IS GOING ON??? WHY NO THUMBY");
    return newSong;
};
export const updateSongHandler = async ({ ctx, input }) => {
    const update = { title: input.title, caption: input.caption };
    const updatedSong = await Song.findByIdAndUpdate(input._id, update, {
        new: true,
    })
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!updatedSong)
        throw TRPCError("INTERNAL_SERVER_ERROR", "failed to update song");
    return updatedSong;
};
export const deleteSongHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized ");
    const deleteSong = await Song.findOneAndDelete({ input });
    return deleteSong;
};
export const getSongHandler = async ({ input }) => {
    const getSong = await Song.findOne(input);
    // .populate<{ user: IUser }>("user")
    // .populate<{ comments: ISong["comments"] }>({
    //   path: "comments",
    //   populate: "user",
    // })
    if (!getSong)
        throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't find song");
    return getSong;
};
export const getSongWithPopulatedUserHandler = async ({ ctx, input }) => {
    const getSong = await Song.findOne(input).populate("user");
    // .populate<{ comments: ISong["comments"] }>({
    //   path: "comments",
    //   populate: "user",
    // })
    if (!getSong)
        return TRPCError("INTERNAL_SERVER_ERROR", "couldn't find song");
    return getSong;
};
export const getSongWithPopulatedUserAndCommentsHandler = async ({ input }) => {
    const getSong = await Song.findOne(input)
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!getSong)
        throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't find song");
    return getSong;
};
export const getUsersSongsHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized ");
    const userSongs = await Song.find({ user: input._id }).populate("user");
    // .populate<{ comments: CommentSchemaPopulatedUserType[] }>({
    //   path: "comments",
    //   populate: "user",
    // })
    if (!userSongs)
        throw TRPCError("BAD_REQUEST", "user not found");
    return userSongs;
};
export const getUsersSongsWithCommentsHandler = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized ");
    const userSongs = await Song.find({ user: input._id })
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!userSongs)
        throw TRPCError("BAD_REQUEST", "user not found");
    return userSongs;
};
export const getUsersLikedSongs = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized ");
    const likedSongs = await Song.find({ likes: { $in: input._id } }).populate("user");
    if (!likedSongs)
        throw TRPCError("BAD_REQUEST", "could not find users liked songs");
    return likedSongs;
};
export const getUsersFollowersSongs = async ({ ctx, input }) => {
    if (!ctx.user)
        throw TRPCError("UNAUTHORIZED", "user is not authorized ");
    const followers = input.followers;
    const songsByFollowers = await Song.find({
        user: { $in: [...followers] },
    }).populate("user");
    if (!songsByFollowers)
        throw TRPCError("BAD_REQUEST", "could not find followers songs");
    return songsByFollowers;
};
export const getAllSongsHandler = async () => {
    const allSongs = await Song.find({})
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    if (!allSongs)
        throw TRPCError("INTERNAL_SERVER_ERROR", "request coulnd't be completed");
    return allSongs;
};
export const searchHandler = async ({ ctx, input }) => {
    let data;
    const users = await User.find().or([
        { username: { $regex: input, $options: "i" } },
        { email: { $regex: input, $options: "i" } },
        { firstName: { $regex: input, $options: "i" } },
    ]);
    const songs = await Song.find({ title: { $regex: input, $options: "i" } })
        .populate("user")
        .populate({
        path: "comments",
        populate: "user",
    });
    data = { users: [...users], songs: [...songs] };
    console.log(data, users, songs, "whats this data look like in search");
    return data;
};
//# sourceMappingURL=songs.controllers.js.map